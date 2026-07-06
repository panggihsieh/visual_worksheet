const remoteDirs = {
  imageSample: "image_sample/",
  promptOutput: "prompt_output/",
  canvaDesign: "canva_design/"
};

const llmProviders = {
  openai: {
    label: "OpenAI",
    defaultModel: "gpt-5.2",
    modelOptions: ["gpt-5.2", "gpt-5.1", "gpt-4.1", "gpt-4.1-mini"],
    keyPlaceholder: "sk-...",
    help: "純前端模式：不自動查詢模型清單，請使用常用模型或手動輸入模型代號。"
  },
  anthropic: {
    label: "Anthropic Claude",
    defaultModel: "claude-sonnet-4-5",
    modelOptions: ["claude-sonnet-4-5", "claude-opus-4-1", "claude-haiku-4-5"],
    keyPlaceholder: "sk-ant-...",
    help: "純前端模式：不自動查詢模型清單，請使用常用模型或手動輸入模型代號。"
  },
  gemini: {
    label: "Google Gemini",
    defaultModel: "gemini-2.5-pro",
    modelOptions: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
    keyPlaceholder: "AIza...",
    help: "純前端模式：不自動查詢模型清單，請使用常用模型或手動輸入模型代號。"
  },
  openrouter: {
    label: "OpenRouter",
    defaultModel: "openai/gpt-5.2",
    modelOptions: ["openai/gpt-5.2", "openai/gpt-4.1", "anthropic/claude-sonnet-4.5", "google/gemini-2.5-pro"],
    keyPlaceholder: "sk-or-...",
    help: "純前端模式：不自動查詢模型清單，可填 OpenRouter 模型代號，例如 openai/gpt-5.2。"
  }
};

const stageGuides = {
  low: {
    label: "低年級",
    reading: "使用短句、口語化指令、較大字級與明顯圖示，每區任務不超過一個動作。",
    task: "以圈選、連線、貼標籤、簡短填空與畫一畫為主。"
  },
  middle: {
    label: "中年級",
    reading: "使用清楚標題、關鍵詞提示、範例句型與中等留白，引導學生整理與比較。",
    task: "以分類、排序、比較、找證據、說明原因為主。"
  },
  high: {
    label: "高年級",
    reading: "提供較完整的結構化圖表、推論欄與反思欄，讓學生能整合多個概念。",
    task: "以概念建構、因果推論、觀點表達、應用情境與自我檢核為主。"
  }
};

const worksheetFamilies = {
  relation: {
    label: "關係運算類",
    desc: "用來看見概念、人物、事件、原因、證據、時間與系統之間的關係。",
    visualTypes: [
      { value: "mind-map", label: "心智圖", fit: "概念發想、先備知識、單元統整", cue: "中心主題、放射分支、關鍵詞、例子、延伸問題" },
      { value: "concept-map", label: "概念圖", fit: "概念階層、概念連結、關係說明", cue: "核心概念、階層節點、連結詞、例子欄" },
      { value: "fishbone", label: "魚骨圖", fit: "原因分析、問題診斷、證據整理", cue: "問題主軸、原因分類、證據格、結論框" },
      { value: "flowchart", label: "流程圖", fit: "步驟操作、實驗流程、解題程序", cue: "步驟框、箭頭、判斷點、反思題" },
      { value: "timeline", label: "時間軸", fit: "事件順序、歷史脈絡、過程變化", cue: "時間節點、事件卡、因果線、回顧欄" },
      { value: "cycle", label: "循環圖", fit: "週期、循環系統、重複變化", cue: "循環節點、方向箭頭、變化說明、觀察欄" }
    ]
  },
  class: {
    label: "類運算類",
    desc: "用來分類、比較、歸納、對照、判斷類別與整理共同/差異屬性。",
    visualTypes: [
      { value: "venn", label: "韋恩圖", fit: "比較異同、共同點與差異點", cue: "兩個或三個重疊圓、共同點、差異點、總結句" },
      { value: "t-chart", label: "T 字圖", fit: "雙欄比較、觀點對照、證據判斷", cue: "雙欄比較、證據列、判斷欄、結論句" },
      { value: "kwl", label: "KWL 表", fit: "已知分類、問題歸納、學習前後對照", cue: "已知、想知道、學到、下一步問題" },
      { value: "decision-tree", label: "決策樹", fit: "條件判斷、分類規則、選擇策略", cue: "選項分支、條件判斷、結果比較、理由欄" }
    ]
  }
};

