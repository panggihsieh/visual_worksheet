const remoteDirs = {
  imageSample: "image_sample/",
  promptOutput: "prompt_output/",
  canvaDesign: "canva_design/"
};

const llmProviders = {
  openai: {
    label: "OpenAI",
    modelsEndpoint: "https://api.openai.com/v1/models",
    keyPlaceholder: "sk-...",
    help: "貼上 API key 後會即時向 OpenAI 查詢可用模型。"
  },
  deepseek: {
    label: "DeepSeek",
    modelsEndpoint: "https://api.deepseek.com/models",
    chatEndpoint: "https://api.deepseek.com/chat/completions",
    keyPlaceholder: "sk-...",
    help: "貼上 DeepSeek API key 後會即時向 DeepSeek 查詢可用模型。"
  },
  minimax: {
    label: "MiniMax",
    modelsEndpoint: "https://api.minimax.io/v1/models",
    chatEndpoint: "https://api.minimax.io/v1/chat/completions",
    keyPlaceholder: "MiniMax API key",
    help: "貼上 MiniMax API key 後會即時向 MiniMax 查詢可用模型。"
  },
  glm: {
    label: "GLM / Z.AI",
    modelsEndpoint: "https://api.z.ai/api/paas/v4/models",
    chatEndpoint: "https://api.z.ai/api/paas/v4/chat/completions",
    keyPlaceholder: "Z.AI API key",
    help: "貼上 GLM / Z.AI API key 後會即時向 Z.AI 查詢可用模型。"
  },
  anthropic: {
    label: "Anthropic Claude",
    modelsEndpoint: "https://api.anthropic.com/v1/models",
    keyPlaceholder: "sk-ant-...",
    help: "貼上 API key 後會即時向 Anthropic 查詢可用模型。"
  },
  gemini: {
    label: "Google Gemini",
    modelsEndpoint: "https://generativelanguage.googleapis.com/v1beta/models",
    keyPlaceholder: "AIza...",
    help: "貼上 API key 後會即時向 Google Gemini 查詢可用模型。"
  },
  openrouter: {
    label: "OpenRouter",
    modelsEndpoint: "https://openrouter.ai/api/v1/models",
    keyPlaceholder: "sk-or-...",
    help: "貼上 API key 後會即時向 OpenRouter 查詢可用模型。"
  }
};

