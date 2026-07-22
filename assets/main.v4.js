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

const changShengStages = ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"];
const changShengOffset = {
  甲: 1,
  乙: 6,
  丙: 10,
  丁: 9,
  戊: 10,
  己: 9,
  庚: 7,
  辛: 0,
  壬: 4,
  癸: 3,
};

const sanHeShenSha = [
  { branches: ["申", "子", "辰"], values: { 驿马: "寅", 桃花: "酉", 华盖: "辰", 将星: "子" } },
  { branches: ["寅", "午", "戌"], values: { 驿马: "申", 桃花: "卯", 华盖: "戌", 将星: "午" } },
  { branches: ["巳", "酉", "丑"], values: { 驿马: "亥", 桃花: "午", 华盖: "丑", 将星: "酉" } },
  { branches: ["亥", "卯", "未"], values: { 驿马: "巳", 桃花: "子", 华盖: "未", 将星: "卯" } },
];

const tianYiBranches = {
  甲: ["丑", "未"],
  戊: ["丑", "未"],
  庚: ["丑", "未"],
  乙: ["子", "申"],
  己: ["子", "申"],
  丙: ["亥", "酉"],
  丁: ["亥", "酉"],
  壬: ["卯", "巳"],
  癸: ["卯", "巳"],
  辛: ["寅", "午"],
};

const wenChangBranch = {
  甲: "巳",
  乙: "午",
  丙: "申",
  丁: "酉",
  戊: "申",
  己: "酉",
  庚: "亥",
  辛: "子",
  壬: "寅",
  癸: "卯",
};

const luShenBranch = {
  甲: "寅",
  乙: "卯",
  丙: "巳",
  丁: "午",
  戊: "巳",
  己: "午",
  庚: "申",
  辛: "酉",
  壬: "亥",
  癸: "子",
};

const yangRenBranch = {
  甲: "卯",
  乙: "寅",
  丙: "午",
  丁: "巳",
  戊: "午",
  己: "巳",
  庚: "酉",
  辛: "申",
  壬: "子",
  癸: "亥",
};

const taiJiBranches = {
  甲: ["子", "午"],
  乙: ["子", "午"],
  丙: ["卯", "酉"],
  丁: ["卯", "酉"],
  戊: ["辰", "戌", "丑", "未"],
  己: ["辰", "戌", "丑", "未"],
  庚: ["寅", "亥"],
  辛: ["寅", "亥"],
  壬: ["巳", "申"],
  癸: ["巳", "申"],
};

const hongLuanBranch = {
  子: "卯",
  丑: "寅",
  寅: "丑",
  卯: "子",
  辰: "亥",
  巳: "戌",
  午: "酉",
  未: "申",
  申: "未",
  酉: "午",
  戌: "巳",
  亥: "辰",
};

const tianXiBranch = {
  子: "酉",
  丑: "申",
  寅: "未",
  卯: "午",
  辰: "巳",
  巳: "辰",
  午: "卯",
  未: "寅",
  申: "丑",
  酉: "子",
  戌: "亥",
  亥: "戌",
};

const dayMasterReading = {
  木: "这类盘的反应方式偏向规划、成长和长期经营，遇到机会会先看空间与可持续性。发挥得好时，适合把审美、方法论、内容或教育型能力做成长期标签；压力上来时，容易用理想标准要求自己和别人，需要把目标拆成可执行阶段。",
  火: "这类盘的启动速度快，靠表达、热度、可见度和反馈被激活。发挥得好时，适合站到台前、带动气氛、推动传播；状态失衡时，容易先承诺后透支，需要用流程和复盘接住短期爆发。",
  土: "这类盘的承接力强，适合把混乱的人事、资源和流程稳定下来。发挥得好时，容易成为组织里的支点；压力上来时，会把责任全揽到自己身上，需要提前划清权限和资源边界。",
  金: "这类盘判断清楚，重标准、效率和结果验收。发挥得好时，适合技术、规则、审计、金融、工程和专业门槛型事务；压力上来时，表达容易变硬，需要把结论讲清，也给合作方留沟通余地。",
  水: "这类盘信息感强，适合研究、流通、跨界和变化快的环境。发挥得好时，能抓趋势、找入口、连接资源；压力上来时，容易想得多做得慢，需要固定输出节奏，让判断落成结果。",
};

