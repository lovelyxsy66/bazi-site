const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const stemElements = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];
const branchElements = ["水", "土", "木", "木", "土", "火", "火", "土", "金", "金", "土", "水"];
const elementColors = {
  木: "#3f7654",
  火: "#9b2f24",
  土: "#c08b35",
  金: "#8b8175",
  水: "#315f82",
};

const monthTerms = [
  { month: 1, day: 6, branch: 1, name: "小寒" },
  { month: 2, day: 4, branch: 2, name: "立春" },
  { month: 3, day: 6, branch: 3, name: "惊蛰" },
  { month: 4, day: 5, branch: 4, name: "清明" },
  { month: 5, day: 6, branch: 5, name: "立夏" },
  { month: 6, day: 6, branch: 6, name: "芒种" },
  { month: 7, day: 7, branch: 7, name: "小暑" },
  { month: 8, day: 8, branch: 8, name: "立秋" },
  { month: 9, day: 8, branch: 9, name: "白露" },
  { month: 10, day: 8, branch: 10, name: "寒露" },
  { month: 11, day: 7, branch: 11, name: "立冬" },
  { month: 12, day: 7, branch: 0, name: "大雪" },
];

const elementReading = {
  木: "木旺的人重视成长、秩序与长期规划，心里通常有一套“应该变得更好”的标准。优势是愿意持续投入、懂得经营形象与关系，也容易在审美、教育、产品、策划、内容和长期服务里做出积累。需要留意的是，木太旺时容易把自己和别人都推向理想化标准，遇到停滞会焦虑，遇到不合理会拧巴。真正适合你的不是一味加速，而是把目标拆成阶段，让每一步都有可执行的路径。",
  火: "火旺的人表达感强、行动快，容易把场子点热，也容易被新鲜事和情绪带动。优势在传播、销售、品牌、内容、舞台型工作、公关活动以及任何需要影响力的领域；只要有观众、有反馈、有节奏，你的状态会明显被激活。需要注意的是，火旺也代表消耗快，容易三分钟热度或在冲动中做决定。最好的用法是把热情装进稳定的产品、日程和复盘里，让短期爆发变成长期可见度。",
  土: "土旺的人稳定务实，擅长承接复杂事务，别人容易把责任、资源和情绪都交到你这里。你适合运营、管理、地产、供应链、财务、人事、项目统筹和组织协调，因为你能把散乱的东西沉淀成秩序。土的挑战在于容易过度承担、替别人兜底，最后把自己压得太满。越是土旺，越要练习边界：哪些事你负责，哪些事只提供建议，哪些事必须让对方自己承担后果。",
  金: "金旺的人规则感强、判断直接，擅长看清问题的结构与标准，适合技术、法律、金融、审计、工程、安全、质检和需要标准化的领域。你的优势不是讨好所有人，而是把事情做准、做细、做出可验证的结果。金旺的盲点是说话容易过硬，明明是想解决问题，却让别人感到被审判。若能在原则之外增加一点温度，你的专业度会更容易被接受，合作空间也会明显变大。",
  水: "水旺的人机敏灵活，善于信息流动，适合咨询、贸易、研究、出海、媒体、用户洞察、跨界项目和需要快速学习的工作。你的脑子常常比行动先走几步，能从复杂信息里抓到趋势和机会。水旺的挑战是想太多、变动太多，容易收集了很多资料却迟迟不落地。对你来说，稳定不是束缚，而是让灵感有结果的容器：固定输出、固定复盘、固定休息，都会让好运更容易沉淀。",
};

