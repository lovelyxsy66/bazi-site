const palaceAngles = {
  命宫: ["自我定位", "一个人最自然的气质、决策方式和人生主轴。"],
  兄弟: ["同辈关系", "手足、同学、朋友与同辈资源的互动方式。"],
  夫妻: ["亲密关系", "伴侣期待、相处模式、婚恋里的安全感来源。"],
  子女: ["后续成果", "子女缘分，也可看长期作品、传承和未来结果。"],
  财帛: ["金钱模式", "赚钱方式、消费习惯、资源掌控与风险偏好。"],
  疾厄: ["健康状态", "身体敏感点、压力表达和需要保养的生活习惯。"],
  迁移: ["外部世界", "外地发展、出行、公众形象和环境适配能力。"],
  仆役: ["合作人脉", "朋友、团队、客户、下属与社群关系。"],
  官禄: ["事业方向", "职业选择、工作风格、长期成就和社会角色。"],
  田宅: ["家庭资产", "居住环境、家庭底色、不动产和内在安全感。"],
  福德: ["精神能量", "快乐来源、审美、休息方式和内心消耗。"],
  父母: ["原生支持", "长辈缘、规则来源、教育背景和外部庇护。"],
};

const palaceProfiles = {
  命宫: {
    role: "命宫像整张盘的主控台，显示你面对世界时最先启动的性格按钮。",
    life: "它不只谈个性，还牵动职业选择、关系姿态、危机反应和自我评价方式。",
    advice: "看命宫时要特别注意主星是否过强或过弱，强处是天赋，过度处就是反复出现的课题。",
  },
  兄弟: {
    role: "兄弟宫看同辈、同学、手足、合伙人，也看你如何在平级关系里分配资源。",
    life: "这个宫位强时，许多机会来自熟人圈层；弱时，则要把边界和利益规则提前讲清。",
    advice: "判断兄弟宫要同时看情分、信息、人脉、利益分配和共同承担的能力。",
  },
  夫妻: {
    role: "夫妻宫看亲密关系的期待、承诺方式、磨合节奏，也看你会被怎样的人吸引。",
    life: "它呈现早婚晚婚之外的亲密机制：安全感、自由度、责任分配和冲突修复方式。",
    advice: "夫妻宫的重点在于关系里的相处机制：谁主动、谁退让、冲突如何修复、长期如何共建。",
  },
  子女: {
    role: "子女宫看子女缘分，也看作品、传承、长期项目和你对未来成果的投注方式。",
    life: "它常常显示一个人对创造、养育、教育、表达和结果沉淀的态度。",
    advice: "这个宫位把子女缘、作品、长期产出一起看，重点是如何把想法变成可延续的结果。",
  },
  财帛: {
    role: "财帛宫看赚钱方式、花钱习惯、现金流安全感和面对风险时的本能反应。",
    life: "它关注财富总量背后的获取路径：专业、资源、交易、管理、创意与现金流结构。",
    advice: "财帛宫要和官禄宫、田宅宫一起看，才能判断收入来源、积累方式和资产稳定性。",
  },
  疾厄: {
    role: "疾厄宫看身体敏感点、压力出口、生活节律，也看情绪如何在身体上留下痕迹。",
    life: "它作为生活节律提示，指出哪些模式容易透支，哪些节奏更适合长期维持。",
    advice: "看疾厄宫时，重点放在睡眠、运动、饮食和心理恢复的长期秩序。",
  },
  迁移: {
    role: "迁移宫看外地、出行、公开场合、社交曝光，也看你离开熟悉环境后的适应力。",
    life: "它强时，机会往往在外部世界打开；弱时，也可能表示需要先建立清晰定位再向外扩张。",
    advice: "迁移宫适合和命宫对照：命宫是内在本性，迁移宫是别人最容易看见的外在表现。",
  },
  仆役: {
    role: "仆役宫看朋友、团队、客户、下属、社群，也看你在合作网络中的位置。",
    life: "它能提示贵人是否来自圈层、合作是否稳定，以及你容易吸引怎样的伙伴或观众。",
    advice: "仆役宫的核心是筛选机制：哪些人能共事，哪些关系只适合浅交，哪些合作要写清规则。",
  },
  官禄: {
    role: "官禄宫看事业方向、工作风格、职位责任、专业声誉和社会角色。",
    life: "它看升职之外的事业结构：你在哪种体系、节奏和任务结构里更容易成事。",
    advice: "官禄宫要与命宫、财帛宫互参：命宫给动力，官禄给舞台，财帛决定成果能否变现。",
  },
  田宅: {
    role: "田宅宫看居住环境、家庭底色、不动产、空间感，也看一个人内在的安全基地。",
    life: "它强时，容易重视稳定、资产、家族资源或空间经营；弱时，则要主动建立可依靠的基础。",
    advice: "田宅宫不只谈买房，还谈你是否能把生活安排成可恢复、可积累、可长期发展的状态。",
  },
  福德: {
    role: "福德宫看精神能量、快乐来源、审美趣味、休息方式和内心消耗。",
    life: "它决定你是否容易快乐，也决定在无人要求你表现时，你真实想把时间交给什么。",
    advice: "福德宫弱时，更需要主动安排独处、审美、信念和情绪回收的空间。",
  },
  父母: {
    role: "父母宫看长辈缘、教育背景、制度资源、外部庇护，也看你如何面对权威。",
    life: "它不只代表父母本人，也代表老师、上司、官方流程、资格认证和社会规则。",
    advice: "父母宫要看支持与压力并存的方式：有些盘得长辈助力，有些盘则在脱离旧规则后更能展开。",
  },
};

