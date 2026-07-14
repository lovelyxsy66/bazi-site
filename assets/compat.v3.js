const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const stemElements = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];
const branchElements = ["水", "土", "木", "木", "土", "火", "火", "土", "金", "金", "土", "水"];
const elementColors = { 木: "#3f7654", 火: "#9b2f24", 土: "#c08b35", 金: "#8b8175", 水: "#315f82" };
const elements = ["木", "火", "土", "金", "水"];

const elementCycle = {
  木: { produces: "火", controls: "土", producedBy: "水", controlledBy: "金" },
  火: { produces: "土", controls: "金", producedBy: "木", controlledBy: "水" },
  土: { produces: "金", controls: "水", producedBy: "火", controlledBy: "木" },
  金: { produces: "水", controls: "木", producedBy: "土", controlledBy: "火" },
  水: { produces: "木", controls: "火", producedBy: "金", controlledBy: "土" },
};

const elementTemper = {
  木: "成长、规划、审美、理想感",
  火: "热情、表达、回应、行动力",
  土: "稳定、责任、现实安排、安全感",
  金: "规则、边界、标准、决断力",
  水: "理解、流动、信息、精神交流",
};

const relationFocus = {
  恋人: ["吸引力与心动来源", "情绪回应方式", "冲突修复", "未来节奏"],
  夫妻: ["长期分工", "金钱与家庭责任", "亲密稳定度", "共同抗压"],
  暧昧: ["暧昧推进点", "谁更容易上头", "不确定感来源", "适合确认关系吗"],
  朋友: ["相处舒服度", "信任与边界", "共同兴趣", "久处是否消耗"],
  同事: ["协作分工", "沟通效率", "权责边界", "项目风险"],
  合伙: ["资源互补", "决策模式", "利益分配", "长期经营"],
  亲子: ["安全感传递", "教育与边界", "情绪触发点", "长期支持方式"],
  家人: ["家庭角色", "照顾与被照顾", "沟通盲点", "现实责任"],
};

const form = document.querySelector("#compat-form");
const summary = document.querySelector("#compat-summary");
const content = document.querySelector("#compat-content");
const profileSelects = document.querySelectorAll("[data-profile-select]");
const saveProfileButtons = document.querySelectorAll("[data-save-prefix]");

setupProfilePickers();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);

  try {
    const a = readPerson(data, "a");
    const b = readPerson(data, "b");
    const relation = data.get("relation") || "恋人";
    renderCompatibility(a, b, relation);
  } catch (error) {
    summary.innerHTML = "";
    content.innerHTML = `
      <article class="deep-card highlight-card">
        <h2>暂时无法合宫</h2>
        <p>${escapeHtml(error.message)} 请检查日期、时间与农历闰月选择是否正确。</p>
      </article>
    `;
  }
});

function setupProfilePickers() {
  if (!window.BaziProfiles) return;
  refreshProfilePickers();
  window.addEventListener("pageshow", refreshProfilePickers);
  window.addEventListener("bazi:profiles-updated", refreshProfilePickers);
  window.addEventListener("storage", (event) => {
    if (event.key === BaziProfiles.storageKey) refreshProfilePickers();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshProfilePickers();
  });

  profileSelects.forEach((select) => {
    select.addEventListener("change", () => {
      const profile = BaziProfiles.findProfile(select.value);
      if (!profile) return;
      BaziProfiles.fillForm(form, profile, select.dataset.prefix);
    });
  });

  saveProfileButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const prefix = button.dataset.savePrefix;
      try {
        const saved = BaziProfiles.saveProfile(BaziProfiles.readForm(form, prefix));
        refreshProfilePickers();
        const target = form.elements[`${prefix}ProfileId`];
        if (target) target.value = saved.id;
        button.textContent = `已保存 ${saved.name}`;
        window.setTimeout(() => {
          button.textContent = "💾 保存为档案";
        }, 1600);
      } catch (error) {
        button.textContent = error.message;
        window.setTimeout(() => {
          button.textContent = "💾 保存为档案";
        }, 1800);
      }
    });
  });
}

function refreshProfilePickers() {
  profileSelects.forEach((select) => BaziProfiles.renderSelect(select, "手动填写"));
}

