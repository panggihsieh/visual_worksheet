from __future__ import annotations

import functools
import http.server
import os
import socket
import sys
import threading
import webbrowser
from pathlib import Path


APP_TITLE = "Visual Worksheet Prompt Builder"
START_PAGE = "prompt.html"


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        super().end_headers()

    def log_message(self, format: str, *args: object) -> None:
        return


def resource_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(getattr(sys, "_MEIPASS"))
    return Path(__file__).resolve().parent


def find_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def main() -> None:
    root = resource_dir()
    start_file = root / START_PAGE
    if not start_file.exists():
        print(f"Missing {START_PAGE}. Please rebuild the portable package.", flush=True)
        input("Press Enter to exit...")
        return

    port = find_free_port()
    handler = functools.partial(NoCacheHandler, directory=str(root))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    url = f"http://127.0.0.1:{port}/{START_PAGE}"

    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    print(f"{APP_TITLE}", flush=True)
    print(f"Local URL: {url}", flush=True)
    print("Keep this window open while using the app.", flush=True)
    print("Press Ctrl+C or close this window to stop the local server.", flush=True)

    webbrowser.open(url)

    try:
        while True:
            threading.Event().wait(3600)
    except KeyboardInterrupt:
        print("\nStopping...", flush=True)
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    os.chdir(resource_dir())
    main()