const starTraits = {
  紫微: "主领导、统筹和自尊，适合承担核心角色，但要避免把所有事都压在自己身上。",
  天机: "主思考、变化和策划，擅长发现路径，但要避免想太多、定不下来。",
  太阳: "主表达、照亮和责任，适合公开展示与服务他人，但要注意过度消耗。",
  武曲: "主财务、执行和决断，适合专业化、标准化领域，但表达容易偏硬。",
  天同: "主福气、舒适和人缘，重视生活品质，但需要练习承担和推进。",
  廉贞: "主魅力、规则和欲望，适合艺术、管理和复杂关系，但要管住情绪拉扯。",
  天府: "主稳定、资源和承载，适合管理与积累，但不要过度保守。",
  太阴: "主细腻、审美和积蓄，适合内容、照顾与资产经营，但容易想得太深。",
  贪狼: "主社交、欲望和才艺，适合商业与传播，但要避免贪多分散。",
  巨门: "主口才、质疑和辨析，适合咨询、教育、法律、媒体，但要少卷入口舌。",
  天相: "主协调、规则和辅佐，适合制度平台与合作岗位，但要避免过度迎合。",
  天梁: "主庇护、原则和长辈缘，适合医疗、教育、公益、顾问，但容易显老成。",
  七杀: "主开创、竞争和突破，适合挑战型领域，但需要稳定节奏来降风险。",
  破军: "主变革、破旧立新和消耗，适合创新和重组，但不要为了改变而改变。",
};

const starFamilies = {
  帝座: ["紫微", "天府", "天相", "天梁"],
  机月同梁: ["天机", "太阴", "天同", "天梁"],
  杀破狼: ["七杀", "破军", "贪狼"],
  财务执行: ["武曲", "天府", "太阴"],
  表达关系: ["太阳", "巨门", "廉贞", "贪狼"],
};

const form = document.querySelector("#ziwei-form");
const profileSelect = document.querySelector("#ziwei-profile-select");
const saveProfileButton = document.querySelector("#ziwei-save-profile");
const profileStatus = document.querySelector("#ziwei-profile-status");
const summary = document.querySelector("#ziwei-summary");
const board = document.querySelector("#ziwei-board");
const detail = document.querySelector("#ziwei-detail");
const analysis = document.querySelector("#ziwei-analysis");

const palaceGridPos = {
  巳: [1, 1], 午: [1, 2], 未: [1, 3], 申: [1, 4],
  辰: [2, 1], 酉: [2, 4],
  卯: [3, 1], 戌: [3, 4],
  寅: [4, 1], 丑: [4, 2], 子: [4, 3], 亥: [4, 4],
};
const clockwiseBranches = ["巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰"];
const annualBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

let activeChart = null;
let resizeTimer = null;

setupProfiles();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const profile = BaziProfiles.readForm(form);
    const chart = buildZiweiChart(profile);
    renderZiwei(chart, profile);
  } catch (error) {
    summary.innerHTML = "";
    board.innerHTML = "";
    analysis.innerHTML = `<article class="deep-card highlight-card"><h2>暂时无法排盘</h2><p>${escapeHtml(error.message)}</p></article>`;
  }
});

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const selected = board?.querySelector(".ziwei-palace.is-selected");
    if (!activeChart || !selected) return;
    const palace = activeChart.palaces[Number(selected.dataset.palaceIndex)];
    const selectedStar = board.querySelector(".star-badge.is-selected")?.dataset.star;
    updateSelection(activeChart, palace, selectedStar);
  }, 120);
});

function setupProfiles() {
  if (!window.BaziProfiles) return;
  const refresh = () => BaziProfiles.renderSelect(profileSelect);
  refresh();
  window.addEventListener("pageshow", refresh);
  window.addEventListener("bazi:profiles-updated", refresh);
  window.addEventListener("storage", (event) => {
    if (event.key === BaziProfiles.storageKey) refresh();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refresh();
  });

  profileSelect?.addEventListener("change", () => {
    const profile = BaziProfiles.findProfile(profileSelect.value);
    if (!profile) return;
    BaziProfiles.fillForm(form, profile);
    setStatus(`已载入 ${profile.name} 的生日档案。`);
  });

  saveProfileButton?.addEventListener("click", () => {
    try {
      const saved = BaziProfiles.saveProfile(BaziProfiles.readForm(form));
      refresh();
      profileSelect.value = saved.id;
      setStatus(`已保存 ${saved.name} 的生日档案。`);
    } catch (error) {
      setStatus(error.message);
    }
  });
}

function buildZiweiChart(profile) {
  if (!window.iztro?.astro) {
    throw new Error("紫微排盘库尚未加载完成，请刷新页面后再试。");
  }
  if (!profile.date) {
    throw new Error("请先填写出生日期。");
  }
  const [year, month, day] = profile.date.split("-").map(Number);
  const [hour] = (profile.time || "12:00").split(":").map(Number);
  const timeIndex = hourToTimeIndex(hour);
  const gender = profile.gender === "女" ? "女" : "男";
  const astrolabe = iztro.astro.bySolar(`${year}-${month}-${day}`, timeIndex, gender, true, "zh-CN");
  return normalizeAstrolabe(astrolabe, profile, timeIndex);
}

function normalizeAstrolabe(astrolabe, profile, timeIndex) {
  const palaces = astrolabe.palaces.map((palace) => {
    const majorStars = palace.majorStars || [];
    const minorStars = palace.minorStars || [];
    const adjectiveStars = palace.adjectiveStars || [];
    return {
      name: palace.name,
      branch: palace.earthlyBranch,
      stem: palace.heavenlyStem,
      isBodyPalace: Boolean(palace.isBodyPalace),
      decadal: palace.decadal?.range,
      majorStars: majorStars.map(formatStar),
      minorStars: minorStars.slice(0, 5).map(formatStar),
      adjectiveStars: adjectiveStars.slice(0, 4).map(formatStar),
    };
  });

  return {
    profile,
    palaces,
    timeIndex,
    soulPalace: astrolabe.earthlyBranchOfSoulPalace,
    bodyPalace: astrolabe.earthlyBranchOfBodyPalace,
    fiveElementsClass: astrolabe.fiveElementsClass,
    zodiac: astrolabe.zodiac,
    lunarDate: astrolabe.lunarDate,
    solarDate: astrolabe.solarDate,
  };
}

