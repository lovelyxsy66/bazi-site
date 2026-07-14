const elementCycle = {
  木: { produces: "火", controls: "土", producedBy: "水", controlledBy: "金" },
  火: { produces: "土", controls: "金", producedBy: "木", controlledBy: "水" },
  土: { produces: "金", controls: "水", producedBy: "火", controlledBy: "木" },
  金: { produces: "水", controls: "木", producedBy: "土", controlledBy: "火" },
  水: { produces: "木", controls: "火", producedBy: "金", controlledBy: "土" },
};

const elementAction = {
  木: "规划、成长、审美、长期主义",
  火: "表达、曝光、行动、影响力",
  土: "稳定、承接、组织、资源沉淀",
  金: "规则、专业、判断、执行标准",
  水: "信息、流动、学习、跨界机会",
};

const saved = readSavedChart();
const summary = document.querySelector("#deep-summary");
const content = document.querySelector("#deep-content");

if (!saved) {
  summary.textContent = "还没有读取到命盘。请先返回首页填写姓名和出生信息，生成八字后再进入本页。";
  content.innerHTML = `
    <article class="deep-card">
      <h2>需要先排盘</h2>
      <p>深层解析必须基于具体四柱生成，不能脱离用户命盘写泛泛内容。</p>
      <p class="basis">依据：本页读取首页保存的年柱、月柱、日柱、时柱和五行分布。</p>
    </article>
  `;
} else {
  renderDeep(saved.chart, saved.profile);
}

