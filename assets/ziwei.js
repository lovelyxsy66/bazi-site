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

const form = document.querySelector("#ziwei-form");
const profileSelect = document.querySelector("#ziwei-profile-select");
const saveProfileButton = document.querySelector("#ziwei-save-profile");
const profileStatus = document.querySelector("#ziwei-profile-status");
const summary = document.querySelector("#ziwei-summary");
const board = document.querySelector("#ziwei-board");
const analysis = document.querySelector("#ziwei-analysis");

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
      setStatus(`已保存 ${saved.name} 的档案。`);
    } catch (error) {
      setStatus(error.message);
    }
  });
}

function buildZiweiChart(profile) {
  if (!window.iztro?.astro) {
    throw new Error("紫微排盘库没有加载成功，请刷新页面。");
  }
  if (!profile.date) {
    throw new Error("请填写出生日期。");
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
  const ming = chart.palaces.find((item) => item.name === "命宫") || chart.palaces[0];
  const body = chart.palaces.find((item) => item.isBodyPalace);
  const spouse = chart.palaces.find((item) => item.name === "夫妻");
  const career = chart.palaces.find((item) => item.name === "官禄");
  const wealth = chart.palaces.find((item) => item.name === "财帛");
  const mainStars = ming.majorStars.map((star) => star.name).join("、") || "无主星";

  localStorage.setItem(
    "bazi:lastZiwei",
    JSON.stringify({ chart, profile, savedAt: Date.now() }),
  );

  summary.innerHTML = `
    <article class="panel compat-overview">
      <div>
        <p class="eyebrow">紫微命盘摘要</p>
        <h2>${escapeHtml(profile.name || "命主")} · 命宫${escapeHtml(mainStars)}</h2>
        <p>${escapeHtml(profile.date)} ${escapeHtml(profile.time || "12:00")} · ${escapeHtml(profile.location || "出生地未填")}。命宫主轴看${escapeHtml(mainStars)}，身宫落在${escapeHtml(body?.name || "未识别")}，五行局为${escapeHtml(chart.fiveElementsClass || "未识别")}。</p>
      </div>
      <div class="compat-score" style="--score-color:#8b6410">
        <strong>${ming.majorStars.length || 0}</strong>
        <span>命宫主星</span>
      </div>
    </article>
  `;

  board.innerHTML = chart.palaces
    .map((palace) => {
      const major = palace.majorStars.map(starBadge).join("") || `<span class="star-badge empty-star">借对宫</span>`;
      const minor = palace.minorStars.map((star) => `<span>${escapeHtml(star.name)}</span>`).join("");
      return `
        <article class="ziwei-palace${palace.name === "命宫" ? " is-ming" : ""}${palace.isBodyPalace ? " is-body" : ""}">
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

  analysis.innerHTML = buildAnalysisCards({ ming, body, spouse, career, wealth, chart, profile })
    .map((card) => `
      <article class="deep-card${card.highlight ? " highlight-card" : ""}">
        <h2>${escapeHtml(card.title)}</h2>
        <p>${escapeHtml(card.body)}</p>
        <p class="basis">${escapeHtml(card.basis)}</p>
      </article>
    `)
    .join("");
}

function buildAnalysisCards({ ming, body, spouse, career, wealth, chart, profile }) {
  const mingStars = ming.majorStars.map((star) => star.name);
  const primary = mingStars[0];
  const spouseStars = spouse?.majorStars.map((star) => star.name) || [];
  const careerStars = career?.majorStars.map((star) => star.name) || [];
  const wealthStars = wealth?.majorStars.map((star) => star.name) || [];
  const mutagens = chart.palaces.flatMap((palace) => palace.majorStars.filter((star) => star.mutagen).map((star) => `${star.name}${star.mutagen}入${palace.name}`));

  return [
    {
      title: "命宫主轴：你最像怎样的人",
      body: primary
        ? `${profile.name || "命主"}的命宫主星以${mingStars.join("、")}为主。${starTraits[primary] || "这类命宫重视自我定位和长期方向。"} 通俗讲，命宫不是一句“好命坏命”，而是你面对机会、压力、关系和选择时最自然的反应方式。`
        : `${profile.name || "命主"}命宫无明显主星，可借对宫迁移宫来看外界环境对你的塑造。这样的盘更需要看你进入什么平台、遇到什么人、选择什么城市。`,
      basis: `依据：命宫${ming.branch || ""}，主星${mingStars.join("、") || "无主星"}。`,
      highlight: true,
    },
    {
      title: "身宫落点：后天会把力气花在哪里",
      body: body
        ? `身宫落在${body.name}，说明越往后走，人生重心越容易落到${palaceAngles[body.name]?.[0] || body.name}。这不是说其他主题不重要，而是你越成熟，越会在这个领域反复做选择、承担责任、建立自己的方法。`
        : "暂时没有识别到身宫。可以先看命宫和官禄宫，作为自我定位与现实路径的主轴。",
      basis: `依据：身宫${body?.name || "未识别"}。`,
    },
    {
      title: "感情婚恋：夫妻宫怎么说",
      body: spouse
        ? `夫妻宫主星为${spouseStars.join("、") || "无主星"}。${describePalace(spouse)} 感情里不要只看“有没有缘”，更要看你们能不能把期待说清楚、把冲突修复好、把未来安排落到真实行动。`
        : "未识别到夫妻宫信息。建议先确认出生时间是否准确。",
      basis: `依据：夫妻宫${spouse?.branch || ""}，主星${spouseStars.join("、") || "无主星"}。`,
    },
    {
      title: "事业方向：官禄宫与现实位置",
      body: career
        ? `官禄宫主星为${careerStars.join("、") || "无主星"}。${describePalace(career)} 事业选择上，可以把命宫的性格优势和官禄宫的工作场景合起来看：前者回答“你怎样做事”，后者回答“你在哪类舞台更容易被看见”。`
        : "未识别到官禄宫信息。事业解读会更依赖八字月柱和命宫主星。",
      basis: `依据：官禄宫${career?.branch || ""}，主星${careerStars.join("、") || "无主星"}。`,
    },
    {
      title: "财运模式：财帛宫看钱从哪里来",
      body: wealth
        ? `财帛宫主星为${wealthStars.join("、") || "无主星"}。${describePalace(wealth)} 钱不是只看“有没有财”，更要看你适合靠专业、资源、流量、管理、服务还是投资来形成现金流。`
        : "未识别到财帛宫信息。可以用八字财富元素和紫微命宫综合看。",
      basis: `依据：财帛宫${wealth?.branch || ""}，主星${wealthStars.join("、") || "无主星"}。`,
    },
    {
      title: "四化提示：哪里容易被放大",
      body: mutagens.length
        ? `本盘可见四化线索：${mutagens.slice(0, 8).join("；")}。四化可以理解成“被命盘放大的按钮”：化禄偏资源，化权偏掌控，化科偏名誉，化忌偏执念和课题。`
        : "本盘暂未从主星中识别到明显四化标注。可以继续结合八字和合盘看具体关系场景。",
      basis: "依据：各宫主星 mutagen 字段。四化解释为通俗参考。",
    },
  ];
}

function describePalace(palace) {
  const stars = palace.majorStars.map((star) => star.name);
  if (!stars.length) {
    return `${palace.name}无主星，适合借对宫和辅星判断，表示这个领域更容易受外部环境、对象选择和阶段运势影响。`;
  }
  return stars.map((star) => starTraits[star] || `${star}提示这个领域需要结合具体场景判断。`).join("");
}

function starBadge(star) {
  const mutagen = star.mutagen ? `<em>${escapeHtml(star.mutagen)}</em>` : "";
  return `<span class="star-badge">${escapeHtml(star.name)}${mutagen}</span>`;
}

function formatStar(star) {
  return {
    name: star.name,
    type: star.type,
    brightness: star.brightness,
    mutagen: star.mutagen,
  };
}

function hourToTimeIndex(hour) {
  if (hour >= 23) return 12;
  if (hour < 1) return 0;
  return Math.floor((hour + 1) / 2);
}

function setStatus(message) {
  if (profileStatus) profileStatus.textContent = message;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