const imageGenerationProviders = {
  openai: {
    label: "OpenAI GPT Image",
    defaultModel: "gpt-image-2",
    models: ["gpt-image-2", "gpt-image-1"],
    help: "使用 OpenAI 自家的 GPT Image 繪圖模型生成學習單圖片。"
  },
  gemini: {
    label: "Gemini Image",
    defaultModel: "gemini-3.1-flash-image",
    models: ["gemini-3.1-flash-image", "gemini-3-pro-image", "gemini-2.5-flash-image"],
    help: "使用 Google Gemini 的原生圖片生成模型生成學習單圖片。"
  },
  minimax: {
    label: "MiniMax Image",
    defaultModel: "image-01",
    models: ["image-01"],
    help: "使用 MiniMax 的 Image Generation 模型生成學習單圖片。"
  },
  glm: {
    label: "GLM Image",
    defaultModel: "glm-image",
    models: ["glm-image", "cogview-4-250304"],
    help: "使用 Z.AI 的 GLM-Image / CogView 圖片模型生成學習單圖片。"
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
let modelLoadTimer;
const llmSettingsKey = "visualWorksheet.llmSettings";
const promptDraftKey = "visualWorksheet.promptDraft";
const promptDraftKeys = {
  student: "visualWorksheet.promptDraft.student",
  teacher: "visualWorksheet.promptDraft.teacher"
};
const keyProtectionNotice = "安全模式：API key 不會儲存在瀏覽器 sessionStorage；離開頁面時會依設定清除欄位。";
const languageStorageKey = "visualWorksheet.language";
const defaultLanguage = "zh-Hant";
const uiTranslations = {
  en: {
    "語言": "Language",
    "繁中": "繁中",
    "English": "English",
    "首頁": "Home",
    "學習單範本": "Templates",
    "免費 API Key": "Free API Key",
    "產生提示詞": "Prompt Builder",
    "生成學習單": "Generate Worksheet",
    "視覺化學習單工房": "Visual Worksheet Studio",
    "選擇一個工具頁開始製作視覺化學習單": "Choose a tool page to start creating visual worksheets",
    "學習單範本、產生提示詞、生成學習單各自獨立，不共用同一個操作頁面。": "Templates, prompt generation, and worksheet generation are separate workflows.",
    "查看學習單範本": "View Templates",
    "視覺化學習單範本": "Visual Worksheet Templates",
    "學習單範本圖": "Worksheet Template Gallery",
    "建議老師優先使用這兩種": "Recommended options for teachers",
    "免費 API Key 取得方式": "How to Get a Free API Key",
    "適合一般老師先使用。Google AI Studio 可建立 Gemini API key，部分模型有免費額度。": "Recommended for most teachers. Google AI Studio can create Gemini API keys, and some models include free quota.",
    "適合想使用多種免費模型的老師。OpenRouter 有免費模型集合，但模型速度、限制與可用性可能變動。": "Useful if you want access to many free models. OpenRouter free-model availability, limits, and speed may change.",
    "前往 Gemini API Key": "Go to Gemini API Key",
    "官方說明": "Official Docs",
    "前往 OpenRouter": "Go to OpenRouter",
    "查看免費模型": "View Free Models",
    "API key 請老師自行保管，不要貼到公開文件、社群訊息、簡報截圖或學生可看到的頁面。本網站不會把 API key 寫入檔案。": "Please keep your API key private. Do not paste it into public documents, chat messages, presentation screenshots, or student-visible screens. This site does not write API keys to files.",
    "視覺設計提示詞產生器": "Visual Design Prompt Builder",
    "API 與學習單條件": "API and Worksheet Settings",
    "API key 僅用於這次瀏覽器請求，不會寫入檔案。": "The API key is only used for this browser request and is not written to files.",
    "API / 模型連線": "API / Model Connection",
    "模型": "Model",
    "重新載入模型": "Reload Models",
    "清除 API key": "Clear API key",
    "離開頁面時自動清除": "Clear automatically when leaving this page",
    "學習單架構": "Worksheet Structure",
    "年段": "Grade Band",
    "低年級": "Lower Grades",
    "中年級": "Middle Grades",
    "高年級": "Upper Grades",
    "學習單大類": "Worksheet Family",
    "關係運算類": "Relationship",
    "類運算類": "Classification",
    "科目": "Subject",
    "視覺化學習單類型": "Visual Worksheet Type",
    "學習主題": "Learning Topic",
    "學習設計": "Learning Design",
    "用 LLM 產出學習目標 / 內容 / 能力": "Use LLM to Generate Goals / Content / Competencies",
    "依高年級生成": "Generate for Upper Grades",
    "年段會同步影響學習目標、內容深度與能力描述。": "The grade band affects goals, content depth, and competency wording.",
    "學習目標": "Learning Goals",
    "學習內容": "Learning Content",
    "學習能力": "Learning Competencies",
    "輸出設定": "Output Settings",
    "視覺風格": "Visual Style",
    "乾淨資訊圖表": "Clean infographic",
    "手繪課堂筆記": "Hand-drawn classroom notes",
    "可愛插畫": "Friendly illustration",
    "極簡黑白列印": "Minimal black-and-white print",
    "輸出比例": "Output Ratio",
    "A4 直式": "A4 portrait",
    "A4 橫式": "A4 landscape",
    "16:9 投影片": "16:9 slide",
    "方形社群圖": "Square social graphic",
    "支架程度": "Scaffolding",
    "高支架：提供圖示、關鍵詞與句型": "High: icons, keywords, and sentence frames",
    "中支架：提供提示語與部分填空": "Medium: prompts and partial blanks",
    "低支架：開放整理與延伸挑戰": "Low: open organization and extension challenge",
    "產出用途": "Use Case",
    "可列印視覺化圖解學習單": "Printable visual worksheet",
    "課堂投影活動頁": "Classroom projection activity",
    "學生小組討論海報": "Student group discussion poster",
    "課末形成性評量單": "Exit formative assessment",
    "輸出形式": "Output Type",
    "完整視覺化學習單": "Complete visual worksheet",
    "只輸出 SVG 圖片結構": "SVG-like visual structure only",
    "提示詞輸出區": "Prompt Output",
    "產生最佳化提示詞": "Generate Optimized Prompts",
    "下載提示詞檔案": "Download Prompt File",
    "下載學生版心智圖 SVG": "Download Student Mind Map SVG",
    "下載教師版心智圖 SVG": "Download Teacher Mind Map SVG",
    "送到生成學習單": "Send to Worksheet Generator",
    "學生版提示詞": "Student Prompt",
    "教師版提示詞": "Teacher Prompt",
    "複製學生版": "Copy Student",
    "複製教師版": "Copy Teacher",
    "生成學習單": "Generate Worksheet",
    "把提示詞送到可生成學習單的工具": "Send the prompts to worksheet generation tools",
    "這裡會自動讀取「產生提示詞」頁目前產出的內容。選擇工具入口後，系統會先複製提示詞，再開啟對應服務。": "This page automatically reads the latest prompts from the Prompt Builder. When you choose a tool, the prompt is copied before the service opens.",
    "目前提示詞": "Current Prompt",
    "複製學生版提示詞": "Copy Student Prompt",
    "回到產生提示詞": "Back to Prompt Builder",
    "生成工具入口": "Generation Tool Entrances",
    "適合直接貼上提示詞，請 Canva 產生可編輯、可分層、可列印的學習單版面。": "Best for pasting prompts into Canva to create editable, layered, printable worksheet layouts.",
    "開啟 Canva AI 入口": "Open Canva AI",
    "Gemini 繪圖模型": "Gemini Image Model",
    "適合快速產生學習單草圖、圖像版面與可視覺化的課堂素材。": "Best for quickly generating worksheet drafts, visual layouts, and classroom visuals.",
    "開啟 Gemini 繪圖入口": "Open Gemini Image",
    "OpenAI 繪圖模型": "OpenAI Image Model",
    "適合使用 ChatGPT Images 生成或修改學習單視覺版本。": "Best for creating or revising worksheet visuals with ChatGPT Images.",
    "開啟 OpenAI 繪圖入口": "Open OpenAI Image",
    "開啟獨立頁": "Open Detail Page",
    "用這張產生提示詞": "Use This Template",
    "開啟 SVG": "Open SVG",
    "適合概念發想與單元統整。": "Good for concept brainstorming and unit synthesis.",
    "適合分析原因、問題解決與探究討論。": "Good for cause analysis, problem solving, and inquiry discussion.",
    "適合比較兩個概念、文本或策略。": "Good for comparing two concepts, texts, or strategies.",
    "適合程序、實驗步驟與因果流程。": "Good for procedures, experiment steps, and cause-effect flow.",
    "適合歷史事件、故事順序與歷程整理。": "Good for historical events, story sequence, and process organization.",
    "適合課前啟動、課中追問與課後反思。": "Good for pre-learning activation, inquiry, and reflection.",
    "適合整理概念關係與知識架構。": "Good for organizing concept relationships and knowledge structures.",
    "適合選擇判斷、策略比較與推理練習。": "Good for decision making, strategy comparison, and reasoning practice.",
    "適合自然循環、系統流程與週期概念。": "Good for natural cycles, system flows, and periodic concepts.",
    "適合正反比較、優缺點分析與分類整理。": "Good for pros/cons comparison, analysis, and classification.",
    "心智圖學習單": "Mind Map Worksheet",
    "魚骨圖學習單": "Fishbone Worksheet",
    "韋恩圖學習單": "Venn Diagram Worksheet",
    "流程圖學習單": "Flowchart Worksheet",
    "時間軸學習單": "Timeline Worksheet",
    "KWL 表學習單": "KWL Worksheet",
    "概念圖學習單": "Concept Map Worksheet",
    "決策樹學習單": "Decision Tree Worksheet",
    "循環圖學習單": "Cycle Diagram Worksheet",
    "T 字圖學習單": "T-Chart Worksheet",
    "心智圖": "Mind Map",
    "魚骨圖": "Fishbone",
    "韋恩圖": "Venn Diagram",
    "流程圖": "Flowchart",
    "時間軸": "Timeline",
    "KWL 表": "KWL Chart",
    "概念圖": "Concept Map",
    "決策樹": "Decision Tree",
    "循環圖": "Cycle Diagram",
    "T 字圖": "T-Chart",
    "中心主題、放射分支、關鍵詞、延伸問題": "central topic, radial branches, keywords, extension questions",
    "問題主軸、原因分類、證據格、結論框": "main problem, cause categories, evidence boxes, conclusion box",
    "重疊比較、共同點、差異點、總結句": "overlap comparison, similarities, differences, summary sentence",
    "步驟框、箭頭、判斷點、反思題": "step boxes, arrows, decision points, reflection question",
    "時間節點、事件卡、因果線、回顧欄": "time nodes, event cards, cause-effect line, review field",
    "已知、想知道、學到、下一步問題": "Know, Want to know, Learned, next question",
    "核心概念、連結詞、階層節點、例子欄": "core concept, linking words, hierarchy nodes, examples",
    "選項分支、條件判斷、結果比較、理由欄": "option branches, condition checks, result comparison, reasons",
    "循環節點、方向箭頭、變化說明、觀察欄": "cycle nodes, directional arrows, change notes, observation field",
    "雙欄比較、證據列、判斷欄、結論句": "two-column comparison, evidence rows, judgment field, conclusion",
    "水循環與日常生活": "Water cycle and daily life",
    "自然科學": "Natural Science",
    "依 Provider 貼上 API key": "Paste the API key for the selected provider",
    "請先到「產生提示詞」頁建立內容，或在這裡直接貼上學生版提示詞。": "Create content on the Prompt Builder page first, or paste the student prompt here.",
    "請先到「產生提示詞」頁建立內容，或在這裡直接貼上教師版提示詞。": "Create content on the Prompt Builder page first, or paste the teacher prompt here.",
    "本地API key 查詢與設定免費軟體": "Free local API key checker and setup tool"
    ,"安全模式：API key 不會儲存在瀏覽器 sessionStorage；離開頁面時會依設定清除欄位。": "Safe mode: the API key is not stored in browser sessionStorage; the field is cleared on leave according to your setting.",
    "貼上 API key 後會自動載入模型。": "Models will load automatically after you paste an API key.",
    "尚未載入模型": "No models loaded yet",
    "API key 已從欄位清除。": "The API key field has been cleared.",
    "已阻止從 API key 欄位複製或拖曳內容。": "Copying or dragging content from the API key field was blocked.",
    "目前沒有提示詞可複製。": "There is no prompt to copy yet.",
    "提示詞已複製。": "Prompt copied.",
    "瀏覽器未允許剪貼簿，已選取提示詞。": "Clipboard access was not allowed; the prompt text has been selected.",
    "已複製": "Copied",
    "提示詞產生中...": "Generating prompts...",
    "產生成功：學生版與教師版提示詞已分別產生。": "Done: student and teacher prompts were generated separately.",
    "未填 API key，已用本機規則產出，可手動修改。": "No API key entered. Local rules generated a draft that you can edit.",
    "學習目標、內容、能力產出中...": "Generating goals, content, and competencies...",
    "已產出，可手動修改。": "Generated. You can edit the result.",
    "已自動帶入產生提示詞頁的內容。": "Imported content from the Prompt Builder page.",
    "尚未找到提示詞內容，請先到產生提示詞頁建立，或直接貼上。": "No prompt content found yet. Create it on the Prompt Builder page first, or paste it here.",
    "已複製學生版提示詞並開啟工具。": "Copied the student prompt and opened the tool.",
    "已開啟工具。": "Opened the tool.",
    "請先選擇對應的繪圖模型。": "Please select the matching image model first.",
    "無原生繪圖模型": "No native image model",
    "此 Provider 無原生繪圖模型": "This provider has no native image model"
  }
};
const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
const translatableAttributes = ["placeholder", "aria-label", "title", "data-tooltip", "alt"];
let languageObserver;
let languageApplyQueued = false;

function currentLanguage() {
  const storedLanguage = localStorage.getItem(languageStorageKey);
  return storedLanguage === "en" ? "en" : defaultLanguage;
}

function translateUiText(text, language = currentLanguage()) {
  if (language === defaultLanguage) return text;
  const dictionary = uiTranslations[language] || {};
  if (dictionary[text]) return dictionary[text];
  if (/^分類關鍵字 /.test(text)) {
    return text
      .replace("分類關鍵字", "Family key")
      .replace("建議版面元素", "Suggested layout elements");
  }
  if (/^依.+生成$/.test(text)) {
    return `Generate for ${translateUiText(text.replace(/^依/, "").replace(/生成$/, ""), language)}`;
  }
  if (/^已套用.+：學習目標、內容深度與能力描述會跟著調整。$/.test(text)) {
    const label = text.replace(/^已套用/, "").replace(/：學習目標、內容深度與能力描述會跟著調整。$/, "");
    return `Applied ${translateUiText(label, language)}: goals, content depth, and competency wording will adjust together.`;
  }
  if (/^已即時載入 \d+ 個模型。/.test(text)) {
    return text.replace(/^已即時載入 (\d+) 個模型。/, "Loaded $1 models in real time.").replace("已套用快速生成預設模型：", "Fast default model applied: ");
  }
  if (/^正在向 .+ 即時查詢模型/.test(text)) {
    return text.replace(/^正在向 (.+) 即時查詢模型\.\.\.$/, "Querying $1 models in real time...");
  }
  if (/^貼上 .+ API key 後會自動載入模型。$/.test(text)) {
    return text.replace(/^貼上 (.+) API key 後會自動載入模型。$/, "Models will load automatically after you paste the $1 API key.");
  }
  if (/^貼上 .*API key 後會即時向 .+ 查詢可用模型。$/.test(text)) {
    return text.replace(/^貼上 (.*API key) 後會即時向 (.+) 查詢可用模型。$/, "After you paste the $1, available models will be queried from $2 in real time.");
  }
  if (/^(.+) 目前沒有可直接呼叫的原生繪圖模型/.test(text)) {
    return text.replace(/^(.+) 目前沒有可直接呼叫的原生繪圖模型；請改用有圖片模型的 Provider，或使用下方外部工具。$/, "$1 does not currently have a directly callable native image model. Use a provider with image models, or use the external tools below.");
  }
  if (/^已沿用產生提示詞頁的 .+ API key/.test(text)) {
    return text.replace(/^已沿用產生提示詞頁的 (.+) API key，並自動使用 (.+) 繪圖模型。$/, "Reusing the $1 API key from the Prompt Builder page and automatically using the $2 image model.");
  }
  if (/^請先確認 .+ API key 與圖片提示詞。$/.test(text)) {
    return text.replace(/^請先確認 (.+) API key 與圖片提示詞。$/, "Please confirm the $1 API key and image prompt first.");
  }
  if (/^.+ 圖片生成中\.\.\.$/.test(text)) {
    return text.replace(/^(.+) 圖片生成中\.\.\.$/, "$1 image generation in progress...");
  }
  if (/^.+ 生成完成。建議存入 /.test(text)) {
    return text.replace(/^(.+) 生成完成。建議存入 (.+)$/, "$1 generation complete. Suggested folder: $2");
  }
  return text;
}

function preserveWhitespace(original, translated) {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}

function shouldSkipTranslationNode(node) {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest("script, style, textarea, code, pre, [data-i18n-skip]"));
}

function translateTextNode(node, language) {
  if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
  const original = originalTextNodes.get(node);
  const trimmed = original.trim();
  if (!trimmed) {
    if (node.nodeValue !== original) node.nodeValue = original;
    return;
  }
  const translated = language === defaultLanguage ? trimmed : translateUiText(trimmed, language);
  const nextValue = preserveWhitespace(original, translated);
  if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
}

function translateElementAttributes(element, language) {
  if (element.closest("[data-i18n-skip]")) return;
  translatableAttributes.forEach((attr) => {
    if (!element.hasAttribute(attr)) return;
    let originals = originalAttributes.get(element);
    if (!originals) {
      originals = {};
      originalAttributes.set(element, originals);
    }
    if (!Object.prototype.hasOwnProperty.call(originals, attr)) {
      originals[attr] = element.getAttribute(attr) || "";
    }
    const original = originals[attr];
    const nextValue = language === defaultLanguage ? original : translateUiText(original, language);
    if (element.getAttribute(attr) !== nextValue) element.setAttribute(attr, nextValue);
  });
}

function applyLanguageToPage(language = currentLanguage()) {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n-skip]").forEach((element) => {
    element.querySelectorAll("*").forEach((child) => child.setAttribute("data-i18n-skip", ""));
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) {
    if (!shouldSkipTranslationNode(walker.currentNode)) textNodes.push(walker.currentNode);
  }
  textNodes.forEach((node) => translateTextNode(node, language));
  document.querySelectorAll("*").forEach((element) => {
    if (!element.closest("textarea, script, style")) translateElementAttributes(element, language);
  });
}