const dayMasterReading = {
  木: "日主属木，核心课题是生长与取舍：既要保持理想，也要学会修枝定向。木不是只会往上长，也需要土壤、季节和修剪。你越能分清“真正想要的成长”和“为了证明自己而用力”，越能把天赋用得轻松。",
  火: "日主属火，核心课题是照见与节制：能点亮局面，也要避免一时兴起耗散精力。火的好处是让人看见、让事启动；火的功课是把热度留住。适合你的策略，是先有表达，再用流程、团队或作品承接表达后的机会。",
  土: "日主属土，核心课题是承载与边界：可靠是优势，但不必把所有责任都揽在身上。土能成事，也会吸收压力。你要学会把“我能扛”升级成“我会分配”，这样稳定才不会变成沉重。",
  金: "日主属金，核心课题是原则与弹性：判断力锋利，越能温和沟通越容易得势。金要成器，既需要打磨，也需要火候。你的原则很珍贵，但表达方式决定它是建立秩序，还是制造距离。",
  水: "日主属水，核心课题是流动与定锚：适应力强，找到稳定节奏后会更有后劲。水能通达四方，也会因为选择太多而散。你需要一个能反复回到的方向，让聪明不只停留在想法，而能变成现实结果。",
};

const lifeAngles = {
  木: {
    personality: "有生发感，通常不喜欢停滞。看重成长、体面和长期空间，遇到不合理的事容易心里别扭。你的内在有一种向上整理的力量，喜欢把混乱变得清楚，把人和事带到更好的状态。只是木气过强时，容易把“帮助”变成“改造”，也容易因为别人跟不上你的节奏而失望。",
    career: "适合做需要持续打磨的事，例如产品、教育、设计、内容规划、品牌、咨询和长期经营型项目。你的事业不宜只看短期热闹，更适合靠长期审美、方法论、专业口碑和稳定作品积累。选择平台时，优先选能让你持续生长、不断升级能力的位置，而不是只给你短期曝光却没有成长空间的环境。",
    money: "财运更偏“慢慢长出来”，不太适合频繁冲动下注。把预算、复盘和稳定现金流做好，会比追热点更顺。木的财富感常来自长期经营：客户复购、内容沉淀、技能升级、人脉信任，都是一点点长出来的枝叶。越早建立储蓄、预算和项目复盘，你越能避开情绪化消费或盲目扩张。",
    love: "感情里重视共同成长，也在意对方是否尊重自己的节奏。少一点改造对方，多一点共同计划，会更舒服。你容易被有生命力、有理想、有审美的人吸引，也希望关系能一起向前。真正适合你的关系不是天天讲大道理，而是两个人能把未来拆成现实行动，同时允许彼此按自己的速度变化。",
    health: "木对应肝胆与筋膜，娱乐参考上可理解为要少熬夜、少憋气，多拉伸，多接触自然环境。情绪长期压着不说、作息昼夜颠倒、身体缺少舒展，都会让木气变成拧巴感。适合用散步、拉伸、写计划和整理空间来疏通状态。",
    social: "贵人常来自知识、审美、行业经验或长期合作圈。你越稳定输出，越容易被靠谱的人看见。不要只靠一次社交换资源，更适合用作品、专业判断和持续兑现承诺来建立信任。木的贵人不是突然降临，而是从长期互相认可里长出来。",
    study: "适合用体系化笔记和长期主题学习，别把兴趣切得太碎；一旦形成框架，后劲会明显增强。你可以给学习设一条主线：一个季度只攻一个主题，每周产出一份复盘。这样既保留探索感，也避免什么都懂一点却没有真正沉淀。",
  },
  火: {
    personality: "反应快，存在感强，容易被新鲜事点燃。优势是感染力，挑战是热得快也散得快。你往往能迅速捕捉气氛、调动别人，也愿意把想法说出来。需要留意的是，情绪高点时做出的承诺，低点时未必还有同样的执行力。",
    career: "适合传播、销售、直播、短视频、品牌、公关、活动、培训和需要表达影响力的工作。你不适合长期躲在完全没有反馈的角落里，越是能接触人群、看到回响、形成个人标签，越容易发挥。事业上要把“会表达”变成“可复制的内容、流程或产品”，这样机会才不会只停留在一阵热闹。",
    money: "财运容易和曝光、表达、渠道有关。越能把热度变成稳定产品或稳定服务，越不容易大起大落。火气带来的财，常常先从注意力开始，再转化为信任和成交。你要防止为情绪买单、为面子消费，也要避免因为一时看好就重仓投入。",
    love: "感情里需要回应和热度，冷处理会让你很消耗。适合直接表达需求，但要给对方留缓冲。你希望关系有温度、有互动、有仪式感，如果对方长期沉默，你会怀疑自己的价值。更成熟的方式是把需求说清楚，而不是用试探、赌气或忽冷忽热来确认爱。",
    health: "火对应心火与睡眠状态，娱乐参考上要注意作息、情绪上头、咖啡因和过度兴奋后的疲惫。火旺时最怕一直开着高亮模式，白天过度兴奋，晚上难以收住。适合给自己设置关机仪式，比如固定睡前远离屏幕、减少刺激性信息。",
    social: "贵人常出现在公开场合、社群、活动、内容平台。主动展示作品比默默等待更有利。你不必等到完美才发声，先让别人看见你的热情和能力，机会才有入口。但社交热度过后，仍要靠兑现能力留住关系。",
    study: "适合用输出倒逼输入：讲给别人听、做成作品、录成短内容，学习效率会更高。你需要即时反馈来保持动力，所以别只闷头看资料。把学习转成分享、演示、作品或实战，火的能量才会越用越亮。",
  },
  土: {
    personality: "稳定、能扛事，别人容易把你当成可靠的人。缺点是容易操心太多，边界感要练出来。你倾向于先考虑现实可行性，再考虑情绪和浪漫，因此在团队或家庭里常常成为承重的人。土的成熟不是无限忍耐，而是知道什么该稳住、什么该放下。",
    career: "适合运营、管理、行政、人事、财务、地产、供应链、项目统筹和需要耐心承接的岗位。你适合把复杂流程变成制度，把散乱资源变成可持续的系统。事业上不要只做“救火的人”，要把经验沉淀成方法、权限和职位，否则容易一直忙却不一定升维。",
    money: "财运重在守成和复利，适合稳健规划、资产配置、储蓄纪律。别因为人情压力做超预算决定。土的财富不是一夜暴富，而是靠稳定现金流、耐心投入和风险控制慢慢堆出来。你要特别警惕替别人兜底、借钱不好意思拒绝、为了安全感囤太多低效资源。",
    love: "感情里看重安全感和责任感。你适合慢热确认，但也要表达情绪，不要只用做事代替沟通。你可能会用照顾、安排和承担来表达爱，但对方未必能读懂你的辛苦。真正舒服的关系，是责任有人分担，情绪也有人听见。",
    health: "土对应脾胃与消化，娱乐参考上要留意饮食规律、久坐、压力性进食和身体沉重感。土气被压住时，人容易懒、闷、堵，也容易把压力吃下去。规律三餐、轻量运动、整理房间和减少无意义承担，都能让状态变轻。",
    social: "贵人常来自稳定组织、老同事、家族长辈或长期客户。你越守信，资源越容易沉淀。土的社交不靠花哨，而靠可靠和长期兑现。不要低估你给人的安全感，但也别让所有人都把你当成免费后勤。",
    study: "适合一步一步练基本功，不适合天天换方法。给自己固定节奏，积累会非常扎实。你只要把学习变成固定流程，哪怕每天推进一点，也会比临时冲刺更有效。适合做清单、错题本、项目档案和长期复盘。",
  },
  金: {
    personality: "判断清楚，规则感强，不喜欢含糊。优势是决断和标准，挑战是有时显得太硬。你容易先看到问题、漏洞和不合理处，这让你在关键判断上很有价值。但如果表达里只有结论没有情绪缓冲，别人会觉得你难接近。",
    career: "适合技术、工程、法律、审计、金融、数据、安全、质检和任何需要标准化判断的方向。你的事业优势在专业门槛、规则意识和结果验收，越是有标准、有流程、有竞争的场域，越能凸显能力。建议把案例、证书、作品和方法论整理出来，让别人一眼看见你的可信度。",
    money: "财运适合靠专业能力、规则红利和清晰合同获得。越少感情用事，越能守住成果。金的财富重在边界：合同写清、账目分明、风险提前说明。你不怕辛苦，怕的是因为不好意思把规则讲透，最后让自己的专业被低估。",
    love: "感情里重视承诺和边界，讨厌反复拉扯。表达可以柔一点，原则不必每次都用锋利方式说出。你适合成熟、守约、讲逻辑的人，也需要对方尊重你的底线。亲密关系里，赢一场争论不等于赢得安全感，适度示弱反而能让关系更亲近。",
    health: "金对应肺皮毛与呼吸状态，娱乐参考上可注意运动耐力、换季过敏、干燥和长期紧绷。金气过紧时，身体和情绪都会像上了弦。适合有规律的力量训练、呼吸训练，以及给自己留一点不用立刻评判的放松时间。",
    social: "贵人常来自专业圈、制度平台或强能力人士。把作品、证书、案例整理出来，会更容易获得信任。你不需要讨好型社交，真正帮到你的往往是认可你标准的人。把合作边界讲清楚，反而会筛出更高质量的人脉。",
    study: "适合目标明确的训练：刷题、项目、证书、拆解案例。模糊探索太久会让你烦躁。你需要清晰目标和反馈机制，适合用考试、作品验收或真实项目来驱动学习。越具体，越能发挥金的锋利。",
  },
  水: {
    personality: "敏感聪明，适应力强，善于捕捉信息。优势是灵活，挑战是想太多或迟迟不定。你能感知很多别人没说出口的东西，也容易提前想好几种可能性。水的成熟不是永远漂着，而是在变化里找到自己的锚点。",
    career: "适合研究、咨询、贸易、媒体、跨境、旅行、信息分析、用户洞察和需要流动资源的方向。你适合做连接者、洞察者、策略者，也适合在变化快的行业里捕捉机会。事业上要避免只做信息搬运，最好把信息转成判断、方案或产品，形成别人愿意付费的价值。",
    money: "财运常和信息差、渠道、流量、人脉有关。越能建立规则，越不会被机会牵着走。水的财富来得灵活，但也容易流走：看见机会很多，却不一定每个都适合你。建议设置投入上限、止损规则和固定复盘，防止被短期机会带乱节奏。",
    love: "感情里需要精神交流和空间感。你不适合被过度控制，但也要避免什么都藏在心里。你容易被有故事、有思想、有流动感的人吸引，但关系稳定不能只靠默契。把不安和期待说出来，反而能减少内耗。",
    health: "水对应肾水与精力恢复，娱乐参考上可关注睡眠质量、焦虑循环、寒凉饮食和长期透支。水气失衡时，最明显的是脑子停不下来，身体却没有真正恢复。规律睡眠、减少夜间信息输入、做身体层面的放松，会比单纯劝自己别想更有效。",
    social: "贵人常来自跨圈层、异地、网络平台或信息资源丰富的人。保持开放，但合作要写清边界。你能认识很多不同类型的人，但真正有价值的是能互相沉淀资源的关系。不要只被新鲜感吸引，要看对方是否守约、是否能长期同行。",
    study: "适合广泛输入后再归纳模型。建议定期收束，不然容易收集很多资料却迟迟不开始。你可以先大量看，再用一页纸总结成框架，最后用一个小项目验证。水需要流动，也需要出口。",
  },
};

