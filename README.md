# 視覺化學習單工房

## 圖片抓取下載

使用 `img_catcher/` 內的 BeautifulSoup 程式解析 HTML 內容，並下載目標圖片到 `image_sample/`。

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python img_catcher/download_target_images.py \
  --input "/Users/mac/Downloads/50 個視覺學習單參考範例.md" \
  --output-dir image_sample \
  --max-pages 10 \
  --max-images 50
```

常用參數：

- `--input`：可傳 Markdown 檔、HTML 檔，或單一網頁 URL。
- `--output-dir`：圖片輸出目錄，預設為 `image_sample/`。
- `--max-pages`：最多掃描幾個來源頁面。
- `--max-images`：最多下載幾張圖片。
- `--timeout`：每次網路請求逾秒。

有些平台會擋爬蟲、登入牆、訂閱牆或跨站圖片下載；程式會略過無法存取的頁面或圖片。

## 範本分類關鍵字

選單與提示詞產生器使用固定關鍵字：

- `relation`：關係運算類，適合心智圖、概念圖、魚骨圖、流程圖、時間軸、循環圖。
- `class`：類運算類，適合韋恩圖、T 字圖、KWL 表、決策樹。

新增範本時，在 `template_data.js` 使用：

```js
{
  id: "venn",
  name: "韋恩圖學習單",
  img: "image_sample/worksheet-11-venn.svg",
  logicFamily: "class",
  logicLabel: "類運算類"
}
```

若沒有寫 `logicFamily`，前端會退回用 SVG 檔名關鍵字自動判斷。

## LLM Provider API Key

前端提示詞產生器支援下列 provider：

- `openai`：OpenAI Responses API，預設模型 `gpt-5.2`。
- `anthropic`：Anthropic Messages API，預設模型 `claude-sonnet-4-5`。
- `gemini`：Google Gemini generateContent API，預設模型 `gemini-2.5-pro`。
- `openrouter`：OpenRouter Chat Completions API，預設模型 `openai/gpt-5.2`。

API key 只保存在瀏覽器欄位中，不寫入專案檔案。圖片生成按鈕目前只支援 OpenAI；其他 provider 可以用「複製提示詞」後貼到 Canva、ChatGPT 或 Firefly。

此專案採純前端模式開放給老師使用，模型欄位會在老師貼上 API key 後，即時呼叫 provider 的 models endpoint 取得可用模型並填入下拉選單。若某 provider 不允許瀏覽器前端查詢模型，頁面會顯示載入失敗訊息，避免老師手動輸入錯誤模型代號。

「產生提示詞」與「生成學習單」會在同一瀏覽器工作階段內連動 provider、API key 與模型。若產生提示詞頁使用 OpenAI，生成學習單頁會自動帶入同一把 key 並載入同一個模型；若使用 Gemini、OpenRouter 或 Anthropic，生成學習單頁會提示目前圖片生成只支援 OpenAI。