function queueApplyLanguage() {
  if (languageApplyQueued) return;
  languageApplyQueued = true;
  window.requestAnimationFrame(() => {
    languageApplyQueued = false;
    applyLanguageToPage();
  });
}

function observeLanguageMutations() {
  if (languageObserver) return;
  languageObserver = new MutationObserver(() => {
    if (currentLanguage() === "en") queueApplyLanguage();
  });
  languageObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: translatableAttributes
  });
}

function originalElementText(element) {
  if (!element) return "";
  const textNodes = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  if (!textNodes.length) return element.textContent?.trim() || "";
  return textNodes.map((node) => originalTextNodes.get(node) || node.nodeValue || "").join("").trim();
}

function selectedOptionOriginalText(id, fallback = "") {
  const option = $(id)?.selectedOptions?.[0];
  return originalElementText(option) || fallback;
}

function selectTemplateFromQuery() {
  const id = new URLSearchParams(window.location.search).get("template");
  selectedTemplate = templates.find((template) => template.id === id) || selectedTemplate;
}

function selectedProviderKey() {
  const controlValue = $("llmProvider")?.value;
  if (llmProviders[controlValue]) return controlValue;
  const linkedProvider = readLinkedLlmSettings().provider;
  return llmProviders[linkedProvider] ? linkedProvider : "openai";
}

function selectedProvider() {
  return llmProviders[selectedProviderKey()];
}

function readLinkedLlmSettings() {
  try {
    const settings = JSON.parse(sessionStorage.getItem(llmSettingsKey)) || {};
    if (settings.apiKey) {
      delete settings.apiKey;
      sessionStorage.setItem(llmSettingsKey, JSON.stringify(settings));
    }
    return settings;
  } catch (error) {
    return {};
  }
}

function saveLinkedLlmSettings() {
  const settings = {
    provider: selectedProviderKey(),
    model: $("modelName")?.value || ""
  };
  sessionStorage.setItem(llmSettingsKey, JSON.stringify(settings));
}

function clearApiKeyField(message = keyProtectionNotice) {
  if ($("apiKey")) $("apiKey").value = "";
  clearModelOptions("貼上 API key 後會自動載入模型。");
  setModelStatus(message);
}

function protectApiKeyInput() {
  const input = $("apiKey");
  if (!input) return;

  ["copy", "cut", "dragstart"].forEach((eventName) => {
    input.addEventListener(eventName, (event) => {
      event.preventDefault();
      setModelStatus("已阻止從 API key 欄位複製或拖曳內容。");
    });
  });

  input.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  window.addEventListener("pagehide", () => {
    if ($("clearKeyOnLeave")?.checked) input.value = "";
  });
}

function renderLanguageSwitcher() {
  if (document.querySelector(".language-switcher")) return;

  const savedLanguage = currentLanguage();
  const switcher = document.createElement("label");
  switcher.className = "language-switcher";
  switcher.innerHTML = `
    <span>語言</span>
    <select id="languageSelect" aria-label="語言選擇">
      <option value="zh-Hant">繁中</option>
      <option value="en">English</option>
    </select>
  `;
  document.body.appendChild(switcher);

  const select = $("languageSelect");
  select.value = savedLanguage;
  document.documentElement.lang = select.value;
  select.addEventListener("change", () => {
    localStorage.setItem(languageStorageKey, select.value);
    applyLanguageToPage(select.value);
  });
}

function readPromptDraft() {
  return sessionStorage.getItem(promptDraftKey) || "";
}

function readPromptDrafts() {
  const legacyPrompt = readPromptDraft();
  return {
    student: sessionStorage.getItem(promptDraftKeys.student) || legacyPrompt,
    teacher: sessionStorage.getItem(promptDraftKeys.teacher) || ""
  };
}

function savePromptDraft(prompt = $("promptOutput")?.value || "") {
  const studentPrompt = prompt || $("studentPromptOutput")?.value || "";
  const teacherPrompt = $("teacherPromptOutput")?.value || "";
  sessionStorage.setItem(promptDraftKey, studentPrompt);
  sessionStorage.setItem(promptDraftKeys.student, studentPrompt);
  sessionStorage.setItem(promptDraftKeys.teacher, teacherPrompt);
}

function applyLinkedLlmSettings() {
  const settings = readLinkedLlmSettings();
  if ($("llmProvider") && llmProviders[settings.provider]) {
    $("llmProvider").value = settings.provider;
  }
}

function updateProviderUi() {
  if (!$("llmProvider")) return;
  const provider = selectedProvider();
  if ($("apiKey")) $("apiKey").placeholder = provider.keyPlaceholder;
  if ($("providerHelp")) $("providerHelp").textContent = provider.help;
  clearModelOptions("貼上 API key 後會自動載入模型。");
}

function imageGenerationStatusForProvider(providerKey = selectedProviderKey()) {
  const provider = llmProviders[providerKey] || llmProviders.openai;
  const imageProvider = imageGenerationProviders[providerKey];
  if (imageProvider) {
    return `已沿用產生提示詞頁的 ${provider.label} API key，並自動使用 ${imageProvider.label} 繪圖模型。`;
  }
  return `${provider.label} 目前沒有可直接呼叫的原生繪圖模型；請改用有圖片模型的 Provider，或使用下方外部工具。`;
}

function renderImageModelOptions(providerKey = selectedProviderKey()) {
  if (!$("imageModelName")) return;
  const imageProvider = imageGenerationProviders[providerKey];
  if (!imageProvider) {
    $("imageModelName").innerHTML = `<option value="">此 Provider 無原生繪圖模型</option>`;
    $("imageModelName").disabled = true;
    return;
  }
  $("imageModelName").innerHTML = imageProvider.models.map((model) => `
    <option value="${model}">${model}</option>
  `).join("");
  $("imageModelName").value = imageProvider.defaultModel;
  $("imageModelName").disabled = false;
}

function updateDrawProviderUi() {
  const providerKey = selectedProviderKey();
  const provider = selectedProvider();
  const imageProvider = imageGenerationProviders[providerKey];
  if ($("drawProviderEyebrow")) $("drawProviderEyebrow").textContent = imageProvider ? `${imageProvider.label} / Native Image` : `${provider.label} / External Tools`;
  if ($("apiKeyLabel")) $("apiKeyLabel").textContent = `${provider.label} API Key`;
  if ($("modelLabel")) $("modelLabel").textContent = `${provider.label} 模型`;
  if ($("imageModelLabel")) $("imageModelLabel").textContent = imageProvider ? `${imageProvider.label} 繪圖模型` : "繪圖模型";
  if ($("apiKey")) $("apiKey").placeholder = provider.keyPlaceholder;
  renderImageModelOptions(providerKey);
  if ($("generateImage")) {
    $("generateImage").textContent = imageProvider ? `用 ${imageProvider.label} 生成學習單` : "無原生繪圖模型";
    $("generateImage").disabled = !imageProvider;
  }
}

function setModelStatus(message) {
  if ($("modelStatus")) $("modelStatus").textContent = message;
}

function clearModelOptions(message) {
  if (!$("modelName")) return;
  $("modelName").innerHTML = `<option value="">尚未載入模型</option>`;
  $("modelName").disabled = true;
  setModelStatus(message);
}

function setModelOptions(models, preferredModel = "", statusSuffix = "") {
  if (!$("modelName")) return;
  $("modelName").innerHTML = models.map((model) => `
    <option value="${model}">${model}</option>
  `).join("");
  if (preferredModel && models.includes(preferredModel)) {
    $("modelName").value = preferredModel;
  }
  $("modelName").disabled = false;
  setModelStatus(`已即時載入 ${models.length} 個模型。${statusSuffix}`);
  saveLinkedLlmSettings();
}

function friendlyProviderError(error) {
  const message = error?.message || String(error);
  if (selectedProviderKey() === "openai" && /incorrect api key|invalid api key|authentication/i.test(message)) {
    return `${message} 目前 Provider 是 OpenAI；如果你使用 DeepSeek、MiniMax 或 GLM / Z.AI API key，請改選正確 Provider 後重新載入模型。`;
  }
  return message;
}

function promptFailureAdvice(error) {
  const reason = friendlyProviderError(error);
  const provider = selectedProvider()?.label || "目前 Provider";
  return `產生失敗：${reason}。已先保留本機學生版與教師版提示詞草稿。解決方式：1. 確認 ${provider} API key 正確且額度可用；2. 確認 Provider 與 API key 類型一致；3. 按「重新載入模型」並選擇可用模型；4. 若顯示逾時，請稍後重試或換較快模型；5. 也可以直接複製目前草稿或送到生成學習單頁使用。`;
}