const branchTone = {
  子: "想法多、反应快，适合在变化中找机会。",
  丑: "耐力强，适合慢慢积累，不宜急着求结果。",
  寅: "行动欲强，有开局能力，适合主动争取。",
  卯: "审美和人情感较细，适合柔性沟通。",
  辰: "能装事，也容易想得复杂，适合做整合型角色。",
  巳: "洞察力强，适合研究、表达和策略判断。",
  午: "热度足，适合站到台前，但要注意节奏。",
  未: "包容度高，适合协作和长期建设。",
  申: "机动性强，适合技术、资源和变化型环境。",
  酉: "标准感强，适合精修、审美和专业输出。",
  戌: "责任感重，适合守成和承担关键任务。",
  亥: "感受力强，适合创意、学习和跨界连接。",
};

const nameElementChars = {
  木: "木林森柳杨梅松柏桂桐榕榆杉梓楚荣芳芬英艺芷若茗莉莲荷蕾蓝苏东青春杰栋梁",
  火: "火炎焱日明晶晨旭阳光辉灿炜煜烨熙昭晖晓晴暖宁灵丹彤夏南丽亮",
  土: "土山岩峰岳坤垚城培基堂宇安辰田石磊硕圣圭均坚原容宥亦一",
  金: "金鑫钧锋铭锐锦银钢铮铃钟钰铠镜鉴钱锡钦铎琛瑜瑞玉珊珠",
  水: "水淼江河海洋波涛清涵润泽雨雪云冰泉源沐溪泊汐沅湘渊洁子北文",
};

