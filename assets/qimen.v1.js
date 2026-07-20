(function () {
  const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const STEM_WUXING = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];
  const BRANCH_WUXING = ["水", "土", "木", "木", "土", "火", "火", "土", "金", "金", "土", "水"];
  const JIAZI = Array.from({ length: 60 }, (_, index) => `${STEMS[index % 10]}${BRANCHES[index % 12]}`);
  const JIEQI_NAMES = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
  const SANQI_ORDER = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"];
  const XUNSHOU_LIUYI = ["戊", "己", "庚", "辛", "壬", "癸"];
  const LUOSHU_ORDER = [1, 8, 3, 4, 9, 2, 7, 6];
  const GRID_ORDER = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  const OPPOSITE = { 1: 9, 9: 1, 2: 8, 8: 2, 3: 7, 7: 3, 4: 6, 6: 4 };
  const SHENG = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
  const KE = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };

  const PALACES = {
    1: { id: 1, name: "坎1宫", short: "坎", direction: "北", wuxing: "水", dizhi: "子", xiantian: 6, houtian: 1, weishu: "1-6", bagua: "坎" },
    2: { id: 2, name: "坤2宫", short: "坤", direction: "西南", wuxing: "土", dizhi: "未申", xiantian: 8, houtian: 2, weishu: "2-7", bagua: "坤" },
    3: { id: 3, name: "震3宫", short: "震", direction: "东", wuxing: "木", dizhi: "卯", xiantian: 4, houtian: 3, weishu: "3-8", bagua: "震" },
    4: { id: 4, name: "巽4宫", short: "巽", direction: "东南", wuxing: "木", dizhi: "辰巳", xiantian: 5, houtian: 4, weishu: "3-8", bagua: "巽" },
    5: { id: 5, name: "中5宫", short: "中", direction: "中", wuxing: "土", dizhi: "", xiantian: 0, houtian: 5, weishu: "5-0", bagua: "中" },
    6: { id: 6, name: "乾6宫", short: "乾", direction: "西北", wuxing: "金", dizhi: "戌亥", xiantian: 1, houtian: 6, weishu: "4-9", bagua: "乾" },
    7: { id: 7, name: "兑7宫", short: "兑", direction: "西", wuxing: "金", dizhi: "酉", xiantian: 2, houtian: 7, weishu: "4-9", bagua: "兑" },
    8: { id: 8, name: "艮8宫", short: "艮", direction: "东北", wuxing: "土", dizhi: "丑寅", xiantian: 7, houtian: 8, weishu: "5-0", bagua: "艮" },
    9: { id: 9, name: "离9宫", short: "离", direction: "南", wuxing: "火", dizhi: "午", xiantian: 3, houtian: 9, weishu: "2-7", bagua: "离" },
  };

  const STAR_NAMES = ["天蓬", "天内", "天冲", "天辅", "天禽", "天心", "天柱", "天任", "天英"];
  const STAR_WUXING = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
  const STAR_JIXI = ["凶", "凶", "吉", "吉", "中", "吉", "凶", "吉", "凶"];
  const GATE_NAMES = ["休门", "死门", "伤门", "杜门", "中", "开门", "惊门", "生门", "景门"];
  const GATE_WUXING = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
  const GATE_JIXI = ["吉", "凶", "凶", "中", "中", "吉", "凶", "吉", "中"];
  const DEITY_YANG = ["值符", "螣蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"];
  const DEITY_YIN = ["值符", "九天", "九地", "玄武", "白虎", "六合", "太阴", "螣蛇"];
  const STATE_NAMES = ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"];
  const STATE_START = {
    甲: [10, 1],
    乙: [6, -1],
    丙: [2, 1],
    丁: [9, -1],
    戊: [2, 1],
    己: [9, -1],
    庚: [5, 1],
    辛: [0, -1],
    壬: [8, 1],
    癸: [3, -1],
  };
  const JU_MAP = {
    阳遁: { 23: [1, 7, 4], 0: [2, 8, 5], 1: [3, 9, 6], 2: [8, 5, 2], 3: [9, 6, 3], 4: [1, 7, 4], 5: [3, 9, 6], 6: [4, 1, 7], 7: [5, 2, 8], 8: [4, 1, 7], 9: [5, 2, 8], 10: [6, 3, 9] },
    阴遁: { 11: [9, 3, 6], 12: [8, 2, 5], 13: [7, 1, 4], 14: [2, 5, 8], 15: [1, 4, 7], 16: [9, 3, 6], 17: [7, 1, 4], 18: [6, 9, 3], 19: [5, 8, 2], 20: [6, 9, 3], 21: [5, 8, 2], 22: [4, 7, 1] },
  };
  const GUA_NAMES = {
    乾乾: "乾为天", 乾兑: "天泽履", 乾离: "天火同人", 乾震: "天雷无妄", 乾巽: "天风姤", 乾坎: "天水讼", 乾艮: "天山遯", 乾坤: "天地否",
    兑乾: "泽天夬", 兑兑: "兑为泽", 兑离: "泽火革", 兑震: "泽雷随", 兑巽: "泽风大过", 兑坎: "泽水困", 兑艮: "泽山咸", 兑坤: "泽地萃",
    离乾: "火天大有", 离兑: "火泽睽", 离离: "离为火", 离震: "火雷噬嗑", 离巽: "火风鼎", 离坎: "火水既济", 离艮: "火山旅", 离坤: "火地晋",
    震乾: "雷天大壮", 震兑: "雷泽归妹", 震离: "雷火丰", 震震: "震为雷", 震巽: "雷风恒", 震坎: "雷水解", 震艮: "雷山小过", 震坤: "雷地豫",
    巽乾: "风天小畜", 巽兑: "风泽中孚", 巽离: "风火家人", 巽震: "风雷益", 巽巽: "巽为风", 巽坎: "风水涣", 巽艮: "风山渐", 巽坤: "风地观",
    坎乾: "水天需", 坎兑: "水泽节", 坎离: "水火既济", 坎震: "水雷屯", 坎巽: "水风井", 坎坎: "坎为水", 坎艮: "水山蹇", 坎坤: "水地比",
    艮乾: "山天大畜", 艮兑: "山泽损", 艮离: "山火贲", 艮震: "山雷颐", 艮巽: "山风蛊", 艮坎: "山水蒙", 艮艮: "艮为山", 艮坤: "山地剥",
    坤乾: "地天泰", 坤兑: "地泽临", 坤离: "地火明夷", 坤震: "地雷复", 坤巽: "地风升", 坤坎: "地水师", 坤艮: "地山谦", 坤坤: "坤为地",
  };
  const DOOR_BAGUA = { 休: "坎", 生: "艮", 伤: "震", 杜: "巽", 景: "离", 死: "坤", 惊: "兑", 开: "乾" };

  const PAIR_PATTERNS = {
    庚加戊: { name: "值符飞宫", luck: "凶", meaning: "庚金克制值符戊土所遁之甲，长官受阻、客方不利，主官灾阻碍。" },
    庚加己: { name: "刑格", luck: "凶", meaning: "庚己相合中带刑，官司牵连、是非纠缠，事情容易被拖累。" },
    庚加庚: { name: "战格", luck: "大凶", meaning: "两金相击如两军对峙，主客俱伤，争斗不休，金气太盛。" },
    庚加辛: { name: "白虎干格", luck: "凶", meaning: "金上加金刚过头，道路阻塞，谋事有阻，出行多受限制。" },
    庚加壬: { name: "大格(上格)", luck: "凶", meaning: "尊卑失序，以下犯上，移动不利，远行需要格外谨慎。" },
    庚加癸: { name: "小格(下格)", luck: "凶", meaning: "暗昧不明，小人暗害，事情多隐晦，不宜靠猜测推进。" },
    庚加丙: { name: "太白入荧", luck: "吉(利客)", meaning: "火克金，我克敌方，利客主动出击，先发者更容易得势。" },
    庚加丁: { name: "亭亭之格", luck: "凶", meaning: "金克火伤文书，信息、考试、合同与手续多波折。" },
    庚加乙: { name: "太白逢星", luck: "凶", meaning: "金克木伤日奇，官灾横祸、女性相关议题与婚恋易受伤。" },
    丙加庚: { name: "荧入太白", luck: "凶中有吉", meaning: "火克金为贼来就我，利客方先发制人，也要防硬碰硬。" },
    戊加戊: { name: "伏吟", luck: "平", meaning: "值符伏吟，事情不动，忧虑迟疑，容易原地踏步。" },
    戊加乙: { name: "青龙合灵", luck: "吉", meaning: "贵人扶持，利求财谋事，阴柔之助能让门户增辉。" },
    戊加丙: { name: "青龙返首", luck: "大吉", meaning: "值符朝阳，百事皆宜，利出行、官禄、财帛与显达。" },
    戊加丁: { name: "青龙耀明", luck: "吉", meaning: "官贵文书吉利，升迁有望，考试、证照、求财较顺。" },
    戊加己: { name: "贵人入狱", luck: "平", meaning: "合中有绊，事可成但迟缓，贵人力量被现实条件困住。" },
    戊加庚: { name: "值符飞宫", luck: "凶", meaning: "上遇阻碍，有官灾口舌，出行不利，贵人难以施力。" },
    戊加辛: { name: "青龙折足", luck: "凶", meaning: "谋事有阻，行路受伤，贵人力不从心，成果有折损。" },
    戊加壬: { name: "青龙入天牢", luck: "凶", meaning: "困顿牢狱之象，出行遇水、流程卡住、事不通达。" },
    戊加癸: { name: "青龙华盖", luck: "平", meaning: "利遁藏隐匿，不利显达，贵人或资源被遮住。" },
    乙加乙: { name: "日奇伏吟", luck: "平", meaning: "日奇伏吟，事滞不前，柔性关系与希望感容易郁结。" },
    乙加丙: { name: "奇仪相佐", luck: "吉", meaning: "木火通明，利考试文章，才华展露，功名可就。" },
    乙加丁: { name: "奇仪相佐", luck: "吉", meaning: "阴人助力，文书吉利，暗中有贵人相帮。" },
    乙加戊: { name: "利阴害阳", luck: "平", meaning: "利女性、柔性、私下之事，于强攻显达帮助有限。" },
    乙加己: { name: "日奇入地", luck: "吉", meaning: "地遁基础，利女事、隐匿遁藏、田宅安稳。" },
    乙加庚: { name: "日奇被刑", luck: "凶", meaning: "金克木伤日奇，道路遇阻，婚恋与女性相关议题易受损。" },
    乙加辛: { name: "青龙逃走", luck: "凶", meaning: "人财两失，贵人远遁，求财落空，承诺容易散掉。" },
    乙加壬: { name: "日奇入地网", luck: "凶", meaning: "日奇困于水网，出行不利，易被信息或人情牵误。" },
    乙加癸: { name: "日奇华盖", luck: "平(偏吉)", meaning: "云遁基础，利隐遁修道、深度学习，不宜急求显达。" },
    丙加丙: { name: "月奇悖师", luck: "凶", meaning: "火气过旺反为害，口舌是非，文书重叠生乱。" },
    丙加戊: { name: "飞鸟跌穴", luck: "大吉", meaning: "天遁基础，光明在上，百事亨通，利求财出行。" },
    丙加乙: { name: "日月并行", luck: "吉", meaning: "贵人相助，事业兴旺，公私两利，光辉照耀。" },
    丙加丁: { name: "月奇朱雀", luck: "吉", meaning: "消息传播迅速，利考试发表、宣传、信息流通。" },
    丙加己: { name: "月奇入地", luck: "平", meaning: "辛劳有成，火入土中有暗光，先难后易。" },
    丙加辛: { name: "悖格", luck: "凶", meaning: "悖逆乖张，是非口舌，火金相战，事多违拗。" },
    丙加壬: { name: "火入天罗", luck: "凶", meaning: "水火相战，凶灾频生，口舌官非，火厄水灾。" },
    丙加癸: { name: "月奇华盖", luck: "平", meaning: "阴阳相碍，光明被蒙蔽，事多不透，需等信息清楚。" },
    丁加丁: { name: "星奇伏吟", luck: "平", meaning: "文书停滞，信息重复，灵感有却推进慢。" },
    丁加戊: { name: "青龙转光", luck: "吉", meaning: "文书遇贵人，官运亨通，利求名利禄，升迁有期。" },
    丁加乙: { name: "人遁吉格", luck: "吉", meaning: "阴人帮助，暗中有扶持，利私密筹划与柔性协作。" },
    丁加丙: { name: "星月相会", luck: "吉", meaning: "光明正大，文武双全，利功名、事业、公开表现。" },
    丁加己: { name: "火入勾陈", luck: "平(偏凶)", meaning: "田宅纠纷，文书牵涉土地，事情缓慢而多烦。" },
    丁加庚: { name: "亭亭之格", luck: "凶", meaning: "文书受阻，金克丁火，科举、合同、信息传递不顺。" },
    丁加辛: { name: "朱雀入狱", luck: "凶", meaning: "文书损坏，信息走漏，机密或证据容易暴露。" },
    丁加壬: { name: "星奇入天牢", luck: "平", meaning: "人遁基础，文书迟缓，事需等待，适合暗中运筹。" },
    丁加癸: { name: "朱雀投江", luck: "凶", meaning: "文书破损，消息断绝，灯灭火灭，信息链条弱。" },
    己加戊: { name: "犬遇青龙", luck: "平", meaning: "事可成但有约束，合中有制，需要贵人点化。" },
    己加乙: { name: "墓神不明", luck: "平(偏凶)", meaning: "暗昧不清，事理难辨，像入墓中寻找方向。" },
    己加丙: { name: "火悖地户", luck: "平", meaning: "暗中交易、地下活动、私下谋事有微光。" },
    己加丁: { name: "朱雀入墓", luck: "凶", meaning: "文书隐藏，事不明朗，消息埋没，证据易被压住。" },
    己加己: { name: "地户伏吟", luck: "凶", meaning: "大地沉闷无生气，万事不动，如陷泥潭。" },
    己加庚: { name: "刑格返名", luck: "平", meaning: "事有人助但费力，先刑后成，目标可曲折达成。" },
    己加辛: { name: "入狱自刑", luck: "凶", meaning: "暗中互耗，自我消磨，阴人陷害，事事不顺。" },
    己加壬: { name: "地网高张", luck: "凶", meaning: "困阵四布，利设伏，不利出行远征，容易被困受制。" },
    己加癸: { name: "地刑玄武", luck: "凶", meaning: "暗昧欺诈，盗窃暗害，防小人暗算。" },
    辛加戊: { name: "困龙被伤", luck: "凶", meaning: "辛金克伤值符戊土所遁之甲，上司受损，易得罪贵人。" },
    辛加乙: { name: "白虎猖狂", luck: "凶", meaning: "金克木残害日奇，凶暴横行，血光之灾。" },
    辛加丙: { name: "太白入荧反吟", luck: "平(偏凶)", meaning: "表面合作暗藏祸心，口蜜腹剑，暗中作对。" },
    辛加丁: { name: "狱神得奇", luck: "平(利捕捉)", meaning: "利缉拿追捕，牢狱之灾可解，文书仍有挽回空间。" },
    辛加己: { name: "入墓返吟", luck: "凶", meaning: "暗淡无光，入死地，万事不遂，前途不清。" },
    辛加庚: { name: "白虎出力", luck: "凶", meaning: "两金相激，争斗好勇，武力冲突、斗殴受伤。" },
    辛加辛: { name: "伏吟天庭", luck: "凶", meaning: "刑罚加重，公门中人受累，讼事拖延加剧。" },
    辛加壬: { name: "凶蛇入狱", luck: "凶", meaning: "阴人作祟，牵缠暗害不断，恶梦惊悸。" },
    辛加癸: { name: "天牢华盖", luck: "平", meaning: "利潜藏避祸，不宜出头，适合暗中自保。" },
    壬加戊: { name: "小蛇化龙", luck: "吉", meaning: "以小搏大，贵人提拔，卑微者得遇明主。" },
    壬加乙: { name: "小蛇得势", luck: "吉", meaning: "水生木得助，柔顺发展，渐进有成。" },
    壬加丙: { name: "水蛇入火", luck: "凶", meaning: "水火不容，口舌是非，灾祸并至。" },
    壬加丁: { name: "蛇夭矫", luck: "平(偏吉)", meaning: "柔中带刚，曲折前行，暗中运筹可成。" },
    壬加己: { name: "天网四张", luck: "凶", meaning: "被困受制，四方无路，出行大忌。" },
    壬加庚: { name: "太白擒蛇", luck: "平", meaning: "以强制弱，事虽可成但受人制约。" },
    壬加辛: { name: "螣蛇相缠", luck: "平(偏凶)", meaning: "牵扯纠缠，是非不断，阴人纠葛，事多拖延。" },
    壬加壬: { name: "蛇入地罗", luck: "凶", meaning: "水势泛滥，沉溺困顿，容易不能自拔。" },
    壬加癸: { name: "幼女奸淫", luck: "凶", meaning: "暗昧阴气重，防色祸、隐秘关系和暗害。" },
    癸加戊: { name: "天乙会合", luck: "吉", meaning: "天地交泰，阴阳和合，百事和谐，贵人相会。" },
    癸加乙: { name: "华盖逢星", luck: "吉", meaning: "华盖庇佑日奇，利修道隐居，有贵人暗助。" },
    癸加丙: { name: "华盖悖师", luck: "凶", meaning: "权威受损，光明被遮，威信容易下降。" },
    癸加丁: { name: "螣蛇夭矫", luck: "凶", meaning: "灭烛之象，文书尽毁，信息链条薄弱。" },
    癸加己: { name: "华盖地户", luck: "凶", meaning: "天网加地网，暗无天日，事情受困严重。" },
    癸加庚: { name: "太白钺", luck: "平", meaning: "借刑罚之力，以威制事，利官府执法，不利普通求谋。" },
    癸加辛: { name: "天牢网盖", luck: "凶", meaning: "天网地网齐张，万事晦暗，需先脱困再推进。" },
    癸加壬: { name: "复见螣蛇", luck: "凶", meaning: "水患不止，阴邪之气弥漫，事情反复缠绕。" },
    癸加癸: { name: "华盖伏吟", luck: "大凶", meaning: "至暗无光，天地闭塞，万物不生，宜止损收束。" },
  };

  const PALACE_DETAIL = {
    1: "坎宫主流动、信息、风险、隐情、肾水与深层欲望。它像局中的水道，能藏事、带消息，也能让事情绕行。吉时利谈判、休养、研究、交通、水业、跨区域流通；凶时多疑、拖延、暗耗、失物、酒色或被信息误导。",
    2: "坤宫主承载、土地、母系、群众、后勤、地产与身体消化系统。它的力量不在突然爆发，而在把散乱的人事物收拢起来。吉时利置业、合作、生产、仓储、照顾与长期积累；凶时易沉重、保守、拖累、病符或因人情压力难抽身。",
    3: "震宫主启动、响动、竞争、交通、军警、行动欲和突发变化。它像一声雷，能催动停滞，也会把隐藏矛盾震出来。吉时适合开局、追进度、运动、技术突破；凶时容易冲动、口舌、受伤、车辆问题或先动后悔。",
    4: "巽宫主风、渗透、文书、传播、技术、渠道、女性柔性力量与隐蔽流通。它擅长从缝隙里进入局面，靠沟通、策划和细节改变形势。吉时利签约、学习、传播、设计、远程协作；凶时易反复、犹豫、泄密、暧昧不清。",
    5: "中宫主枢纽、调停、权衡、过渡与全盘气机的中转。中宫无门，天禽居中而需寄宫，所以它更多显示事情的核心压力、协调难度和中心人物。这里强时能整合全局，弱时会成为各方拉扯的焦点。",
    6: "乾宫主权力、规则、领导、父辈、机构、远行、天空与高位资源。它看事情能否取得正式许可、权威背书和清晰规则。吉时利求官、谈判、开拓、远行、融资、见贵人；凶时易强硬、官非、压力上升或被制度卡住。",
    7: "兑宫主口舌、表达、交易、金钱出口、审美、娱乐、少女与损伤。它擅长把想法说出、把产品卖出，也会把争议放大。吉时利销售、公关、谈判、娱乐、成交；凶时防争吵、破财、伤口、合同漏洞和说多错多。",
    8: "艮宫主停止、边界、山、库存、房产、少男、积蓄和身体关节。它有刹车、守门和蓄势的作用。吉时利存钱、修造、定规矩、守成、沉淀资产；凶时容易卡顿、固执、进退两难、慢性堵塞或项目压住不动。",
    9: "离宫主光明、曝光、证照、文书、审美、传媒、火电与眼目。它让事情被看见，也考验名声与事实是否一致。吉时利考试、宣传、发布、求名、形象建设；凶时易虚火、口舌、血光、夸张包装和过度追求面子。",
  };

  const STAR_DETAIL = {
    天蓬: { focus: "暗线、风险、欲望、谋略、流动资源", use: "适合暗中筹划、研究竞争对手、水业流通和风险谈判", caution: "要防贪念、骗局、酒色、失物和被欲望牵着走" },
    天内: { focus: "问题、疾病、修复、学习、慢性麻烦", use: "适合检查漏洞、治病问药、复盘旧事和处理遗留问题", caution: "容易把小问题拖成长期消耗，需早查早补" },
    天冲: { focus: "行动、速度、突破、交通、竞争", use: "适合主动开局、追进度、抢窗口和处理突发任务", caution: "快是优势，冲动是代价，先定边界再加速" },
    天辅: { focus: "文昌、教育、策划、辅助、贵人", use: "适合学习考试、写作合同、顾问协作和方法论沉淀", caution: "过度顾虑会削弱执行，需要把方案落成步骤" },
    天禽: { focus: "中正、统筹、调和、土地、核心人物", use: "适合整合资源、调停关系、稳定组织和处理中心议题", caution: "吉凶随宫而变，容易把各方压力集中到一点" },
    天心: { focus: "领导、医疗、财务、策略、规则", use: "适合求官求医、经营管理、审计规划和关键决策", caution: "判断力强时别过硬，要让规则被人愿意执行" },
    天柱: { focus: "口舌、破坏、声音、执法、拆旧立新", use: "适合辩论、维修、法务、销售说服和处理破局问题", caution: "言辞、合同、刀兵与损伤要谨慎，避免越说越僵" },
    天任: { focus: "责任、守成、地产、积蓄、稳定执行", use: "适合长期建设、存量经营、土木地产和稳扎稳打", caution: "节奏慢时别硬拖，设置期限才能避免沉没成本" },
    天英: { focus: "曝光、文采、形象、传媒、火气", use: "适合发布、考试、演讲、设计、品牌和证照事务", caution: "漂亮不等于扎实，热度越高越要核对事实" },
  };

  const GATE_DETAIL = {
    休门: { focus: "休养、贵人、交际、调和、流动", use: "利求见、谈判、休整、旅游和柔性推进", caution: "过于安逸时会慢下来，需明确下一步动作" },
    死门: { focus: "终止、旧账、土地、病灶、沉重压力", use: "利结束、清算、整理遗留、安葬与处理固定资产", caution: "不宜强开新局，先看哪里该止损、该封存" },
    伤门: { focus: "竞争、损伤、追讨、车辆、强行动", use: "利追债、竞技、抓问题、赶进度和维权", caution: "防冲突、受伤、交通风险和硬碰硬带来的代价" },
    杜门: { focus: "闭塞、保密、技术、隐藏、防守", use: "利研发、避险、保密、专利、修墙设界", caution: "信息不通会拖慢局面，需留一个可控出口" },
    开门: { focus: "开创、公开、事业、领导、通关", use: "利开业、求职、见领导、上任、远行和正式发布", caution: "开门也主暴露，秘密事务要防提前公开" },
    惊门: { focus: "口舌、惊恐、诉讼、声音、争议", use: "利辩论、诉讼、谈判施压、提醒风险", caution: "言语会放大后果，证据不足时少下判断" },
    生门: { focus: "财利、生产、房产、生长、现金流", use: "利求财、投资、置业、经营、生产和恢复生机", caution: "生门也会让牵连继续，坏项目要先止血" },
    景门: { focus: "文书、证照、宣传、考试、光亮", use: "利发布、考试、广告、拍摄、设计和名声经营", caution: "防虚名、争辩、火气和文书细节出错" },
  };

  const DEITY_DETAIL = {
    值符: { focus: "主贵人、权威、总纲、核心资源", advice: "此神临宫，事情容易围绕关键人物或最高原则展开，适合求助权威、抓主线、定标准。" },
    螣蛇: { focus: "主虚惊、缠绕、梦象、反复变化", advice: "此神临宫，事情多弯曲与心理消耗，宜核实信息、减少猜测，避免被情绪牵缠。" },
    太阴: { focus: "主暗助、保护、私下筹划、女性贵人", advice: "此神临宫，适合低调推进、做幕后准备、保留余地，贵人常在暗处。" },
    六合: { focus: "主合作、婚姻、中介、谈判、和合", advice: "此神临宫，适合谈合作、找中间人、修复关系，关键在利益与承诺讲清。" },
    白虎: { focus: "主伤灾、压力、执法、强硬、刀兵", advice: "此神临宫，适合处理硬问题，但要防冲突升级、身体损伤、合同惩罚与强制手段。" },
    玄武: { focus: "主暗昧、盗耗、隐情、欺瞒、失物", advice: "此神临宫，信息透明度较低，宜查账、查证、查来源，少做口头承诺。" },
    九地: { focus: "主稳定、隐藏、低处、仓储、守成", advice: "此神临宫，利守不利攻，适合囤积实力、稳住底盘、做长期防守。" },
    九天: { focus: "主高处、远行、扩张、公开、志向", advice: "此神临宫，利向外发展、提高目标、远行开拓，但计划要落地，别只凭气势。" },
  };

  const STEM_DETAIL = {
    戊: "戊为甲子所遁，主资本、首领、厚土、平台与承载力。落宫有资源和责任，也容易把事情压重。",
    己: "己主策划、细节、私下安排、田园与曲折心思。落宫适合整理内部结构，也要防想法绕太多。",
    庚: "庚主阻隔、执行、刀兵、规则冲突和强硬力量。落宫常见压力点，适合攻坚，也要防伤损。",
    辛: "辛主错误、修正、精细、刑罚、创新和小金属。落宫提示要查细节、改漏洞，别怕返工。",
    壬: "壬主流动、远行、信息、人流、欲望和大水。落宫容易有变动机会，也要防散乱和失控。",
    癸: "癸主暗水、牵挂、底层问题、欲望、迟疑和隐秘。落宫需要耐心摸底，先清障再推进。",
    丁: "丁为星奇，主文书、灵感、灯火、证据、技术亮点。落宫利精巧表达，也怕信息熄灭或泄露。",
    丙: "丙为月奇，主光明、权威、曝光、热度和希望。落宫容易被看见，适合公开推进，忌虚火过旺。",
    乙: "乙为日奇，主柔性贵人、医药、女性、转机、艺术和协调。落宫适合以柔克刚、修复关系。",
  };

  const QUESTION_RULES = {
    事业: [{ type: "gate", name: "开门" }, { type: "star", name: "天心" }],
    求财: [{ type: "gate", name: "生门" }, { type: "deity", name: "六合" }],
    婚姻感情: [{ type: "deity", name: "六合" }, { type: "gate", name: "景门" }, { type: "stem", name: "乙" }],
    疾病健康: [{ type: "star", name: "天内" }, { type: "gate", name: "死门" }],
    出行: [{ type: "gate", name: "开门" }, { type: "deity", name: "九天" }],
    官司诉讼: [{ type: "gate", name: "伤门" }, { type: "star", name: "天英" }],
    寻人寻物: [{ type: "deity", name: "六合" }, { type: "gate", name: "杜门" }],
    天气: [{ type: "gate", name: "景门" }, { type: "star", name: "天英" }],
    家宅风水: [{ type: "gate", name: "生门" }, { type: "star", name: "天任" }],
  };

  const form = document.querySelector("#qimen-form");
  const profileSelect = document.querySelector("#qimen-profile-select");
  const saveProfileButton = document.querySelector("#qimen-save-profile");
  const profileStatus = document.querySelector("#qimen-profile-status");
  const summary = document.querySelector("#qimen-summary");
  const board = document.querySelector("#qimen-board");
  const detail = document.querySelector("#qimen-detail");
  const analysis = document.querySelector("#qimen-analysis");
  let activeChart = null;
  let resizeTimer = null;

  setupProfiles();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const profile = BaziProfiles.readForm(form);
      const data = new FormData(form);
      const options = {
        plateUse: data.get("plateUse") || "event",
        questionType: data.get("questionType") || "事业",
        tianqinMode: data.get("tianqinMode") || "follow-tiannei",
      };
      const chart = computeQimen(profile, options);
      renderQimen(chart);
    } catch (error) {
      summary.innerHTML = "";
      board.innerHTML = "";
      detail.innerHTML = `<p class="eyebrow">无法排盘</p><h2>请检查输入</h2><p>${escapeHtml(error.message)}</p>`;
      analysis.innerHTML = "";
    }
  });

  board?.addEventListener("click", (event) => {
    const palaceEl = event.target.closest(".qimen-palace");
    if (!palaceEl || !activeChart) return;
    const palace = activeChart.palaces[Number(palaceEl.dataset.palace)];
    selectPalace(activeChart, palace.id);
  });

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const selected = board?.querySelector(".qimen-palace.is-selected");
      if (!activeChart || !selected) return;
      selectPalace(activeChart, Number(selected.dataset.palace));
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
      setStatus(`已载入 ${profile.name} 的档案。`);
    });

    saveProfileButton?.addEventListener("click", () => {
      try {
        if (!form.reportValidity()) {
          setStatus("请先补全姓名和日期。");
          return;
        }
        const saved = BaziProfiles.saveProfile(BaziProfiles.readForm(form));
        refresh();
        profileSelect.value = saved.id;
        setStatus(`已保存 ${saved.name} 的生日档案。`);
      } catch (error) {
        setStatus(error.message);
      }
    });
  }

  function setStatus(message) {
    if (profileStatus) profileStatus.textContent = message;
  }

  function computeQimen(profile, options) {
    if (!window.Solar || !window.Lunar) {
      throw new Error("历法库没有加载成功，请刷新页面后再试。");
    }
    if (!profile.date) {
      throw new Error("请先填写日期。");
    }

    const resolved = resolveSolar(profile);
    const solar = resolved.solar;
    const year = solar.getYear();
    const month = solar.getMonth();
    const day = solar.getDay();
    const hour = solar.getHour();
    const minute = solar.getMinute();
    const stamp = solarStamp(solar);
    const termEvents = getTermEvents(year);
    const currentTerm = findCurrentTerm(termEvents, stamp);
    const prevJie = findPrevJie(termEvents, stamp);
    const nextJie = findNextJie(termEvents, stamp);
    if (!currentTerm || !prevJie || !nextJie) {
      throw new Error("节气数据不足，暂时无法起局。");
    }

    const lichun = findTermForSolarYear(termEvents, "立春", year);
    const useYear = lichun && stamp < lichun.stamp ? year - 1 : year;
    const yearGz = calYearGanzhiIndex(useYear);
    const monthNum = monthNumFromJie(prevJie.index);
    const monthGz = calMonthGanzhiIndex(yearGz % 10, monthNum);
    const dayGz = calDayGanzhiIndex(year, month, day);
    const hourGz = calHourGanzhiIndex(dayGz, hour);
    const ju = determineJu({ year, month, day, hour, minute, stamp, termEvents, currentTerm });
    const plate = buildPlate(hourGz, dayGz, ju, options.tianqinMode);
    const palaces = assemblePalaces(plate, ju, { dayGz, hourGz });
    const zhishiPalace = Object.values(palaces).find((palace) => palace.gateIndex === plate.zhishiGateIndex && palace.id !== 5)?.id || plate.zhishiTargetPalace;
    const yigua = calcYigua(plate.zhifuTargetPalace, zhishiPalace, palaces);
    const seasonal = calcSeasonalStrength(monthNum);
    const yongshen = markYongshen(palaces, options.questionType);
    const specialPatterns = collectSpecialPatterns(palaces);

    const chart = {
      profile,
      options,
      solarText: solar.toYmdHms(),
      lunarText: resolved.lunar.toString(),
      pillars: {
        year: ganzhiName(yearGz),
        month: ganzhiName(monthGz),
        day: ganzhiName(dayGz),
        hour: ganzhiName(hourGz),
      },
      indexes: { yearGz, monthGz, dayGz, hourGz },
      jieqi: { current: currentTerm.name, prevJie, nextJie },
      ju,
      plate,
      palaces,
      zhifuPalace: plate.zhifuTargetPalace,
      zhishiPalace,
      yigua,
      seasonal,
      yongshen,
      specialPatterns,
    };

    localStorage.setItem("bazi:lastQimen", JSON.stringify({ chart, savedAt: Date.now() }));
    return chart;
  }

  function resolveSolar(profile) {
    const [year, month, day] = String(profile.date).split("-").map(Number);
    const [hour, minute] = String(profile.time || "12:00").split(":").map(Number);
    if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(minute)) {
      throw new Error("日期或时间格式不完整。");
    }
    if (profile.calendar === "农历") {
      const lunarMonth = profile.leapMonth ? -month : month;
      const lunar = Lunar.fromYmdHms(year, lunarMonth, day, hour, minute, 0);
      return { solar: lunar.getSolar(), lunar };
    }
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    return { solar, lunar: solar.getLunar() };
  }

  function getTermEvents(year) {
    const events = [];
    const seen = new Set();
    for (let termYear = year - 1; termYear <= year + 2; termYear += 1) {
      const table = Lunar.fromYmd(termYear, 1, 1).getJieQiTable();
      JIEQI_NAMES.forEach((name, index) => {
        const solar = table[name];
        if (!solar) return;
        const key = `${name}-${solar.toYmdHms()}`;
        if (seen.has(key)) return;
        seen.add(key);
        events.push({ name, index, solar, stamp: solarStamp(solar) });
      });
    }
    return events.sort((a, b) => a.stamp - b.stamp);
  }

  function findCurrentTerm(events, stamp) {
    return events.filter((event) => event.stamp <= stamp).at(-1) || events[0];
  }

  function findPrevJie(events, stamp) {
    return events.filter((event) => event.index % 2 === 0 && event.stamp <= stamp).at(-1);
  }

  function findNextJie(events, stamp) {
    return events.find((event) => event.index % 2 === 0 && event.stamp > stamp);
  }

  function findTermForSolarYear(events, name, solarYear) {
    return events.find((event) => event.name === name && event.solar.getYear() === solarYear);
  }

  function determineJu(input) {
    const term = input.currentTerm;
    const jdnJieqi = gregorianToJdn(term.solar.getYear(), term.solar.getMonth(), term.solar.getDay());
    const gzJieqi = jdnToGanzhiIndex(jdnJieqi);
    const chaoshenDays = findUpperYuanFutouOffset(gzJieqi);
    const jdnNow = gregorianToJdn(input.year, input.month, input.day);
    const daysSinceJieqi = jdnNow - jdnJieqi;
    const daysSinceFutou = daysSinceJieqi + chaoshenDays;
    let totalCycleDays = 15;
    let isRun = false;
    if (chaoshenDays > 9 && (term.index === 10 || term.index === 22)) {
      totalCycleDays = 30;
      isRun = true;
    }

    let effectiveTerm = term;
    let effectiveDays = daysSinceFutou;
    if (daysSinceFutou >= totalCycleDays) {
      const termIndex = input.termEvents.indexOf(term);
      const nextTerm = input.termEvents[termIndex + 1];
      let doSwitch = false;
      if (nextTerm) {
        const nextJdn = gregorianToJdn(nextTerm.solar.getYear(), nextTerm.solar.getMonth(), nextTerm.solar.getDay());
        if (jdnNow >= nextJdn) doSwitch = true;
      }
      if (term.index % 2 === 1) doSwitch = true;
      if (doSwitch && nextTerm) {
        effectiveTerm = nextTerm;
        effectiveDays = daysSinceFutou - totalCycleDays;
      }
    }

    if (daysSinceFutou < totalCycleDays) {
      const termIndex = input.termEvents.indexOf(term);
      const prevTerm = input.termEvents[termIndex - 1];
      if (prevTerm && (prevTerm.index === 10 || prevTerm.index === 22)) {
        const prevJdn = gregorianToJdn(prevTerm.solar.getYear(), prevTerm.solar.getMonth(), prevTerm.solar.getDay());
        const prevChaoshen = findUpperYuanFutouOffset(jdnToGanzhiIndex(prevJdn));
        if (prevChaoshen > 9) {
          const daysFromPrevFutou = jdnNow - (prevJdn - prevChaoshen);
          if (daysFromPrevFutou < 30) {
            effectiveTerm = prevTerm;
            effectiveDays = daysFromPrevFutou;
            totalCycleDays = 30;
            isRun = true;
          }
        }
      }
    }

    const yuanDay = mod(effectiveDays, 15);
    const yuanIndex = yuanDay < 5 ? 0 : yuanDay < 10 ? 1 : 2;
    const yuan = ["上元", "中元", "下元"][yuanIndex];
    const type = isYangDun(effectiveTerm.index) ? "阳遁" : "阴遁";
    const num = JU_MAP[type]?.[effectiveTerm.index]?.[yuanIndex];
    if (!num) throw new Error(`缺少局数映射：${type} ${effectiveTerm.name} ${yuan}`);
    return {
      type,
      num,
      yuan,
      yuanIndex,
      isRun,
      currentTerm: term.name,
      effectiveTerm: effectiveTerm.name,
      effectiveTermIndex: effectiveTerm.index,
      chaoshenDays,
      daysSinceFutou,
      totalCycleDays,
    };
  }

  function buildPlate(hourGz, dayGz, ju, tianqinMode) {
    const earth = Array(10).fill("");
    const earthIndex = Array(10).fill(-1);
    let palace = ju.num;
    const step = ju.type === "阳遁" ? 1 : -1;
    SANQI_ORDER.forEach((stem, index) => {
      earth[palace] = stem;
      earthIndex[palace] = index;
      palace += step;
      if (palace > 9) palace = 1;
      if (palace < 1) palace = 9;
    });

    const liuyiIndex = Math.floor(mod(hourGz, 60) / 10);
    const liuyiStem = XUNSHOU_LIUYI[liuyiIndex];
    const zhifuOrigPalace = earth.findIndex((stem) => stem === liuyiStem);
    if (zhifuOrigPalace < 1) throw new Error("无法定位旬首六仪。");
    const zhifuStarIndex = zhifuOrigPalace - 1;
    const zhifuStar = STAR_NAMES[zhifuStarIndex];
    const gatePalace = zhifuOrigPalace === 5 ? 2 : zhifuOrigPalace;
    const zhishiGateIndex = gatePalace - 1;
    const zhishiGate = GATE_NAMES[zhishiGateIndex];

    const heaven = Array(10).fill(-1);
    const heavenStem = Array(10).fill("");
    let hourStem = STEMS[hourGz % 10];
    if (hourStem === "甲") hourStem = XUNSHOU_LIUYI[Math.floor(hourGz / 10)];
    const zhifuTargetPalace = earth.findIndex((stem) => stem === hourStem);
    if (zhifuTargetPalace < 1) throw new Error("无法定位时干落宫。");
    let origForRot = zhifuOrigPalace === 5 ? 2 : zhifuOrigPalace;
    let targetForRot = zhifuTargetPalace === 5 ? 2 : zhifuTargetPalace;
    const offset = luoshuPos(targetForRot) - luoshuPos(origForRot);
    for (let starIndex = 0; starIndex <= 8; starIndex += 1) {
      if (starIndex === 4) continue;
      const defaultPalace = starIndex + 1;
      const newPos = mod(luoshuPos(defaultPalace) + offset, 8);
      const newPalace = LUOSHU_ORDER[newPos];
      heaven[newPalace] = starIndex;
      heavenStem[newPalace] = earth[defaultPalace];
    }

    let tianqinPalace = 2;
    if (zhifuStarIndex === 4 || tianqinMode === "follow-zhifu") {
      tianqinPalace = targetForRot;
    } else if (tianqinMode === "jikun") {
      tianqinPalace = 2;
    } else {
      tianqinPalace = heaven.findIndex((starIndex, palaceIndex) => palaceIndex !== 5 && starIndex === 1);
      if (tianqinPalace < 1) tianqinPalace = 2;
    }

    const human = Array(10).fill(-1);
    const xunShou = hourGz - (hourGz % 10);
    let branchSteps = (hourGz % 12) - (xunShou % 12);
    if (branchSteps < 0) branchSteps += 12;
    let stepPalace = zhifuOrigPalace;
    for (let count = 0; count < branchSteps; count += 1) {
      stepPalace += step;
      if (stepPalace > 9) stepPalace = 1;
      if (stepPalace < 1) stepPalace = 9;
    }
    if (stepPalace === 5) {
      stepPalace += step;
      if (stepPalace > 9) stepPalace = 1;
      if (stepPalace < 1) stepPalace = 9;
    }
    const ringOffset = luoshuPos(stepPalace) - luoshuPos(gatePalace);
    for (let index = 0; index < 8; index += 1) {
      const defaultPalace = LUOSHU_ORDER[index];
      const newPalace = LUOSHU_ORDER[mod(index + ringOffset, 8)];
      human[newPalace] = defaultPalace - 1;
    }

    const deity = Array(10).fill(-1);
    const deityStart = zhifuTargetPalace === 5 ? 2 : zhifuTargetPalace;
    const deityStartPos = luoshuPos(deityStart);
    for (let index = 0; index < 8; index += 1) {
      const p = LUOSHU_ORDER[mod(deityStartPos + index, 8)];
      deity[p] = index;
    }

    return {
      earth,
      earthIndex,
      heaven,
      heavenStem,
      human,
      deity,
      liuyiStem,
      zhifuOrigPalace,
      zhifuTargetPalace,
      zhifuStarIndex,
      zhifuStar,
      zhishiGateIndex,
      zhishiGate,
      zhishiTargetPalace: stepPalace,
      tianqinPalace,
      tianqinMode,
      deityNames: ju.type === "阳遁" ? DEITY_YANG : DEITY_YIN,
    };
  }

  function assemblePalaces(plate, ju, indexes) {
    const kong = calcKongwang(indexes.hourGz);
    const yima = calcYima(indexes.hourGz);
    const tianma = calcTianma(indexes.dayGz);
    const dingma = calcDingma(indexes.dayGz);
    const result = {};
    for (let id = 1; id <= 9; id += 1) {
      const meta = PALACES[id];
      const starIndex = id === 5 ? 4 : plate.heaven[id];
      const gateIndex = plate.human[id];
      const tianGan = id === 5 ? plate.earth[5] : plate.heavenStem[id];
      const diGan = plate.earth[id];
      const deityIndex = plate.deity[id];
      const palace = {
        ...meta,
        starIndex,
        starName: starIndex >= 0 ? STAR_NAMES[starIndex] : "",
        starWuxing: starIndex >= 0 ? STAR_WUXING[starIndex] : "",
        starLuck: starIndex >= 0 ? STAR_JIXI[starIndex] : "",
        gateIndex,
        gateName: gateIndex >= 0 && gateIndex !== 4 ? GATE_NAMES[gateIndex] : "",
        gateWuxing: gateIndex >= 0 ? GATE_WUXING[gateIndex] : "",
        gateLuck: gateIndex >= 0 ? GATE_JIXI[gateIndex] : "",
        deityIndex,
        deityName: deityIndex >= 0 ? plate.deityNames[deityIndex] : "",
        tianGan,
        diGan,
        tianGanWuxing: stemWuxing(tianGan),
        diGanWuxing: stemWuxing(diGan),
        state: calcTwelveState(tianGan, meta.dizhi),
        isKong: meta.dizhi.includes(BRANCHES[kong[0]]) || meta.dizhi.includes(BRANCHES[kong[1]]),
        isYima: meta.dizhi.includes(BRANCHES[yima]),
        isTianma: meta.dizhi.includes(BRANCHES[tianma]),
        isDingma: meta.dizhi.includes(BRANCHES[dingma]),
        isTianqinHost: plate.tianqinPalace === id,
        patterns: [],
        yongshenHits: [],
      };
      palace.patterns = calcPalacePatterns(palace, plate, ju);
      result[id] = palace;
    }
    return result;
  }

  function calcPalacePatterns(palace, plate) {
    if (palace.id === 5) return [{ tag: "中宫", text: "中宫无门，为全盘枢纽，天禽由这里寄往外宫参与判断。" }];
    const tags = [];
    if (palace.tianGan === "庚") tags.push({ tag: "庚", text: "天盘见庚，主阻隔、刀兵、强制与突然压力。" });
    if (palace.isKong) tags.push({ tag: "空亡", text: "时柱空亡落此，事情有落空、缺席、延迟或信息不实的倾向。" });
    if (palace.isYima) tags.push({ tag: "驿马", text: "驿马到宫，主移动、变更、外出、换位与消息流动。" });
    if (palace.isTianma) tags.push({ tag: "天马", text: "天马到宫，主动性增强，常与远行、抬升、突然转换相关。" });
    if (palace.isDingma) tags.push({ tag: "丁马", text: "丁马到宫，文书、消息、细微信号与暗中变化被激活。" });
    if (isLiuyiJixing(palace)) tags.push({ tag: "击刑", text: "六仪击刑，主内外相逼、冲撞受伤、规则与行动彼此伤害。" });
    if (isGravePalace(stemWuxing(palace.tianGan), palace.id)) tags.push({ tag: "干墓", text: "天盘干入墓，主该天干象意被收束，事情有沉埋、停顿、难伸展之象。" });
    if (isGravePalace(palace.starWuxing, palace.id)) tags.push({ tag: "星墓", text: "九星入墓，星曜主事力被压住，表现为人事迟滞或能力难以释放。" });
    if (isGravePalace(palace.gateWuxing, palace.id)) tags.push({ tag: "门墓", text: "门入墓，行动入口被压住，求开门、求财、求动时要先清障。" });
    if (palace.gateWuxing && KE[palace.gateWuxing] === palace.wuxing) tags.push({ tag: "门迫", text: "门克宫，事情推进会挤压本宫空间，常见不得不做、做了又耗的压力。" });
    if (palace.tianGanWuxing && palace.diGanWuxing && KE[palace.tianGanWuxing] === palace.diGanWuxing) tags.push({ tag: "迫制", text: "天盘干克地盘干，上层动作压住底层条件，适合管控，也容易关系紧。" });
    const starHome = palace.starIndex + 1;
    if (starHome === palace.id) tags.push({ tag: "星伏吟", text: "星回本宫，主旧事、原位、熟悉路径，稳但不快。" });
    if (OPPOSITE[starHome] === palace.id) tags.push({ tag: "星反吟", text: "星落对冲宫，主反复、翻转、方向变化，事态容易来回。" });
    const gateHome = palace.gateIndex + 1;
    if (palace.gateName && gateHome === palace.id) tags.push({ tag: "门伏吟", text: "门回本宫，行动方式循旧，适合守成，不宜强求快速变化。" });
    if (palace.gateName && OPPOSITE[gateHome] === palace.id) tags.push({ tag: "门反吟", text: "门落对宫，事情入口与现实方位相冲，容易改期、折返或换方案。" });
    if (palace.tianGan && palace.diGan && palace.tianGan === palace.diGan) tags.push({ tag: "干伏吟", text: "天盘干与地盘干相同，主同气反复、原事重提、内部循环。" });
    const opposite = OPPOSITE[palace.id];
    if (opposite && palace.tianGan && plate.earth[opposite] === palace.tianGan) tags.push({ tag: "干反吟", text: "天盘干对应对宫地盘干，主对向牵动、消息折返、关系反复。" });
    const pair = PAIR_PATTERNS[`${palace.tianGan}加${palace.diGan}`];
    if (pair) tags.push({ tag: pair.name, text: `${pair.luck}：${pair.meaning}` });
    if (palace.diGan === "丁" && palace.gateIndex === plate.zhishiGateIndex) tags.push({ tag: "玉女守门", text: "丁奇临值使门所在处，利阴柔贵人、私下筹划、婚恋与文书求合。" });
    if (palace.tianGan === "乙" && palace.id === 4) tags.push({ tag: "乙奇升殿", text: "乙在巽四，日奇得位，利医药、柔性贵人、文书与转机。" });
    if (palace.tianGan === "丙" && palace.id === 9) tags.push({ tag: "丙奇升殿", text: "丙在离九，月奇得位，利曝光、名声、考试与公开推动。" });
    if (palace.tianGan === "丁" && palace.id === 7) tags.push({ tag: "丁奇升殿", text: "丁在兑七，星奇得位，利精巧信息、证据、文书和谈判表达。" });
    return tags;
  }

  function markYongshen(palaces, questionType) {
    const rules = QUESTION_RULES[questionType] || QUESTION_RULES.事业;
    const hits = [];
    Object.values(palaces).forEach((palace) => {
      rules.forEach((rule, priority) => {
        const matched =
          (rule.type === "gate" && palace.gateName === rule.name) ||
          (rule.type === "star" && (palace.starName === rule.name || (rule.name === "天禽" && palace.isTianqinHost))) ||
          (rule.type === "deity" && palace.deityName === rule.name) ||
          (rule.type === "stem" && (palace.tianGan === rule.name || palace.diGan === rule.name));
        if (!matched) return;
        const hit = { palaceId: palace.id, palaceName: palace.name, priority, ...rule };
        palace.yongshenHits.push(hit);
        hits.push(hit);
      });
    });
    return hits;
  }

  function collectSpecialPatterns(palaces) {
    return Object.values(palaces)
      .flatMap((palace) => palace.patterns.filter((item) => !["中宫"].includes(item.tag)).map((item) => ({ ...item, palaceId: palace.id, palaceName: palace.name })))
      .slice(0, 24);
  }

  function calcYigua(zhifuPalace, zhishiPalace, palaces) {
    const inner = PALACES[zhifuPalace]?.bagua;
    const outer = PALACES[zhishiPalace]?.bagua;
    const fushi = inner && outer && inner !== "中" && outer !== "中" ? `${GUA_NAMES[`${outer}${inner}`] || ""}(外${outer}内${inner})` : "";
    Object.values(palaces).forEach((palace) => {
      if (!palace.gateName || palace.bagua === "中") {
        palace.yigua = "";
        return;
      }
      const doorBagua = DOOR_BAGUA[palace.gateName.slice(0, 1)];
      palace.yigua = GUA_NAMES[`${doorBagua}${palace.bagua}`] || "";
    });
    return fushi;
  }

  function renderQimen(chart) {
    activeChart = chart;
    renderSummary(chart);
    renderBoard(chart);
    renderAnalysis(chart);
    selectPalace(chart, chart.zhifuPalace || 1);
  }

  function renderSummary(chart) {
    const patterns = chart.specialPatterns.slice(0, 5).map((item) => `${item.palaceName}${item.tag}`).join("、") || "无明显特殊格局";
    const yongshen = chart.yongshen.map((item) => `${item.name}在${item.palaceName}`).join("、") || "未定位用神";
    summary.innerHTML = `
      <article class="panel compat-overview qimen-overview">
        <div>
          <p class="eyebrow">${escapeHtml(chart.options.plateUse === "birth" ? "生日局" : "问事局")} · ${escapeHtml(chart.options.questionType)}</p>
          <h2>${escapeHtml(chart.profile.name || "未命名")} · ${escapeHtml(chart.ju.type)}${chart.ju.num}局 · ${escapeHtml(chart.ju.yuan)}</h2>
          <p>公历 ${escapeHtml(chart.solarText)}；农历 ${escapeHtml(chart.lunarText)}。四柱为 ${chart.pillars.year} ${chart.pillars.month} ${chart.pillars.day} ${chart.pillars.hour}。当前节气 ${escapeHtml(chart.jieqi.current)}，定局取 ${escapeHtml(chart.ju.effectiveTerm)}，${chart.ju.isRun ? "本局触发置闰延长周期。" : "本局按常规三元周期运行。"}值符 ${escapeHtml(chart.plate.zhifuStar)} 到 ${escapeHtml(PALACES[chart.zhifuPalace].name)}，值使 ${escapeHtml(chart.plate.zhishiGate)} 到 ${escapeHtml(PALACES[chart.zhishiPalace].name)}。</p>
          <p>用神：${escapeHtml(yongshen)}。格局摘录：${escapeHtml(patterns)}。旺衰：${escapeHtml(chart.seasonal.text)}。${chart.yigua ? `值符值使演卦：${escapeHtml(chart.yigua)}。` : ""}</p>
        </div>
        <div class="qimen-seal" aria-hidden="true">
          <strong>${chart.ju.num}</strong>
          <span>${escapeHtml(chart.ju.type)}</span>
        </div>
      </article>
    `;
  }

  function renderBoard(chart) {
    board.innerHTML = `
      <svg class="qimen-links" aria-hidden="true"></svg>
      ${GRID_ORDER.map((id) => renderPalaceCell(chart, chart.palaces[id])).join("")}
    `;
  }

  function renderPalaceCell(chart, palace) {
    const tags = [
      palace.id === chart.zhifuPalace ? "值符" : "",
      palace.id === chart.zhishiPalace ? "值使" : "",
      palace.yongshenHits.length ? "用神" : "",
      palace.isTianqinHost ? "天禽寄" : "",
      ...palace.patterns.slice(0, 3).map((item) => item.tag),
    ].filter(Boolean);
    return `
      <button class="qimen-palace${palace.id === chart.zhifuPalace ? " is-zhifu" : ""}${palace.id === chart.zhishiPalace ? " is-zhishi" : ""}${palace.yongshenHits.length ? " is-yongshen" : ""}" type="button" data-palace="${palace.id}">
        <span class="qimen-palace-head"><strong>${escapeHtml(palace.name)}</strong><em>${escapeHtml(palace.direction)} · ${escapeHtml(palace.wuxing)}</em></span>
        <span class="qimen-layer"><b>天</b>${escapeHtml(palace.tianGan || "--")} <b>地</b>${escapeHtml(palace.diGan || "--")}</span>
        <span class="qimen-symbols">
          <i>${escapeHtml(palace.starName || "--")}${palace.isTianqinHost && palace.starName !== "天禽" ? " + 天禽" : ""}</i>
          <i>${escapeHtml(palace.gateName || "无门")}</i>
          <i>${escapeHtml(palace.deityName || "--")}</i>
        </span>
        <span class="qimen-tags">${tags.map((tag) => `<small>${escapeHtml(tag)}</small>`).join("")}</span>
      </button>
    `;
  }

  function renderAnalysis(chart) {
    const valueText = buildValueText(chart);
    const useText = buildYongshenText(chart);
    const patternText = buildPatternText(chart);
    const palaceCards = GRID_ORDER.map((id) => chart.palaces[id])
      .map((palace) => `
        <article class="deep-card qimen-reading-card" data-palace-card="${palace.id}">
          <h2>${escapeHtml(palace.name)} · ${escapeHtml(palace.direction)}</h2>
          <p>${escapeHtml(buildPalaceNarrative(chart, palace, false))}</p>
          <p class="basis">${escapeHtml(compactBasis(palace))}</p>
        </article>
      `)
      .join("");
    analysis.innerHTML = `
      <article class="deep-card highlight-card">
        <h2>全盘结构</h2>
        <p>${escapeHtml(buildOverviewText(chart))}</p>
      </article>
      <article class="deep-card">
        <h2>值符值使</h2>
        <p>${escapeHtml(valueText)}</p>
      </article>
      <article class="deep-card">
        <h2>用神落宫</h2>
        <p>${escapeHtml(useText)}</p>
      </article>
      <article class="deep-card">
        <h2>格局与风险</h2>
        <p>${escapeHtml(patternText)}</p>
      </article>
      ${palaceCards}
    `;
  }

  function selectPalace(chart, palaceId) {
    const palace = chart.palaces[palaceId];
    if (!palace) return;
    const related = relatedPalaceIds(chart, palace);
    board.querySelectorAll(".qimen-palace").forEach((item) => {
      const id = Number(item.dataset.palace);
      item.classList.toggle("is-selected", id === palaceId);
      item.classList.toggle("is-related", related.includes(id));
    });
    analysis.querySelectorAll("[data-palace-card]").forEach((item) => {
      item.classList.toggle("is-selected-card", Number(item.dataset.palaceCard) === palaceId);
    });
    detail.innerHTML = buildDetailHtml(chart, palace);
    drawLinks(chart, palace, related);
  }

  function relatedPalaceIds(chart, palace) {
    return unique([
      OPPOSITE[palace.id],
      chart.zhifuPalace,
      chart.zhishiPalace,
      chart.plate.zhifuOrigPalace,
      chart.plate.tianqinPalace,
      ...chart.yongshen.map((item) => item.palaceId),
    ].filter((id) => id && id !== palace.id));
  }

  function drawLinks(chart, palace, related) {
    const svg = board.querySelector(".qimen-links");
    if (!svg) return;
    const boardRect = board.getBoundingClientRect();
    const source = board.querySelector(`[data-palace="${palace.id}"]`);
    if (!source) return;
    const sourcePoint = centerPoint(source.getBoundingClientRect(), boardRect);
    svg.innerHTML = related
      .map((id) => {
        const target = board.querySelector(`[data-palace="${id}"]`);
        if (!target) return "";
        const targetPoint = centerPoint(target.getBoundingClientRect(), boardRect);
        const kind = id === OPPOSITE[palace.id] ? "opposite" : id === chart.zhifuPalace || id === chart.zhishiPalace ? "value" : "use";
        return `<line class="${kind}" x1="${sourcePoint.x}" y1="${sourcePoint.y}" x2="${targetPoint.x}" y2="${targetPoint.y}"></line>`;
      })
      .join("");
  }

  function buildDetailHtml(chart, palace) {
    const blocks = [
      ["宫位", buildPalaceNarrative(chart, palace, true)],
      ["星门神", buildSymbolText(palace)],
      ["天干克应", buildStemPatternText(palace)],
      ["相互作用", buildInteractionText(chart, palace)],
      ["行动建议", buildActionText(chart, palace)],
    ];
    const tags = [
      palace.id === chart.zhifuPalace ? "值符宫" : "",
      palace.id === chart.zhishiPalace ? "值使宫" : "",
      palace.yongshenHits.length ? "用神宫" : "",
      palace.isTianqinHost ? "天禽寄宫" : "",
      ...palace.patterns.map((item) => item.tag),
    ].filter(Boolean);
    return `
      <p class="eyebrow">${escapeHtml(palace.name)} · ${escapeHtml(palace.direction)} · ${escapeHtml(palace.wuxing)}</p>
      <h2>${escapeHtml(palace.starName || "中宫")} ${escapeHtml(palace.gateName || "无门")} ${escapeHtml(palace.deityName || "")}</h2>
      <div class="qimen-detail-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      ${blocks.map(([title, text]) => `<div class="detail-block"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></div>`).join("")}
    `;
  }

  function buildOverviewText(chart) {
    const typeText = `${chart.ju.type}${chart.ju.num}局`;
    const jieText = chart.ju.currentTerm === chart.ju.effectiveTerm ? `当前节气${chart.ju.currentTerm}` : `当前节气${chart.ju.currentTerm}，置闰取${chart.ju.effectiveTerm}`;
    const gates = Object.values(chart.palaces).filter((p) => p.gateName).reduce((acc, p) => {
      acc[p.gateLuck] = (acc[p.gateLuck] || 0) + 1;
      return acc;
    }, {});
    const stars = Object.values(chart.palaces).filter((p) => p.starName).reduce((acc, p) => {
      acc[p.starLuck] = (acc[p.starLuck] || 0) + 1;
      return acc;
    }, {});
    return `${typeText}以${jieText}定局，地盘三奇六仪从${chart.ju.num}宫起布，${chart.ju.type === "阳遁" ? "顺行" : "逆行"}九宫。全盘值符为${chart.plate.zhifuStar}，从${PALACES[chart.plate.zhifuOrigPalace].name}起而随时干转到${PALACES[chart.zhifuPalace].name}；值使为${chart.plate.zhishiGate}，落${PALACES[chart.zhishiPalace].name}，所以主体力量与事情入口分别看这两宫。八门中吉门${gates.吉 || 0}处、中门${gates.中 || 0}处、凶门${gates.凶 || 0}处；九星中吉星${stars.吉 || 0}处、中星${stars.中 || 0}处、凶星${stars.凶 || 0}处。${chart.seasonal.text}，这会影响木火土金水五类象意的得力程度。`;
  }

  function buildValueText(chart) {
    const zhifu = chart.palaces[chart.zhifuPalace];
    const zhishi = chart.palaces[chart.zhishiPalace];
    const relation = relationPhrase(zhifu.wuxing, zhishi.wuxing);
    return `值符看主体、贵人、核心掌控力，本局${chart.plate.zhifuStar}为值符，落${zhifu.name}。${buildPalaceShort(zhifu)}值使看事情入口、执行门路和应期，本局${chart.plate.zhishiGate}落${zhishi.name}。${buildPalaceShort(zhishi)}两宫五行关系为${relation}，表示核心意志和执行入口之间的配合方式。若值符宫强而值使宫受克，想法有高度但落地成本上升；若值使宫得门得神，哪怕格局有阻，也能靠步骤、手续和人事推进。`;
  }

  function buildYongshenText(chart) {
    if (!chart.yongshen.length) return `本页按${chart.options.questionType}取用神，但当前盘面未定位到对应星门神干，需要重点回看值符值使与日干时干。`;
    return chart.yongshen
      .map((hit) => {
        const palace = chart.palaces[hit.palaceId];
        return `${hit.name}为${chart.options.questionType}的${hit.typeLabel || yongshenTypeLabel(hit.type)}用神，落${palace.name}。${buildPalaceShort(palace)}此宫的${palace.patterns.length ? `主要标记有${palace.patterns.slice(0, 3).map((item) => item.tag).join("、")}` : "显性阻碍较少"}，判断时要把${hit.name}自身象意、落宫五行、星门神组合一起看。`;
      })
      .join("");
  }

  function buildPatternText(chart) {
    if (!chart.specialPatterns.length) {
      return "本局没有特别密集的命名克应，判断重点落在值符值使、用神宫、门迫迫制与空亡驿马。没有大格局并不等于无事，通常表示事情更依赖日常条件、执行顺序和人事配合。";
    }
    return chart.specialPatterns
      .slice(0, 8)
      .map((item) => `${item.palaceName}见${item.tag}，${item.text}`)
      .join(" ");
  }

  function buildPalaceNarrative(chart, palace, full) {
    const starText = palace.starName ? `${palace.starName}属${palace.starWuxing}，主${STAR_DETAIL[palace.starName].focus}，落此会把${STAR_DETAIL[palace.starName].use}的倾向带入${palace.name}。` : "此宫无外转九星，重点看中宫与寄宫的协调。";
    const gateText = palace.gateName ? `${palace.gateName}属${palace.gateWuxing}，主${GATE_DETAIL[palace.gateName].focus}，行动上${GATE_DETAIL[palace.gateName].use}。` : "中宫无八门，行动入口要看天禽寄往何宫和值使门所在宫。";
    const deityText = palace.deityName ? `${palace.deityName}临宫，${DEITY_DETAIL[palace.deityName].focus}；${DEITY_DETAIL[palace.deityName].advice}` : "八神不入中宫，中心压力由寄宫承接。";
    const stemText = palace.tianGan && palace.diGan ? `天盘${palace.tianGan}加地盘${palace.diGan}，${STEM_DETAIL[palace.tianGan] || ""}${PAIR_PATTERNS[`${palace.tianGan}加${palace.diGan}`] ? `克应为${PAIR_PATTERNS[`${palace.tianGan}加${palace.diGan}`].name}，${PAIR_PATTERNS[`${palace.tianGan}加${palace.diGan}`].meaning}` : `上下干关系为${relationPhrase(palace.tianGanWuxing, palace.diGanWuxing)}，需要看上层动作与底层条件是否互相成就。`}` : "";
    const markerText = palace.patterns.length ? `本宫标记：${palace.patterns.map((item) => `${item.tag}(${item.text})`).join("；")}` : "本宫没有明显格局标记，判断更看星门神与五行关系。";
    const useText = palace.yongshenHits.length ? `同时这里也是${chart.options.questionType}用神宫，${palace.yongshenHits.map((hit) => hit.name).join("、")}落此，相关问题会优先从这个方向取象。` : "";
    const base = `${palace.name}在${palace.direction}方，属${palace.wuxing}${palace.dizhi ? `，纳地支${palace.dizhi}` : ""}。${PALACE_DETAIL[palace.id]}`;
    if (!full) {
      return `${base}${starText}${gateText}${deityText}${stemText}${useText}${markerText}`;
    }
    const opposite = chart.palaces[OPPOSITE[palace.id]];
    const link = opposite ? `对宫为${opposite.name}，对面有${opposite.starName || "中宫"}、${opposite.gateName || "无门"}、${opposite.deityName || "无神"}，两边形成${relationPhrase(palace.wuxing, opposite.wuxing)}。点击时被点亮的宫位用于观察本宫与对面条件、值符值使、用神之间的拉动关系。` : "";
    return `${base}${starText}${gateText}${deityText}${stemText}${useText}${markerText}${link}`;
  }

  function buildSymbolText(palace) {
    const star = palace.starName ? `${palace.starName}的核心是${STAR_DETAIL[palace.starName].focus}，${STAR_DETAIL[palace.starName].caution}。与本宫五行关系为${relationPhrase(palace.starWuxing, palace.wuxing)}。` : "";
    const tianqin = palace.isTianqinHost ? "天禽由中宫寄到这里，表示中心协调、关键人物或总压力会在此宫落脚，吉凶跟随本宫星门神一起判断。" : "";
    const gate = palace.gateName ? `${palace.gateName}给出行动入口：${GATE_DETAIL[palace.gateName].use}；提醒是${GATE_DETAIL[palace.gateName].caution}。门与宫五行为${relationPhrase(palace.gateWuxing, palace.wuxing)}。` : "此宫无门，事情不从这里直接打开，要看值使门与天禽寄宫。";
    const deity = palace.deityName ? `${palace.deityName}提示人事气氛：${DEITY_DETAIL[palace.deityName].advice}` : "";
    return [star, tianqin, gate, deity].filter(Boolean).join("");
  }

  function buildStemPatternText(palace) {
    if (palace.id === 5) return `中宫地盘为${palace.diGan}，天禽居中，重在枢纽调度。${STEM_DETAIL[palace.diGan] || ""}`;
    const pair = PAIR_PATTERNS[`${palace.tianGan}加${palace.diGan}`];
    const relation = relationPhrase(palace.tianGanWuxing, palace.diGanWuxing);
    const pairText = pair ? `命名克应为${pair.name}，吉凶取${pair.luck}，含义是${pair.meaning}。` : `未命中命名克应，先看${relation}。`;
    const markers = palace.patterns.length ? `额外标记有${palace.patterns.map((item) => item.tag).join("、")}。${palace.patterns.map((item) => item.text).join("")}` : "";
    return `天盘${palace.tianGan}、地盘${palace.diGan}。${STEM_DETAIL[palace.tianGan] || ""}${STEM_DETAIL[palace.diGan] || ""}${pairText}${markers}`;
  }

  function buildInteractionText(chart, palace) {
    const parts = [];
    const opposite = chart.palaces[OPPOSITE[palace.id]];
    if (opposite) {
      parts.push(`对宫${opposite.name}带${opposite.starName || "中宫"}、${opposite.gateName || "无门"}、${opposite.deityName || "无神"}，与本宫宫气为${relationPhrase(palace.wuxing, opposite.wuxing)}；${symbolReaction(palace, opposite)}。`);
    }
    if (palace.id !== chart.zhifuPalace) {
      const zf = chart.palaces[chart.zhifuPalace];
      parts.push(`值符宫在${zf.name}，它代表主体和贵人。与本宫比较，${symbolReaction(zf, palace)}，所以要看核心意志能否真正支持本宫主题。`);
    } else {
      parts.push("本宫就是值符宫，主体、贵人、关键资源在这里集中，读盘时它的星门神优先级最高。");
    }
    if (palace.id !== chart.zhishiPalace) {
      const zs = chart.palaces[chart.zhishiPalace];
      parts.push(`值使宫在${zs.name}，执行入口由${zs.gateName}掌管。它和本宫的关系为${relationPhrase(zs.wuxing, palace.wuxing)}，表示事情真正落地时会通过${zs.direction}方、${zs.gateName}象意或相关人事来牵动本宫。`);
    } else {
      parts.push("本宫也是值使门所在处，事情从这里开口，应期、手续、行动路线都要优先看本宫。");
    }
    if (palace.yongshenHits.length) {
      parts.push(`此宫命中${palace.yongshenHits.map((hit) => hit.name).join("、")}用神，${chart.options.questionType}的结果会直接受这里星门神、空亡驿马和克应影响。`);
    }
    return parts.join("");
  }

  function buildActionText(chart, palace) {
    const gateAdvice = palace.gateName ? GATE_DETAIL[palace.gateName].use : "先处理中心协调，再找值使门开口";
    const risk = palace.patterns.filter((item) => /凶|空亡|门迫|迫制|击刑|庚|反吟|墓/.test(item.text + item.tag)).slice(0, 3);
    const riskText = risk.length ? `要先处理${risk.map((item) => item.tag).join("、")}：${risk.map((item) => item.text).join("")}` : "此宫阻碍不算密集，可以按星门神所示方向推进。";
    const season = palace.starWuxing ? chart.seasonal.map[palace.starWuxing] : "";
    return `可用策略是：${gateAdvice}。${riskText}${season ? `本季${palace.starWuxing}气处于${season}，${seasonMeaning(season)}。` : ""}落到现实行动上，先抓一个可验证的小步骤，再观察对宫、值符宫和值使宫是否同步响应。`;
  }

  function compactBasis(palace) {
    const pair = PAIR_PATTERNS[`${palace.tianGan}加${palace.diGan}`];
    const tags = palace.patterns.map((item) => item.tag).join("、") || "无明显标记";
    return `天盘${palace.tianGan || "--"} / 地盘${palace.diGan || "--"} · ${palace.starName || "--"} · ${palace.gateName || "无门"} · ${palace.deityName || "--"} · ${pair ? `${pair.name}(${pair.luck})` : tags}`;
  }

  function buildPalaceShort(palace) {
    return `${palace.name}属${palace.wuxing}，见${palace.starName || "中宫"}、${palace.gateName || "无门"}、${palace.deityName || "无神"}，${palace.patterns.length ? `有${palace.patterns.slice(0, 2).map((item) => item.tag).join("、")}标记。` : "格局标记较少。"} `;
  }

  function symbolReaction(a, b) {
    const starRelation = a.starWuxing && b.starWuxing ? relationPhrase(a.starWuxing, b.starWuxing) : "";
    const gateRelation = a.gateWuxing && b.gateWuxing ? relationPhrase(a.gateWuxing, b.gateWuxing) : "";
    const stemRelation = a.tianGanWuxing && b.tianGanWuxing ? relationPhrase(a.tianGanWuxing, b.tianGanWuxing) : "";
    return `星曜五行为${starRelation || "无明显"}，门气为${gateRelation || "无明显"}，天盘干为${stemRelation || "无明显"}`;
  }

  function relationPhrase(source, target) {
    if (!source || !target) return "关系不明";
    if (source === target) return `${source}${target}比和，同类相应，容易放大原有趋势`;
    if (SHENG[source] === target) return `${source}生${target}，前者滋养后者，推进较顺但会消耗前者`;
    if (SHENG[target] === source) return `${target}生${source}，后者承接前者，本宫可得外部滋养`;
    if (KE[source] === target) return `${source}克${target}，前者压制后者，适合管控但成本上升`;
    if (KE[target] === source) return `${target}克${source}，后者制约前者，容易先遇规则、压力或反对`;
    return `${source}${target}相邻，需看星门神再定强弱`;
  }

  function calcSeasonalStrength(monthNum) {
    const branch = ["", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"][monthNum];
    let map;
    if (["寅", "卯"].includes(branch)) map = { 木: "旺", 火: "相", 水: "休", 金: "囚", 土: "死" };
    else if (["巳", "午"].includes(branch)) map = { 火: "旺", 土: "相", 木: "休", 水: "囚", 金: "死" };
    else if (["申", "酉"].includes(branch)) map = { 金: "旺", 水: "相", 土: "休", 火: "囚", 木: "死" };
    else if (["亥", "子"].includes(branch)) map = { 水: "旺", 木: "相", 金: "休", 土: "囚", 火: "死" };
    else map = { 土: "旺", 金: "相", 火: "休", 木: "囚", 水: "死" };
    return { branch, map, text: Object.entries(map).map(([element, state]) => `${element}${state}`).join("、") };
  }

  function seasonMeaning(state) {
    return {
      旺: "该类象有力，容易先显形",
      相: "该类象得辅，可借势发挥",
      休: "该类象能用但不宜过耗",
      囚: "该类象受困，需靠外部条件打开",
      死: "该类象低迷，宜保守、修复、少冒进",
    }[state] || "";
  }

  function calcTwelveState(stem, dizhiText) {
    if (!stem || !dizhiText || !STATE_START[stem]) return "";
    const [startBranch, direction] = STATE_START[stem];
    const chars = Array.from(dizhiText);
    let branchChar = chars.at(-1);
    let branchIndex = BRANCHES.indexOf(branchChar);
    let dist = direction === 1 ? mod(branchIndex - startBranch, 12) : mod(startBranch - branchIndex, 12);
    if (chars.length > 1) {
      const graveChar = chars[0];
      const graveIndex = BRANCHES.indexOf(graveChar);
      const graveDist = direction === 1 ? mod(graveIndex - startBranch, 12) : mod(startBranch - graveIndex, 12);
      if (graveDist === 8) dist = graveDist;
    }
    return STATE_NAMES[dist] || "";
  }

  function isLiuyiJixing(palace) {
    return (
      (palace.tianGan === "戊" && palace.id === 3) ||
      (palace.tianGan === "己" && palace.id === 2) ||
      (palace.tianGan === "庚" && palace.id === 8) ||
      (palace.tianGan === "辛" && palace.id === 9) ||
      (palace.tianGan === "壬" && palace.id === 4) ||
      (palace.tianGan === "癸" && palace.id === 4)
    );
  }

  function isGravePalace(element, palaceId) {
    const grave = { 火: 6, 水: 4, 金: 8, 木: 2, 土: 4 }[element];
    return grave === palaceId;
  }

  function calcKongwang(hourGz) {
    const xun = hourGz - (hourGz % 10);
    const xunBranch = xun % 12;
    return [mod(xunBranch + 10, 12), mod(xunBranch + 11, 12)];
  }

  function calcYima(hourGz) {
    const branch = BRANCHES[hourGz % 12];
    if ("申子辰".includes(branch)) return BRANCHES.indexOf("寅");
    if ("寅午戌".includes(branch)) return BRANCHES.indexOf("申");
    if ("巳酉丑".includes(branch)) return BRANCHES.indexOf("亥");
    return BRANCHES.indexOf("巳");
  }

  function calcTianma(dayGz) {
    const dayBranch = dayGz % 12;
    if ([2, 8].includes(dayBranch)) return 6;
    if ([3, 9].includes(dayBranch)) return 8;
    if ([4, 10].includes(dayBranch)) return 10;
    if ([5, 11].includes(dayBranch)) return 0;
    if ([6, 0].includes(dayBranch)) return 2;
    return 4;
  }

  function calcDingma(dayGz) {
    const xun = dayGz - (dayGz % 10);
    return { 0: 3, 10: 1, 20: 11, 30: 9, 40: 7, 50: 5 }[xun];
  }

  function calDayGanzhiIndex(year, month, day) {
    const refJdn = 2415051;
    const refGz = 40;
    return mod(refGz + gregorianToJdn(year, month, day) - refJdn, 60);
  }

  function calYearGanzhiIndex(year) {
    return mod(year - 4, 60);
  }

  function calMonthGanzhiIndex(yearStem, monthNum) {
    const yinStem = ((yearStem % 5) * 2 + 2) % 10;
    const stem = (yinStem + monthNum - 1) % 10;
    const branch = (monthNum + 1) % 12;
    for (let index = 0; index < 60; index += 1) {
      if (index % 10 === stem && index % 12 === branch) return index;
    }
    throw new Error("无法推算月柱。");
  }

  function calHourGanzhiIndex(dayGz, hour) {
    const dayStem = dayGz % 10;
    const ziBase = (dayStem % 5) * 12;
    const hourBranch = Math.floor((hour + 1) / 2) % 12;
    return (ziBase + hourBranch) % 60;
  }

  function gregorianToJdn(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  function jdnToGanzhiIndex(jdn) {
    return mod(jdn - 2415051 + 40, 60);
  }

  function findUpperYuanFutouOffset(gzIndex) {
    for (let offset = 0; offset < 15; offset += 1) {
      const check = mod(gzIndex - offset, 60);
      if ([0, 15, 30, 45].includes(check)) return offset;
    }
    return 0;
  }

  function isYangDun(termIndex) {
    return !(termIndex >= 11 && termIndex <= 22);
  }

  function monthNumFromJie(jieIndex) {
    return jieIndex === 0 ? 12 : Math.floor(jieIndex / 2);
  }

  function luoshuPos(palace) {
    const index = LUOSHU_ORDER.indexOf(palace);
    if (index < 0) throw new Error(`无效洛书宫位：${palace}`);
    return index;
  }

  function stemWuxing(stem) {
    const index = STEMS.indexOf(stem);
    return index >= 0 ? STEM_WUXING[index] : "";
  }

  function ganzhiName(index) {
    return JIAZI[mod(index, 60)];
  }

  function solarStamp(solar) {
    return gregorianToJdn(solar.getYear(), solar.getMonth(), solar.getDay()) * 86400 + solar.getHour() * 3600 + solar.getMinute() * 60 + (solar.getSecond?.() || 0);
  }

  function mod(value, divisor) {
    const result = value % divisor;
    return result < 0 ? result + divisor : result;
  }

  function yongshenTypeLabel(type) {
    return { gate: "八门", star: "九星", deity: "八神", stem: "天干" }[type] || "符号";
  }

  function centerPoint(rect, rootRect) {
    return {
      x: rect.left - rootRect.left + rect.width / 2,
      y: rect.top - rootRect.top + rect.height / 2,
    };
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