function readPerson(data, prefix) {
  const dateValue = data.get(`${prefix}Date`);
  const timeValue = data.get(`${prefix}Time`) || "12:00";
  if (!dateValue) throw new Error("出生日期不能为空。");

  const [year, month, day] = dateValue.split("-").map(Number);
  const [hour, minute] = timeValue.split(":").map(Number);
  const profile = {
    name: data.get(`${prefix}Name`)?.trim() || (prefix === "a" ? "第一人" : "第二人"),
    gender: data.get(`${prefix}Gender`),
    location: data.get(`${prefix}Location`)?.trim(),
    date: dateValue,
    time: timeValue,
    calendar: data.get(`${prefix}Calendar`),
    leapMonth: data.get(`${prefix}LeapMonth`) === "on",
  };

  return {
    profile,
    chart: buildChart({ year, month, day, hour, minute, calendar: profile.calendar, leapMonth: profile.leapMonth }),
  };
}

function buildChart(input) {
  if (!window.Solar || !window.Lunar) {
    throw new Error("历法库没有加载成功，请刷新页面。");
  }

  let solar;
  let lunar;
  if (input.calendar === "农历") {
    const lunarMonth = input.leapMonth ? -input.month : input.month;
    lunar = Lunar.fromYmdHms(input.year, lunarMonth, input.day, input.hour, input.minute, 0);
    solar = lunar.getSolar();
  } else {
    solar = Solar.fromYmdHms(input.year, input.month, input.day, input.hour, input.minute, 0);
    lunar = solar.getLunar();
  }

  const eightChar = lunar.getEightChar();
  const pillars = [
    makePillar("年柱", eightChar.getYearGan(), eightChar.getYearZhi(), "家庭背景", eightChar.getYearNaYin(), eightChar.getYearShiShenGan()),
    makePillar("月柱", eightChar.getMonthGan(), eightChar.getMonthZhi(), "外部环境", eightChar.getMonthNaYin(), eightChar.getMonthShiShenGan()),
    makePillar("日柱", eightChar.getDayGan(), eightChar.getDayZhi(), "自我与亲密", eightChar.getDayNaYin(), "日主"),
    makePillar("时柱", eightChar.getTimeGan(), eightChar.getTimeZhi(), "长期结果", eightChar.getTimeNaYin(), eightChar.getTimeShiShenGan()),
  ];

  return {
    pillars,
    counts: countElements(pillars),
    dayMaster: pillars[2].stemElement,
    dayStem: pillars[2].stem,
    dayBranch: pillars[2].branch,
    dayBranchElement: pillars[2].branchElement,
    eightCharText: `${eightChar.getYear()} ${eightChar.getMonth()} ${eightChar.getDay()} ${eightChar.getTime()}`,
    solarText: solar.toYmdHms(),
    lunarText: lunar.toString(),
    zodiac: lunar.getYearShengXiao(),
  };
}

function makePillar(label, stem, branch, meaning, naYin, tenGod) {
  const stemIndex = stems.indexOf(stem);
  const branchIndex = branches.indexOf(branch);
  return {
    label,
    stem,
    branch,
    stemElement: stemElements[stemIndex],
    branchElement: branchElements[branchIndex],
    meaning,
    naYin,
    tenGod,
  };
}

function countElements(pillars) {
  const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  pillars.forEach((pillar) => {
    counts[pillar.stemElement] += 1.2;
    counts[pillar.branchElement] += 1;
  });
  return counts;
}

function renderCompatibility(a, b, relation) {
  const report = analyzeCompatibility(a, b, relation);
  summary.innerHTML = `
    <article class="panel compat-overview">
      <div>
        <p class="eyebrow">${escapeHtml(relation)}合宫摘要</p>
        <h2>${escapeHtml(a.profile.name)} × ${escapeHtml(b.profile.name)}</h2>
        <p>${escapeHtml(report.overview)}</p>
      </div>
      <div class="compat-score" style="--score-color:${elementColors[report.bridgeElement]}">
        <strong>${report.score}</strong>
        <span>合宫指数</span>
      </div>
    </article>
  `;

  content.innerHTML = report.cards
    .map(
      (card) => `
        <article class="deep-card${card.highlight ? " highlight-card" : ""}">
          <h2>${escapeHtml(card.title)}</h2>
          <p>${escapeHtml(card.body)}</p>
          <p class="basis">${escapeHtml(card.basis)}</p>
        </article>
      `,
    )
    .join("");
}