function promptTimeoutMsForProvider(providerKey = selectedProviderKey()) {
  const timeoutByProvider = {
    deepseek: 90000,
    anthropic: 90000,
    openrouter: 90000,
    openai: 60000,
    gemini: 60000,
    minimax: 60000,
    glm: 60000
  };
  return timeoutByProvider[providerKey] || 60000;
}

function filterTextModels(models) {
  const blocked = /(embedding|embed|whisper|tts|audio|speech|image|vision|moderation|dall-e|sora)/i;
  return [...new Set(models)]
    .filter((model) => model && !blocked.test(model))
    .sort((a, b) => a.localeCompare(b));
}

function fastModelPreference(providerKey, models) {
  const exactPreferences = {
    openai: ["gpt-5.2-mini", "gpt-5.1-mini", "gpt-5-mini", "gpt-4.1-mini", "gpt-4o-mini"],
    deepseek: ["deepseek-chat"],
    minimax: ["MiniMax-M1", "abab6.5s-chat"],
    glm: ["glm-4-flash", "glm-4.5-flash", "glm-4-air"],
    anthropic: ["claude-3-5-haiku-latest", "claude-3-haiku-20240307"],
    gemini: ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"],
    openrouter: [
      "openai/gpt-5.2-mini",
      "openai/gpt-5.1-mini",
      "openai/gpt-5-mini",
      "google/gemini-2.5-flash",
      "deepseek/deepseek-chat"
    ]
  };
  const exact = (exactPreferences[providerKey] || []).find((model) => models.includes(model));
  if (exact) return exact;

  const scoredModels = models
    .map((model) => {
      const lower = model.toLowerCase();
      let score = 0;
      if (/(flash|mini|haiku|lite|small|fast|turbo|chat|air)/.test(lower)) score += 20;
      if (/(pro|max|opus|reason|thinking|r1|o1|o3)/.test(lower)) score -= 20;
      if (/(preview|experimental|beta)/.test(lower)) score -= 5;
      return { model, score };
    })
    .sort((a, b) => b.score - a.score || a.model.localeCompare(b.model));

  return scoredModels[0]?.model || models[0] || "";
}

function preferredTextModel(providerKey, models, savedModel = "") {
  if (savedModel && models.includes(savedModel)) return savedModel;
  return fastModelPreference(providerKey, models);
}