const familyKeywords = ["class", "relation"];
const $ = (id) => document.getElementById(id);

function isFamilyKeyword(value) {
  return familyKeywords.includes(value);
}

function normalizeFamilyKey(value) {
  return isFamilyKeyword(value) ? value : "relation";
}

function inferVisualTypeFromFilename(imagePath) {
  const filename = imagePath.split("/").pop().toLowerCase();
  const rules = [
    ["decision-tree", "decision-tree"],
    ["concept-map", "concept-map"],
    ["mind-map", "mind-map"],
    ["t-chart", "t-chart"],
    ["fishbone", "fishbone"],
    ["flowchart", "flowchart"],
    ["timeline", "timeline"],
    ["cycle", "cycle"],
    ["venn", "venn"],
    ["kwl", "kwl"]
  ];
  return rules.find(([keyword]) => filename.includes(keyword))?.[1] || "mind-map";
}

function inferLogicalFamilyFromFilename(imagePath) {
  const visualType = inferVisualTypeFromFilename(imagePath);
  return ["venn", "t-chart", "kwl", "decision-tree"].includes(visualType) ? "class" : "relation";
}

const templates = (window.WORKSHEET_TEMPLATES || []).map((template) => {
  const baseType = inferVisualTypeFromFilename(template.img);
  const family = isFamilyKeyword(template.logicFamily) ? template.logicFamily : inferLogicalFamilyFromFilename(template.img);
  return {
    ...template,
    baseType,
    family,
    logicFamily: family,
    logicLabel: template.logicLabel || worksheetFamilies[family].label
  };
});

let selectedTemplate = templates[0];

function selectTemplateFromQuery() {
  const id = new URLSearchParams(window.location.search).get("template");
  selectedTemplate = templates.find((template) => template.id === id) || selectedTemplate;
}

function selectedProviderKey() {
  return llmProviders[$("llmProvider")?.value] ? $("llmProvider").value : "openai";
}

function selectedProvider() {
  return llmProviders[selectedProviderKey()];
}

function updateProviderUi() {
  if (!$("llmProvider")) return;
  const provider = selectedProvider();
  $("modelName").value = provider.defaultModel;
  if ($("modelPreset")) {
    $("modelPreset").innerHTML = provider.modelOptions.map((model) => `
      <option value="${model}">${model}</option>
    `).join("");
    $("modelPreset").value = provider.defaultModel;
  }
  $("apiKey").placeholder = provider.keyPlaceholder;
  $("providerHelp").textContent = provider.help;
}

function familyFromControl() {
  const familyKey = $("worksheetFamily")?.value || selectedTemplate?.family;
  return worksheetFamilies[normalizeFamilyKey(familyKey)] || worksheetFamilies.relation;
}

function visualTypeFromControl() {
  const family = familyFromControl();
  return family.visualTypes.find((item) => item.value === $("visualType")?.value) || family.visualTypes[0];
}

function renderVisualTypes() {
  if (!$("visualType")) return;
  const family = familyFromControl();
  $("visualType").innerHTML = family.visualTypes.map((type) => `
    <option value="${type.value}">${type.label}：${type.fit}</option>
  `).join("");
  if (selectedTemplate?.family === normalizeFamilyKey($("worksheetFamily")?.value)) {
    $("visualType").value = selectedTemplate.baseType;
  }
  updateVisualTypeHelp();
  syncSelectedTemplate();
}

function updateVisualTypeHelp() {
  if (!$("visualTypeHelp")) return;
  const family = familyFromControl();
  const visualType = visualTypeFromControl();
  const familyKey = normalizeFamilyKey($("worksheetFamily")?.value || selectedTemplate?.family);
  $("visualTypeHelp").textContent = `分類關鍵字 ${familyKey}｜${family.label}：${family.desc} 建議版面元素：${visualType.cue}。`;
}

function syncSelectedTemplate() {
  const visualType = $("visualType")?.value;
  selectedTemplate = templates.find((template) => template.baseType === visualType) || selectedTemplate || templates[0];
}