const form = document.querySelector("#birth-form");
const pillarGrid = document.querySelector("#pillar-grid");
const bars = document.querySelector("#element-bars");
const reading = document.querySelector("#reading");
const insights = document.querySelector("#insights");
const summaryTitle = document.querySelector("#summary-title");
const dominantText = document.querySelector("#dominant-text");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const dateValue = data.get("birthDate");
  const timeValue = data.get("birthTime") || "12:00";
  if (!dateValue) return;

  const [year, month, day] = dateValue.split("-").map(Number);
  const [hour, minute] = timeValue.split(":").map(Number);
  const profile = {
    name: data.get("name")?.trim() || "姓名未填",
    gender: data.get("gender"),
    location: data.get("location")?.trim(),
    date: dateValue,
    time: timeValue,
    calendar: data.get("calendar"),
    leapMonth: data.get("leapMonth") === "on",
  };

  let result;
  try {
    result = buildChart({ year, month, day, hour, minute, calendar: profile.calendar, leapMonth: profile.leapMonth });
  } catch (error) {
    reading.innerHTML = `<p><strong>无法排盘：</strong>${error.message}。请检查日期是否存在，农历闰月需要对应年份确实有该闰月。</p>`;
    insights.innerHTML = "";
    return;
  }

  renderChart(result, profile);
});