function renderZiwei(chart, profile) {
  activeChart = chart;
  const ming = chart.palaces.find((item) => item.name === "命宫") || chart.palaces[0];
  const body = chart.palaces.find((item) => item.isBodyPalace);
  const spouse = chart.palaces.find((item) => item.name === "夫妻");
  const career = chart.palaces.find((item) => item.name === "官禄");
  const wealth = chart.palaces.find((item) => item.name === "财帛");
  const mainStars = ming.majorStars.map((star) => star.name).join("、") || "无主星";

  localStorage.setItem("bazi:lastZiwei", JSON.stringify({ chart, profile, savedAt: Date.now() }));

  summary.innerHTML = `
    <article class="panel compat-overview">
      <div>
        <p class="eyebrow">紫微斗数命盘概要</p>
        <h2>${escapeHtml(profile.name || "命主")} · 命宫${escapeHtml(mainStars)}</h2>
        <p>${escapeHtml(profile.date)} ${escapeHtml(profile.time || "12:00")} · ${escapeHtml(profile.location || "未填写地点")}。命宫以${escapeHtml(mainStars)}为核心，身宫落在${escapeHtml(body?.name || "未标注")}，五行局为${escapeHtml(chart.fiveElementsClass || "未标注")}。</p>
      </div>
      <div class="compat-score" style="--score-color:#8b6410">
        <strong>${ming.majorStars.length || 0}</strong>
        <span>命宫主星</span>
      </div>
    </article>
  `;

  board.innerHTML = chart.palaces
    .map((palace, index) => {
      const [row, column] = palaceGridPos[palace.branch] || [1, 1];
      const major = palace.majorStars.map((star) => starBadge(star, index)).join("") || `<span class="star-badge empty-star">借对宫</span>`;
      const minor = palace.minorStars.map((star) => `<span>${escapeHtml(star.name)}</span>`).join("");
      return `
        <article class="ziwei-palace${palace.name === "命宫" ? " is-ming" : ""}${palace.isBodyPalace ? " is-body" : ""}" data-palace-index="${index}" data-branch="${escapeHtml(palace.branch || "")}" style="grid-row:${row}; grid-column:${column};">
          <div class="palace-head">
            <strong>${escapeHtml(palace.name)}</strong>
            <span>${escapeHtml(palace.branch || "")}</span>
          </div>
          <div class="major-stars">${major}</div>
          <div class="minor-stars">${minor}</div>
          <small>${palace.decadal ? `${palace.decadal[0]}-${palace.decadal[1]}岁` : "大限未标注"}</small>
        </article>
      `;
    })
    .join("");

  board.insertAdjacentHTML(
    "beforeend",
    `<div class="ziwei-center" aria-hidden="true">
      <span>紫微命盘</span>
      <strong>${escapeHtml(profile.name || "命主")}</strong>
      <small>命宫 ${escapeHtml(ming.branch || "")} · 身宫 ${escapeHtml(body?.name || "未标注")}</small>
    </div>
    <svg class="ziwei-links" aria-hidden="true"></svg>`,
  );

  board.querySelectorAll("[data-palace-index]").forEach((node) => {
    node.addEventListener("click", () => {
      const palace = chart.palaces[Number(node.dataset.palaceIndex)];
      updateSelection(chart, palace);
      renderDetail(chart, palace);
    });
  });

  board.querySelectorAll("[data-star]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      const palace = chart.palaces[Number(node.dataset.palaceIndex)];
      const star = palace.majorStars.find((item) => item.name === node.dataset.star);
      updateSelection(chart, palace, star?.name);
      renderDetail(chart, palace, star);
    });
  });

  updateSelection(chart, ming);
  renderDetail(chart, ming);
  renderAnalysis({ ming, body, spouse, career, wealth, chart, profile });
}

function updateSelection(chart, palace, starName) {
  const related = sanFangSiZheng(chart, palace);
  const relatedBranches = new Set(related.map((item) => item.branch));
  board.querySelectorAll(".ziwei-palace").forEach((item) => {
    const index = Number(item.dataset.palaceIndex);
    const itemPalace = chart.palaces[index];
    item.classList.toggle("is-selected", itemPalace === palace);
    item.classList.toggle("is-related", relatedBranches.has(itemPalace.branch) && itemPalace !== palace);
  });
  board.querySelectorAll(".star-badge").forEach((item) => {
    const isSelected = starName && item.dataset.star === starName && Number(item.dataset.palaceIndex) === chart.palaces.indexOf(palace);
    const inRelatedPalace = relatedBranches.has(chart.palaces[Number(item.dataset.palaceIndex)]?.branch);
    item.classList.toggle("is-selected", Boolean(isSelected));
    item.classList.toggle("is-linked", Boolean(starName && inRelatedPalace && !isSelected));
  });
  drawLinks(chart, palace, starName);
}