function analyzeCompatibility(a, b, relation) {
  const aDay = a.chart.dayMaster;
  const bDay = b.chart.dayMaster;
  const dayRelation = relationBetween(aDay, bDay);
  const branchRelation = relationBetween(a.chart.dayBranchElement, b.chart.dayBranchElement);
  const mergedCounts = mergeCounts(a.chart.counts, b.chart.counts);
  const sorted = Object.entries(mergedCounts).sort((x, y) => y[1] - x[1]);
  const strongest = sorted[0][0];
  const weakest = sorted[sorted.length - 1][0];
  const aNeeds = weakestElement(a.chart.counts);
  const bNeeds = weakestElement(b.chart.counts);
  const aComplementsB = Number(a.chart.counts[bNeeds] || 0) >= 2.2;
  const bComplementsA = Number(b.chart.counts[aNeeds] || 0) >= 2.2;
  const focus = relationFocus[relation] || relationFocus.恋人;
  const score = scoreCompatibility(dayRelation, branchRelation, aComplementsB, bComplementsA);
  const bridgeElement = chooseBridgeElement(dayRelation, weakest);
  const current = currentTimeEnergy();
  const datePlan = recommendDates(a, b, relation, weakest, current);

  const placeText = [a.profile.location && `${a.profile.name}出生地${a.profile.location}`, b.profile.location && `${b.profile.name}出生地${b.profile.location}`].filter(Boolean).join("；");
  const overview = `${a.profile.name}日主为${aDay}，${b.profile.name}日主为${bDay}，两人日主呈${dayRelation.label}；日支气质呈${branchRelation.label}。合盘里${strongest}最旺，${weakest}较少，所以这段${relation}最需要补上的不是热闹，而是${elementTemper[weakest]}。${placeText ? `${placeText}，已记录进档案信息。` : "如果补充出生地，后续档案和合盘会更完整。"}`;

  const cards = [
    {
      title: `${focus[0]}：两人的第一层吸引`,
      body: `${a.profile.name}的日柱是${a.chart.dayStem}${a.chart.dayBranch}，${b.profile.name}的日柱是${b.chart.dayStem}${b.chart.dayBranch}。日主关系为${dayRelation.label}，代表两个人靠近时最先感受到的是${dayRelation.tone}。换成白话，就是你们不是单纯“合”或“不合”，而是有一套互相牵动的方式。如果这是${relation}关系，最容易好奇的是“为什么会被对方牵动”：答案不一定是对方完全符合想象，而是对方刚好触发了你平时不常使用的一面。${dayRelation.detail}`,
      basis: `依据：${a.profile.name}日主${aDay}；${b.profile.name}日主${bDay}；五行关系为${dayRelation.label}。`,
      highlight: true,
    },
    {
      title: `${focus[1]}：情绪与沟通节奏`,
      body: `日支更像两个人进入关系后的相处姿态。${a.profile.name}日支${a.chart.dayBranch}属${a.chart.dayBranchElement}，${b.profile.name}日支${b.chart.dayBranch}属${b.chart.dayBranchElement}，呈${branchRelation.label}。这说明你们在日常里会以${branchRelation.tone}的方式互相影响。顺的时候会觉得对方很有用、很懂或很能带动自己；不顺时也容易把同一个问题反复演成固定剧本。建议把冲突拆成事实、感受、请求三层：先说发生了什么，再说自己哪里不舒服，最后提出希望对方怎么做。这样比冷战、试探或只讲大道理更容易修复关系。`,
      basis: `依据：${a.profile.name}日支${a.chart.dayBranch}/${a.chart.dayBranchElement}；${b.profile.name}日支${b.chart.dayBranch}/${b.chart.dayBranchElement}。`,
    },
    {
      title: `${focus[2]}：互补与消耗`,
      body: `${a.profile.name}命盘偏弱的是${aNeeds}，${b.profile.name}命盘偏弱的是${bNeeds}。${bComplementsA ? `${b.profile.name}能给${a.profile.name}带来一些${elementTemper[aNeeds]}，这会让${a.profile.name}感到被补足。` : `${b.profile.name}未必天然补到${a.profile.name}最缺的${aNeeds}，所以需要通过行动而不是期待来补。`}${aComplementsB ? `${a.profile.name}也能补到${b.profile.name}的${bNeeds}，两人互相加分的空间比较明显。` : `${a.profile.name}对${b.profile.name}的补足感不算天然，关系要靠明确分工和真实照顾来加强。`}互补不是一个人拯救另一个人，而是各自把自己的稳定性带进关系。`,
      basis: `依据：两人五行分布合并后，${strongest}最旺，${weakest}最弱；个人短板分别为${aNeeds}/${bNeeds}。`,
    },
    {
      title: `${focus[3]}：长期能不能走稳`,
      body: `这段${relation}的长期关键在${weakest}。当${weakest}对应的${elementTemper[weakest]}不足时，你们容易在现实安排、情绪回应、边界或行动上出现缺口。建议把“感觉对不对”落到三个具体问题：钱和时间如何分配，冲突后谁来修复，未来三个月各自要承担什么。只要这些问题能说清，合盘里的相克也能变成推动；如果一直避而不谈，相生关系也可能因为期待过高而失衡。合盘最有价值的地方，不是替你们下结论，而是帮你们提前看到容易卡住的地方。`,
      basis: `依据：合盘五行短板为${weakest}；关系类型为${relation}，重点观察${focus.join("、")}。`,
    },
    {
      title: "当下时间气候：近期关系预测",
      body: `现在对应的干支为：年柱${current.year}、月柱${current.month}、日柱${current.day}、时柱${current.time}；当前日主气落在${current.dayElement}，时支气落在${current.timeBranchElement}。对这段${relation}来说，近期最值得做的是${datePlan.actionVerb}，因为合盘短板在${weakest}，而当下时间会把${current.adviceElement}相关的议题推到台前。若最近出现反复沟通、临时变动或现实压力，不要急着判断“合不合”，先把事情拆成可执行动作：约定一次正式谈话、写下彼此底线、确认时间表、把钱和责任说清楚。未来两到四周，适合少一点猜测，多一点明确安排。`,
      basis: `依据：访问页面时的当前干支；当前日元素${current.dayElement}；合盘短板${weakest}；关系类型${relation}。`,
    },
    {
      title: `${datePlan.title}：重要日期建议`,
      body: `${datePlan.intro}${datePlan.dates
        .map((item) => `${item.date}（${item.ganzhi}日）：${item.reason}`)
        .join("；")}。这些日期不是绝对吉凶，更适合作为“安排重要动作”的提醒：提前确认人、时间、文件、预算和情绪状态，别把关键决定放在临时起意里。`,
      basis: `依据：从今天起向后推算 240 天，优先选择能补${weakest}、能承接${relation}主题的日干支。`,
    },
    relationSpecificCard(a, b, relation, dayRelation, weakest),
  ];

  return { overview, score, bridgeElement, cards };
}