const elementStrategy = {
  木: { asset: "规划、审美、教育、内容、长期服务", risk: "标准过高、进度焦虑、替别人设计人生", repair: "用阶段目标、作品清单和固定复盘来落地" },
  火: { asset: "表达、曝光、销售、传播、活动带动", risk: "冲动决定、热度消耗、情绪化承诺", repair: "用日程、流程和可复用产品承接热度" },
  土: { asset: "管理、运营、资源整合、项目承接", risk: "过度兜底、人情压力、越忙越钝", repair: "用边界、授权和预算纪律减轻负重" },
  金: { asset: "规则、技术、审计、金融、标准化执行", risk: "说话过硬、容错低、合作空间变窄", repair: "用证据、合同和温和表达建立可信度" },
  水: { asset: "信息、研究、贸易、咨询、跨界机会", risk: "想太多、变动过频、迟迟不收束", repair: "用固定输出、止损规则和阶段复盘定锚" },
};

const tenGodSignal = {
  日主: "自我意识和亲密关系议题更集中，关键看日支能否托住日元。",
  比肩: "自我驱动强，适合靠个人能力打开局面，也要避免凡事硬扛。",
  劫财: "竞争和同辈牵动明显，适合抢机会，但钱和合作边界要写清楚。",
  食神: "输出、表达和稳定生产力较好，适合把兴趣做成持续作品。",
  伤官: "表达锋利、破框能力强，适合创新和内容，但要避免顶撞规则。",
  正财: "重现实收益和可见回报，适合稳定经营、预算管理和长期客户。",
  偏财: "机会感、资源感较强，适合市场、渠道和副业，但不宜贪快。",
  正官: "规则、职位、责任感被强调，适合走制度化路径和稳健晋升。",
  七杀: "压力、竞争和行动力被激活，适合高强度赛道，但要有章法。",
  正印: "学习、资质、贵人和保护力较明显，适合走专业认证与长期积累。",
  偏印: "洞察、研究和非标准能力强，适合小众专长，但要避免孤立内耗。",
};

const stageSignal = {
  长生: "起势感强，适合开新局、培养新能力。",
  沐浴: "变化和吸引力强，适合曝光，也要稳住情绪和节奏。",
  冠带: "包装、形象和成长空间明显，适合升级定位。",
  临官: "执行力和位置感较强，适合承担具体职责。",
  帝旺: "能量到高点，适合主动争取，但要防过度用力。",
  衰: "需要减法和整理，适合收束资源。",
  病: "容易被压力拖慢，适合修流程、补作息。",
  死: "不宜硬冲，适合断舍离和重建规则。",
  墓: "资源有收纳感，适合沉淀资产、作品和经验。",
  绝: "断点明显，适合换思路，但重大决定要留缓冲。",
  胎: "新方向正在酝酿，适合试水和准备。",
  养: "需要耐心蓄力，适合长期培养。",
};

const pillarSignal = {
  年柱: "早年环境、家族背景和外界第一层影响",
  月柱: "事业环境、家庭规则和现实压力来源",
  日柱: "自我状态、亲密关系和内在安全感",
  时柱: "长期成果、晚景节奏、子女或作品交付",
};

const shenShaSignal = {
  天乙贵人: "遇事较容易有贵人、制度或关键人物帮忙托一把",
  文昌贵人: "利学习、表达、证书、内容和专业呈现",
  禄神: "资源、收入入口和稳定收益意识较强",
  羊刃: "行动锋利，遇压力会硬顶，宜把冲劲放进规则里",
  太极贵人: "适合研究、玄学、哲学、咨询和深度思考",
  红鸾: "感情、人缘和审美吸引力容易被触发",
  天喜: "喜庆、人缘、合作氛围和关系机会较明显",
  驿马: "动中生机，适合出差、迁移、跨城跨界和主动拓展",
  桃花: "人缘、曝光和吸引力强，也要留意关系边界",
  华盖: "审美、研究和独处能力强，适合专业深耕",
  将星: "主导力和担当感较强，适合带队或扛关键任务",
};