async function fetchOpenAiModels(apiKey) {
  const response = await fetch(llmProviders.openai.modelsEndpoint, {
    headers: { "Authorization": `Bearer ${apiKey}` }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `OpenAI models request failed: ${response.status}`);
  return filterTextModels((data.data || []).map((model) => model.id));
}

async function fetchDeepSeekModels(apiKey) {
  return fetchOpenAiCompatibleModels("deepseek", apiKey);
}

function zAiHeaders(apiKey) {
  return {
    "Authorization": `Bearer ${apiKey}`,
    "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8"
  };
}

function modelIdsFromResponse(data) {
  const candidates = Array.isArray(data.data) ? data.data : Array.isArray(data.models) ? data.models : [];
  return candidates.map((model) => {
    if (typeof model === "string") return model;
    return model.id || model.model || model.name?.replace(/^models\//, "") || "";
  });
}

function openAiCompatibleHeaders(providerKey, apiKey) {
  if (providerKey === "glm") return zAiHeaders(apiKey);
  return { "Authorization": `Bearer ${apiKey}` };
}

async function fetchOpenAiCompatibleModels(providerKey, apiKey) {
  const provider = llmProviders[providerKey];
  const response = await fetch(provider.modelsEndpoint, {
    headers: openAiCompatibleHeaders(providerKey, apiKey)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || data.message || `${provider.label} models request failed: ${response.status}`);
  return filterTextModels(modelIdsFromResponse(data));
}

async function fetchMiniMaxModels(apiKey) {
  return fetchOpenAiCompatibleModels("minimax", apiKey);
}

async function fetchGlmModels(apiKey) {
  return fetchOpenAiCompatibleModels("glm", apiKey);
}

async function fetchAnthropicModels(apiKey) {
  const response = await fetch(llmProviders.anthropic.modelsEndpoint, {
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Anthropic models request failed: ${response.status}`);
  return filterTextModels((data.data || []).map((model) => model.id));
}

async function fetchGeminiModels(apiKey) {
  const endpoint = `${llmProviders.gemini.modelsEndpoint}?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(endpoint);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Gemini models request failed: ${response.status}`);
  return filterTextModels((data.models || [])
    .filter((model) => (model.supportedGenerationMethods || []).includes("generateContent"))
    .map((model) => model.name?.replace(/^models\//, "")));
}

async function fetchOpenRouterModels(apiKey) {
  const headers = apiKey ? { "Authorization": `Bearer ${apiKey}` } : {};
  const response = await fetch(llmProviders.openrouter.modelsEndpoint, { headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `OpenRouter models request failed: ${response.status}`);
  return filterTextModels((data.data || []).map((model) => model.id));
}

async function fetchProviderModels() {
  const providerKey = selectedProviderKey();
  const apiKey = $("apiKey")?.value.trim();
  if (!apiKey) {
    clearModelOptions("貼上 API key 後會自動載入模型。");
    return;
  }

  clearModelOptions(`正在向 ${selectedProvider().label} 即時查詢模型...`);
  try {
    let models = [];
    if (providerKey === "openai") models = await fetchOpenAiModels(apiKey);
    if (providerKey === "deepseek") models = await fetchDeepSeekModels(apiKey);
    if (providerKey === "minimax") models = await fetchMiniMaxModels(apiKey);
    if (providerKey === "glm") models = await fetchGlmModels(apiKey);
    if (providerKey === "anthropic") models = await fetchAnthropicModels(apiKey);
    if (providerKey === "gemini") models = await fetchGeminiModels(apiKey);
    if (providerKey === "openrouter") models = await fetchOpenRouterModels(apiKey);
    if (!models.length) throw new Error("沒有找到可用文字生成模型");
    const savedModel = readLinkedLlmSettings().model;
    const preferredModel = preferredTextModel(providerKey, models, savedModel);
    const statusSuffix = savedModel && models.includes(savedModel)
      ? ""
      : `已套用快速生成預設模型：${preferredModel}。`;
    setModelOptions(models, preferredModel, statusSuffix);
    fillDraftPrompt();
  } catch (error) {
    clearModelOptions(`無法即時載入模型：${friendlyProviderError(error)}`);
  }
}

function scheduleModelLoad() {
  clearTimeout(modelLoadTimer);
  modelLoadTimer = setTimeout(fetchProviderModels, 700);
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

function visualStructureRequirement(typeKey, label) {
  const requirements = {
    "mind-map": [
      "主視覺區必須是「心智圖」，不能改成一般分欄講義、流程圖、循環圖、表格或問答單。",
      "心智圖結構：中央放置主題節點，從中心向外延伸 4 到 6 條放射分支。",
      "每條分支都要有可編輯文字標籤、關鍵詞空格與例子空格。",
      "分支可包含：核心概念、生活例子、關鍵詞、疑問、延伸應用、我的想法。",
      "所有分支線、節點框、圖示與文字標籤都必須分層；若工具支援圖層，必須能單獨選取與移動。"
    ],
    "concept-map": [
      "主視覺區必須是「概念圖」，不能改成心智圖、流程圖或一般分欄講義。",
      "概念圖結構：核心概念在上方或中央，下面安排階層節點，節點之間用連線與連結詞說明關係。",
      "每個節點、連結詞與例子欄都必須是可編輯文字圖層。"
    ],
    fishbone: [
      "主視覺區必須是「魚骨圖」，不能改成心智圖、流程圖或一般分欄講義。",
      "魚骨圖結構：右側或中央有問題主軸，左右斜向骨架分出原因分類，每個原因分類有證據或例子空格。",
      "魚骨線條、分類標籤、原因框與結論框都必須分層可編輯。"
    ],
    flowchart: [
      "主視覺區必須是「流程圖」，不能改成心智圖、循環圖或一般分欄講義。",
      "流程圖結構：用步驟框、箭頭與至少一個判斷點呈現順序或因果。",
      "每個步驟框、箭頭、判斷點與反思欄都必須分層可編輯。"
    ],
    timeline: [
      "主視覺區必須是「時間軸」，不能改成心智圖、流程圖或一般分欄講義。",
      "時間軸結構：一條清楚時間線，安排 4 到 6 個時間節點、事件卡與因果/變化註記。",
      "每個節點、事件卡與註記文字都必須分層可編輯。"
    ],
    cycle: [
      "主視覺區必須是「循環圖」，不能改成心智圖、流程圖或一般分欄講義。",
      "循環圖結構：4 到 6 個循環節點用方向箭頭連成閉合循環，旁邊保留變化說明空格。",
      "每個節點、箭頭、標籤與說明框都必須分層可編輯。"
    ],
    venn: [
      "主視覺區必須是「韋恩圖」，不能改成心智圖、T 字圖或一般分欄講義。",
      "韋恩圖結構：兩個或三個重疊圓，分別標示差異區與共同區，旁邊加入總結句框。",
      "圓形、區域標籤與填答文字都必須分層可編輯。"
    ],
    "t-chart": [
      "主視覺區必須是「T 字圖」，不能改成心智圖、韋恩圖或一般分欄講義。",
      "T 字圖結構：左右雙欄比較，包含欄名、證據列、判斷欄與結論句框。",
      "欄線、欄名、每格文字與結論框都必須分層可編輯。"
    ],
    kwl: [
      "主視覺區必須是「KWL 表」，不能改成心智圖、T 字圖或一般分欄講義。",
      "KWL 表結構：三欄分別為「我已知道 K」「我想知道 W」「我學到了 L」，另可加入下一步問題。",
      "表格線、欄名、提示語與填答格都必須分層可編輯。"
    ],
    "decision-tree": [
      "主視覺區必須是「決策樹」，不能改成心智圖、流程圖或一般分欄講義。",
      "決策樹結構：從一個起點問題分出條件判斷與選項分支，末端有結果比較與理由欄。",
      "每個分支線、條件框、結果框與理由文字都必須分層可編輯。"
    ]
  };
  return (requirements[typeKey] || [
    `主視覺區必須清楚呈現「${label}」結構，不可改成一般分欄講義。`,
    "所有圖表元素與文字都必須分層可編輯。"
  ]).map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function templatePatternRequirement(typeKey, templateName) {
  const patterns = {
    "mind-map": [
      "必須提取「心智圖學習單」範本的主要圖樣：上方標題列與姓名日期框、中央大型主題圓、由中心向外放射的 6 條連線、6 個圓角分支框、底部「我的一句總結」長條填答框。",
      "中央主題節點放在主視覺區正中央；6 個分支框分布在左上、正上、右上、左下、正下、右下，不可改成直式清單或左右兩欄文字。",
      "分支框文字可依主題改為「原因、概念、例子、問題、證據、應用」或更貼合內容的 6 個繁體中文標籤。",
      "放射連線、中心圓、分支框、底部總結框、所有文字都要是可單獨選取與編輯的圖層；若使用圖片生成模型，則需清楚保留這些圖樣。"
    ],
    "concept-map": [
      "必須提取「概念圖學習單」範本的主要圖樣：上方標題列與姓名日期框、上方核心概念框、第二層 3 個概念框、第三層 2 個細節/應用框、節點之間的階層連線、底部一句總結框。",
      "核心概念框位於上方中央，向下連到上位概念、關係詞、例子，再由中間層延伸到細節與應用；不可改成心智圖放射狀或普通段落。",
      "所有節點框、連線、連結詞、例子欄與總結框都要分層可編輯。"
    ],
    fishbone: [
      "必須提取「魚骨圖學習單」範本的主要圖樣：上方標題列與姓名日期框、水平主骨線、右側箭頭與核心問題框、上下成對斜骨、原因分類框、證據框、底部一句總結框。",
      "主骨由左往右指向核心問題；至少 4 組上下斜骨，每組包含上方原因分類與下方證據/例子，不可改成一般條列原因表。",
      "主骨線、箭頭、斜骨、核心問題框、原因框、證據框與文字標籤都要分層可編輯。"
    ],
    flowchart: [
      "必須提取「流程圖學習單」範本的主要圖樣：上方標題列與姓名日期框、橫向排列的 4 個步驟圓角框、步驟間方向箭頭、下方判斷/修正框、底部一句總結框。",
      "四個步驟框必須由左到右用箭頭連接；下方要保留一個判斷或修正區，不可改成一般文字任務欄。",
      "步驟框、箭頭、判斷框、填答線與所有文字都要分層可編輯。"
    ],
    timeline: [
      "必須提取「時間軸學習單」範本的主要圖樣：上方標題列與姓名日期框、中間一條水平時間線、6 個圓形時間節點、上下交錯的事件卡、底部一句總結框。",
      "事件卡必須沿時間線上下交錯排列，形成清楚順序感；不可改成一般表格或段落式講義。",
      "時間線、節點圓、事件卡、事件標籤、因果註記與總結框都要分層可編輯。"
    ],
    kwl: [
      "必須提取「KWL 表學習單」範本的主要圖樣：上方標題列與姓名日期框、四個直欄卡片，欄名依序為 K 已知、W 想知道、L 學到、Next 下一步，每欄內有多條書寫線，底部一句總結框。",
      "四欄必須並排呈現，欄頭使用色塊，欄內保留填答線；不可改成問答清單或兩欄表。",
      "欄框、欄頭色塊、欄名、書寫線與總結框都要分層可編輯。"
    ],
    venn: [
      "必須提取「韋恩圖學習單」範本的主要圖樣：上方標題列與姓名日期框、兩個大型重疊圓、左側 A 特點、右側 B 特點、中間共同點、下方比較後我發現框、底部一句總結框。",
      "重疊圓是主視覺核心，必須保留共同區；不可改成 T 字圖、清單或普通比較表。",
      "兩個圓、區域標籤、共同點文字、比較框與總結框都要分層可編輯。"
    ],
    "t-chart": [
      "必須提取「T 字圖學習單」範本的主要圖樣：上方標題列與姓名日期框、大型外框、中央垂直分隔線、左右欄標題、左右欄多條水平書寫線、底部一句總結框。",
      "左右雙欄必須佔據主視覺區，中央 T 字分隔線清楚；不可改成韋恩圖、心智圖或一般段落。",
      "外框、中央分隔線、欄名、書寫線與總結框都要分層可編輯。"
    ],
    "decision-tree": [
      "必須提取「決策樹學習單」範本的主要圖樣：上方標題列與姓名日期框、上方中央問題框、向下分成選項 A/B 兩個框，再各自分成兩個結果框，共 1 個起點、2 個選項、4 個結果，底部一句總結框。",
      "樹狀分支線必須清楚呈現由上往下的判斷路徑；不可改成流程圖直線步驟或普通選擇題。",
      "問題框、選項框、結果框、分支線、理由欄與總結框都要分層可編輯。"
    ],
    cycle: [
      "必須提取「循環圖學習單」範本的主要圖樣：上方標題列與姓名日期框、5 個圓形循環節點、節點間方向線形成閉合循環、中央大型循環標籤圓、底部一句總結框。",
      "五個節點必須環狀排列並形成閉合回路；不可改成線性流程圖、心智圖或分欄問答。",
      "節點圓、方向線、中央圓、變化說明框、標籤與總結框都要分層可編輯。"
    ]
  };
  return (patterns[typeKey] || [
    `必須提取「${templateName}」範本的主要圖樣，主視覺不可改成一般講義。`,
    "範本中的主要圖形、框線、連線、標籤與填答區都要分層可編輯。"
  ]).map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function visualEffectRequirement(typeKey, label, topic = "主題") {
  if (typeKey === "mind-map") {
    return [
      `必須呈現明顯的心智圖結構圖片效果：中央必須畫出「${topic}」主題圓或主題圖像，非常醒目，向外延伸彩色曲線或粗線分支。`,
      "每個分支末端要像圖片化節點泡泡或圓角卡片，可加入小圖示、簡單插畫或象徵符號，不要只放文字標題。",
      "分支之間要有視覺節奏與留白，整體看起來像一張可視化心智圖海報式學習單，而不是普通文字表格。",
      "學生版分支節點保留空白框、短提示或可繪圖區；教師版在相同節點填入示範關鍵詞、例子或小型示意圖。",
      "不合格情況：只寫出「心智圖」或「水循環心智圖」文字、在主視覺區留下空白或問號、把內容排成右側文字清單、沒有從中心放射出去的線條。以上都必須避免。"
    ].map((item, index) => `${index + 1}. ${item}`).join("\n");
  }
  return [
    `必須呈現明顯的「${label}」圖像化效果，主圖表要像資訊圖或視覺學習單，而不是文字講義。`,
    "使用清楚的圖形、節點、線條、箭頭、圖示與填答框，讓學生一眼看出視覺結構。"
  ].map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function primaryVisualBlueprint(typeKey, topic = "主題") {
  if (typeKey === "mind-map") {
    return `第一優先：先畫出心智圖主圖，文字內容必須放進心智圖節點內。

這段是生成規格，不可原樣印在學習單畫面上。最終畫面只能出現學習單標題、姓名日期、任務短句、節點標籤、填答空格或教師答案。

心智圖主圖必須實際畫出以下元素：
1. 中央大型主題圓或主題圖像：文字為「${topic}」。
2. 六條彩色放射分支線，從中央主題圓向外延伸。
3. 六個圓角節點泡泡，分布在左上、正上、右上、左下、正下、右下。
4. 六個節點泡泡標籤建議為：蒸發、凝結、降水、地表逕流、地下水、生活用水。
5. 學生版：每個節點泡泡內保留空白填答框或小繪圖區。
6. 教師版：每個節點泡泡內填入短答案或示範小圖示，答案必須在泡泡內，不可另外排成清單。

禁止出現在畫面上的文字：
「此處為心智圖主視覺區」、「由設計師繪製」、「以下為節點內容說明」、「設計師請注意」、「節點1」、「節點2」、「示範答案」、「此處填入」。`;
  }
  return `第一優先：先畫出「${topic}」的${typeKey}主視覺結構，再安排短文字與填答區。不可用文字清單取代主圖。`;
}

function visualAcceptanceRequirement(typeKey, topic = "主題") {
  if (typeKey === "mind-map") {
    return [
      `畫面中央必須看得到「${topic}」主題圓或主題圖像，不可以空白、問號或只放標題文字。`,
      "至少要看得到 6 條由中心往外延伸的放射線，線條要連到 6 個節點泡泡或圓角分支框。",
      "6 個分支節點必須環繞中心分布，不能集中成一欄，也不能變成右側條列清單。",
      "每個分支節點至少要有一個短標籤、一個可填寫空格或小圖示位置。",
      "如果主題是水循環，建議 6 個分支標籤使用：蒸發、凝結、降水、逕流、地下水、生活用水。"
    ].map((item, index) => `${index + 1}. ${item}`).join("\n");
  }
  return [
    `主視覺必須在畫面中清楚呈現「${topic}」的${typeKey}圖解，不可只用標題或文字清單代替。`,
    "主圖表必須有可辨識的節點、連線、箭頭、框線或表格結構。"
  ].map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function outputVersionRequirement(version = "student") {
  const requirements = {
    student: [
      "只產生 1 張或 1 頁「學生空白版」學習單。",
      "保留填答線、空白框、可繪圖區與可標註區，不放答案。",
      "心智圖節點泡泡內保留短提示與空白線，讓學生自行填入或繪圖。"
    ],
    teacher: [
      "只產生 1 張或 1 頁「教師解答版」學習單。",
      "使用與學生版完全相同的視覺化版型與主要圖樣。",
      "在相同節點、泡泡、框線或填答區內填入參考答案、示範標註或示範繪圖重點。",
      "答案必須放在圖表節點或填答區內，不可另外排成旁邊或下方文字清單。"
    ]
  };
  return (requirements[version] || requirements.student).map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function outputModeRequirement(mode = "worksheet") {
  if (mode === "svg-structure") {
    return [
      "只輸出 SVG-like 圖片結構版型，不要輸出一般文字講義、長段落教材或純問答單。",
      "畫面必須像可轉成 SVG 的向量資訊圖：背景、標題列、中心節點、放射線、節點泡泡、圖示位置、填答線、檢核框都要清楚可見。",
      "文字只允許短標籤、欄位名稱、節點名稱、極短提示、學生版空白線或教師版短答案。",
      "不要輸出答案清單、設計師備註、圖解說明段落、版面說明文字或 markdown 條列。",
      "若工具支援圖層，請用獨立向量形狀、線條、箭頭、圖示與可編輯文字圖層組成；若是圖片生成模型，請做成乾淨 SVG 風格的圖像結構。",
      "主視覺心智圖必須佔 70% 以上版面，節點與連線是第一優先，文字只作為圖中標籤。"
    ].map((item, index) => `${index + 1}. ${item}`).join("\n");
  }
  return [
    "輸出完整一頁式視覺化學習單。",
    "保留標題、姓名日期、學習任務、主視覺圖表、填答區與檢核區。",
    "主視覺圖仍必須優先於文字內容，不可變成文字型講義。"
  ].map((item, index) => `${index + 1}. ${item}`).join("\n");
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
  const outputModeKey = $("outputMode")?.value || "worksheet";
  return {
    visualTypeKey: visualType.value,
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
    style: selectedOptionOriginalText("style", $("style")?.value || ""),
    ratio: selectedOptionOriginalText("ratio", $("ratio")?.value || ""),
    scaffold: selectedOptionOriginalText("scaffold", $("scaffold")?.value || ""),
    canvaUse: selectedOptionOriginalText("canvaUse", $("canvaUse")?.value || ""),
    outputModeKey,
    outputMode: selectedOptionOriginalText("outputMode", "完整視覺化學習單"),
    template: selectedTemplate?.name || visualType.label,
    promptHint: selectedTemplate?.promptHint || visualType.cue,
    primaryBlueprint: primaryVisualBlueprint(visualType.value, $("topic")?.value.trim() || ""),
    visualStructure: visualStructureRequirement(visualType.value, visualType.label),
    visualEffect: visualEffectRequirement(visualType.value, visualType.label, $("topic")?.value.trim() || ""),
    visualAcceptance: visualAcceptanceRequirement(visualType.value, $("topic")?.value.trim() || ""),
    templatePattern: templatePatternRequirement(visualType.value, selectedTemplate?.name || visualType.label),
    outputModeRequirement: outputModeRequirement(outputModeKey),
    outputVersionRequirement: outputVersionRequirement()
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

function fallbackPrompt(version = "student") {
  const brief = worksheetBrief();
  const versionLabel = version === "teacher" ? "教師解答版" : "學生空白版";
  const versionRequirement = outputVersionRequirement(version);
  return `請建立一份「${brief.topic}」視覺化學習單。

【最優先主視覺藍圖】
${brief.primaryBlueprint}

最重要的輸出規格：
- 以下所有規格只供生成模型理解，不可原樣出現在學習單畫面上；畫面文字只允許：標題、姓名日期、任務短句、圖表節點標籤、填答空格、檢核句、教師版答案。
- 絕對不要把「設計師請注意」「此處為」「以下為」「節點內容說明」「主視覺區」這類提示詞或備註印在學習單中。
- 視覺化構圖是最高優先順序：學習單第一眼必須像「圖解型學習單」，不是文字講義或文件頁。
- 必須先完成主視覺圖，再安排文字；如果主視覺圖沒有成形，整張學習單視為不合格。
- 主視覺圖表必須佔版面最大區域，約 55% 到 70% 的版面；文字只保留短標題、短提示、標籤、填答線與檢核句。
- 若工具支援圖層編輯，再建立「圖層化、可編輯設計」：每個標題、題目、填空線、檢核項目、圖表標籤都必須是獨立物件或獨立文字框。
- 若工具支援圖層編輯，所有文字必須是可點選、可改字、可調整字級與顏色的獨立文字圖層。
- 不要把中文或任何文字烘焙、壓平、合併到圖片裡。
- 圖表、框線、箭頭、圖示、色塊請使用形狀或元素分層製作，文字標籤另外用文字框放置。
- 若工具有模式可選，請使用「文件 / 簡報 / 白板 / 可編輯設計」類型；若使用 Gemini、OpenAI 或其他圖片生成模型，則以完整可列印圖片為目標。
- 若產出工具支援編輯，完成後必須能逐一選取標題、題目、提示語、填空文字與檢核項目並直接修改。

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
輸出形式：${brief.outputMode}
輸出版本：${versionLabel}
輸出形式硬性規格：
${brief.outputModeRequirement}

主視覺結構硬性規格：
${brief.visualStructure}

視覺圖片效果硬性規格：
${brief.visualEffect}

主圖驗收條件：
${brief.visualAcceptance}

所選學習單範本主要圖樣：
${brief.templatePattern}

版本規格：
${versionRequirement}

設計要求：
1. 必須遵守「輸出形式硬性規格」；若輸出形式為「只輸出 SVG 圖片結構」，就只建立向量圖解版型，不要做成文字型講義、段落文件或純問答單。
2. 全文使用繁體中文，不要把標題或欄位翻成英文；若系統自動產生英文，請改寫為繁體中文。
3. 主視覺圖表區必須使用「${brief.visualType}」結構，且必須符合「${brief.template}」的主要圖樣，不能替換成其他圖表或一般文字區塊。
4. 不可只保留學習單題目而忽略範本圖樣；範本主圖樣必須佔版面最大視覺區域。
5. 年段調整：${brief.stageReading}
6. 任務形式：${brief.stageTask}
7. 版面要有明確視覺層次：標題區、任務說明區、主要視覺圖表區、學生填答區、回顧檢核區。
8. 圖像元素必須幫助理解學習內容，包含主題相關小插圖、節點圖示、箭頭、框線或情境圖，不要只做裝飾。
9. 保留足夠留白與書寫框，讓學生可以圈選、標註、填空、畫圖或寫短句。
10. 加入 1 個暖身觀察任務、1 到 2 個核心任務、1 個反思或自我檢核任務；任務文字要短，避免長段落。
11. 使用高對比、易讀字體、整齊對齊、適合列印與投影的配色。
12. 不要放答案，不要出現浮水印，不要出現無關英文裝飾字。
13. 版面不得超過 35% 的連續文字；若內容太多，請轉成圖示、標籤、填答框或短句。

請直接產生符合以上規格的視覺化學習單。`;
}

function fillDraftPrompt() {
  if ($("studentPromptOutput")) $("studentPromptOutput").value = fallbackPrompt("student");
  if ($("teacherPromptOutput")) $("teacherPromptOutput").value = fallbackPrompt("teacher");
  savePromptDraft();
}

function selectedStageLabel() {
  const stage = $("stage");
  return stage?.selectedOptions?.[0]?.textContent?.trim() || "目前年段";
}

function updateStageGenerationCue() {
  const label = selectedStageLabel();
  if ($("stageGenerateBadge")) $("stageGenerateBadge").textContent = `依${label}生成`;
  if ($("stageGenerateCue")) {
    $("stageGenerateCue").textContent = `已套用${label}：學習目標、內容深度與能力描述會跟著調整。`;
  }
}

function pulseStageGenerationCue() {
  ["stageField", "generateLearningFields", "stageGenerateCue"].forEach((id) => {
    const element = $(id);
    if (!element) return;
    element.classList.remove("stage-pulse");
    void element.offsetWidth;
    element.classList.add("stage-pulse");
  });
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

async function callDeepSeekChat(apiKey, model, input) {
  return callOpenAiCompatibleChat("deepseek", apiKey, model, input);
}

async function callOpenAiCompatibleChat(providerKey, apiKey, model, input) {
  const provider = llmProviders[providerKey];
  const body = { model, messages: [{ role: "user", content: input }] };
  if (providerKey === "minimax") body.thinking = { type: "disabled" };

  const response = await fetch(provider.chatEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...openAiCompatibleHeaders(providerKey, apiKey)
    },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || data.message || `${provider.label} request failed: ${response.status}`);
  return data.choices?.[0]?.message?.content || "";
}

async function callMiniMaxChat(apiKey, model, input) {
  return callOpenAiCompatibleChat("minimax", apiKey, model, input);
}

async function callGlmChat(apiKey, model, input) {
  return callOpenAiCompatibleChat("glm", apiKey, model, input);
}

async function callPromptProvider(input) {
  const providerKey = selectedProviderKey();
  const apiKey = $("apiKey")?.value.trim();
  const model = $("modelName")?.value;
  if (!apiKey) return "";
  if (!model) throw new Error("請先等待模型清單載入並選擇模型");
  if (providerKey === "openai") return responseText(await callOpenAiResponses(apiKey, model, input));
  if (providerKey === "deepseek") return callDeepSeekChat(apiKey, model, input);
  if (providerKey === "minimax") return callMiniMaxChat(apiKey, model, input);
  if (providerKey === "glm") return callGlmChat(apiKey, model, input);
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
  updateStageGenerationCue();
  pulseStageGenerationCue();
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
    status.textContent = `API 無法完成，已用本機規則產出。原因：${friendlyProviderError(error)}`;
  }
}

function withTimeout(promise, timeoutMs, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(message)), timeoutMs);
    })
  ]);
}

async function generatePrompt() {
  const generateButton = $("generatePrompt");
  $("promptStatus").textContent = "提示詞產生中...";
  if (generateButton) generateButton.disabled = true;
  const promptInstruction = (sourcePrompt) => `你是資深教材視覺設計師。請根據以下資料，輸出一段可交給設計工具或圖片生成模型使用的高品質繁體中文提示詞。只輸出提示詞，不要解釋。

硬性規則：
- 不要出現「Canva Edu Design」字樣。
- 不要把提示詞規格改寫成會出現在畫面上的設計師備註；禁止輸出「此處為」「由設計師繪製」「以下為節點內容說明」「設計師請注意」。
- 必須保留「最優先主視覺藍圖」，且放在輸出提示詞前段，不可刪除或摘要成一句話。
- 必須把「視覺化構圖」放在第一優先，避免產生文字型講義。
- 必須要求主視覺圖表佔 55% 到 70% 版面，文字不得主導版面。
- 若用於支援圖層的設計工具，必須明確要求建立「圖層化可編輯設計」、可編輯文字圖層、分層形狀元素。
- 若用於 Gemini、OpenAI 或其他圖片生成模型，必須保留版型結構與繁體中文可讀性，但不要要求模型提供不可行的圖層檔。
- 必須要求全文繁體中文，避免英文標題與英文欄位。
- 必須要求文字不要被壓平到圖片或背景中。
- 必須保留「輸出形式硬性規格」；若指定只輸出 SVG 圖片結構，就不得產生文字講義、長段落、答案清單或設計師備註。
- 必須保留「主視覺結構硬性規格」；若指定心智圖，就必須明確寫出中央主題節點與放射分支，不可改成一般學習單。
- 必須保留「視覺圖片效果硬性規格」；若指定心智圖，就必須明確要求心智圖結構圖片效果、彩色分支線、節點泡泡、圖示與留白。
- 必須保留「主圖驗收條件」；若指定心智圖，必須要求中心主題圓、6 條放射線、6 個節點泡泡都實際出現在畫面中，不能只寫文字標題。
- 必須保留「所選學習單範本主要圖樣」；不能只產生泛用學習單，必須要求提取範本內的主要圖形、框線、節點、連線與填答區。

${sourcePrompt}`;

  const studentFallback = fallbackPrompt("student");
  const teacherFallback = fallbackPrompt("teacher");
  const timeoutMs = promptTimeoutMsForProvider();

  try {
    const [studentPrompt, teacherPrompt] = await withTimeout(
      Promise.all([
        callPromptProvider(promptInstruction(studentFallback)),
        callPromptProvider(promptInstruction(teacherFallback))
      ]),
      timeoutMs,
      `API 等待超過 ${Math.round(timeoutMs / 1000)} 秒`
    );
    if ($("studentPromptOutput")) $("studentPromptOutput").value = studentPrompt || studentFallback;
    if ($("teacherPromptOutput")) $("teacherPromptOutput").value = teacherPrompt || teacherFallback;
    savePromptDraft();
    $("promptStatus").textContent = "產生成功：學生版與教師版提示詞已分別產生。";
  } catch (error) {
    if ($("studentPromptOutput")) $("studentPromptOutput").value = studentFallback;
    if ($("teacherPromptOutput")) $("teacherPromptOutput").value = teacherFallback;
    savePromptDraft();
    $("promptStatus").textContent = promptFailureAdvice(error);
  } finally {
    if (generateButton) generateButton.disabled = false;
  }
}

async function copyPrompt(event) {
  const button = event?.currentTarget;
  const targetId = button?.dataset?.target || "studentPromptOutput";
  const prompt = $(targetId)?.value.trim() || (page === "draw" ? "" : fallbackPrompt());
  if (!prompt) {
    const status = $("promptStatus") || $("drawStatus");
    if (status) status.textContent = "目前沒有提示詞可複製。";
    return;
  }
  try {
    await navigator.clipboard.writeText(prompt);
    savePromptDraft(targetId === "studentPromptOutput" ? prompt : undefined);
    const status = $("promptStatus") || $("drawStatus");
    if (status) status.textContent = "提示詞已複製。";
    animateCopyButton(button, "已複製");
  } catch (error) {
    $(targetId)?.focus();
    $(targetId)?.select();
    const status = $("promptStatus") || $("drawStatus");
    if (status) status.textContent = "瀏覽器未允許剪貼簿，已選取提示詞。";
    animateCopyButton(button, "已選取");
  }
}

function animateCopyButton(button, label) {
  if (!button) return;
  const originalText = button.dataset.originalText || button.textContent;
  button.dataset.originalText = originalText;
  button.textContent = label;
  button.classList.remove("copy-feedback");
  void button.offsetWidth;
  button.classList.add("copy-feedback");

  window.clearTimeout(button.copyFeedbackTimer);
  button.copyFeedbackTimer = window.setTimeout(() => {
    button.classList.remove("copy-feedback");
    button.textContent = originalText;
  }, 1500);
}

function savePromptFile() {
  const prompt = [
    "【學生版提示詞】",
    $("studentPromptOutput")?.value.trim() || fallbackPrompt("student"),
    "",
    "【教師版提示詞】",
    $("teacherPromptOutput")?.value.trim() || fallbackPrompt("teacher")
  ].join("\n");
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

function xmlEscape(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mindMapSvg(version = "student") {
  const brief = worksheetBrief();
  const topic = xmlEscape(brief.topic || "水循環與日常生活");
  const isTeacher = version === "teacher";
  const titleSuffix = isTeacher ? "教師解答版" : "學生空白版";
  const nodes = [
    { label: "蒸發", answer: "太陽加熱，水變成水蒸氣", x: 300, y: 260 },
    { label: "凝結", answer: "水蒸氣遇冷，形成雲", x: 600, y: 210 },
    { label: "降水", answer: "雲中的水落下，形成雨", x: 900, y: 260 },
    { label: "地表逕流", answer: "雨水沿地面流向河川", x: 330, y: 540 },
    { label: "地下水", answer: "水滲入土壤，儲存在地下", x: 600, y: 600 },
    { label: "生活用水", answer: "喝水、洗手、澆花都會用到水", x: 870, y: 540 }
  ];
  const lines = nodes.map((node) => `<path d="M600 390 L${node.x} ${node.y}" stroke="#246bfe" stroke-width="6" stroke-linecap="round" fill="none"/>`).join("");
  const boxes = nodes.map((node) => {
    const text = isTeacher
      ? `<text x="${node.x}" y="${node.y - 4}" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="#0f766e" text-anchor="middle">${xmlEscape(node.label)}</text>
         <text x="${node.x}" y="${node.y + 24}" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">${xmlEscape(node.answer)}</text>`
      : `<text x="${node.x}" y="${node.y - 8}" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#0f766e" text-anchor="middle">${xmlEscape(node.label)}</text>
         <path d="M${node.x - 58} ${node.y + 22} L${node.x + 58} ${node.y + 22}" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>`;
    return `<rect x="${node.x - 96}" y="${node.y - 42}" width="192" height="88" rx="20" fill="#fff" stroke="#cbd5e1" stroke-width="3"/>${text}`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 850">
<rect width="1200" height="850" fill="#ffffff"/>
<rect x="0" y="0" width="1200" height="120" fill="#eef4ff"/>
<rect x="52" y="38" width="18" height="52" rx="9" fill="#246bfe"/>
<text x="92" y="72" font-family="Arial, sans-serif" font-size="34" font-weight="800" fill="#1f2933">水循環與日常生活 心智圖學習單</text>
<text x="92" y="104" font-family="Arial, sans-serif" font-size="19" font-weight="700" fill="#64748b">${xmlEscape(brief.stage)}｜${xmlEscape(brief.subject)}｜${titleSuffix}</text>
<rect x="930" y="34" width="218" height="58" rx="12" fill="#fff" stroke="#d7dee8" stroke-width="2"/>
<text x="956" y="72" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#475569">姓名：      日期：</text>
${lines}
<circle cx="600" cy="390" r="92" fill="#246bfe"/>
<text x="600" y="382" font-family="Arial, sans-serif" font-size="28" font-weight="800" fill="#fff" text-anchor="middle">${topic}</text>
<text x="600" y="418" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#dbeafe" text-anchor="middle">水怎麼移動？</text>
${boxes}
<rect x="52" y="744" width="1096" height="68" rx="12" fill="#f8fafc" stroke="#d7dee8" stroke-width="2"/>
<text x="78" y="785" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="#246bfe">我的一句總結：</text>
<path d="M245 780 L1090 780" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
</svg>`;
}

function downloadMindMapSvg(version) {
  const svg = mindMapSvg(version);
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  window.open(objectUrl, "_blank", "noopener,noreferrer");
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `water-cycle-mind-map-${version === "teacher" ? "teacher" : "student"}.svg`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
  $("promptStatus").textContent = version === "teacher" ? "已下載並開啟教師版心智圖 SVG 預覽。" : "已下載並開啟學生版心智圖 SVG 預覽。";
}

function imageLayoutFromPrompt(prompt) {
  if (/16:9|橫式|投影片/i.test(prompt)) {
    return {
      openaiSize: "1536x1024",
      geminiRatio: "16:9",
      minimaxRatio: "16:9",
      glmSize: "1728x960"
    };
  }
  if (/方形|1:1|square/i.test(prompt)) {
    return {
      openaiSize: "1024x1024",
      geminiRatio: "1:1",
      minimaxRatio: "1:1",
      glmSize: "1280x1280"
    };
  }
  return {
    openaiSize: "1024x1536",
    geminiRatio: "3:4",
    minimaxRatio: "3:4",
    glmSize: "1088x1472"
  };
}

function imagePromptForProvider(prompt) {
  return `${prompt}

請輸出一張完整可列印的視覺化學習單圖片。繁體中文文字要清楚可讀，版面包含標題、主要圖表、學生填答區與反思區，不要加浮水印。`;
}

function findBase64Image(value) {
  if (!value || typeof value !== "object") return "";
  if (typeof value.data === "string" && /^image\//.test(value.mime_type || value.mimeType || "")) return value.data;
  if (typeof value.output_image?.data === "string") return value.output_image.data;
  if (typeof value.image?.data === "string") return value.image.data;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findBase64Image(item);
      if (found) return found;
    }
    return "";
  }
  for (const item of Object.values(value)) {
    const found = findBase64Image(item);
    if (found) return found;
  }
  return "";
}

async function callOpenAiImage(apiKey, imageModel, prompt) {
  const layout = imageLayoutFromPrompt(prompt);
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: imageModel,
      prompt: imagePromptForProvider(prompt),
      size: layout.openaiSize,
      quality: "medium",
      output_format: "png",
      background: "opaque"
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `OpenAI image request failed: ${response.status}`);
  const image = data.data?.[0] || {};
  if (image.b64_json) return { src: `data:image/png;base64,${image.b64_json}` };
  if (image.url) return { src: image.url };
  throw new Error("OpenAI 回應中沒有圖片資料");
}

async function callGeminiImage(apiKey, imageModel, prompt) {
  const layout = imageLayoutFromPrompt(prompt);
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      model: imageModel,
      input: imagePromptForProvider(prompt),
      response_format: {
        type: "image",
        mime_type: "image/png",
        aspect_ratio: layout.geminiRatio,
        image_size: "1K"
      }
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Gemini image request failed: ${response.status}`);
  const image = findBase64Image(data);
  if (image) return { src: `data:image/png;base64,${image}` };
  throw new Error("Gemini 回應中沒有圖片資料");
}

async function callMiniMaxImage(apiKey, imageModel, prompt) {
  const layout = imageLayoutFromPrompt(prompt);
  const response = await fetch("https://api.minimax.io/v1/image_generation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: imageModel,
      prompt: imagePromptForProvider(prompt),
      aspect_ratio: layout.minimaxRatio,
      response_format: "base64"
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || data.base_resp?.status_msg || `MiniMax image request failed: ${response.status}`);
  const imageBase64 = data.data?.image_base64?.[0];
  const imageUrl = data.data?.image_urls?.[0];
  if (imageBase64) return { src: `data:image/jpeg;base64,${imageBase64}` };
  if (imageUrl) return { src: imageUrl };
  throw new Error(data.base_resp?.status_msg || "MiniMax 回應中沒有圖片資料");
}

async function callGlmImage(apiKey, imageModel, prompt) {
  const layout = imageLayoutFromPrompt(prompt);
  const response = await fetch("https://api.z.ai/api/paas/v4/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...zAiHeaders(apiKey)
    },
    body: JSON.stringify({
      model: imageModel,
      prompt: imagePromptForProvider(prompt),
      size: layout.glmSize
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || data.message || `GLM image request failed: ${response.status}`);
  const imageUrl = data.data?.[0]?.url;
  if (imageUrl) return { src: imageUrl };
  throw new Error("GLM / Z.AI 回應中沒有圖片資料");
}

async function callProviderImage(providerKey, apiKey, imageModel, prompt) {
  if (providerKey === "openai") return callOpenAiImage(apiKey, imageModel, prompt);
  if (providerKey === "gemini") return callGeminiImage(apiKey, imageModel, prompt);
  if (providerKey === "minimax") return callMiniMaxImage(apiKey, imageModel, prompt);
  if (providerKey === "glm") return callGlmImage(apiKey, imageModel, prompt);
  throw new Error(`${selectedProvider().label} 目前沒有原生繪圖模型`);
}

async function generateImage() {
  const providerKey = selectedProviderKey();
  const imageProvider = imageGenerationProviders[providerKey];
  const key = $("apiKey").value.trim();
  const imageModel = $("imageModelName")?.value || imageProvider?.defaultModel || "";
  const prompt = ($("promptOutput")?.value || $("studentPromptOutput")?.value || "").trim();
  const status = $("drawStatus");
  if (!imageProvider) {
    status.textContent = imageGenerationStatusForProvider(providerKey);
    return;
  }
  if (!key || !prompt) {
    status.textContent = `請先確認 ${selectedProvider().label} API key 與圖片提示詞。`;
    return;
  }
  if (!imageModel) {
    status.textContent = "請先選擇對應的繪圖模型。";
    return;
  }

  status.textContent = `${imageProvider.label} 圖片生成中...`;
  try {
    const image = await callProviderImage(providerKey, key, imageModel, prompt);
    $("resultImage").src = image.src;
    status.textContent = `${imageProvider.label} 生成完成。建議存入 ${remoteDirs.canvaDesign}`;
  } catch (error) {
    status.textContent = `無法生成圖片：${friendlyProviderError(error)}`;
  }
}

function selectedDrawPrompt() {
  return ($("promptOutput")?.value || $("studentPromptOutput")?.value || "").trim();
}

function openTool(url) {
  const prompt = selectedDrawPrompt();
  if (prompt) savePromptDraft(prompt);
  if (prompt) navigator.clipboard.writeText(prompt).catch(() => {});
  window.open(url, "_blank", "noopener,noreferrer");
  $("drawStatus").textContent = prompt ? "已複製學生版提示詞並開啟工具。" : "已開啟工具。";
}

function initGenerateWorksheetPage() {
  const prompts = readPromptDrafts();
  if ($("promptOutput")) {
    $("promptOutput").value = prompts.student;
    $("promptOutput").addEventListener("input", () => savePromptDraft());
  }
  if ($("studentPromptOutput")) {
    $("studentPromptOutput").value = prompts.student;
    $("studentPromptOutput").addEventListener("input", () => savePromptDraft());
  }
  if ($("teacherPromptOutput")) {
    $("teacherPromptOutput").value = prompts.teacher;
    $("teacherPromptOutput").addEventListener("input", () => savePromptDraft());
  }
  if ($("drawStatus")) {
    $("drawStatus").textContent = prompts.student || prompts.teacher ? "已自動帶入產生提示詞頁的內容。" : "尚未找到提示詞內容，請先到產生提示詞頁建立，或直接貼上。";
  }

  $("copyPrompt")?.addEventListener("click", (event) => copyPrompt(event));
  $("copyStudentPrompt")?.addEventListener("click", (event) => copyPrompt(event));
  $("copyTeacherPrompt")?.addEventListener("click", (event) => copyPrompt(event));
  $("openCanvaEdu").addEventListener("click", () => openTool("https://www.canva.com/ai-assistant/"));
  $("openGeminiImage").addEventListener("click", () => openTool("https://gemini.google.com/app"));
  $("openOpenAiImage").addEventListener("click", () => openTool("https://chatgpt.com/images/"));
}

function initTemplatesPage() {
  renderTemplatesGrid();
}

function initPromptPage() {
  selectTemplateFromQuery();
  if ($("worksheetFamily")) $("worksheetFamily").value = selectedTemplate?.family || "relation";
  applyLinkedLlmSettings();
  updateProviderUi();
  protectApiKeyInput();
  if ($("modelStatus")) $("modelStatus").textContent = keyProtectionNotice;
  renderVisualTypes();
  fillDraftPrompt();
  if ($("apiKey").value.trim()) fetchProviderModels();
  updateStageGenerationCue();
  window.setTimeout(pulseStageGenerationCue, 300);

  $("llmProvider").addEventListener("change", () => {
    saveLinkedLlmSettings();
    updateProviderUi();
    fetchProviderModels();
    fillDraftPrompt();
  });
  $("apiKey").addEventListener("input", () => {
    saveLinkedLlmSettings();
    scheduleModelLoad();
  });
  $("apiKey").addEventListener("change", () => {
    saveLinkedLlmSettings();
    fetchProviderModels();
  });
  $("clearApiKey")?.addEventListener("click", () => clearApiKeyField("API key 已從欄位清除。"));
  $("reloadModels").addEventListener("click", fetchProviderModels);
  $("modelName").addEventListener("change", () => {
    saveLinkedLlmSettings();
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
  $("copyStudentPrompt")?.addEventListener("click", (event) => copyPrompt(event));
  $("copyTeacherPrompt")?.addEventListener("click", (event) => copyPrompt(event));
  document.querySelectorAll(".copy-split").forEach((button) => {
    button.addEventListener("click", (event) => copyPrompt(event));
  });
  $("savePrompt").addEventListener("click", savePromptFile);
  $("downloadStudentMindMap")?.addEventListener("click", () => downloadMindMapSvg("student"));
  $("downloadTeacherMindMap")?.addEventListener("click", () => downloadMindMapSvg("teacher"));
  $("studentPromptOutput")?.addEventListener("input", () => savePromptDraft());
  $("teacherPromptOutput")?.addEventListener("input", () => savePromptDraft());
  $("stage").addEventListener("change", () => {
    updateStageGenerationCue();
    pulseStageGenerationCue();
  });
  ["stage", "subject", "topic", "goal", "learningContent", "learningAbility", "style", "ratio", "scaffold", "canvaUse", "outputMode"].forEach((id) => {
    $(id)?.addEventListener("input", fillDraftPrompt);
    $(id)?.addEventListener("change", fillDraftPrompt);
  });
}

function initDrawPage() {
  applyLinkedLlmSettings();
  updateDrawProviderUi();
  clearModelOptions(`貼上 ${selectedProvider().label} API key 後會自動載入模型。`);
  if ($("drawStatus")) $("drawStatus").textContent = imageGenerationStatusForProvider();
  if ($("apiKey").value.trim()) fetchProviderModels();

  $("apiKey").addEventListener("input", () => {
    saveLinkedLlmSettings();
    scheduleModelLoad();
  });
  $("apiKey").addEventListener("change", () => {
    saveLinkedLlmSettings();
    fetchProviderModels();
  });
  $("reloadModels").addEventListener("click", fetchProviderModels);
  $("modelName").addEventListener("change", () => {
    saveLinkedLlmSettings();
  });
  $("generateImage").addEventListener("click", generateImage);
  $("copyPrompt").addEventListener("click", (event) => copyPrompt(event));
  $("openChatGPT").addEventListener("click", () => openTool("https://chatgpt.com/"));
  $("openCanva").addEventListener("click", () => openTool("https://www.canva.com/ai-image-generator/"));
  $("openFirefly").addEventListener("click", () => openTool("https://firefly.adobe.com/"));
}

const page = document.body.dataset.page;
renderLanguageSwitcher();
if (page === "templates") initTemplatesPage();
if (page === "prompt") initPromptPage();
if (page === "draw") initGenerateWorksheetPage();
observeLanguageMutations();
applyLanguageToPage();
