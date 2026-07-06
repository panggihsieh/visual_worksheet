#!/usr/bin/env python3
"""Fetch HTML pages, parse image candidates with BeautifulSoup, and download them."""

from __future__ import annotations

import argparse
import hashlib
import mimetypes
import re
import sys
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup


DEFAULT_INPUT = "/Users/mac/Downloads/50 個視覺學習單參考範例.md"
DEFAULT_OUTPUT_DIR = "image_sample"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
)
URL_RE = re.compile(r"https?://[^\s)>\"]+")


def read_sources(input_path: Path) -> list[str]:
    text = input_path.read_text(encoding="utf-8")
    seen: set[str] = set()
    urls: list[str] = []
    for match in URL_RE.findall(text):
        url = match.rstrip(".,，。")
        if url not in seen:
            seen.add(url)
            urls.append(url)
    return urls


def html_from_source(source: str, timeout: int) -> tuple[str, str]:
    if source.startswith(("http://", "https://")):
        response = requests.get(
            source,
            headers={"User-Agent": USER_AGENT},
            timeout=timeout,
        )
        response.raise_for_status()
        return response.text, response.url

    path = Path(source)
    return path.read_text(encoding="utf-8"), path.resolve().as_uri()


def srcset_urls(srcset: str) -> Iterable[str]:
    for item in srcset.split(","):
      candidate = item.strip().split(" ")[0]
      if candidate:
          yield candidate


def image_candidates(html: str, base_url: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    candidates: list[str] = []

    for img in soup.find_all("img"):
        for attr in ("src", "data-src", "data-original", "data-lazy-src"):
            value = img.get(attr)
            if value:
                candidates.append(urljoin(base_url, value))
        if img.get("srcset"):
            candidates.extend(urljoin(base_url, url) for url in srcset_urls(img["srcset"]))

    for source in soup.find_all("source"):
        if source.get("srcset"):
            candidates.extend(urljoin(base_url, url) for url in srcset_urls(source["srcset"]))

    for meta in soup.find_all("meta"):
        key = meta.get("property") or meta.get("name")
        content = meta.get("content")
        if key in {"og:image", "og:image:url", "twitter:image"} and content:
            candidates.append(urljoin(base_url, content))

    seen: set[str] = set()
    unique: list[str] = []
    for url in candidates:
        if url.startswith("data:") or url in seen:
            continue
        seen.add(url)
        unique.append(url)
    return unique


def extension_for(url: str, content_type: str) -> str:
    parsed_ext = Path(urlparse(url).path).suffix.lower()
    if parsed_ext in {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"}:
        return parsed_ext
    guessed = mimetypes.guess_extension(content_type.split(";")[0].strip())
    return guessed or ".img"


def safe_stem(url: str, index: int) -> str:
    parsed = urlparse(url)
    host = re.sub(r"[^a-zA-Z0-9]+", "-", parsed.netloc).strip("-")[:36] or "image"
    digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:10]
    return f"{index:03d}-{host}-{digest}"


def download_image(url: str, output_dir: Path, index: int, timeout: int) -> Path | None:
    response = requests.get(
        url,
        headers={"User-Agent": USER_AGENT, "Referer": url},
        timeout=timeout,
        stream=True,
    )
    response.raise_for_status()

    content_type = response.headers.get("Content-Type", "")
    if "image" not in content_type and not Path(urlparse(url).path).suffix.lower() == ".svg":
        return None

    output_dir.mkdir(parents=True, exist_ok=True)
    ext = extension_for(url, content_type)
    output_path = output_dir / f"{safe_stem(url, index)}{ext}"

    with output_path.open("wb") as file:
        for chunk in response.iter_content(chunk_size=65536):
            if chunk:
                file.write(chunk)
    return output_path


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Parse HTML with BeautifulSoup and download target images."
    )
    parser.add_argument("--input", default=DEFAULT_INPUT, help="Markdown, HTML file, or URL list.")
    parser.add_argument("--output-dir", default=DEFAULT_OUTPUT_DIR, help="Image output directory.")
    parser.add_argument("--max-pages", type=int, default=10, help="Maximum source pages to scan.")
    parser.add_argument("--max-images", type=int, default=50, help="Maximum images to download.")
    parser.add_argument("--timeout", type=int, default=20, help="Network timeout in seconds.")
    args = parser.parse_args()

    input_path = Path(args.input)
    if input_path.exists():
        sources = read_sources(input_path)
        if not sources and input_path.suffix.lower() in {".html", ".htm"}:
            sources = [str(input_path)]
    else:
        sources = [args.input]

    if not sources:
        print(f"No URLs or HTML sources found in {args.input}", file=sys.stderr)
        return 1

    output_dir = Path(args.output_dir)
    downloaded = 0
    scanned = 0

    for source in sources[: args.max_pages]:
        scanned += 1
        try:
            html, final_url = html_from_source(source, args.timeout)
            candidates = image_candidates(html, final_url)
            print(f"[scan] {source} -> {len(candidates)} image candidates")
        except Exception as exc:
            print(f"[skip-page] {source}: {exc}", file=sys.stderr)
            continue

        for candidate in candidates:
            if downloaded >= args.max_images:
                break
            try:
                path = download_image(candidate, output_dir, downloaded + 1, args.timeout)
                if path:
                    downloaded += 1
                    print(f"[saved] {path}")
            except Exception as exc:
                print(f"[skip-image] {candidate}: {exc}", file=sys.stderr)

        if downloaded >= args.max_images:
            break

    print(f"Scanned {scanned} page(s), downloaded {downloaded} image(s) to {output_dir}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