function buildChart(input) {
  if (!window.Solar || !window.Lunar) {
    throw new Error("历法库没有加载成功，请刷新页面");
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
    makePillar("年柱", eightChar.getYearGan(), eightChar.getYearZhi(), "祖上与早年", eightChar.getYearNaYin(), eightChar.getYearShiShenGan()),
    makePillar("月柱", eightChar.getMonthGan(), eightChar.getMonthZhi(), "事业与家庭", eightChar.getMonthNaYin(), eightChar.getMonthShiShenGan()),
    makePillar("日柱", eightChar.getDayGan(), eightChar.getDayZhi(), "自我与伴侣", eightChar.getDayNaYin(), "日主"),
    makePillar("时柱", eightChar.getTimeGan(), eightChar.getTimeZhi(), "晚景与子女", eightChar.getTimeNaYin(), eightChar.getTimeShiShenGan()),
  ];

  const counts = countElements(pillars);
  return {
    pillars,
    counts,
    dayMaster: pillars[2].stemElement,
    solarText: solar.toYmdHms(),
    lunarText: lunar.toString(),
    zodiac: lunar.getYearShengXiao(),
    nearestTerm: getJieQiText(lunar),
    eightCharText: `${eightChar.getYear()} ${eightChar.getMonth()} ${eightChar.getDay()} ${eightChar.getTime()}`,
    mingGong: eightChar.getMingGong(),
    shenGong: eightChar.getShenGong(),
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

function getJieQiText(lunar) {
  const current = lunar.getJieQi();
  const prev = lunar.getPrevJieQi();
  const next = lunar.getNextJieQi();
  const currentText = current ? `当天节气：${current}` : "当天无节气";
  const prevText = prev ? `上一节气：${prev.getName()} ${prev.getSolar().toYmdHms()}` : "";
  const nextText = next ? `下一节气：${next.getName()} ${next.getSolar().toYmdHms()}` : "";
  return [currentText, prevText, nextText].filter(Boolean).join("；");
}

function renderChart(chart, profile) {
  summaryTitle.textContent = `${profile.name} · ${profile.date} ${profile.time}${profile.location ? ` · ${profile.location}` : ""}`;
  localStorage.setItem(
    "bazi:lastChart",
    JSON.stringify({
      chart,
      profile,
      savedAt: Date.now(),
    }),
  );

  pillarGrid.innerHTML = chart.pillars
    .map(
      (pillar) => `
        <article class="pillar-card">
          <span>${pillar.label}</span>
          <strong>${pillar.stem}${pillar.branch}</strong>
          <small><em>${pillar.stemElement}</em>干 / <em>${pillar.branchElement}</em>支 · ${pillar.meaning}<br>${pillar.naYin} · ${pillar.tenGod}</small>
        </article>
      `,
    )
    .join("");

  const entries = Object.entries(chart.counts).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, value]) => value), 1);
  dominantText.textContent = `${entries[0][0]}较旺 · ${entries[entries.length - 1][0]}偏弱`;
  bars.innerHTML = entries
    .map(([element, value]) => {
      const percent = Math.round((value / max) * 100);
      return `
        <div class="element-row">
          <b>${element}</b>
          <div class="bar-track"><div class="bar-fill" style="width:${percent}%; background:${elementColors[element]}"></div></div>
          <span>${value.toFixed(1)}</span>
        </div>
      `;
    })
    .join("");

  const strongest = entries[0][0];
  const weakest = entries[entries.length - 1][0];
  const dayPillar = chart.pillars[2];
  reading.innerHTML = `
    <p><strong>日主：</strong>${dayPillar.stem}${dayPillar.branch}日，日主五行为${chart.dayMaster}。${dayMasterReading[chart.dayMaster]}</p>
    <p><strong>五行：</strong>${strongest}气最显，${weakest}气较少。${elementReading[strongest]} 偏弱的${weakest}不是“缺陷”，更像提醒：生活里要主动安排对应的训练和环境，让命盘结构从单一强项变成可调动的综合能力。</p>
    <p><strong>历法：</strong>公历 ${chart.solarText}；农历 ${chart.lunarText}；生肖${chart.zodiac}。八字为 ${chart.eightCharText}。</p>
    <p><strong>节气：</strong>${chart.nearestTerm}。八字以节气切换月份，所以同一天前后出生也可能因为节令而呈现不同结构。本页面把它作为性格、关系和行动倾向的娱乐参考，不把结果说死，也不建议替代现实判断。</p>
  `;

  const angles = lifeAngles[chart.dayMaster];
  const nameCards = analyzeName(profile.name, chart, strongest, weakest);
  insights.innerHTML = [
    ["性格底色", `${profile.name}${angles.personality} 日支${dayPillar.branch}也提示：${branchTone[dayPillar.branch]} 这意味着你的外在选择和内在安全感并不总是同一套逻辑，越能看懂自己的反应来源，越不容易被一时情绪牵着走。`],
    ["事业方向", `${angles.career} 月柱${chart.pillars[1].stem}${chart.pillars[1].branch}代表外部环境，适合把${strongest}的优势用出来，同时刻意补${weakest}。选择岗位或项目时，不只看“喜不喜欢”，还要看它是否能让你的强项持续变现、弱项被制度补齐。`],
    ["财运习惯", angles.money],
    ["感情婚恋", `${angles.love} 日支为${dayPillar.branch}，关系里最怕长期猜测，越能把期待说清楚越稳定。适合你的亲密关系不是靠玄学标签决定，而是看对方能否尊重你的节奏、承接你的真实需求，并在冲突后愿意一起修复。`],
    ["健康作息", angles.health],
    ["人际贵人", angles.social],
    ["学习成长", angles.study],
    ["近期提醒", `五行里${weakest}偏少，可以把它当成生活提醒：缺木多做规划，缺火多行动表达，缺土重视稳定节奏，缺金建立规则边界，缺水留出休息和信息整理时间。最实用的改运方式，往往不是等待某个年份突然变好，而是把偏弱的能力做成日常习惯。`],
    ...nameCards,
  ]
    .map(
      ([title, body]) => `
        <article class="insight-card">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(body)}</p>
        </article>
      `,
    )
    .join("");
}