function drawLinks(chart, palace, starName) {
  const svg = board.querySelector(".ziwei-links");
  if (!svg) return;
  const boardBox = board.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${boardBox.width} ${boardBox.height}`);
  svg.innerHTML = "";

  const selectedNode = board.querySelector(`.ziwei-palace[data-palace-index="${chart.palaces.indexOf(palace)}"]`);
  const selectedCenter = centerOf(selectedNode, boardBox);
  const related = sanFangSiZheng(chart, palace).filter((item) => item !== palace);

  related.forEach((item) => {
    const target = board.querySelector(`.ziwei-palace[data-palace-index="${chart.palaces.indexOf(item)}"]`);
    addLine(svg, selectedCenter, centerOf(target, boardBox), "palace");
  });

  if (!starName) return;
  const source = board.querySelector(`.star-badge[data-star="${cssEscape(starName)}"][data-palace-index="${chart.palaces.indexOf(palace)}"]`);
  const sourceCenter = centerOf(source, boardBox);
  related.forEach((item) => {
    item.majorStars.forEach((star) => {
      const target = board.querySelector(`.star-badge[data-star="${cssEscape(star.name)}"][data-palace-index="${chart.palaces.indexOf(item)}"]`);
      if (!target) return;
      addLine(svg, sourceCenter, centerOf(target, boardBox), sameFamily(starName, star.name) ? "star strong" : "star");
    });
  });
}

function addLine(svg, from, to, className) {
  if (!from || !to) return;
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", from.x);
  line.setAttribute("y1", from.y);
  line.setAttribute("x2", to.x);
  line.setAttribute("y2", to.y);
  line.setAttribute("class", className);
  svg.appendChild(line);
}

function centerOf(node, boardBox) {
  if (!node) return null;
  const box = node.getBoundingClientRect();
  return {
    x: box.left - boardBox.left + box.width / 2,
    y: box.top - boardBox.top + box.height / 2,
  };
}

function sameFamily(a, b) {
  return Object.values(starFamilies).some((family) => family.includes(a) && family.includes(b));
}

function renderAnalysis({ ming, body, spouse, career, wealth, chart, profile }) {
  const cards = [
    buildLongCard("命宫总论", buildPalaceEssay(chart, ming, null, profile), `依据：命宫${ming.branch || ""}，主星${starNames(ming)}。`, true),
    buildLongCard("身宫与人生重心", body ? buildPalaceEssay(chart, body, null, profile) : "本盘未能读取身宫位置，因此只能以命宫、官禄宫和迁移宫作为行动重心参考。身宫通常显示一个人越成熟越容易投入的领域，如果资料缺失，建议先观察哪些人生主题会反复要求你做决定，再回到命盘核对。", `依据：身宫${body?.name || "未标注"}。`),
    buildLongCard("感情与长期关系", spouse ? buildPalaceEssay(chart, spouse, null, profile) : "夫妻宫资料暂未读取完整，感情判断宜先参考命宫的自我模式、福德宫的情绪需要，以及迁移宫的外在互动方式。亲密关系关键在于双方能否把期待、边界、责任和日常节奏谈清楚。", `依据：夫妻宫${spouse?.branch || "未标注"}。`),
    buildLongCard("事业与财帛联动", buildCareerWealthEssay(chart, career, wealth, profile), `依据：官禄宫${starNames(career)}，财帛宫${starNames(wealth)}。`),
    buildLongCard("四化触发点", buildMutagenEssay(chart), "依据：各主星 mutagen 字段，按化禄、化权、化科、化忌作通俗说明。"),
    buildLongCard("大限年龄段解读", buildAgeEssay(chart), "依据：十二宫 decadal.range 年龄段。"),
  ];

  analysis.innerHTML = cards
    .map((card) => `
      <article class="deep-card${card.highlight ? " highlight-card" : ""}">
        <h2>${escapeHtml(card.title)}</h2>
        ${paragraphs(card.body)}
        <p class="basis">${escapeHtml(card.basis)}</p>
      </article>
    `)
    .join("");
}

function buildLongCard(title, body, basis, highlight = false) {
  return { title, body, basis, highlight };
}

function buildCareerWealthEssay(chart, career, wealth, profile = {}) {
  const subject = profile.name || "命主";
  const careerStars = career?.majorStars || [];
  const wealthStars = wealth?.majorStars || [];
  const careerText = career
    ? `${career.name}看事业方向，主星${starNames(career)}。${careerStars.length ? careerStars.map((star) => `${star.name}让工作方式带有${normalizeTrait(starTraits[star.name] || `${star.name}的星性`)}。`).join("") : "官禄宫无主星，事业判断要借对宫和三方四正看平台、机会和外部评价。"}`
    : "官禄宫资料暂未读取完整，事业方向先参考命宫主星和迁移宫。";
  const wealthText = wealth
    ? `${wealth.name}看收入方式和现金流，主星${starNames(wealth)}。${wealthStars.length ? wealthStars.map((star) => `${star.name}让赚钱路径带有${normalizeTrait(starTraits[star.name] || `${star.name}的星性`)}。`).join("") : "财帛宫无主星，钱财更容易由对宫、三合宫、行业环境和合作对象带动。"}`
    : "财帛宫资料暂未读取完整，财富判断先参考官禄宫和田宅宫。";
  const bridge = career && wealth
    ? `把两宫合看，${subject}的事业负责提供舞台，财帛负责检验成果能否形成稳定回收。${buildCareerWealthBridge(chart, career, wealth)}`
    : `${subject}的事业与财富联动需要补齐官禄宫、财帛宫资料后再细化。`;
  return `${careerText}${wealthText}${bridge}`;
}

function buildCareerWealthBridge(chart, career, wealth) {
  const careerRelated = sanFangSiZheng(chart, career).includes(wealth);
  const sharedFamily = career.majorStars.find((a) => wealth.majorStars.some((b) => sameFamily(a.name, b.name)));
  if (careerRelated) {
    return `官禄宫与财帛宫在三方四正里互相牵动，工作选择会直接影响收入结构，适合把职位责任、作品成果、收费方式和资产安排放在同一张表里规划。`;
  }
  if (sharedFamily) {
    return `${sharedFamily.name}所在星系同时牵动事业与金钱，说明职业标签和变现方式容易互相呼应，适合围绕同一项能力做长期积累。`;
  }
  return `两宫星性各有侧重，事业端先建立清晰角色，收入端再选择适合的计价方式；越早区分“能做什么”和“如何收钱”，越容易减少消耗。`;
}

function renderDetail(chart, palace, star) {
  if (!detail || !palace) return;
  const angle = palaceAngles[palace.name] || [palace.name, "这个宫位需要结合主星与对宫一起看。"];
  const sf = sanFangSiZheng(chart, palace);
  detail.innerHTML = `
    <p class="eyebrow">${escapeHtml(angle[0])}</p>
    <h2>${escapeHtml(palace.name)}${star ? ` · ${escapeHtml(star.name)}` : ""}</h2>
    ${paragraphs(buildPalaceEssay(chart, palace, star, chart.profile))}
    <div class="detail-block">
      <strong>三方四正</strong>
      <span>${escapeHtml(sf.map((item) => `${item.name}${item.majorStars.length ? `（${item.majorStars.map((s) => s.name).join("、")}）` : ""}`).join(" / "))}</span>
    </div>
    <div class="detail-block">
      <strong>行动建议</strong>
      <span>${escapeHtml(buildPalaceAdvice(palace, star))}</span>
    </div>
  `;
}

function buildPalaceEssay(chart, palace, star, profile = {}) {
  const info = palaceProfiles[palace.name] || {
    role: `${palace.name}代表人生中的一个具体主题。`,
    life: "它需要结合本宫、对宫、三合宫和四化一起判断，把单颗星放回整张盘里看。",
    advice: "解读时宜同时看天赋、惯性、外部环境和阶段运势。",
  };
  const major = palace.majorStars;
  const minor = palace.minorStars;
  const otherMajorStars = star ? major.filter((item) => item.name !== star.name) : major;
  const picked = star ? `当前点选${star.name}。${explainStarInPalace(star, palace, "selected")}` : "";
  const majorText = otherMajorStars.length
    ? `${star ? "本宫其他主星补充：" : "本宫主星需要逐颗看："}${otherMajorStars.map((item) => explainStarInPalace(item, palace)).join(" ")}${!star ? buildStarCombinationText(major, palace) : ""}`
    : star
      ? ""
    : `本宫没有读取到主星，解读重点转向对宫和三方四正。${palace.name}会更依赖外部对象、环境变化、合作结构或阶段运势来成象；先看相关宫位有什么星，再回到本宫主题落地。`;
  const sf = sanFangSiZheng(chart, palace);
  const age = palace.decadal ? `${palace.decadal[0]}-${palace.decadal[1]}岁` : "未标注年龄段";
  const minorText = minor.length
    ? `辅星也要落到本宫来看：${minor.map((item) => `${item.name}${item.brightness ? `（${item.brightness}）` : ""}会让${palaceAngles[palace.name]?.[0] || palace.name}多一层${minorStarEffect(item.name)}。`).join("")}`
    : "本宫辅星显示较少，解释时以主星、对宫和三方四正作为主要依据。";
  const relationText = buildRelationEssay(chart, palace, star);
  const stageText = buildStageLine(palace);
  const subject = profile.name || "命主";

  return `${info.role}${info.life}${info.advice}${picked}${majorText}${minorText}${subject}的${palace.name}对应大限年龄段为${age}。${stageText}${relationText}${buildPalaceClosing(palace)}`;
}

function explainStarInPalace(star, palace, mode = "normal") {
  const focus = palaceAngles[palace.name]?.[0] || palace.name;
  const base = normalizeTrait(starTraits[star.name] || `${star.name}需要结合所在宫位来判断。`);
  const brightness = brightnessText(star, palace);
  const mutagen = star.mutagen ? `带${star.mutagen}，会把${focus}推成事件焦点：${mutagenMeaning(star.mutagen)}。` : "";
  const prefix = mode === "selected" ? `${star.name}在${palace.name}的重点是` : `${star.name}在${palace.name}表示`;
  return `${prefix}：处理${focus}时会带有${base}的风格。${brightness}${mutagen}`;
}

function buildStarCombinationText(stars, palace) {
  if (stars.length < 2) return "";
  const names = stars.map((item) => item.name);
  const same = Object.entries(starFamilies).find(([, family]) => names.filter((name) => family.includes(name)).length >= 2);
  const focus = palaceAngles[palace.name]?.[0] || palace.name;
  if (same) {
    return ` 组合上，${names.join("、")}里有${same[0]}的结构，说明${focus}会多线发挥，同一件事里同时出现${familyMeaning(same[0])}。`;
  }
  return ` 组合上，${names.join("、")}同宫，表示${focus}会同时存在不同动机：一颗星负责启动，另一颗星负责修正或拉扯，现实中常表现为想法与执行、情绪与规则、机会与成本并行。`;
}

function buildRelationEssay(chart, palace, selectedStar) {
  const related = sanFangSiZheng(chart, palace).filter((item) => item !== palace);
  if (!related.length) return "";
  const sourceStars = selectedStar ? [selectedStar] : palace.majorStars;
  return related
    .map((item) => {
      const role = relationRole(chart, palace, item);
      const stars = item.majorStars.length ? item.majorStars : item.minorStars.slice(0, 2);
      const starText = stars.length
        ? stars.map((star) => explainInteraction(sourceStars, palace, star, item, role)).join("")
        : `${role}的${item.name}无主星，作用方式偏向环境触发：外部条件、当事人选择和阶段变化会把${palace.name}的主题带出来。`;
      return `${role}看${item.name}：${starText}`;
    })
    .join("");
}

function explainInteraction(sourceStars, sourcePalace, targetStar, targetPalace, role) {
  const sourceNames = sourceStars.length ? sourceStars.map((item) => item.name).join("、") : "本宫无主星";
  const focus = palaceAngles[sourcePalace.name]?.[0] || sourcePalace.name;
  const targetFocus = palaceAngles[targetPalace.name]?.[0] || targetPalace.name;
  const shared = sourceStars.find((item) => sameFamily(item.name, targetStar.name));
  const familyText = shared
    ? `${targetStar.name}与${shared.name}同属可互相牵动的星系，反应会比较直接：${targetFocus}上的变化容易立刻改写${focus}的判断。`
    : `${targetStar.name}把${targetFocus}的议题带进${focus}，常表现为资源、关系、时间安排或现实条件上的牵动。`;
  const trait = normalizeTrait(starTraits[targetStar.name] || `${targetStar.name}需要按宫位主题解释`);
  const mutagen = targetStar.mutagen ? `又因${targetStar.name}带${targetStar.mutagen}，这条线会被放大为${mutagenMeaning(targetStar.mutagen)}。` : "";
  return `${targetPalace.name}的${targetStar.name}代表${trait}，通过${role}作用到${sourcePalace.name}，会让${sourceNames}处理${focus}时必须顾及${targetFocus}。${familyText}${mutagen}`;
}

function relationRole(chart, source, target) {
  const sourceIndex = clockwiseBranches.indexOf(source.branch);
  const targetIndex = clockwiseBranches.indexOf(target.branch);
  const diff = (targetIndex - sourceIndex + 12) % 12;
  if (diff === 6) return "对宫";
  if (diff === 4 || diff === 8) return "三合宫";
  return "关联宫";
}

function minorStarEffect(name) {
  if (/左辅|右弼|天魁|天钺/.test(name)) return "助力、贵人或被支持的机会";
  if (/文昌|文曲/.test(name)) return "表达、文书、学习、审美和名声修饰";
  if (/禄存|天马/.test(name)) return "资源流动、行动半径和现实收益";
  if (/擎羊|陀罗|火星|铃星|地空|地劫/.test(name)) return "阻力、急迫、损耗或需要先控风险的提醒";
  if (/红鸾|天喜|咸池|天姚/.test(name)) return "人情、吸引力、情绪牵引或关系机会";
  return "细节条件、过程变量或现实质感";
}

function mutagenMeaning(mutagen) {
  return {
    禄: "资源、喜欢、获得与依赖感增强",
    权: "主导、责任、竞争和压力增强",
    科: "名声、说明、专业包装与被认可度增强",
    忌: "牵挂、亏欠、反复、执念和必须补课的地方增强",
  }[mutagen] || "该主题被命盘特别标记";
}

function familyMeaning(family) {
  return {
    帝座: "统筹、秩序、责任和平台资源",
    机月同梁: "思考、照顾、稳定、防守和长期规划",
    杀破狼: "开创、变化、竞争、破旧立新和高波动",
    财务执行: "资源管理、现金流、资产意识和执行标准",
    表达关系: "曝光、沟通、欲望、人际吸引和口舌评价",
  }[family] || "多颗星互相牵动";
}

function buildMutagenEssay(chart) {
  const mutagens = chart.palaces.flatMap((palace) =>
    palace.majorStars
      .filter((star) => star.mutagen)
      .map((star) => ({ palace, star })),
  );
  if (!mutagens.length) {
    return "本盘没有读取到明显四化标注，因此四化部分只能作为观察框架使用。一般来说，化禄像资源入口，容易带来喜欢、获得、机会或人情；化权像控制按钮，会让人更想主导，也更容易承担压力；化科像包装与名声，让事情更讲究体面、秩序、评价；化忌则像反复被按到的痛点，代表亏欠、执念、卡点或需要修正的行为模式。没有明显四化时，更要回到命宫、官禄、财帛、夫妻等核心宫位，看主星组合是否已经形成强烈倾向。";
  }
  const baseYear = new Date().getFullYear();
  return groupMutagensByPalace(mutagens)
    .map(({ palace, items }) => {
      const theme = palaceAngles[palace.name]?.[0] || palace.name;
      const windows = buildMutagenYearWindows(chart, palace, baseYear);
      const title = items.map(({ star }) => `${star.name}${star.mutagen}`).join("、");
      const effects = items
        .map(({ star }) => {
          const trait = normalizeTrait(starTraits[star.name] || `${star.name}按本宫主题发挥`);
          return `${star.name}${star.mutagen}入${palace.name}的作用是：${star.name}代表${trait}，带${star.mutagen}时${describeMutagenInPalace(star.mutagen, palace, star)}`;
        })
        .join("");
      return `${title}入${palace.name}：${palace.name}代表${theme}，四化会把该主题变成命盘里的高敏感区。${effects}${windows}`;
    })
    .join("\n\n");
}

function groupMutagensByPalace(mutagens) {
  const groups = [];
  mutagens.forEach((item) => {
    const existing = groups.find((group) => group.palace === item.palace);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ palace: item.palace, items: [item] });
    }
  });
  return groups;
}

function describeMutagenInPalace(mutagen, palace, star) {
  const focus = palaceAngles[palace.name]?.[0] || palace.name;
  const palaceGuide = {
    命宫: "会直接影响自我定位、决策方式和别人看见你的第一印象",
    兄弟: "会落到同辈、朋友、合伙分工和资源互换上",
    夫妻: "会落到伴侣、亲密关系、契约关系和一对一合作上",
    子女: "会落到子女、作品、项目成果、传承和长期输出上",
    财帛: "会落到收入方式、现金流、消费选择和风险承受上",
    疾厄: "会落到身体节律、压力表达、情绪耗损和生活习惯上",
    迁移: "会落到外地、出行、公开曝光、陌生环境和公众评价上",
    仆役: "会落到团队、客户、朋友、社群和合作网络上",
    官禄: "会落到事业方向、职位责任、专业声誉和工作选择上",
    田宅: "会落到家庭、不动产、居住环境、资产根基和安全感上",
    福德: "会落到精神能量、休息方式、兴趣审美和内心消耗上",
    父母: "会落到长辈、上司、制度、证照、文书和外部庇护上",
  }[palace.name] || `会落到${focus}上`;
  const effect = {
    禄: `容易在${focus}上出现资源、好感、获得感或别人愿意给的便利；但${star.name}带来的欲望也会让人想多拿一点，所以要看收益背后的成本`,
    权: `会让${focus}变成必须主导、必须负责、必须争取话语权的领域；好处是推进力强，坏处是容易因控制感、权责分配或急于证明自己而紧张`,
    科: `会让${focus}需要靠名声、专业说明、证照、作品包装或规则化表达来打开；它会提高被认可、被解释清楚、被推荐的概率`,
    忌: `会让${focus}成为反复牵挂或容易卡住的地方；这里常见亏欠、执念、拖延、误解或必须补课的长期题目`,
  }[mutagen] || `${focus}会被特别标记`;
  return `${palaceGuide}。${effect}。`;
}

function buildMutagenYearWindows(chart, palace, baseYear) {
  const related = sanFangSiZheng(chart, palace);
  const relatedBranches = new Set(related.map((item) => item.branch));
  const directYears = [];
  const relatedYears = [];
  for (let year = baseYear; year <= baseYear + 12; year += 1) {
    const branch = yearBranch(year);
    if (branch === palace.branch) {
      directYears.push(`${year}${branch}年`);
    } else if (relatedBranches.has(branch)) {
      const hit = related.find((item) => item.branch === branch);
      relatedYears.push(`${year}${branch}年牵动${hit?.name || "三方四正"}`);
    }
  }
  const direct = directYears.length
    ? `强触发年份看${directYears.join("、")}，这些年份流年走到${palace.name}，${palaceAngles[palace.name]?.[0] || palace.name}主题容易被推到台前`
    : `未来十二年内没有正好走到${palace.name}本宫的年份`;
  const indirect = relatedYears.length
    ? `；间接触发看${relatedYears.slice(0, 6).join("、")}，这些年份会通过对宫或三合宫把这条四化带出来`
    : "；三方四正的间接触发年份暂不明显";
  return `${direct}${indirect}。`;
}

function yearBranch(year) {
  return annualBranches[((year - 4) % 12 + 12) % 12];
}

function buildAgeEssay(chart) {
  const sorted = chart.palaces
    .filter((palace) => palace.decadal)
    .slice()
    .sort((a, b) => a.decadal[0] - b.decadal[0]);
  if (!sorted.length) {
    return "本盘没有读取到大限年龄段，因此暂时无法生成逐阶段解释。大限通常以十年为一段，提示某个年龄区间内最容易被激活的人生主题。实际判断时，应把大限宫位、命宫原局、流年所在宫位与四化一起看，才不会把阶段变化说得过于绝对。";
  }
  return sorted
    .map((palace) => {
      const stars = starNames(palace);
      const related = sanFangSiZheng(chart, palace).filter((item) => item !== palace);
      const relatedText = related
        .map((item) => `${relationRole(chart, palace, item)}${item.name}${item.majorStars.length ? `见${item.majorStars.map((star) => star.name).join("、")}` : "无主星"}`)
        .join("；");
      return `${palace.decadal[0]}-${palace.decadal[1]}岁走到${palace.name}，主星为${stars}。${buildStageLine(palace)}${buildStageStarLine(palace)}这一阶段同步看${relatedText || "三方四正资料不足"}：这些宫位负责说明事件从哪里来、由谁触发、靠什么解决。`
    })
    .join("\n\n");
}

function buildStageLine(palace) {
  const guide = {
    命宫: "这一限最像重新定义自己的十年，外界会逼你回答“我到底要以什么身份生活”。若主星强，适合确立个人品牌、职业定位和长期方向；若主星受制，则常见自我怀疑、换跑道、重新建立生活秩序。",
    兄弟: "这一限会把同辈关系、合伙分工、朋友资源推到台前。好处是信息、人脉、介绍和协作机会变多；难处是利益边界容易模糊，尤其遇到强势星或煞耗星时，要先把钱、权责、期限说清楚。",
    夫妻: "这一限会把亲密关系、契约关系和一对一合作推到主线。主星柔和时，适合建立稳定陪伴；主星刚烈或变化大时，容易经历关系重谈、承诺压力、分合选择或合作对象更换。",
    子女: "这一限会考验创造、养育、作品和长期成果。若星曜偏稳，适合把项目做成体系；若星曜偏动，可能出现育儿安排、作品方向、团队传承或副业产品的调整，重点是把想法变成可延续的结果。",
    财帛: "这一限直接牵动现金流、收入结构、消费欲望和风险承受。武曲、天府、太阴等星适合积累与资产化；贪狼、破军、七杀等星则要防收益波动过大，赚钱前先设止损和预算规则。",
    疾厄: "这一限会让身体节律、压力管理和隐性消耗进入主线。吉星多时适合建立稳定保养系统；煞耗星重时，容易因工作、关系或情绪长期紧绷而透支，身体信号需要尽早处理。",
    迁移: "这一限会把外部环境、城市变化、出差迁居、公开曝光和陌生人评价带进主线。太阳、天机、天马类动象强时，越走出去越有机会；若忌煞同见，则外部机会伴随成本，出行、合同和口碑要谨慎。",
    仆役: "这一限看团队、客户、社群、朋友和下属。星曜得力时，人脉就是放大器；星曜复杂时，人情压力、团队内耗、客户筛选会成为主题，越要用制度和明确边界来保住合作效率。",
    官禄: "这一限会集中考验事业路径、职位责任、专业声誉和工作模式。稳定星适合深耕平台与资历，开创星适合创业、转型或承担挑战任务；若口舌星明显，要特别处理汇报、合同和公众评价。",
    田宅: "这一限会落到家庭、不动产、居住环境、资产根基和内在安全感。吉星多时适合置业、改善空间或累积固定资产；变化星重时，可能搬迁、家庭责任变化或资产配置重整。",
    福德: "这一限看精神能量、兴趣、审美、睡眠、信念和快乐能力。太阴、天同、天梁类星有助恢复与享受；巨门、廉贞、煞耗星重时，容易想太多、心里不安或被欲望牵动，需要主动建立休息和情绪出口。",
    父母: "这一限会牵动长辈、上司、制度、学历证照、官方流程和外部庇护。吉星得力时，容易得资源、名分或上级认可；若忌煞明显，则可能遇到规则压力、长辈责任或文件流程反复。",
  };
  return guide[palace.name] || `这一限会集中处理${palaceAngles[palace.name]?.[0] || palace.name}相关的人事物，重点看主星如何落地，以及相关宫位如何触发。`;
}

function buildStageStarLine(palace) {
  if (!palace.majorStars.length) {
    return "本宫无主星，本阶段以对宫和三方宫作为事件来源；现实中常见别人、环境或制度先动，你再顺势回应。";
  }
  return palace.majorStars
    .map((star) => {
      const trait = normalizeTrait(starTraits[star.name] || `${star.name}按本宫主题发挥`);
      const mutagen = star.mutagen ? `，又因带${star.mutagen}，${mutagenMeaning(star.mutagen)}会变成这一限的高频按钮` : "";
      return `${star.name}在这一限代表${trait}${mutagen}。`;
    })
    .join("");
}

function normalizeTrait(text) {
  return String(text || "")
    .replace(/^主/, "")
    .replace(/。$/, "");
}

function brightnessText(star, palace) {
  if (!star.brightness) return "";
  const value = String(star.brightness);
  const label = value === "不" ? "不得地" : value;
  const place = palace?.name ? `在${palace.name}` : "在本宫";
  if (/庙|旺/.test(value)) return `${star.name}亮度为${label}，${place}力量清楚，容易主动显现。`;
  if (/得|利/.test(value)) return `${star.name}亮度为${label}，${place}发挥稳定，适合靠节奏和方法累积成果。`;
  if (/平/.test(value)) return `${star.name}亮度为${label}，${place}需要环境配合，适合用清晰规则承接。`;
  if (/陷|不/.test(value)) return `${star.name}亮度为${label}，${place}先显出压力点，适合先补条件再推进。`;
  return `${star.name}亮度为${label}，${place}要结合同宫星曜和三方四正一起看。`;
}

function buildPalaceClosing(palace) {
  const focus = palaceAngles[palace.name]?.[0] || palace.name;
  const closings = {
    命宫: `命宫落地时，先看自我定位如何带动选择，再看迁移、官禄、财帛提供哪些舞台与资源。`,
    兄弟: `兄弟宫落地时，重点看同辈关系如何带来消息、分工、压力和利益安排。`,
    夫妻: `夫妻宫落地时，重点看承诺方式、沟通节奏、边界安排和双方共同承担的能力。`,
    子女: `子女宫落地时，重点看作品、子女、长期项目如何从想法进入稳定产出。`,
    财帛: `财帛宫落地时，重点看收入路径、现金流节奏、消费边界和风险上限。`,
    疾厄: `疾厄宫落地时，重点看作息、压力出口、身体信号和长期恢复系统。`,
    迁移: `迁移宫落地时，重点看外部环境、公开评价、出行迁动和陌生机会。`,
    仆役: `仆役宫落地时，重点看团队、客户、朋友和社群能否形成稳定助力。`,
    官禄: `官禄宫落地时，重点看职位责任、专业标签、工作节奏和成果兑现。`,
    田宅: `田宅宫落地时，重点看家庭空间、资产根基、居住选择和安全感建设。`,
    福德: `福德宫落地时，重点看休息方式、兴趣审美、情绪回收和精神续航。`,
    父母: `父母宫落地时，重点看长辈、上司、制度、证照文书和外部庇护如何参与人生选择。`,
  };
  return closings[palace.name] || `${focus}落地时，重点看本宫星曜、相关宫位和四化触发如何合在一起。`;
}

function sanFangSiZheng(chart, palace) {
  const index = clockwiseBranches.indexOf(palace.branch);
  if (index < 0) return [palace];
  const related = [palace.branch, clockwiseBranches[(index + 6) % 12], clockwiseBranches[(index + 4) % 12], clockwiseBranches[(index + 8) % 12]];
  return related.map((branch) => chart.palaces.find((item) => item.branch === branch)).filter(Boolean);
}

function buildPalaceAdvice(palace, star) {
  const focus = palaceAngles[palace.name]?.[0] || palace.name;
  if (star) {
    return `把${star.name}的特质用在${focus}上：先保留它的优势，再给过度面设置现实边界。强势的星要练习协作，变化的星要建立节奏，表达型星要减少情绪化判断，财务型星要把风险写进计划。`;
  }
  return `围绕${focus}建立可复盘的方法：先看本宫发生什么，再看对宫带来什么对象或压力，最后把三合宫当作资源来源。遇到顺势时要接住机会，遇到卡点时不要急着定吉凶，先调整行为和节奏。`;
}

function starBadge(star, palaceIndex) {
  const mutagen = star.mutagen ? `<em>${escapeHtml(star.mutagen)}</em>` : "";
  return `<button type="button" class="star-badge" data-star="${escapeHtml(star.name)}" data-palace-index="${palaceIndex}">${escapeHtml(star.name)}${mutagen}</button>`;
}

function starNames(palace) {
  if (!palace) return "未标注";
  return palace.majorStars.map((star) => star.name).join("、") || "无主星";
}

function formatStar(star) {
  return {
    name: star.name,
    type: star.type,
    brightness: star.brightness,
    mutagen: star.mutagen,
  };
}

function paragraphs(text) {
  return String(text || "")
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((item) => `<p>${escapeHtml(item)}</p>`)
    .join("");
}

function hourToTimeIndex(hour) {
  if (hour >= 23) return 12;
  if (hour < 1) return 0;
  return Math.floor((hour + 1) / 2);
}

function setStatus(message) {
  if (profileStatus) profileStatus.textContent = message;
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(value);
  return String(value).replaceAll('"', '\\"');
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