const lifeAngles = {
  木: {
    personality: "有生发感，通常不喜欢停滞。看重成长、体面和长期空间，遇到不合理的事容易心里别扭。你的内在有一种向上整理的力量，喜欢把混乱变得清楚，把人和事带到更好的状态。只是木气过强时，容易把“帮助”变成“改造”，也容易因为别人跟不上你的节奏而失望。",
    career: "适合做需要持续打磨的事，例如产品、教育、设计、内容规划、品牌、咨询和长期经营型项目。你的事业不宜只看短期热闹，更适合靠长期审美、方法论、专业口碑和稳定作品积累。选择平台时，优先选能让你持续生长、不断升级能力的位置，而不是只给你短期曝光却没有成长空间的环境。",
    money: "财运更偏“慢慢长出来”，不太适合频繁冲动下注。把预算、复盘和稳定现金流做好，会比追热点更顺。木的财富感常来自长期经营：客户复购、内容沉淀、技能升级、人脉信任，都是一点点长出来的枝叶。越早建立储蓄、预算和项目复盘，你越能避开情绪化消费或盲目扩张。",
    love: "感情里重视共同成长，也在意对方是否尊重自己的节奏。少一点改造对方，多一点共同计划，会更舒服。你容易被有生命力、有理想、有审美的人吸引，也希望关系能一起向前。真正适合你的关系不是天天讲大道理，而是两个人能把未来拆成现实行动，同时允许彼此按自己的速度变化。",
    health: "作息上要留意熬夜、憋气和身体长期缺少舒展。情绪长期压着不说，状态容易变得拧巴。适合用散步、拉伸、写计划和整理空间来疏通。",
    social: "贵人常来自知识、审美、行业经验或长期合作圈。你越稳定输出，越容易被靠谱的人看见。不要只靠一次社交换资源，更适合用作品、专业判断和持续兑现承诺来建立信任。木的贵人不是突然降临，而是从长期互相认可里长出来。",
    study: "适合用体系化笔记和长期主题学习，别把兴趣切得太碎；一旦形成框架，后劲会明显增强。你可以给学习设一条主线：一个季度只攻一个主题，每周产出一份复盘。这样既保留探索感，也避免什么都懂一点却没有真正沉淀。",
  },
  火: {
    personality: "反应快，存在感强，容易被新鲜事点燃。优势是感染力，挑战是热得快也散得快。你往往能迅速捕捉气氛、调动别人，也愿意把想法说出来。需要留意的是，情绪高点时做出的承诺，低点时未必还有同样的执行力。",
    career: "适合传播、销售、直播、短视频、品牌、公关、活动、培训和需要表达影响力的工作。你不适合长期躲在完全没有反馈的角落里，越是能接触人群、看到回响、形成个人标签，越容易发挥。事业上要把“会表达”变成“可复制的内容、流程或产品”，这样机会才不会只停留在一阵热闹。",
    money: "财运容易和曝光、表达、渠道有关。越能把热度变成稳定产品或稳定服务，越不容易大起大落。火气带来的财，常常先从注意力开始，再转化为信任和成交。你要防止为情绪买单、为面子消费，也要避免因为一时看好就重仓投入。",
    love: "感情里需要回应和热度，冷处理会让你很消耗。适合直接表达需求，但要给对方留缓冲。你希望关系有温度、有互动、有仪式感，如果对方长期沉默，你会怀疑自己的价值。更成熟的方式是把需求说清楚，而不是用试探、赌气或忽冷忽热来确认爱。",
    health: "作息上要留意情绪上头、咖啡因、睡前刷屏和过度兴奋后的疲惫。白天开得太满，晚上就难以收住。适合给自己设置关机仪式，减少临睡前的刺激性信息。",
    social: "贵人常出现在公开场合、社群、活动、内容平台。主动展示作品比默默等待更有利。你不必等到完美才发声，先让别人看见你的热情和能力，机会才有入口。但社交热度过后，仍要靠兑现能力留住关系。",
    study: "适合用输出倒逼输入：讲给别人听、做成作品、录成短内容，学习效率会更高。你需要即时反馈来保持动力，所以别只闷头看资料。把学习转成分享、演示、作品或实战，火的能量才会越用越亮。",
  },
  土: {
    personality: "稳定、能扛事，别人容易把你当成可靠的人。缺点是容易操心太多，边界感要练出来。你倾向于先考虑现实可行性，再考虑情绪和浪漫，因此在团队或家庭里常常成为承重的人。土的成熟不是无限忍耐，而是知道什么该稳住、什么该放下。",
    career: "适合运营、管理、行政、人事、财务、地产、供应链、项目统筹和需要耐心承接的岗位。你适合把复杂流程变成制度，把散乱资源变成可持续的系统。事业上不要只做“救火的人”，要把经验沉淀成方法、权限和职位，否则容易一直忙却不一定升维。",
    money: "财运重在守成和复利，适合稳健规划、资产配置、储蓄纪律。别因为人情压力做超预算决定。土的财富不是一夜暴富，而是靠稳定现金流、耐心投入和风险控制慢慢堆出来。你要特别警惕替别人兜底、借钱不好意思拒绝、为了安全感囤太多低效资源。",
    love: "感情里看重安全感和责任感。你适合慢热确认，但也要表达情绪，不要只用做事代替沟通。你可能会用照顾、安排和承担来表达爱，但对方未必能读懂你的辛苦。真正舒服的关系，是责任有人分担，情绪也有人听见。",
    health: "作息上要留意饮食规律、久坐、压力性进食和身体沉重感。压力一多，人容易懒、闷、堵，也容易把情绪吃下去。规律三餐、轻量运动、整理房间和减少无意义承担，都能让状态变轻。",
    social: "贵人常来自稳定组织、老同事、家族长辈或长期客户。你越守信，资源越容易沉淀。土的社交不靠花哨，而靠可靠和长期兑现。不要低估你给人的安全感，但也别让所有人都把你当成免费后勤。",
    study: "适合一步一步练基本功，不适合天天换方法。给自己固定节奏，积累会非常扎实。你只要把学习变成固定流程，哪怕每天推进一点，也会比临时冲刺更有效。适合做清单、错题本、项目档案和长期复盘。",
  },
  金: {
    personality: "判断清楚，规则感强，不喜欢含糊。优势是决断和标准，挑战是有时显得太硬。你容易先看到问题、漏洞和不合理处，这让你在关键判断上很有价值。但如果表达里只有结论没有情绪缓冲，别人会觉得你难接近。",
    career: "适合技术、工程、法律、审计、金融、数据、安全、质检和任何需要标准化判断的方向。你的事业优势在专业门槛、规则意识和结果验收，越是有标准、有流程、有竞争的场域，越能凸显能力。建议把案例、证书、作品和方法论整理出来，让别人一眼看见你的可信度。",
    money: "财运适合靠专业能力、规则红利和清晰合同获得。越少感情用事，越能守住成果。金的财富重在边界：合同写清、账目分明、风险提前讲清。你不怕辛苦，怕的是因为不好意思把规则讲透，最后让自己的专业被低估。",
    love: "感情里重视承诺和边界，讨厌反复拉扯。表达可以柔一点，原则不必每次都用锋利方式说出。你适合成熟、守约、讲逻辑的人，也需要对方尊重你的底线。亲密关系里，赢一场争论不等于赢得安全感，适度示弱反而能让关系更亲近。",
    health: "作息上要留意运动耐力、换季过敏、干燥和长期紧绷。压力一紧，身体和情绪都会像上了弦。适合有规律的力量训练、呼吸训练，也要给自己留一点不用立刻评判的放松时间。",
    social: "贵人常来自专业圈、制度平台或强能力人士。把作品、证书、案例整理出来，会更容易获得信任。你不需要讨好型社交，真正帮到你的往往是认可你标准的人。把合作边界讲清楚，反而会筛出更高质量的人脉。",
    study: "适合目标明确的训练：刷题、项目、证书、拆解案例。模糊探索太久会让你烦躁。你需要清晰目标和反馈机制，适合用考试、作品验收或真实项目来驱动学习。越具体，越能发挥金的锋利。",
  },
  水: {
    personality: "敏感聪明，适应力强，善于捕捉信息。优势是灵活，挑战是想太多或迟迟不定。你能感知很多别人没说出口的东西，也容易提前想好几种可能性。水的成熟不是永远漂着，而是在变化里找到自己的锚点。",
    career: "适合研究、咨询、贸易、媒体、跨境、旅行、信息分析、用户洞察和需要流动资源的方向。你适合做连接者、洞察者、策略者，也适合在变化快的行业里捕捉机会。事业上要避免只做信息搬运，最好把信息转成判断、方案或产品，形成别人愿意付费的价值。",
    money: "财运常和信息差、渠道、流量、人脉有关。越能建立规则，越不会被机会牵着走。水的财富来得灵活，但也容易流走：看见机会很多，却不一定每个都适合你。建议设置投入上限、止损规则和固定复盘，防止被短期机会带乱节奏。",
    love: "感情里需要精神交流和空间感。你不适合被过度控制，但也要避免什么都藏在心里。你容易被有故事、有思想、有流动感的人吸引，但关系稳定不能只靠默契。把不安和期待说出来，反而能减少内耗。",
    health: "作息上要留意睡眠质量、焦虑循环、寒凉饮食和长期透支。状态失衡时，最明显的是脑子停不下来，身体却没有真正恢复。规律睡眠、减少夜间信息输入、做身体层面的放松，会比单纯劝自己别想更有效。",
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
const profileSelect = document.querySelector("#profile-select");
const saveProfileButton = document.querySelector("#save-profile");
const deleteProfileButton = document.querySelector("#delete-profile");
const profileStatus = document.querySelector("#profile-status");

setupProfileControls();

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

function setupProfileControls() {
  if (!window.BaziProfiles) return;
  const refreshProfiles = () => BaziProfiles.renderSelect(profileSelect);
  refreshProfiles();
  window.addEventListener("pageshow", refreshProfiles);
  window.addEventListener("bazi:profiles-updated", refreshProfiles);
  window.addEventListener("storage", (event) => {
    if (event.key === BaziProfiles.storageKey) refreshProfiles();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshProfiles();
  });

  profileSelect?.addEventListener("change", () => {
    const profile = BaziProfiles.findProfile(profileSelect.value);
    if (!profile) return;
    BaziProfiles.fillForm(form, profile);
    setProfileStatus(`已载入 ${profile.name} 的档案，可以直接排盘。`);
  });

  saveProfileButton?.addEventListener("click", () => {
    try {
      if (!form.reportValidity()) {
        setProfileStatus("请先补全姓名和出生日期，再保存档案。");
        return;
      }
      const saved = BaziProfiles.saveProfile(BaziProfiles.readForm(form));
      refreshProfiles();
      profileSelect.value = saved.id;
      setProfileStatus(`已保存 ${saved.name} 的生日档案。`);
    } catch (error) {
      setProfileStatus(error.message);
    }
  });

  deleteProfileButton?.addEventListener("click", () => {
    if (!profileSelect?.value) {
      setProfileStatus("请先选择要删除的档案。");
      return;
    }
    const profile = BaziProfiles.findProfile(profileSelect.value);
    BaziProfiles.deleteProfile(profileSelect.value);
    refreshProfiles();
    setProfileStatus(`已删除${profile ? ` ${profile.name} 的` : ""}档案。`);
  });
}

function setProfileStatus(message) {
  if (profileStatus) profileStatus.textContent = message;
}

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
    makePillar({
      label: "年柱",
      stem: eightChar.getYearGan(),
      branch: eightChar.getYearZhi(),
      meaning: "祖上与早年",
      naYin: eightChar.getYearNaYin(),
      tenGod: eightChar.getYearShiShenGan(),
      hiddenStems: eightChar.getYearHideGan(),
      hiddenGods: eightChar.getYearShiShenZhi(),
      starStage: eightChar.getYearDiShi(),
      xunKong: eightChar.getYearXunKong(),
    }),
    makePillar({
      label: "月柱",
      stem: eightChar.getMonthGan(),
      branch: eightChar.getMonthZhi(),
      meaning: "事业与家庭",
      naYin: eightChar.getMonthNaYin(),
      tenGod: eightChar.getMonthShiShenGan(),
      hiddenStems: eightChar.getMonthHideGan(),
      hiddenGods: eightChar.getMonthShiShenZhi(),
      starStage: eightChar.getMonthDiShi(),
      xunKong: eightChar.getMonthXunKong(),
    }),
    makePillar({
      label: "日柱",
      stem: eightChar.getDayGan(),
      branch: eightChar.getDayZhi(),
      meaning: "自我与伴侣",
      naYin: eightChar.getDayNaYin(),
      tenGod: "日主",
      hiddenStems: eightChar.getDayHideGan(),
      hiddenGods: eightChar.getDayShiShenZhi(),
      starStage: eightChar.getDayDiShi(),
      xunKong: eightChar.getDayXunKong(),
    }),
    makePillar({
      label: "时柱",
      stem: eightChar.getTimeGan(),
      branch: eightChar.getTimeZhi(),
      meaning: "晚景与子女",
      naYin: eightChar.getTimeNaYin(),
      tenGod: eightChar.getTimeShiShenGan(),
      hiddenStems: eightChar.getTimeHideGan(),
      hiddenGods: eightChar.getTimeShiShenZhi(),
      starStage: eightChar.getTimeDiShi(),
      xunKong: eightChar.getTimeXunKong(),
    }),
  ];

  pillars.forEach((pillar) => {
    pillar.shenSha = getPillarShenSha(pillar, pillars);
  });

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

function makePillar({ label, stem, branch, meaning, naYin, tenGod, hiddenStems, hiddenGods, starStage, xunKong }) {
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
    hiddenStems: hiddenStems || [],
    hiddenGods: hiddenGods || [],
    secondaryStars: formatSecondaryStars(hiddenStems, hiddenGods),
    starStage,
    selfSitting: getChangShengStage(stem, branch),
    xunKong,
    shenSha: [],
  };
}