function renderTemplatesGrid() {
  if (!$("templateGrid")) return;
  $("templateGrid").innerHTML = templates.map((template) => `
    <article class="template-card">
      <a href="${template.img}" target="_blank" rel="noopener">
        <img src="${template.img}" alt="${template.name}">
      </a>
      <span class="logic-badge">${template.logicLabel}</span>
      <h3>${template.name}</h3>
      <p>${template.desc}</p>
      <a class="button-link" href="template-${template.id}.html">開啟獨立頁</a>
    </article>
  `).join("");
}

function worksheetBrief() {
  syncSelectedTemplate();
  const stage = stageGuides[$("stage")?.value] || stageGuides.high;
  const family = familyFromControl();
  const visualType = visualTypeFromControl();
  return {
    familyKey: normalizeFamilyKey($("worksheetFamily")?.value || selectedTemplate?.family),
    stage: stage.label,
    stageReading: stage.reading,
    stageTask: stage.task,
    subject: $("subject")?.value.trim() || "",
    family: family.label,
    familyDesc: family.desc,
    visualType: visualType.label,
    visualFit: visualType.fit,
    visualCue: visualType.cue,
    topic: $("topic")?.value.trim() || "",
    goal: $("goal")?.value.trim() || "",
    learningAbility: $("learningAbility")?.value.trim() || "",
    learningContent: $("learningContent")?.value.trim() || "",
    style: $("style")?.value || "",
    ratio: $("ratio")?.value || "",
    scaffold: $("scaffold")?.value || "",
    canvaUse: $("canvaUse")?.value || "",
    template: selectedTemplate?.name || visualType.label,
    promptHint: selectedTemplate?.promptHint || visualType.cue
  };
}

function localLearningFields() {
  const brief = worksheetBrief();
  return {
    goal: `學生能理解「${brief.topic}」的核心概念，並使用${brief.visualType}整理重點與關係。`,
    learningContent: `${brief.topic}的主要概念、關鍵詞、例子、常見迷思，以及可用${brief.visualType}呈現的分類或關係。`,
    learningAbility: `擷取關鍵資訊、整理${brief.family}、用圖像說明想法，並以短句完成反思。`
  };
}

function fillLearningFields(fields) {
  $("goal").value = fields.goal || "";
  $("learningContent").value = fields.learningContent || "";
  $("learningAbility").value = fields.learningAbility || "";
  fillDraftPrompt();
}

function fallbackPrompt() {
  const brief = worksheetBrief();
  return `請在 Canva Edu Design 中產生一張「${brief.topic}」視覺化學習單圖片。

年段：${brief.stage}
科目：${brief.subject}
學習目標：${brief.goal}
學習內容：${brief.learningContent}
學習能力：${brief.learningAbility}
分類關鍵字：${brief.familyKey}
學習單分類：${brief.family}，${brief.familyDesc}
視覺化類型：${brief.visualType}，適合${brief.visualFit}
套用範本：${brief.template}
版面元素：${brief.promptHint}；${brief.visualCue}
風格：${brief.style}
比例：${brief.ratio}
用途：${brief.canvaUse}
支架程度：${brief.scaffold}

設計要求：
1. 產出完整的一頁式視覺化學習單，不要做成單張插圖或海報。
2. 使用繁體中文，標題清楚，所有文字短而易讀，避免小字過多。
3. 年段調整：${brief.stageReading}
4. 任務形式：${brief.stageTask}
5. 版面要有明確視覺層次：標題區、任務說明區、主要視覺圖表區、學生填答區、回顧檢核區。
6. 圖像元素必須幫助理解學習內容，不要只做裝飾。
7. 保留足夠留白與書寫框，讓學生可以圈選、標註、填空、畫圖或寫短句。
8. 加入 1 個暖身觀察任務、2 到 3 個核心任務、1 個反思或自我檢核任務。
9. 使用高對比、易讀字體、整齊對齊、適合列印與投影的配色。
10. 不要放答案，不要出現浮水印，不要出現無關英文裝飾字。`;
}

function fillDraftPrompt() {
  if ($("promptOutput")) $("promptOutput").value = fallbackPrompt();
}

