# Portable 版本使用說明

本 Release 提供 Windows Portable 版本：

```text
VisualWorksheetPortable.exe
```

下載後不需要安裝 Python，也不需要架站，直接雙擊即可使用。

## 適合對象

- 想直接使用，不想安裝開發環境的老師。
- 想在 Windows 電腦上離線開啟工具介面的使用者。
- 想把工具複製到 USB、隨身碟或校內電腦使用的情境。

## 使用方式

1. 在本頁 Release Assets 下載 `VisualWorksheetPortable.exe`。
2. 將 exe 放到任意資料夾，例如桌面或隨身碟。
3. 雙擊 `VisualWorksheetPortable.exe`。
4. 程式會自動啟動本機臨時 HTTP server。
5. 瀏覽器會自動開啟提示詞產生頁。
6. 使用期間請保持啟動視窗開著。
7. 使用完畢後，關閉啟動視窗即可停止本機服務。

## API Key 注意事項

- 使用 LLM API key 是為了讓工具自動生成學習單所需內容，例如學習目標、學習內容、核心素養/能力指標、學生版提示詞、教師版提示詞，以及可交給 Canva、ChatGPT、Gemini 或圖片生成工具使用的學習單框架。
- API key 不是用來蒐集個人資料，也不會寫入專案檔案。
- API key 只會在瀏覽器欄位中使用。
- 本工具不會把 API key 寫入專案檔案。
- 預設離開頁面時會清除 API key 欄位。
- 使用完畢後，建議按「清除 API key」。
- 請不要將 API key 貼到公開文件、簡報截圖、社群訊息或學生可看到的畫面。

重要提醒：Portable 版本仍然是本機瀏覽器工具。若要做公開多人服務，建議改成後端代理架構，將 API key 放在伺服器端保護。

## Windows SmartScreen 提醒

第一次執行時，Windows 可能跳出 SmartScreen 或安全性提醒。

這通常是因為 exe 尚未做程式碼簽章，不一定代表程式有問題。若你是從本專案 GitHub Release 下載，確認檔名為 `VisualWorksheetPortable.exe` 後即可依 Windows 提示繼續執行。

## 常見問題

### 關掉黑色視窗後網頁不能用了？

正常。黑色視窗是本機臨時 server，關閉後服務就會停止。請重新雙擊 exe。

### 可以把 exe 放到隨身碟嗎？

可以。此版本是單檔 portable exe，可放在隨身碟或任意資料夾使用。

### 需要網路嗎？

工具介面本身可在本機開啟，但如果要呼叫 OpenAI、Gemini、OpenRouter 等模型 API，就需要網路與有效 API key。

### 可以直接上傳 exe 到 repository 嗎？

不建議。建議原始碼放 repository，exe 放 GitHub Releases 的 Assets。
