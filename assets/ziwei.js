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
    advice: "判断兄弟宫不能只看感情好坏，还要看它是否能承接信息、人脉和共同承担的能力。",
  },
  夫妻: {
    role: "夫妻宫看亲密关系的期待、承诺方式、磨合节奏，也看你会被怎样的人吸引。",
    life: "它反映的不是简单的早婚晚婚，而是你在亲密关系中如何处理安全感、自由和责任。",
    advice: "夫妻宫的重点在于关系里的相处机制：谁主动、谁退让、冲突如何修复、长期如何共建。",
  },
  子女: {
    role: "子女宫看子女缘分，也看作品、传承、长期项目和你对未来成果的投注方式。",
    life: "它常常显示一个人对创造、养育、教育、表达和结果沉淀的态度。",
    advice: "这个宫位不宜只用有没有子女来理解，更要看你如何把想法变成能延续的东西。",
  },
  财帛: {
    role: "财帛宫看赚钱方式、花钱习惯、现金流安全感和面对风险时的本能反应。",
    life: "它不等于财富总量，而是你更适合靠专业、资源、交易、管理还是创意来转化收入。",
    advice: "财帛宫要和官禄宫、田宅宫一起看，才能判断收入来源、积累方式和资产稳定性。",
  },
  疾厄: {
    role: "疾厄宫看身体敏感点、压力出口、生活节律，也看情绪如何在身体上留下痕迹。",
    life: "它不是医学诊断，而是提醒哪些生活模式容易让你透支，哪些节奏更适合长期维持。",
    advice: "看疾厄宫时，重点不是恐惧疾病，而是建立睡眠、运动、饮食和心理恢复的长期秩序。",
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
    life: "它不是只看能不能升职，而是看你在哪种体系、节奏和任务结构里更容易成事。",
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
    advice: "福德宫弱并不是没有福，而是更需要主动安排独处、审美、信念和情绪回收的空间。",
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
    buildLongCard("感情与长期关系", spouse ? buildPalaceEssay(chart, spouse, null, profile) : "夫妻宫资料暂未读取完整，感情判断宜先参考命宫的自我模式、福德宫的情绪需要，以及迁移宫的外在互动方式。亲密关系不是单看桃花，而是看双方能否把期待、边界、责任和日常节奏谈清楚。", `依据：夫妻宫${spouse?.branch || "未标注"}。`),
    buildLongCard("事业与财帛联动", `${career ? buildPalaceEssay(chart, career, null, profile) : ""}${wealth ? "\n\n" + buildPalaceEssay(chart, wealth, null, profile) : ""}`, `依据：官禄宫${starNames(career)}，财帛宫${starNames(wealth)}。`),
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
    life: "它需要结合本宫、对宫、三合宫和四化一起判断，不能只凭单颗星下结论。",
    advice: "解读时宜同时看天赋、惯性、外部环境和阶段运势。",
  };
  const major = palace.majorStars;
  const minor = palace.minorStars;
  const main = star || major[0];
  const mainText = main
    ? `${star ? "当前点选的星曜" : "本宫最醒目的主星"}是${main.name}。${starTraits[main.name] || `${main.name}需要结合所在宫位来判断。`}${main.brightness ? ` 亮度标注为${main.brightness}，表示这颗星在本宫的发挥方式需要进一步看旺弱与组合。` : ""}${main.mutagen ? ` 同时它带有${main.mutagen}，这会把本宫主题推到更显眼的位置：化禄偏资源和获得，化权偏主导和压力，化科偏名誉与修饰，化忌偏执念、亏欠和必须面对的难题。` : ""}`
    : `本宫没有读取到主星，通常可按“借对宫”的思路观察。无主星并不是空白，而是这个领域更容易受对宫、环境、人际对象和阶段运势牵动；判断时要少下绝对结论，多看真实处境如何触发。`;
  const sf = sanFangSiZheng(chart, palace);
  const sfText = sf
    .filter((item) => item !== palace)
    .map((item) => `${item.name}${item.majorStars.length ? `有${item.majorStars.map((s) => s.name).join("、")}` : "无主星"}`)
    .join("；");
  const age = palace.decadal ? `${palace.decadal[0]}-${palace.decadal[1]}岁` : "未标注年龄段";
  const minorText = minor.length
    ? `辅星方面可见${minor.map((item) => item.name).join("、")}，这些星曜像细节调味，会影响事件发生的质感：有的带来帮助，有的提醒过程较杂，有的让人更在意名分、节奏或现实条件。`
    : "本宫辅星显示较少，因此更适合把重点放在主星、对宫以及三方四正的联动上，不宜用零散小象过度推断。";
  const subject = profile.name || "命主";

  return `${info.role}${info.life}${info.advice}${mainText}${minorText}从${subject}的整张盘来看，${palace.name}不能孤立解读；它与三方四正形成一个主题场，相关宫位包括${sfText || palace.name}。这些宫位会互相补充：本宫像问题发生的位置，对宫像外部对象或拉扯点，三合宫像资源来源和行动路径，四正关系则提示现实中最容易被牵动的压力。此宫对应的大限年龄段为${age}，当人生走到这个阶段时，${palaceAngles[palace.name]?.[0] || palace.name}主题会更明显，可能表现为机会增多、责任变重、关系重组、选择变得不可回避，或需要重新调整长期目标。好的用法不是把命盘当成固定答案，而是把它当成提醒：顺着主星的优势建立方法，承认过度面带来的代价，再用现实计划把运势里的波动变成可管理的节奏。`;
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
  const lines = mutagens.map(({ palace, star }) => `${star.name}${star.mutagen}入${palace.name}`).join("；");
  return `本盘可见四化线索：${lines}。四化不是简单的吉凶标签，而是命盘里最容易被事件启动的开关。化禄入某宫，通常表示那个领域容易出现资源、吸引力、愿意投入的人情或较顺的获得方式；但禄也可能让人贪恋舒适，忽略成本。化权入某宫，表示该主题需要掌控、负责、争取话语权，也可能因为太想推进而让关系紧张。化科入某宫，代表名誉、说明、修饰、学习、证照和被看见的体面，适合用规则与专业把事情讲清。化忌入某宫，则不是必然坏，而是最需要面对的长期功课：这里容易有牵挂、亏欠、反复、担心或不得不补课的地方。把四化放回宫位，就能看出哪些主题会在关键年份被放大。`;
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
      const focus = palaceAngles[palace.name]?.[0] || palace.name;
      return `${palace.decadal[0]}-${palace.decadal[1]}岁走到${palace.name}，主轴落在${focus}。此阶段可参考主星${stars}，重点观察这个领域是否出现新的责任、机会、关系结构或自我要求。若主星偏稳定，适合积累和定型；若主星偏变化，适合调整方向、学习新方法、打开外部空间；若本宫无主星，则要特别看对宫与三方四正，因为阶段事件往往由外部对象、环境变化或合作关系触发。`
    })
    .join("\n\n");
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