function currentTimeEnergy() {
  const now = new Date();
  const solar = Solar.fromYmdHms(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  );
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();
  const dayGan = eightChar.getDayGan();
  const dayZhi = eightChar.getDayZhi();
  const timeZhi = eightChar.getTimeZhi();
  const dayElement = stemElements[stems.indexOf(dayGan)] || branchElements[branches.indexOf(dayZhi)];
  const dayBranchElement = branchElements[branches.indexOf(dayZhi)];
  const timeBranchElement = branchElements[branches.indexOf(timeZhi)];
  const adviceElement = dayElement || dayBranchElement || timeBranchElement;

  return {
    year: eightChar.getYear(),
    month: eightChar.getMonth(),
    day: eightChar.getDay(),
    time: eightChar.getTime(),
    dayElement,
    dayBranchElement,
    timeBranchElement,
    adviceElement,
  };
}

function recommendDates(a, b, relation, weakest, current) {
  const meta = importantDateMeta(relation);
  const candidates = [];
  const start = new Date();
  start.setHours(12, 0, 0, 0);

  for (let offset = 7; offset <= 240; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const solar = Solar.fromYmdHms(date.getFullYear(), date.getMonth() + 1, date.getDate(), 12, 0, 0);
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();
    const gan = eightChar.getDayGan();
    const zhi = eightChar.getDayZhi();
    const stemElement = stemElements[stems.indexOf(gan)];
    const branchElement = branchElements[branches.indexOf(zhi)];
    const relationToWeak = relationBetween(stemElement, weakest);
    const relationToA = relationBetween(stemElement, a.chart.dayMaster);
    const relationToB = relationBetween(stemElement, b.chart.dayMaster);
    let score = 0;

    if (stemElement === weakest) score += 7;
    if (branchElement === weakest) score += 5;
    if (elementCycle[stemElement]?.produces === weakest) score += 4;
    if (elementCycle[branchElement]?.produces === weakest) score += 3;
    if (relationToA.label.includes("生") || relationToB.label.includes("生")) score += 2;
    if (stemElement === current.adviceElement || branchElement === current.adviceElement) score += 1;
    if (date.getDay() === 0 || date.getDay() === 6) score += meta.weekendBonus;
    if (offset < 21) score -= 1;

    candidates.push({
      score,
      date,
      ganzhi: `${gan}${zhi}`,
      stemElement,
      branchElement,
      relationToWeak,
    });
  }

  const dates = candidates
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .sort((x, y) => x.date - y.date)
    .map((item) => ({
      date: formatDate(item.date),
      ganzhi: item.ganzhi,
      reason: `${item.stemElement}/${item.branchElement}之气较能呼应合盘所需的${weakest}，适合${meta.actionVerb}；当天重点是把${elementTemper[weakest]}落到具体安排`,
    }));

  return {
    title: meta.title,
    intro: `${a.profile.name}和${b.profile.name}若要为这段${relation}安排${meta.eventName}，可以优先参考：`,
    actionVerb: meta.actionVerb,
    dates,
  };
}