function formatSecondaryStars(hiddenStems = [], hiddenGods = []) {
  return hiddenStems.map((stem, index) => `${stem}${hiddenGods[index] ? `(${hiddenGods[index]})` : ""}`).join("、") || "无";
}

function getChangShengStage(stem, branch) {
  const stemIndex = stems.indexOf(stem);
  const branchIndex = branches.indexOf(branch);
  const offset = changShengOffset[stem];
  if (stemIndex < 0 || branchIndex < 0 || offset === undefined) return "未知";
  const stageIndex = mod(offset + (stemIndex % 2 === 0 ? branchIndex : -branchIndex), 12);
  return changShengStages[stageIndex];
}

function getPillarShenSha(pillar, pillars) {
  const yearBranch = pillars[0].branch;
  const dayStem = pillars[2].stem;
  const dayBranch = pillars[2].branch;
  const tags = new Set();

  if (tianYiBranches[dayStem]?.includes(pillar.branch)) tags.add("天乙贵人");
  if (wenChangBranch[dayStem] === pillar.branch) tags.add("文昌贵人");
  if (luShenBranch[dayStem] === pillar.branch) tags.add("禄神");
  if (yangRenBranch[dayStem] === pillar.branch) tags.add("羊刃");
  if (taiJiBranches[dayStem]?.includes(pillar.branch)) tags.add("太极贵人");
  if (hongLuanBranch[yearBranch] === pillar.branch) tags.add("红鸾");
  if (tianXiBranch[yearBranch] === pillar.branch) tags.add("天喜");

  addSanHeTags(tags, yearBranch, pillar.branch);
  addSanHeTags(tags, dayBranch, pillar.branch);

  return Array.from(tags);
}