function renderDeep(chart, profile) {
  const [year, month, day, time] = chart.pillars;
  const dayElement = chart.dayMaster;
  const partner = relationProfile(day.branchElement, dayElement);
  const career = relationProfile(month.stemElement, dayElement);
  const later = relationProfile(time.stemElement, dayElement);
  const wealthElement = elementCycle[dayElement].controls;
  const wealthScore = Number(chart.counts[wealthElement] || 0);
  const sortedElements = Object.entries(chart.counts).sort((a, b) => b[1] - a[1]);
  const strongest = sortedElements[0][0];
  const weakest = sortedElements[sortedElements.length - 1][0];
  const wealthTone = getWealthTone(wealthScore, wealthElement);
  const familyTone = getFamilyTone(year, month, dayElement);

  summary.textContent = `${profile.name} · ${chart.eightCharText}。本页重点看日柱${day.stem}${day.branch}，再用年、月、时柱补充判断。`;

  const cards = [
    {
      title: "伴侣：重点看日柱",
      body: `${profile.name}的婚恋关键不在“随便结婚就改命”，而在能不能遇到${partner.partnerType}。日柱${day.stem}${day.branch}里，日主是${dayElement}，日支是${day.branchElement}，两者呈现${partner.short}；所以感情里最容易发生的模式是${partner.partnerText}。如果伴侣能补上${weakest}的短板，这段关系才更像加分项。更细一点看，日支不是简单等于“对象长什么样”，它更像你进入亲密关系后的默认反应：你会怎样索取安全感、怎样处理距离、怎样在冲突里保护自己。好的伴侣不是完全没有冲突，而是冲突之后能让你回到更稳定、更清醒的状态。`,
      basis: `依据：日柱${day.stem}${day.branch}；日主${dayElement}；日支${day.branch}属${day.branchElement}；五行偏弱为${weakest}。`,
      highlight: true,
    },
    {
      title: "事业：看月柱",
      body: `${profile.name}的事业不是靠猛冲型，更适合把${strongest}的强项做成稳定标签。月柱${month.stem}${month.branch}对日主形成${career.short}，说明工作里${career.careerText}。如果选方向，优先找能用到${elementAction[strongest]}的岗位或内容主题。月柱也代表你最常面对的外部规则：上司、行业、市场、家庭期待都会从这里投射出来。你不是不能换赛道，而是每次换之前都要问清楚：这条路能不能让优势复利，能不能给弱项提供制度支持，能不能在三到五年后沉淀成真正的资历。`,
      basis: `依据：月柱${month.stem}${month.branch}；月干${month.stem}属${month.stemElement}；当前最旺五行为${strongest}。`,
    },
    {
      title: "家庭：看年柱和月柱",
      body: `${profile.name}不是完全脱离家庭底色的人，早年环境对选择方式有影响。年柱${year.stem}${year.branch}和月柱${month.stem}${month.branch}显示：${familyTone}。这类盘不适合一直被家里节奏牵着走，越早建立自己的判断和边界，后面越顺。家庭给人的影响不只有资源，也包括恐惧、价值感、处理金钱和亲密关系的方式。你可以尊重来处，但不必复制来处；当你开始把“我应该怎样”换成“我选择怎样”，年柱和月柱的压力就会慢慢转成经验。`,
      basis: `依据：年柱${year.stem}${year.branch}含${year.stemElement}/${year.branchElement}；月柱${month.stem}${month.branch}含${month.stemElement}/${month.branchElement}。`,
    },
    {
      title: "子女与晚景：看时柱",
      body: `${profile.name}对子女或长期成果的态度偏${later.laterType}。时柱${time.stem}${time.branch}对日主呈${later.short}，所以后半段人生更容易在${later.laterText}上花心力。与其早早焦虑结果，不如把长期节奏和资源分配先稳住。时柱也可以看成“未来要交付的作品”：可能是子女、事业成果、资产结构，也可能是你晚年真正想拥有的生活方式。现在做的每一次选择，都会变成时柱里那份长期回响。`,
      basis: `依据：时柱${time.stem}${time.branch}；时干${time.stem}属${time.stemElement}；时支${time.branch}属${time.branchElement}。`,
    },
    {
      title: "财富：看日主所克",
      body: `${profile.name}的财富线索落在${wealthElement}，盘里${wealthElement}的权重约为${wealthScore.toFixed(1)}，属于${wealthTone.level}。${wealthTone.text}钱不是不能来，但更适合从${elementAction[wealthElement]}里找入口，而不是只靠情绪和运气。财富在这里不是单纯“有没有钱”，还包括你能不能识别机会、能不能承受风险、能不能把一次收入变成可持续结构。最值得做的是把赚钱路径写清楚：靠专业、靠渠道、靠管理、靠内容，还是靠资源整合；路径越清楚，运势感越容易落地。`,
      basis: `依据：日主${dayElement}；${dayElement}克${wealthElement}，故以${wealthElement}作财富参考。`,
    },
  ];

  content.innerHTML = cards
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

function relationProfile(source, target) {
  if (source === target) {
    return {
      short: "同气相扶",
      partnerType: "节奏相近、能互相理解的人",
      partnerText: "容易互相懂，但也容易一起固执，关系需要一个人先学会退半步",
      careerText: "适合在熟悉领域持续深耕，不适合频繁推翻重来",
      laterType: "陪伴型",
      laterText: "陪伴、传承、稳定关系",
    };
  }
  if (elementCycle[source]?.produces === target) {
    return {
      short: `${source}生${target}`,
      partnerType: "能托住你、愿意支持你的人",
      partnerText: "伴侣对你有扶持感，好的关系会让你更稳定，不好的关系则会让你依赖感变强",
      careerText: "外部资源对你有帮助，适合借平台、借团队、借贵人起势",
      laterType: "受支持型",
      laterText: "被后辈、长期项目或晚年资源反哺",
    };
  }
  if (elementCycle[target]?.produces === source) {
    return {
      short: `${target}生${source}`,
      partnerType: "需要你投入和经营的人",
      partnerText: "你在关系里容易付出更多，婚后能不能变顺，取决于对方是否懂得回应",
      careerText: "事业会消耗精力，但也能逼你成长，适合把付出沉淀成作品或资历",
      laterType: "投入型",
      laterText: "为子女、作品或长期目标持续投入",
    };
  }
  if (elementCycle[source]?.controls === target) {
    return {
      short: `${source}克${target}`,
      partnerType: "能推动你、但也会给你压力的人",
      partnerText: "伴侣容易改变你的生活节奏，关系有改命感，但前提是压力能转成成长，而不是消耗",
      careerText: "工作压力不小，越有规则和标准，越能把压力变成位置",
      laterType: "压力成长型",
      laterText: "责任、规训和必须完成的长期任务",
    };
  }
  return {
    short: `${target}克${source}`,
    partnerType: "你容易想掌控节奏的人",
    partnerText: "你在关系里容易有主导欲，适合成熟稳定、边界清楚的对象，不适合反复拉扯",
    careerText: "你适合主动争取资源，做能让你掌控节奏的事，比被动执行更有利",
    laterType: "掌控型",
    laterText: "规划、安排和资源掌控",
  };
}

function getFamilyTone(year, month, dayElement) {
  const familyElements = [year.stemElement, year.branchElement, month.stemElement, month.branchElement];
  const supportCount = familyElements.filter((element) => element === dayElement || elementCycle[element]?.produces === dayElement).length;
  const pressureCount = familyElements.filter((element) => elementCycle[element]?.controls === dayElement).length;
  if (supportCount >= 2) return "家里或成长环境给过你支撑，哪怕表达方式不一定温柔，底层仍有托举感";
  if (pressureCount >= 2) return "家里对你有要求、有压力，也容易让你较早形成责任感和自我证明欲";
  return "家庭影响比较混合，一边给资源或习惯，一边也带来需要你自己消化的限制";
}

function getWealthTone(score, element) {
  if (score >= 3) {
    return {
      level: "财星明显",
      text: `适合主动经营收入，尤其适合把${element}对应的能力做成稳定产品、服务或资源。`,
    };
  }
  if (score >= 1.5) {
    return {
      level: "财星中等",
      text: `有赚钱机会，但需要靠长期节奏积累，不能只看短期爆发。`,
    };
  }
  return {
    level: "财星偏弱",
    text: `更像先靠能力、名声、平台或专业度铺路，钱会在结构稳定后变明显。`,
  };
}

function readSavedChart() {
  try {
    const raw = localStorage.getItem("bazi:lastChart");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