function importantDateMeta(relation) {
  const map = {
    恋人: { title: "结婚/订婚日期", eventName: "订婚、求婚、领证或谈婚论嫁", actionVerb: "确认承诺和未来节奏", weekendBonus: 2 },
    夫妻: { title: "纪念日/家庭决策日期", eventName: "周年纪念、家庭计划或重大决定", actionVerb: "重新分配责任与资源", weekendBonus: 2 },
    暧昧: { title: "确认关系日期", eventName: "认真表白、确认关系或讲清边界", actionVerb: "把暧昧推进到明确表达", weekendBonus: 2 },
    朋友: { title: "见面/同行日期", eventName: "见面、旅行、和解或重启联系", actionVerb: "恢复交流与共同体验", weekendBonus: 2 },
    同事: { title: "立项/复盘日期", eventName: "项目启动、复盘会或职责确认", actionVerb: "明确权责和交付节点", weekendBonus: 0 },
    合伙: { title: "签约/立项日期", eventName: "签约、立项、分账或发布合作", actionVerb: "签约、定规则和确认利益分配", weekendBonus: 0 },
    亲子: { title: "沟通/教育计划日期", eventName: "家庭沟通、教育计划或重要陪伴", actionVerb: "建立安全感和具体边界", weekendBonus: 2 },
    家人: { title: "家庭会议/探望日期", eventName: "家庭会议、探望、照顾安排或和解", actionVerb: "把照顾和边界说清楚", weekendBonus: 2 },
  };
  return map[relation] || map.恋人;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function relationBetween(source, target) {
  if (source === target) {
    return {
      label: "同气相扶",
      tone: "熟悉、相似、容易互相理解",
      detail: "同气的好处是省解释，坏处是两个人的盲点也可能相似；越是相像，越要有人主动打破惯性。",
    };
  }
  if (elementCycle[source]?.produces === target) {
    return {
      label: `${source}生${target}`,
      tone: `${source}方更容易付出、托举或主动给资源`,
      detail: "相生关系有滋养感，但也要防止一方一直输出、另一方习惯性接收；健康的相生必须有回应和反馈。",
    };
  }
  if (elementCycle[target]?.produces === source) {
    return {
      label: `${target}生${source}`,
      tone: `${target}方更容易支持${source}方，关系有被照亮或被托住的感觉`,
      detail: "被生的一方容易觉得舒服，但也要记得给对方确定感；否则支持会慢慢变成消耗。",
    };
  }
  if (elementCycle[source]?.controls === target) {
    return {
      label: `${source}克${target}`,
      tone: `${source}方更容易推动、要求或改变${target}方`,
      detail: "相克不是一定不好，它常带来成长、规训和现实推动；关键是压力有没有被说清，有没有转化成共同目标。",
    };
  }
  return {
    label: `${target}克${source}`,
    tone: `${target}方更容易推动、要求或改变${source}方`,
    detail: "被克的一方可能既被吸引又有压力。若双方成熟，这会变成互相校准；若双方逃避，就会变成控制与反控制。",
  };
}

function relationSpecificCard(a, b, relation, dayRelation, weakest) {
  const names = `${a.profile.name}和${b.profile.name}`;
  const basis = `依据：关系选择为${relation}；日主关系为${dayRelation.label}；合盘短板为${weakest}。`;
  const common = {
    恋人: {
      title: "恋人重点：甜度之外的确定感",
      body: `${names}作为恋人，最需要看的不是有没有心动，而是心动之后能不能形成稳定确定感。${dayRelation.label}让你们容易在靠近时产生牵引，但${weakest}不足时，关系会在${elementTemper[weakest]}上反复考试。建议不要只用聊天频率判断爱不爱，也要看对方是否愿意安排时间、解释误会、兑现承诺。`,
    },
    夫妻: {
      title: "夫妻重点：责任分配与共同抗压",
      body: `${names}作为夫妻，合宫重点要落到现实生活：钱谁管、家务谁做、双方原生家庭如何介入、遇到压力时谁先退让。${dayRelation.label}能说明亲密里的能量流向，但婚姻真正走久，要靠制度感和共同复盘。${weakest}偏少时，尤其要补${elementTemper[weakest]}，否则小事会在长期里累积成怨气。`,
    },
    暧昧: {
      title: "暧昧重点：上头点与卡住点",
      body: `${names}处在暧昧状态时，最容易被${dayRelation.tone}吸引。暧昧的好处是想象空间大，风险是很多问题还没有经现实验证。若想推进关系，不妨直接观察三件事：对方是否稳定出现，是否愿意讲清边界，是否在你表达需求后有实际行动。${weakest}不足时，暧昧最容易停在猜测里。`,
    },
    朋友: {
      title: "朋友重点：舒服但不越界",
      body: `${names}作为朋友，${dayRelation.label}代表你们有某种自然的理解或牵动。朋友关系最怕一方长期承担情绪劳动，另一方只在需要时出现。建议把舒服感和边界感一起看：能分享，也能拒绝；能互助，也不互相绑架。补上${elementTemper[weakest]}，这段友谊会更长久。`,
    },
    同事: {
      title: "同事重点：协作效率与权责边界",
      body: `${names}作为同事，合宫不看甜不甜，而看能不能把事做成。${dayRelation.label}说明你们在合作中会有推动、支持或相似节奏；但项目里必须讲清优先级、验收标准和责任归属。${weakest}不足时，最容易出现沟通遗漏、边界不清或执行节奏不一致。`,
    },
    合伙: {
      title: "合伙重点：利益规则先于感情",
      body: `${names}如果要合伙，最重要的不是彼此欣赏，而是能不能把钱、权、责、退出机制写清楚。${dayRelation.label}说明双方资源有互动，但相生相克都需要合同承接。${weakest}不足时，合伙最容易在${elementTemper[weakest]}上出问题；越早制度化，越能保护关系。`,
    },
    亲子: {
      title: "亲子重点：支持不是控制",
      body: `${names}作为亲子关系，合宫更适合看安全感和教育方式。${dayRelation.label}可能带来天然亲近，也可能带来期待与压力。长辈要留意：孩子需要的未必是更多安排，而是被理解后的边界；晚辈也要知道，家人的表达方式不一定等于爱意大小。补${elementTemper[weakest]}，会让关系少一点拉扯。`,
    },
    家人: {
      title: "家人重点：照顾与边界并存",
      body: `${names}作为家人，关系常常绕不开责任和习惯。${dayRelation.label}会让你们在某些地方很像，或在某些地方互相推动。家人之间最容易因为“应该懂我”而少说清楚，最后让误会沉淀。建议把照顾说具体，把边界说温和，把${elementTemper[weakest]}补进日常安排。`,
    },
  };
  return { ...(common[relation] || common.恋人), basis };
}

function scoreCompatibility(dayRelation, branchRelation, aComplementsB, bComplementsA) {
  let score = 62;
  if (dayRelation.label === "同气相扶") score += 9;
  if (dayRelation.label.includes("生")) score += 12;
  if (dayRelation.label.includes("克")) score += 4;
  if (branchRelation.label === "同气相扶") score += 6;
  if (branchRelation.label.includes("生")) score += 8;
  if (branchRelation.label.includes("克")) score += 2;
  if (aComplementsB) score += 5;
  if (bComplementsA) score += 5;
  return Math.max(45, Math.min(96, score));
}

function mergeCounts(a, b) {
  return elements.reduce((result, element) => {
    result[element] = Number(a[element] || 0) + Number(b[element] || 0);
    return result;
  }, {});
}

function weakestElement(counts) {
  return Object.entries(counts).sort((a, b) => a[1] - b[1])[0][0];
}

function chooseBridgeElement(dayRelation, fallback) {
  if (dayRelation.label.includes("克")) {
    const [first] = dayRelation.label.split("克");
    return elementCycle[first]?.produces || fallback;
  }
  if (dayRelation.label.includes("生")) {
    return fallback;
  }
  return fallback;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