function addSanHeTags(tags, baseBranch, targetBranch) {
  const group = sanHeShenSha.find((item) => item.branches.includes(baseBranch));
  if (!group) return;
  Object.entries(group.values).forEach(([name, branch]) => {
    if (branch === targetBranch) tags.add(name);
  });
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

function getElementStrategy(element) {
  return elementStrategy[element] || { asset: "可调动资源", risk: "节奏失衡", repair: "用固定行动修正" };
}

function getTenGodSignal(god) {
  return tenGodSignal[god] || `${god || "十神"}落在这里，提示该柱对应的人生领域需要结合现实处境细看。`;
}

function summarizeElementStructure(strongest, weakest) {
  const strong = getElementStrategy(strongest);
  const weak = getElementStrategy(weakest);
  return `${strongest}旺，优势集中在${strong.asset}；${weakest}弱，短板常出现在${weak.risk}。这张盘最顺的用法是先把${strongest}的长处做成稳定产出，再${weak.repair}，补住拖后腿的位置。`;
}

function summarizeTenGods(pillars) {
  const visible = pillars.map((pillar) => `${pillar.label}${pillar.tenGod}`).join("、");
  const hiddenCounts = {};
  pillars.forEach((pillar) => {
    pillar.hiddenGods.forEach((god) => {
      if (!god) return;
      hiddenCounts[god] = (hiddenCounts[god] || 0) + 1;
    });
  });
  const hiddenTop = Object.entries(hiddenCounts).sort((a, b) => b[1] - a[1]).slice(0, 2);
  const hiddenText = hiddenTop.length
    ? `藏干副星里${hiddenTop.map(([god, count]) => `${god}${count}处`).join("、")}较突出，底层动机不只看表面主星。`
    : "藏干副星不集中，判断重点放在四柱主星和五行强弱。";
  const month = pillars[1];
  const time = pillars[3];
  return `明面主星为${visible}。月柱${month.tenGod}主外部压力与事业取势，${getTenGodSignal(month.tenGod)}时柱${time.tenGod}主长期交付，${getTenGodSignal(time.tenGod)}${hiddenText}`;
}

function summarizePillarFlow(pillars) {
  return pillars
    .map((pillar) => {
      const stage = stageSignal[pillar.starStage] || "需要结合全盘节奏判断。";
      return `${pillar.label}${pillar.stem}${pillar.branch}看${pillarSignal[pillar.label]}，主星${pillar.tenGod}、星运${pillar.starStage}，${stage}`;
    })
    .join("；");
}

function summarizeSelfSitting(dayPillar) {
  const sitting = stageSignal[dayPillar.selfSitting] || "自坐状态需要结合日支关系判断。";
  return `日柱自坐${dayPillar.selfSitting}，亲密关系和自我恢复方式带有“${sitting}”的倾向；日支${dayPillar.branch}又显示${branchTone[dayPillar.branch]}`;
}

function summarizeShenSha(pillars) {
  const items = pillars.flatMap((pillar) => pillar.shenSha.map((name) => ({ pillar: pillar.label, name })));
  if (!items.length) {
    return "常用神煞没有明显集中，分析重点放在月柱、日柱、十神和五行结构。";
  }
  const text = items
    .slice(0, 6)
    .map(({ pillar, name }) => `${pillar}${name}：${shenShaSignal[name] || "提示该领域有额外触发点"}`)
    .join("；");
  const more = items.length > 6 ? `；另有${items.length - 6}处神煞作为辅助参考` : "";
  return `${text}${more}。`;
}

function renderPillarMetaRows(pillar) {
  const rows = [
    ["主星", pillar.tenGod],
    ["天干", `${pillar.stem}（${pillar.stemElement}）`],
    ["地支", `${pillar.branch}（${pillar.branchElement}）`],
    ["藏干", pillar.hiddenStems.join("、") || "无"],
    ["副星", pillar.secondaryStars],
    ["星运", pillar.starStage],
    ["自坐", pillar.selfSitting],
    ["空亡", pillar.xunKong],
    ["纳音", pillar.naYin],
    ["神煞", pillar.shenSha.length ? pillar.shenSha.join("、") : "无"],
  ];

  return rows
    .map(
      ([label, value]) => `
        <div class="pillar-row">
          <b>${escapeHtml(label)}</b>
          <span>${escapeHtml(value)}</span>
        </div>
      `,
    )
    .join("");
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
          <div class="pillar-head">
            <span>${escapeHtml(pillar.label)} · ${escapeHtml(pillar.meaning)}</span>
            <strong>${escapeHtml(pillar.stem)}${escapeHtml(pillar.branch)}</strong>
          </div>
          <div class="pillar-meta">
            ${renderPillarMetaRows(pillar)}
          </div>
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
  const yearPillar = chart.pillars[0];
  const monthPillar = chart.pillars[1];
  const dayPillar = chart.pillars[2];
  const timePillar = chart.pillars[3];
  const locationText = profile.location ? `出生地：${escapeHtml(profile.location)}。` : "出生地未填，本次先按日期与时间排盘。";
  reading.innerHTML = `
    <p><strong>命盘定调：</strong>${dayPillar.stem}${dayPillar.branch}日，日元属${chart.dayMaster}，四柱为${chart.eightCharText}。${dayMasterReading[chart.dayMaster]} ${summarizeElementStructure(strongest, weakest)}</p>
    <p><strong>月令取势：</strong>${monthPillar.stem}${monthPillar.branch}月柱压住全盘现实节奏，主星${monthPillar.tenGod}、星运${monthPillar.starStage}。${getTenGodSignal(monthPillar.tenGod)}${stageSignal[monthPillar.starStage] || ""} 当前节令：${chart.nearestTerm}。</p>
    <p><strong>十神结构：</strong>${summarizeTenGods(chart.pillars)}</p>
    <p><strong>四柱联动：</strong>${summarizePillarFlow(chart.pillars)}。${summarizeSelfSitting(dayPillar)}。${summarizeShenSha(chart.pillars)}</p>
    <p><strong>排盘依据：</strong>公历 ${chart.solarText}；农历 ${chart.lunarText}；生肖${chart.zodiac}；命宫${chart.mingGong}，身宫${chart.shenGong}。${locationText}</p>
  `;

  const angles = lifeAngles[chart.dayMaster];
  const nameCards = analyzeName(profile.name, chart, strongest, weakest);
  insights.innerHTML = [
    ["性格底色", `${profile.name}${angles.personality} 日柱${dayPillar.stem}${dayPillar.branch}自坐${dayPillar.selfSitting}，日支${dayPillar.branch}显示${branchTone[dayPillar.branch]}外在选择和内在安全感会一起牵动，越能把反应变成清楚表达，越不容易陷入情绪消耗。`],
    ["事业方向", `${angles.career} 月柱${monthPillar.stem}${monthPillar.branch}见${monthPillar.tenGod}，事业上最该用${strongest}的优势切入：${getElementStrategy(strongest).asset}。同时要补${weakest}的短板，尤其是${getElementStrategy(weakest).risk}，否则容易强项很亮、执行结构不稳。`],
    ["财运节奏", `${angles.money} 年柱${yearPillar.tenGod}和时柱${timePillar.tenGod}会影响资源入口与长期收益；若短期机会很多，先看现金流、合同、复盘和止损线，不要只凭当下热度决定投入。`],
    ["感情婚恋", `${angles.love} 日支为${dayPillar.branch}，神煞为${dayPillar.shenSha.length ? dayPillar.shenSha.join("、") : "无明显集中"}。关系里最怕长期猜测，越能把期待、边界和修复方式说清楚，越容易把吸引力变成稳定感。`],
    ["健康作息", angles.health],
    ["人际贵人", angles.social],
    ["学习成长", angles.study],
    ["近期策略", `${weakest}偏少时，优先补${getElementStrategy(weakest).repair}；${strongest}偏旺时，主动把${getElementStrategy(strongest).asset}放到工作、人际和长期项目里。接下来最适合做的是：减少模糊消耗，固定一个输出节奏，把强项变成别人看得见的成果。`],
    ["结构判断", `${strongest}旺让你在${getElementStrategy(strongest).asset}上更容易出成绩，${weakest}弱则会在${getElementStrategy(weakest).risk}上反复扣分。判断这张盘时，重点不是追求五行平均，而是让旺处有出口、弱处有制度，行动才会越来越稳。`],
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
      ["姓名气质", `姓名未填，本次不展开名字与命盘的呼应。当前盘面先看${strongest}旺、${weakest}弱，个人标签更适合围绕${getElementStrategy(strongest).asset}建立。`],
    ];
  }

  const chars = Array.from(name).filter((char) => /[\u4e00-\u9fff]/.test(char));
  if (!chars.length) {
    return [
      ["姓名气质", `当前姓名没有识别到汉字，名字气质不纳入判断。盘面重点仍是${chart.dayMaster}日元、${strongest}旺和${weakest}弱。`],
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
    ? `名字里有${weakest}意象，能补盘里偏弱的${weakest}，外在印象会比命盘本身更柔和完整。适合把这种气质放进个人介绍、作品主题和公开表达里。`
    : `名字里暂时没有明显${weakest}意象，外在标签会更靠${nameElements[0] || strongest}发力。若要补盘面短板，可在昵称、签名、头像、作品主题和常用表达里加入${weakest}的气质。`;
  const lengthTone =
    chars.length <= 2
      ? "名字短，记忆点直接，适合走清爽利落的个人风格；后续要靠作品、职业标签和稳定输出补足层次。"
      : "名字层次较丰富，适合塑造有故事感、温和但不单薄的个人印象；内容、品牌和社交场景里更容易做叙事。";
  const unknownText = unknown.length ? `“${unknown.join("、")}”没有明显五行偏旁，按中性看。` : "姓名字形五行较清楚。";

  return [
    ["姓名五行", `${display}。整体名字偏${nameElements[0] || "中性"}，命盘日元为${chart.dayMaster}，${strongest}旺、${weakest}弱。${unknownText} 名字若贴近${strongest}，个人标签更鲜明；若呼应${weakest}，外在印象更补盘。`],
    ["名字与命盘", relation],
    ["名字气质", `${lengthTone} 与其把名字单独看，不如把它和职业标签、头像、简介、作品风格放在一起经营，让别人第一次接触你时就能感到稳定一致。`],
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
