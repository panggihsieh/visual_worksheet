# Visual Worksheet Prompt Builder

視覺化學習單提示詞產生器。這個專案提供一個給老師使用的網頁工具，可以依照學習階段、主題、學習目標、內容與能力指標，產生適合交給 Canva、ChatGPT、Gemini 或圖片生成工具使用的學習單設計提示詞。

目前提供兩種使用方式：

- WebApp 版本：適合部署到 GitHub Pages、靜態網站或本機 HTTP server。
- Portable 版本：適合 Windows 使用者下載 exe 後直接雙擊使用。

## 功能特色

- 支援多種視覺化學習單模板，例如心智圖、魚骨圖、流程圖、時間軸、循環圖、文氏圖、T 圖、KWL 表、概念圖與決策樹。
- 可產生學生版與教師版提示詞。
- 可依學習階段調整提示詞內容。
- 可連接多種 LLM Provider，自動生成學習單所需的學習目標、學習內容、核心素養/能力指標，以及完整的學習單框架提示詞。
- API key 不寫入專案檔案，並提供清除按鈕與離開頁面自動清除機制。
- 可將提示詞帶到圖片生成或設計工具使用。

## WebApp 版本

適合熟悉瀏覽器操作，或想部署成線上網頁的使用者。

### 本機啟動

在專案資料夾執行：

```bash
python -m http.server 8000
```

然後開啟：

```text
http://127.0.0.1:8000/prompt.html
```

### 線上部署

本專案是純前端靜態網頁，可以部署到：

- GitHub Pages
- Netlify
- Vercel
- 任意靜態網站主機
- 學校內部伺服器

主要入口頁面：

- `index.html`：首頁
- `templates.html`：模板列表
- `prompt.html`：產生提示詞
- `draw.html`：帶入提示詞到外部工具
- `free-api.html`：免費 API key 取得說明

## Portable 版本（Windows exe）

適合不想安裝 Python、不熟悉架站流程，或要發給老師直接使用的情境。

### 使用方式

1. 到 GitHub Releases 下載 `VisualWorksheetPortable.exe`。
2. 雙擊執行 exe。
3. 程式會自動啟動本機臨時 HTTP server，並開啟 `prompt.html`。
4. 使用期間請保持啟動視窗開著。
5. 關閉視窗後，本機服務會停止。

第一次執行時，Windows 可能出現 SmartScreen 提醒，這通常是因為 exe 尚未做程式碼簽章。

### 重新打包 Portable exe

先安裝 PyInstaller：

```bash
python -m pip install pyinstaller
```

打包：

```bash
python -m PyInstaller --noconfirm VisualWorksheetPortable.spec
```

輸出位置：

```text
dist/VisualWorksheetPortable.exe
```

建議將 exe 上傳到 GitHub Releases，不建議直接提交到 repository。

## API Key 與安全提醒

本專案目前是純前端工具。API key 會在瀏覽器中用來呼叫所選 Provider 的 API。

使用 LLM API key 的目的，是讓工具可以依照老師輸入的年級、主題與課程需求，自動生成學習單需要的內容，包括：

- 學習目標
- 學習內容
- 核心素養或能力指標
- 學生版提示詞
- 教師版提示詞
- 可交給 Canva、ChatGPT、Gemini 或圖片生成工具使用的學習單框架

API key 並不是用來蒐集個人資料，也不會寫入專案檔案。

已加入的保護機制：

- API key 不會寫入專案檔案。
- API key 不會儲存在 `sessionStorage`。
- 提供「清除 API key」按鈕。
- 預設離開頁面時自動清除 API key 欄位。
- 阻止從 API key 欄位直接複製、剪下、拖曳與右鍵選單。

重要提醒：純前端無法做到 100% 防止 API key 外洩。若要做更高安全等級的公開服務，建議改成後端代理架構，把 API key 放在伺服器端 `.env`，前端只呼叫自己的後端 API。

請避免：

- 把 API key 貼到公開文件、簡報、截圖或社群訊息。
- 在學生可看到的畫面展示 API key。
- 將真正的 API key commit 到 GitHub。
- 使用主要帳號的高額度 key 測試公開網頁。

## 支援的 Provider

文字提示詞產生目前支援：

- OpenAI
- DeepSeek
- MiniMax
- GLM / Z.AI
- Anthropic Claude
- Google Gemini
- OpenRouter

圖片生成或外部工具串接會依 Provider 能力不同而有所差異。若某個 Provider 不支援瀏覽器前端呼叫或不允許 CORS，頁面會顯示載入失敗訊息。

## 專案結構

```text
.
├─ index.html
├─ templates.html
├─ prompt.html
├─ draw.html
├─ free-api.html
├─ app.js
├─ styles.css
├─ template_data.js
├─ image_sample/
├─ ui_assets/
├─ img_catcher/
├─ portable_launcher.py
└─ VisualWorksheetPortable.spec
```

## 模板資料

模板定義在 `template_data.js`。

範例：

```js
{
  id: "venn",
  name: "文氏圖學習單",
  img: "image_sample/worksheet-11-venn.svg",
  logicFamily: "class",
  logicLabel: "分類比較"
}
```

常用欄位：

- `id`：模板代號
- `name`：模板名稱
- `img`：模板預覽圖
- `logicFamily`：邏輯分類，例如 `relation` 或 `class`
- `logicLabel`：顯示用分類名稱

## 圖片素材抓取工具

`img_catcher/download_target_images.py` 可用來從 HTML 或 Markdown 中擷取圖片素材。

安裝依賴：

```bash
python -m pip install -r requirements.txt
```

執行範例：

```bash
python img_catcher/download_target_images.py \
  --input path/to/source.md \
  --output-dir image_sample \
  --max-pages 10 \
  --max-images 50
```

## 開發備註

- 本專案以純前端為主，不需要 Node.js build step。
- 修改 HTML、CSS、JS 後重新整理瀏覽器即可看到結果。
- 若要測試完整路徑，建議使用 `python -m http.server`，不要直接用 `file://` 開啟。
- Portable exe 是用 PyInstaller 將本機 launcher 與靜態檔案打包成單檔。

## 發布建議

建議 GitHub repository 放：

- 原始碼
- README
- Portable 打包設定

建議 GitHub Releases 放：

- `VisualWorksheetPortable.exe`
- 版本說明
- 使用注意事項

## 授權

本專案採用 MIT License。詳見 `LICENSE`。