async function callOpenAiResponses(apiKey, model, input, withImageTool = false) {
  const body = { model, input };
  if (withImageTool) {
    body.tools = [{ type: "image_generation" }];
    body.tool_choice = { type: "image_generation" };
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `OpenAI request failed: ${response.status}`);
  return data;
}

async function callAnthropicMessages(apiKey, model, input) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model,
      max_tokens: 1800,
      messages: [{ role: "user", content: input }]
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Anthropic request failed: ${response.status}`);
  return data.content?.map((item) => item.text || "").filter(Boolean).join("\n") || "";
}

async function callGeminiGenerateContent(apiKey, model, input) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Gemini request failed: ${response.status}`);
  return (data.candidates || [])
    .flatMap((candidate) => candidate.content?.parts || [])
    .map((part) => part.text || "")
    .filter(Boolean)
    .join("\n");
}

async function callOpenRouterChat(apiKey, model, input) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Visual Worksheet Studio"
    },
    body: JSON.stringify({ model, messages: [{ role: "user", content: input }] })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `OpenRouter request failed: ${response.status}`);
  return data.choices?.[0]?.message?.content || "";
}

async function callPromptProvider(input) {
  const providerKey = selectedProviderKey();
  const apiKey = $("apiKey")?.value.trim();
  const model = $("modelName")?.value.trim() || selectedProvider().defaultModel;
  if (!apiKey) return "";
  if (providerKey === "openai") return responseText(await callOpenAiResponses(apiKey, model, input));
  if (providerKey === "anthropic") return callAnthropicMessages(apiKey, model, input);
  if (providerKey === "gemini") return callGeminiGenerateContent(apiKey, model, input);
  if (providerKey === "openrouter") return callOpenRouterChat(apiKey, model, input);
  throw new Error("不支援的 LLM provider");
}