function analyzeName(name, chart, strongest, weakest) {
  if (!name || name === "此命主") {
    return [
      ["名字分析", "你还没有填写姓名。填上名字后，会根据常见字形五行、名字气质和命盘补缺关系生成分析。"],
    ];
  }

  const chars = Array.from(name).filter((char) => /[\u4e00-\u9fff]/.test(char));
  if (!chars.length) {
    return [
      ["名字分析", "当前姓名里没有识别到汉字。名字分析主要按汉字字形和常见寓意来做，建议输入中文姓名。"],
    ];
  }

  const charElements = chars.map((char) => ({ char, element: guessNameElement(char) }));
  const known = charElements.filter((item) => item.element);
  const unknown = charElements.filter((item) => !item.element).map((item) => item.char);
  const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  known.forEach((item) => {
    counts[item.element] += 1;
  });

  const nameElements = Object.entries(counts)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([element]) => element);
  const display = known.map((item) => `${item.char}偏${item.element}`).join("，") || "未识别到明显五行偏旁";
  const relation = nameElements.includes(weakest)
    ? `名字里有${weakest}意象，刚好能呼应命盘里偏弱的${weakest}，作为娱乐解读可看成“补气质”。这种补不是简单说名字能改变命运，而是名字在别人第一次接触你时，会传递一种额外印象；如果它刚好补到命盘里较少的部分，个人风格会更完整。`
    : `名字里暂时没有明显${weakest}意象，如果想让名字和命盘更呼应，可考虑在昵称、签名或网名里加入${weakest}相关的字意。这里更适合当作品牌感和自我表达的参考，不必执着改正式姓名；很多时候，头像、简介、作品主题和常用语言也能形成类似的“气质补充”。`;
  const lengthTone =
    chars.length <= 2
      ? "名字短，记忆点直接，适合走清爽利落的个人风格。短名的优势是传播效率高，别人容易记住；缺点是留白较多，需要靠个人作品、职业标签或社交表现继续补足层次。"
      : "名字层次更丰富，适合塑造有故事感、温和但不单薄的个人印象。多字名更容易承载意象，也更适合做内容、品牌或社交场景中的个人叙事。";
  const unknownText = unknown.length ? `有些字如“${unknown.join("、")}”没有明显归类，已按中性处理。` : "所有汉字都识别到了较明显的五行意象。";

  return [
    ["名字五行", `${display}。整体名字偏${nameElements[0] || "中性"}，命盘日主为${chart.dayMaster}。${unknownText} 如果名字的五行和命盘最旺处一致，个人气质会更鲜明；如果与偏弱处呼应，则更像补上外界对你的第一印象。`],
    ["名字与命盘", relation],
    ["名字气质", `${lengthTone} 名字分析只按字形和常见寓意做趣味参考，不等同于专业姓名学笔画断法；真正影响别人对你的判断的，仍然是长期言行、作品质量和你在关键场合给出的稳定感。`],
  ];
}

function guessNameElement(char) {
  for (const [element, chars] of Object.entries(nameElementChars)) {
    if (chars.includes(char)) return element;
  }
  if (/^[钅釒金]/.test(char)) return "金";
  if (/^[氵水雨冫]/.test(char)) return "水";
  if (/^[木艹竹]/.test(char)) return "木";
  if (/^[火日灬]/.test(char)) return "火";
  if (/^[土山石田王玉]/.test(char)) return "土";
  return "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mod(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}
