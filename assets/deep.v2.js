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

const tenGodDeep = {
  日主: "自我意识强，亲密关系里更在意真实感和安全感。",
  比肩: "主自我驱动、同辈并行，能靠个人能力开局，也容易硬撑。",
  劫财: "主竞争、资源争夺和同伴牵动，机会来得快，边界要更清楚。",
  食神: "主稳定输出、口碑和生活感，适合长期生产内容或服务。",
  伤官: "主表达锋利、破框和创新，适合主动发声，但要处理好规则。",
  正财: "主稳定收入、现实经营和责任感，适合把收益路径做清楚。",
  偏财: "主机会、渠道和流动资源，适合市场与副业，但要控风险。",
  正官: "主职位、规则和社会评价，适合稳健晋升与制度化平台。",
  七杀: "主压力、竞争和执行强度，适合高压赛道，但要有方法。",
  正印: "主学习、保护、资质和贵人，适合证书、体系和长期积累。",
  偏印: "主洞察、小众专长和研究力，适合深挖细分领域。",
};

const stageDeep = {
  长生: "有起势和培养感，适合开新局。",
  沐浴: "变化、吸引力和情绪波动都更明显。",
  冠带: "形象、包装、定位和成长空间被强调。",
  临官: "执行、职位和责任感增强。",
  帝旺: "能量处在高点，适合主动争取，也要防过度用力。",
  衰: "适合减法、收束和整理资源。",
  病: "压力容易拖慢节奏，适合修流程和作息。",
  死: "旧模式难以硬冲，适合断舍离和换策略。",
  墓: "资源有收纳感，适合沉淀资产、经验和作品。",
  绝: "断点和转向明显，重大决定要留缓冲。",
  胎: "新方向在酝酿，适合试水。",
  养: "需要蓄力和耐心，适合长期培养。",
};

const shenShaDeep = {
  天乙贵人: "容易遇到关键人物或制度托举",
  文昌贵人: "利学习、表达、证照、内容输出",
  禄神: "资源和收益入口较明显",
  羊刃: "冲劲强，宜把锋芒放进规则",
  太极贵人: "利研究、咨询、玄学和深度思考",
  红鸾: "关系吸引力和感情触发点较强",
  天喜: "喜庆、人缘和合作氛围较明显",
  驿马: "动中生机，利迁移、出差、跨界",
  桃花: "人缘和曝光较强，也要守边界",
  华盖: "审美、独处和专业深耕感较强",
  将星: "主导力和担当感较强",
};

const saved = readSavedChart();
const summary = document.querySelector("#deep-summary");
const content = document.querySelector("#deep-content");