function responseText(data) {
  if (data.output_text) return data.output_text;
  return (data.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .filter(Boolean)
    .join("\n");
}

function responseImage(data) {
  for (const item of data.output || []) {
    if (item.type === "image_generation_call" && item.result) return item.result;
    for (const content of item.content || []) {
      if (content.type === "output_image" && content.image_base64) return content.image_base64;
    }
  }
  return "";
}

function parseJsonObject(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("回應不是 JSON 物件");
  return JSON.parse(cleaned.slice(start, end + 1));
}

async function generateLearningFields() {
  const status = $("fieldStatus");
  const apiKey = $("apiKey").value.trim();
  if (!apiKey) {
    fillLearningFields(localLearningFields());
    status.textContent = "未填 API key，已用本機規則產出，可手動修改。";
    return;
  }

  const brief = worksheetBrief();
  status.textContent = "學習目標、內容、能力產出中...";
  const input = `請根據以下條件，輸出繁體中文 JSON，不要解釋，不要 markdown。
JSON 欄位必須是 goal, learningContent, learningAbility。

年段：${brief.stage}
科目：${brief.subject}
學習主題：${brief.topic}
分類關鍵字：${brief.familyKey}
學習單分類：${brief.family}
視覺化學習單類型：${brief.visualType}

要求：
- goal 1 到 2 句，明確可觀察。
- learningContent 2 到 4 句，包含核心概念與可整理重點。
- learningAbility 1 到 2 句，描述學生會用到的學習能力。`;

  try {
    fillLearningFields(parseJsonObject(await callPromptProvider(input)));
    status.textContent = "已產出，可手動修改。";
  } catch (error) {
    fillLearningFields(localLearningFields());
    status.textContent = `API 無法完成，已用本機規則產出。原因：${error.message}`;
  }
}

async function generatePrompt() {
  $("promptStatus").textContent = "提示詞產生中...";
  const input = `你是資深教材視覺設計師。請根據以下資料，輸出一段可交給圖像生成工具的高品質繁體中文提示詞。只輸出提示詞，不要解釋。

${fallbackPrompt()}`;

  try {
    $("promptOutput").value = await callPromptProvider(input) || fallbackPrompt();
    $("promptStatus").textContent = "提示詞已產生。";
  } catch (error) {
    $("promptOutput").value = `${fallbackPrompt()}\n\nAPI 無法完成，已保留本機提示詞草稿。\n原因：${error.message}`;
    $("promptStatus").textContent = "使用本機提示詞草稿。";
  }
}

async function copyPrompt() {
  const prompt = $("promptOutput")?.value.trim() || fallbackPrompt();
  try {
    await navigator.clipboard.writeText(prompt);
    const status = $("promptStatus") || $("drawStatus");
    if (status) status.textContent = "提示詞已複製。";
  } catch (error) {
    $("promptOutput")?.focus();
    $("promptOutput")?.select();
    const status = $("promptStatus") || $("drawStatus");
    if (status) status.textContent = "瀏覽器未允許剪貼簿，已選取提示詞。";
  }
}

function savePromptFile() {
  const prompt = $("promptOutput").value.trim() || fallbackPrompt();
  const blob = new Blob([prompt], { type: "text/plain;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `${remoteDirs.promptOutput.replace("/", "_")}visual_worksheet_prompt.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
  $("promptStatus").textContent = `提示詞檔案已下載，建議歸檔到 ${remoteDirs.promptOutput}`;
}

async function generateImage() {
  const key = $("apiKey").value.trim();
  const model = $("modelName").value.trim() || "gpt-5.2";
  const prompt = $("promptOutput").value.trim();
  const status = $("drawStatus");
  if (!key || !prompt) {
    status.textContent = "請先貼上 OpenAI API key 與圖片提示詞。";
    return;
  }

  status.textContent = "圖片生成中...";
  try {
    const data = await callOpenAiResponses(key, model, prompt, true);
    const image = responseImage(data);
    if (!image) throw new Error("回應中沒有圖片資料");
    $("resultImage").src = `data:image/png;base64,${image}`;
    status.textContent = `生成完成。建議存入 ${remoteDirs.canvaDesign}`;
  } catch (error) {
    status.textContent = `無法生成圖片：${error.message}`;
  }
}

function openTool(url) {
  const prompt = $("promptOutput")?.value.trim() || "";
  if (prompt) navigator.clipboard.writeText(prompt).catch(() => {});
  window.open(url, "_blank", "noopener,noreferrer");
  $("drawStatus").textContent = prompt ? "已複製提示詞並開啟工具。" : "已開啟工具。";
}

function initTemplatesPage() {
  renderTemplatesGrid();
}

function initPromptPage() {
  selectTemplateFromQuery();
  if ($("worksheetFamily")) $("worksheetFamily").value = selectedTemplate?.family || "relation";
  updateProviderUi();
  renderVisualTypes();
  fillDraftPrompt();

  $("llmProvider").addEventListener("change", () => {
    updateProviderUi();
    fillDraftPrompt();
  });
  $("modelPreset").addEventListener("change", () => {
    $("modelName").value = $("modelPreset").value;
    fillDraftPrompt();
  });
  $("worksheetFamily").addEventListener("change", () => {
    renderVisualTypes();
    fillDraftPrompt();
  });
  $("visualType").addEventListener("change", () => {
    updateVisualTypeHelp();
    syncSelectedTemplate();
    fillDraftPrompt();
  });
  $("generateLearningFields").addEventListener("click", generateLearningFields);
  $("generatePrompt").addEventListener("click", generatePrompt);
  $("copyPrompt").addEventListener("click", copyPrompt);
  $("savePrompt").addEventListener("click", savePromptFile);
  ["stage", "subject", "topic", "goal", "learningContent", "learningAbility", "style", "ratio", "scaffold", "canvaUse"].forEach((id) => {
    $(id).addEventListener("input", fillDraftPrompt);
  });
}

function initDrawPage() {
  $("generateImage").addEventListener("click", generateImage);
  $("copyPrompt").addEventListener("click", copyPrompt);
  $("openChatGPT").addEventListener("click", () => openTool("https://chatgpt.com/"));
  $("openCanva").addEventListener("click", () => openTool("https://www.canva.com/ai-image-generator/"));
  $("openFirefly").addEventListener("click", () => openTool("https://firefly.adobe.com/"));
}

const page = document.body.dataset.page;
if (page === "templates") initTemplatesPage();
if (page === "prompt") initPromptPage();
if (page === "draw") initDrawPage();