if (!saved) {
  summary.textContent = "还没有读取到命盘。请先返回首页填写姓名和出生信息，生成八字后再进入本页。";
  content.innerHTML = `
    <article class="deep-card">
      <h2>需要先排盘</h2>
      <p>本页会读取上一页生成的年柱、月柱、日柱、时柱，再展开伴侣、事业、家庭、长期成果和财富判断。</p>
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
  const dayDetail = describePillarDetail(day);
  const monthDetail = describePillarDetail(month);
  const yearDetail = describePillarDetail(year);
  const timeDetail = describePillarDetail(time);

  summary.textContent = `${profile.name} · ${chart.eightCharText}。本页展开伴侣、事业、家庭、长期成果和财富判断。`;

  const cards = [
    {
      title: "伴侣：日柱定性",
      body: `${profile.name}的日柱为${day.stem}${day.branch}，${dayDetail}日支${day.branch}属${day.branchElement}，与日元${dayElement}呈${partner.short}，感情里容易出现的主线是${partner.partnerText}。适合靠近${partner.partnerType}，但关系能不能稳定，还要看对方是否能补${weakest}弱处，并且愿意在冲突后一起修复。${describeShenSha(day)}如果日柱空亡为${day.xunKong || "无"}，亲密关系里更要避免长期猜测，把承诺、边界和时间安排说清楚。`,
      basis: `依据：日柱${day.stem}${day.branch}；日元${dayElement}；日支${day.branch}属${day.branchElement}；副星${day.secondaryStars}；星运${day.starStage}；自坐${day.selfSitting}；五行偏弱为${weakest}。`,
      highlight: true,
    },
    {
      title: "事业：月柱取势",
      body: `${profile.name}的月柱为${month.stem}${month.branch}，${monthDetail}月干${month.stem}对日元形成${career.short}，工作里更容易表现为${career.careerText}。盘里${strongest}最旺，事业切入点宜落在${elementAction[strongest]}；${weakest}偏弱，执行中最怕短板拖住节奏。换方向或接项目时，优先看三件事：能不能把${strongest}做成稳定标签，能不能给${weakest}配置制度支持，能不能在三到五年内沉淀资历。${describeShenSha(month)}`,
      basis: `依据：月柱${month.stem}${month.branch}；主星${month.tenGod}；副星${month.secondaryStars}；星运${month.starStage}；当前最旺五行为${strongest}。`,
    },
    {
      title: "家庭：年/月联动",
      body: `${profile.name}的年柱为${year.stem}${year.branch}，${yearDetail}月柱为${month.stem}${month.branch}，显示现实规则更早介入选择。年、月两柱合看为：${familyTone}。这类结构会把家庭期待、资源分配、责任感和自我证明欲推到台前；越早建立自己的判断、预算和边界，越能把早年压力转成经验，而不是一直被旧节奏牵着走。${describeShenSha(year)}`,
      basis: `依据：年柱${year.stem}${year.branch}含${year.stemElement}/${year.branchElement}；月柱${month.stem}${month.branch}含${month.stemElement}/${month.branchElement}；年柱神煞${formatList(year.shenSha)}。`,
    },
    {
      title: "长期成果：时柱落点",
      body: `${profile.name}的时柱为${time.stem}${time.branch}，${timeDetail}时干${time.stem}对日元呈${later.short}，长期成果更偏${later.laterType}，后半段人生容易在${later.laterText}上花心力。若时柱神煞被触发，子女、作品、资产结构或晚年生活方式会更需要提前布局。现在最该稳的是长期节奏、资源分配和可持续交付，不宜只凭短期情绪决定未来安排。${describeShenSha(time)}`,
      basis: `依据：时柱${time.stem}${time.branch}；主星${time.tenGod}；副星${time.secondaryStars}；星运${time.starStage}；自坐${time.selfSitting}。`,
    },
    {
      title: "财富：财星结构",
      body: `${profile.name}的财星落在${wealthElement}，盘里${wealthElement}权重约为${wealthScore.toFixed(1)}，属于${wealthTone.level}。${wealthTone.text}财富入口更适合从${elementAction[wealthElement]}里找，路径要写清楚：靠专业、靠渠道、靠管理、靠内容，还是靠资源整合。若${wealthElement}同时也是盘里弱处，先补能力和结构，再谈放大；若${wealthElement}较旺，就要重视合同、现金流、预算和风险边界，避免机会多但留不住。`,
      basis: `依据：日元${dayElement}；${dayElement}克${wealthElement}；${wealthElement}权重${wealthScore.toFixed(1)}；当前最旺${strongest}、偏弱${weakest}。`,
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

function describePillarDetail(pillar) {
  const tenGod = tenGodDeep[pillar.tenGod] || `${pillar.tenGod || "主星"}需要结合该柱领域判断。`;
  const stage = stageDeep[pillar.starStage] || "星运需结合全盘节奏判断。";
  const selfSitting = stageDeep[pillar.selfSitting] || "自坐状态需结合日支和全盘判断。";
  const selfText =
    pillar.selfSitting === pillar.starStage
      ? `星运与自坐同为${pillar.selfSitting}，这股倾向会更集中。`
      : `自坐处显示：${selfSitting}`;
  return `主星${pillar.tenGod}，副星${pillar.secondaryStars || "无"}，星运${pillar.starStage}，自坐${pillar.selfSitting}，空亡${pillar.xunKong || "无"}，纳音${pillar.naYin || "未标注"}。${tenGod}${stage}${selfText}`;
}

function describeShenSha(pillar) {
  if (!pillar.shenSha?.length) return `${pillar.label}常用神煞没有明显集中，判断以主星、副星和五行为主。`;
  return `${pillar.label}见${pillar.shenSha.join("、")}，${pillar.shenSha.map((name) => shenShaDeep[name] || `${name}会给该领域增加触发点`).join("；")}。`;
}

function formatList(items) {
  return items?.length ? items.join("、") : "无明显集中";
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
