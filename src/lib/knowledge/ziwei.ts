// Zi Wei Dou Shu — Proper 12-Palace system with Five Elements interaction logic

type LocaleText = { en: string; zh: string; ja: string };

interface PalaceEntry {
  name: LocaleText;
  role: LocaleText;
  interpretation: LocaleText;
}

const PALACES: PalaceEntry[] = [
  {
    name: { en: "Destiny Palace", zh: "命宫", ja: "命宮" },
    role: { en: "Core self", zh: "本我核心", ja: "本質" },
    interpretation: {
      en: "The Destiny Palace is the heart of your Ziwei chart — it defines your essential nature, life direction, and innate talents. A strong Destiny Palace indicates clarity of purpose and natural resilience. Its ruling element shapes how you approach the world. This palace interacts with all others, coloring every aspect of your life experience.",
      zh: "命宫乃紫微斗数的核心——定义你的本质性格、人生方向和天赋才能。命宫强旺则目标清晰、韧性十足。其主掌的五行元素塑造你面对世界的方式。此宫与所有其他宫位互动，为你的人生经历的方方面面着色。",
      ja: "命宮は紫微斗数の核心です—あなたの本質的な性質、人生の方向性、生来の才能を定義します。強い命宮は目的の明晰さと自然な回復力を示します。その支配元素が世界への向き合い方を形作ります。この宮は他のすべての宮と相互作用し、人生経験のあらゆる側面を彩ります。"
    }
  },
  {
    name: { en: "Siblings Palace", zh: "兄弟宫", ja: "兄弟宮" },
    role: { en: "Peers & kin", zh: "手足同辈", ja: "兄弟同輩" },
    interpretation: {
      en: "The Siblings Palace governs relationships with siblings, close peers, and collaborators. It reveals patterns of cooperation and competition in your life. Strong placement suggests harmonious bonds and reliable alliances. Challenging aspects may indicate rivalry but also the motivation it brings. This palace influences how you work within teams and share resources with those closest to you.",
      zh: "兄弟宫掌管你与兄弟姐妹、亲近同辈和合作者的关系。它揭示你生活中合作与竞争的模式。强旺之宫预示和睦的手足之情和可靠的盟友关系。挑战性的配置可能暗示竞争，但也带来竞争所激发的动力。此宫影响你在团队中协作和与亲密之人分享资源的方式。",
      ja: "兄弟宮は兄弟姉妹、親しい仲間、協力者との関係を司ります。人生における協力と競争のパターンを明らかにします。強い配置は調和のとれた絆と信頼できる同盟を示唆します。挑戦的な側面は競争を示すことがありますが、それがもたらすモチベーションも示します。この宮はチーム内での働き方や親しい人とのリソース共有に影響します。"
    }
  },
  {
    name: { en: "Spouse Palace", zh: "夫妻宫", ja: "夫妻宮" },
    role: { en: "Love & marriage", zh: "婚姻感情", ja: "婚姻感情" },
    interpretation: {
      en: "The Spouse Palace reveals the nature of your romantic life and marriage. It describes your ideal partner's qualities and the dynamics of your intimate relationships. Strong placement favors early, stable marriage and deep emotional bonds. Complex configurations suggest growth through relationship challenges. This is the palace of commitment — it shows how you love, trust, and build lifelong partnerships.",
      zh: "夫妻宫揭示你婚姻与感情生活的本质。它描述你理想伴侣的特质和亲密关系的互动模式。强旺之宫利于早婚稳定和深层情感纽带。复杂格局暗示需在关系挑战中成长。此乃承诺之宫——显示你如何爱、如何信任、如何建立终身的伴侣关系。",
      ja: "夫妻宮は恋愛生活と結婚の本質を明らかにします。理想的なパートナーの特質と親密な関係のダイナミクスを描写します。強い配置は早期の安定した結婚と深い感情的絆を支持します。複雑な配置は関係の挑戦を通じた成長を示唆します。これはコミットメントの宮です—どのように愛し、信頼し、生涯のパートナーシップを築くかを示します。"
    }
  },
  {
    name: { en: "Children Palace", zh: "子女宫", ja: "子女宮" },
    role: { en: "Creativity & legacy", zh: "子嗣创作", ja: "子孫創造" },
    interpretation: {
      en: "The Children Palace governs offspring, creative projects, and what you leave behind. Beyond literal children, it represents everything you nurture into existence — art, ideas, students, and ventures. Strong placement suggests fertility in both biological and creative realms. It also reveals your capacity for joy, play, and spontaneous self-expression. This palace is about what grows from your care.",
      zh: "子女宫掌管后代子嗣、创作项目和你的传承。不仅指子女，更代表你培育的一切——艺术、思想、学生和事业。强旺之宫在生育和创作两个层面都预示着丰饶。它还揭示你的喜悦能力、玩乐心和自由表达的天赋。此宫关乎从你的滋养中生长出来的一切。",
      ja: "子女宮は子孫、創造的プロジェクト、あなたが残すものを司ります。文字通りの子供を超えて、あなたが育むすべてのもの—芸術、アイデア、学生、事業を表します。強い配置は生物学的・創造的領域の両方での豊穣を示唆します。また喜び、遊び、自発的な自己表現の能力も明らかにします。この宮はあなたのケアから成長するものについてです。"
    }
  },
  {
    name: { en: "Wealth Palace", zh: "财帛宫", ja: "財帛宮" },
    role: { en: "Finances", zh: "财富金钱", ja: "財運金銭" },
    interpretation: {
      en: "The Wealth Palace directly governs financial fortune, earning capacity, and material resources. It shows how money flows into your life and your attitude toward abundance. Strong placement indicates financial acumen and wealth accumulation potential. This palace reveals your optimal wealth-building strategies and the industries aligned with your energetic pattern. It is not merely about income — it reflects your deeper relationship with prosperity and security.",
      zh: "财帛宫直接主管财运、赚钱能力和物质资源。它揭示财富如何流入你的生活以及你对丰盛的态度。强旺之宫预示着财务智慧和财富积累的潜力。此宫揭示你最佳的理财策略和与你能场匹配的行业方向。不仅关乎收入——更反映你与富足和安全的深层关系。",
      ja: "財帛宮は財務運、収入能力、物質的資源を直接司ります。お金がどのようにあなたの人生に流れ込むか、豊かさに対する態度を示します。強い配置は財務的洞察力と富の蓄積可能性を示します。この宮はあなたの最適な富の構築戦略と、あなたのエネルギーパターンに合致する業界を明らかにします。単なる収入ではなく、繁栄と安全への深い関係を反映します。"
    }
  },
  {
    name: { en: "Health Palace", zh: "疾厄宫", ja: "疾厄宮" },
    role: { en: "Body & wellness", zh: "健康身体", ja: "健康身体" },
    interpretation: {
      en: "The Health Palace reveals your physical constitution, potential health challenges, and your body's inherent strengths. It is your wellness early-warning system. Strong placement suggests robust health and quick recovery. Afflicted configurations indicate areas needing proactive care. The elements involved point to specific body systems. This palace teaches you how to honor and maintain your physical vessel throughout life's journey.",
      zh: "疾厄宫揭示你的体质、潜在健康挑战和身体的天赋强弱。它是你的健康预警系统。强旺之宫预示体魄强健、恢复迅速。受克格局指示需要重点防护的身体领域。涉及的五行元素指向具体的身体系统。此宫教导你如何在人生旅程中尊重和维护你的身体容器。",
      ja: "疾厄宮は身体的体質、潜在的な健康課題、身体の固有の強みを明らかにします。それはあなたの健康の早期警告システムです。強い配置は頑健な健康と迅速な回復を示唆します。困難な配置は予防的ケアが必要な領域を示します。関与する元素は特定の身体系を指します。この宮は人生の旅路を通じて身体を尊重し維持する方法を教えます。"
    }
  },
  {
    name: { en: "Travel Palace", zh: "迁移宫", ja: "遷移宮" },
    role: { en: "Movement & change", zh: "出行变迁", ja: "移動変化" },
    interpretation: {
      en: "The Travel Palace governs physical movement, relocation, and your relationship with the unfamiliar. It reveals how you adapt to new environments and your experiences beyond home. Strong placement favors international ventures, travel, and success abroad. This palace is about stepping beyond comfort — it shows your capacity for reinvention and how others perceive you in public settings. Your relationship with the outside world lives here.",
      zh: "迁移宫掌管出行、搬迁和与陌生世界的关系。它揭示你如何适应新环境以及在舒适区之外的经历。强旺之宫利于国际事业、远行和海外发展。此宫关乎走出舒适区——显示你重塑自我的能力和他人公开场合对你的观感。你与外部世界的关系皆在于此。",
      ja: "遷移宮は物理的な移動、転居、未知のものとの関係を司ります。新しい環境への適応方法と、家の外での経験を明らかにします。強い配置は国際的な事業、旅行、海外での成功を支持します。この宮は快適さを超えることについてです—自己再発明の能力と公の場で他者があなたをどう認識するかを示します。外の世界との関係がここにあります。"
    }
  },
  {
    name: { en: "Friends Palace", zh: "交友宫", ja: "交友宮" },
    role: { en: "Social circle", zh: "人际社交", ja: "人間関係" },
    interpretation: {
      en: "The Friends Palace governs your social network, subordinates, and relationship with the collective. It reveals the quality of people drawn into your orbit and your role within groups. Strong placement attracts loyal allies, mentors, and beneficial connections. This palace speaks to your ability to build community and navigate social hierarchies. It also influences your relationship with employees, followers, and the broader public.",
      zh: "交友宫掌管你的社交网络、下属和与群体的关系。它揭示进入你圈子的人群品质以及你在团体中的角色。强旺之宫吸引忠诚盟友、贵人和有益的人脉。此宫关乎你建立社群和驾驭社交层级的能力。它还影响你与员工、追随者和广大公众的关系。",
      ja: "交友宮はソーシャルネットワーク、部下、集団との関係を司ります。あなたの軌道に引き寄せられる人々の質とグループ内での役割を明らかにします。強い配置は忠実な味方、メンター、有益なつながりを引き寄せます。この宮はコミュニティを構築し社会的階層を渡り歩く能力を表します。また従業員、フォロワー、より広い公衆との関係にも影響します。"
    }
  },
  {
    name: { en: "Career Palace", zh: "官禄宫", ja: "官禄宮" },
    role: { en: "Profession & status", zh: "事业官运", ja: "職業地位" },
    interpretation: {
      en: "The Career Palace governs your professional path, achievements, and public standing. It reveals your ideal vocation and relationship with authority. Strong placement suggests career prominence, leadership roles, and public recognition. This palace shows how you climb in the world. It interacts with the Destiny Palace to show whether your work aligns with your true nature. Your professional legacy is shaped by the energies of this palace.",
      zh: "官禄宫掌管你的事业道路、成就和公众地位。它揭示你的理想职业和与权威的关系。强旺之宫预示事业卓越、领导角色和公众认可。此宫显示你如何在这世界上攀登。它与命宫互动，显示你的工作是否与你真实本性一致。你的职业传奇由此宫的能量塑造。",
      ja: "官禄宮は職業的な道、達成、公的立場を司ります。理想的な天職と権威との関係を明らかにします。強い配置はキャリアの卓越性、リーダーシップの役割、公的認知を示唆します。この宮はあなたが世界でどう上昇するかを示します。命宮と相互作用し、仕事が真の性質と一致しているかを示します。あなたの職業的遺産はこの宮のエネルギーによって形作られます。"
    }
  },
  {
    name: { en: "Property Palace", zh: "田宅宫", ja: "田宅宮" },
    role: { en: "Home & roots", zh: "家宅根基", ja: "家宅基盤" },
    interpretation: {
      en: "The Property Palace governs your home, real estate, and sense of rootedness. It reveals your relationship with physical spaces and the environments where you thrive. Strong placement favors property investment and a harmonious domestic life. Beyond bricks and mortar, this palace speaks to your ancestral heritage and the foundation upon which you build your life. Your deepest sense of belonging is anchored here.",
      zh: "田宅宫掌管你的家宅、房产和根基感。它揭示你与物理空间的关系以及你最能在其中茁壮的环境。强旺之宫利于房产投资和家庭和睦。不仅指房产，此宫更涉及你的祖荫传承和你建立生活所依托的基础。你最深层的归属感在此扎根。",
      ja: "田宅宮はあなたの家、不動産、根付き感を司ります。物理的空間との関係と、あなたが繁栄する環境を明らかにします。強い配置は不動産投資と調和のとれた家庭生活を支持します。レンガとモルタルを超えて、この宮は先祖の遺産とあなたが人生を築く基盤について語ります。あなたの最も深い帰属意識がここに固定されています。"
    }
  },
  {
    name: { en: "Fortune Palace", zh: "福德宫", ja: "福德宮" },
    role: { en: "Spirit & blessings", zh: "福德心灵", ja: "福德霊性" },
    interpretation: {
      en: "The Fortune Palace is your reservoir of spiritual merit and inner peace. It governs psychological wellbeing and the invisible blessings in your life. Strong placement indicates innate optimism, spiritual protection, and deep contentment. This is the palace of gratitude — it reveals how you process joy and suffering. Your relationship with the divine, with luck, and with your own inner stillness is held in this most profound of the twelve palaces.",
      zh: "福德宫是你精神功德和内在安宁的宝库。它掌管心理健康和生命中的无形祝福。强旺之宫预示着天生的乐观、神灵护佑和深层的满足感。这是感恩之宫——揭示你如何处理喜悦和苦难。你与神性、与运气、与自我内在宁静的关系，皆存于这十二宫中最深邃的一个。",
      ja: "福德宮は霊的功徳と内なる平和の貯蔵庫です。心理的幸福と人生における目に見えない祝福を司ります。強い配置は生来の楽観主義、霊的保護、深い満足感を示します。これは感謝の宮です—喜びと苦しみをどう処理するかを明らかにします。神聖なものとの関係、運との関係、自分自身の内なる静けさとの関係が、十二宮の中で最も深遠なこの宮にあります。"
    }
  },
  {
    name: { en: "Parents Palace", zh: "父母宫", ja: "父母宮" },
    role: { en: "Elders & authority", zh: "父母长辈", ja: "父母尊長" },
    interpretation: {
      en: "The Parents Palace governs your relationship with parents, elders, mentors, and authority figures. It reveals the influence of your upbringing and patterns inherited from family. Strong placement suggests supportive parental influences and respect for tradition. Challenging configurations may indicate early difficulties that forged resilience. Throughout life, this palace influences your interactions with teachers, bosses, institutions, and ultimately, how you become an authority yourself.",
      zh: "父母宫掌管你与父母、长辈、导师和权威人物的关系。它揭示原生家庭的影响和家族传承的模式。强旺之宫预示父母缘深、尊重传统。挑战性配置可能指示锻造你韧性的早年磨砺。贯穿一生，此宫影响你与老师、上司、各类机构的互动，最终也影响你自己如何成为权威。",
      ja: "父母宮は両親、年長者、メンター、権威者との関係を司ります。育ちの影響と家族から受け継いだパターンを明らかにします。強い配置は支援的な親の影響と伝統への敬意を示唆します。挑戦的な配置は回復力を鍛えた初期の困難を示すことがあります。生涯を通じて、この宮は教師、上司、機関との交流に影響し、最終的にあなた自身がどのように権威となるかにも影響します。"
    }
  }
];

const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const branchToElement: Record<string, string> = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木",
  "辰": "土", "巳": "火", "午": "火", "未": "土",
  "申": "金", "酉": "金", "戌": "土", "亥": "水",
};

const stemToElement: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
  "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水",
};

// Five Elements interaction: returns modifier for palace strength
// (year element, palace element) → strength modifier
// 0 = severely suppressed, 1 = suppressed, 2 = moderate, 3 = neutral, 4 = nourished, 5 = strongly nourished
function elementInteraction(yearEl: string, palaceEl: string): number {
  const generating: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
  const controlling: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

  if (yearEl === palaceEl) return 3; // 比和 — harmony
  if (generating[yearEl] === palaceEl) return 5; // year generates palace — strongly nourished
  if (generating[palaceEl] === yearEl) return 2; // palace generates year — drained
  if (controlling[yearEl] === palaceEl) return 1; // year controls palace — suppressed
  if (controlling[palaceEl] === yearEl) return 2; // palace controls year — consuming
  return 3;
}

// Birth month → zodiac position modifier (seasonal strength)
function seasonalModifier(branch: string, birthMonth: number): number {
  const el = branchToElement[branch];
  // Elements have seasonal strength:
  // 木 strong in spring (2-4), 火 strong in summer (5-7), 金 strong in autumn (8-10), 水 strong in winter (11-1)
  const seasons: Record<string, number[]> = {
    "木": [2, 3, 4], "火": [5, 6, 7], "金": [8, 9, 10], "水": [11, 12, 1], "土": [3, 6, 9, 12],
  };
  const strongMonths = seasons[el] || [];
  if (strongMonths.includes(birthMonth)) return 1;
  return 0;
}

// Calculate the birth year's heavenly stem
function getYearStem(year: number): string {
  return HEAVENLY_STEMS[(year - 4) % 10];
}

export function getZiweiReading(
  birthYear: number, birthMonth: number, birthDay: number, birthHour: number, locale: string
) {
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";

  // Determine Destiny Palace (命宫) based on birth month and hour (standard Ziwei formula)
  const mingGongIndex = (birthMonth + Math.floor(birthHour / 2)) % 12;

  // Year element for Five Elements interaction
  const yearStem = getYearStem(birthYear);
  const yearElement = stemToElement[yearStem];

  const palaces = PALACES.map((palace, i) => {
    const palaceIndex = (mingGongIndex + i) % 12;
    const branch = EARTHLY_BRANCHES[palaceIndex];
    const palaceElement = branchToElement[branch];

    // Base strength from Five Elements interaction with year element
    const baseStr = elementInteraction(yearElement, palaceElement);

    // Seasonal modifier
    const seasonal = seasonalModifier(branch, birthMonth);

    // Day-based subtle modifier (±1)
    const dayMod = (birthDay % 7) === (i % 7) ? 1 : 0;

    const strength = Math.min(5, Math.max(0, baseStr + seasonal + dayMod));

    // Generate a description of WHY this strength
    const strengthReason = buildStrengthReason(
      yearElement, palaceElement, yearStem, branch, birthMonth, strength, lang
    );

    return {
      name: palace.name[lang] || palace.name.en,
      role: palace.role[lang] || palace.role.en,
      branch,
      element: palaceElement,
      strength,
      interpretation: palace.interpretation[lang] || palace.interpretation.en,
      strengthReason,
    };
  });

  // Build analysis text for each major palace
  const mingGong = palaces[0];
  const caiBo = palaces[4];
  const guanLu = palaces[8];
  const fuQi = palaces[2];
  const jiE = palaces[5];
  const fuDe = palaces[10];

  function stDesc(s: number): string {
    if (s >= 5) return lang === "zh" ? "极旺" : lang === "ja" ? "極旺" : "exceptionally strong";
    if (s >= 4) return lang === "zh" ? "强旺" : lang === "ja" ? "強旺" : "strong";
    if (s >= 3) return lang === "zh" ? "中和" : lang === "ja" ? "中和" : "balanced";
    if (s >= 2) return lang === "zh" ? "偏弱" : lang === "ja" ? "偏弱" : "moderate";
    return lang === "zh" ? "弱" : lang === "ja" ? "弱" : "challenged";
  }

  function palaceText(p: typeof mingGong, strong: string[], mid: string[], weak: string[]): string {
    if (p.strength >= 4) return strong[langIdx];
    if (p.strength >= 3) return mid[langIdx];
    return weak[langIdx];
  }
  const langIdx = lang === "zh" ? 0 : lang === "ja" ? 1 : 2;

  const mingLabels = [
    [`命宫坐${mingGong.branch}（${mingGong.element}），整体能量${stDesc(mingGong.strength)}。你天生具有清晰的人生方向和强大的内在驱动力。`,
     `命宮は${mingGong.branch}（${mingGong.element}）に位置し、全体エネルギーは${stDesc(mingGong.strength)}です。明確な人生の方向性と強い内的駆動力を持っています。`,
     `Your Destiny Palace sits in ${mingGong.branch} (${mingGong.element}), with ${stDesc(mingGong.strength)} overall energy. You possess clear life direction and powerful inner drive.`],
    [`命宫坐${mingGong.branch}（${mingGong.element}），整体能量${stDesc(mingGong.strength)}。你的人生道路需要平衡内在与外在的力量。`,
     `命宮は${mingGong.branch}（${mingGong.element}）に位置し、全体エネルギーは${stDesc(mingGong.strength)}です。人生の道は内と外の力のバランスが必要です。`,
     `Your Destiny Palace sits in ${mingGong.branch} (${mingGong.element}), with ${stDesc(mingGong.strength)} overall energy. Your path requires balancing inner and outer forces.`],
    [`命宫坐${mingGong.branch}（${mingGong.element}），整体能量${stDesc(mingGong.strength)}。你的人生需要通过学习和适应来找到最适合自己的道路。`,
     `命宮は${mingGong.branch}（${mingGong.element}）に位置し、全体エネルギーは${stDesc(mingGong.strength)}です。人生は学びと適応を通じて最適な道を見つけます。`,
     `Your Destiny Palace sits in ${mingGong.branch} (${mingGong.element}), with ${stDesc(mingGong.strength)} overall energy. Your journey involves learning and adapting to find your optimal path.`],
  ];

  const caiLabels = [
    [`财帛宫坐${caiBo.branch}（${caiBo.element}），财运${stDesc(caiBo.strength)}。财富积累能力突出，适合长期投资和资产管理。`,
     `財帛宮は${caiBo.branch}（${caiBo.element}）に位置し、財運は${stDesc(caiBo.strength)}です。富の蓄積能力が際立ち、長期投資と資産管理に適しています。`,
     `Your Wealth Palace occupies ${caiBo.branch} (${caiBo.element}), with ${stDesc(caiBo.strength)} financial energy. Wealth accumulation ability is outstanding.`],
    [`财帛宫坐${caiBo.branch}（${caiBo.element}），财运${stDesc(caiBo.strength)}。财运稳定，通过专业能力和持续努力积累财富。`,
     `財帛宮は${caiBo.branch}（${caiBo.element}）に位置し、財運は${stDesc(caiBo.strength)}です。財運は安定し、専門能力と継続的努力で富を築きます。`,
     `Your Wealth Palace occupies ${caiBo.branch} (${caiBo.element}), with ${stDesc(caiBo.strength)} financial energy. Stable fortune through expertise.`],
    [`财帛宫坐${caiBo.branch}（${caiBo.element}），财运${stDesc(caiBo.strength)}。需要通过多元化策略和谨慎规划来管理财务。`,
     `財帛宮は${caiBo.branch}（${caiBo.element}）に位置し、財運は${stDesc(caiBo.strength)}です。多様化戦略と慎重な計画で財務を管理する必要があります。`,
     `Your Wealth Palace occupies ${caiBo.branch} (${caiBo.element}), with ${stDesc(caiBo.strength)} financial energy. Diversified strategies needed.`],
  ];

  const fuqiLabels = [
    [`夫妻宫坐${fuQi.branch}（${fuQi.element}），感情运${stDesc(fuQi.strength)}。婚姻缘分深厚，容易遇到理想的伴侣并建立稳定的家庭。`,
     `夫妻宮は${fuQi.branch}（${fuQi.element}）に位置し、恋愛運は${stDesc(fuQi.strength)}です。結婚の縁が深く、理想的なパートナーと出会い安定した家庭を築きやすいです。`,
     `Your Spouse Palace falls in ${fuQi.branch} (${fuQi.element}), with ${stDesc(fuQi.strength)} romantic energy. Deep marriage affinity.`],
    [`夫妻宫坐${fuQi.branch}（${fuQi.element}），感情运${stDesc(fuQi.strength)}。感情生活平稳，需要主动经营和维护关系。`,
     `夫妻宮は${fuQi.branch}（${fuQi.element}）に位置し、恋愛運は${stDesc(fuQi.strength)}です。恋愛生活は平稳で、関係を積極的に育む必要があります。`,
     `Your Spouse Palace falls in ${fuQi.branch} (${fuQi.element}), with ${stDesc(fuQi.strength)} romantic energy. Steady love life.`],
    [`夫妻宫坐${fuQi.branch}（${fuQi.element}），感情运${stDesc(fuQi.strength)}。感情路上需更多耐心和智慧，晚婚可能更有利。`,
     `夫妻宮は${fuQi.branch}（${fuQi.element}）に位置し、恋愛運は${stDesc(fuQi.strength)}です。恋愛の道ではより多くの忍耐と知恵が必要で、晩婚が有利かもしれません。`,
     `Your Spouse Palace falls in ${fuQi.branch} (${fuQi.element}), with ${stDesc(fuQi.strength)} romantic energy. Patience brings rewards.`],
  ];

  const jiELabels = [
    [`疾厄宫坐${jiE.branch}（${jiE.element}），健康运${stDesc(jiE.strength)}。体质强健，恢复力佳。`,
     `疾厄宮は${jiE.branch}（${jiE.element}）に位置し、健康運は${stDesc(jiE.strength)}です。体質は強健で回復力も良いです。`,
     `Your Health Palace is in ${jiE.branch} (${jiE.element}), with ${stDesc(jiE.strength)} health energy. Robust constitution.`],
    [`疾厄宫坐${jiE.branch}（${jiE.element}），健康运${stDesc(jiE.strength)}。总体良好，需关注相关身体系统的保养。`,
     `疾厄宮は${jiE.branch}（${jiE.element}）に位置し、健康運は${stDesc(jiE.strength)}です。概ね良好で関連系のケア推奨。`,
     `Your Health Palace is in ${jiE.branch} (${jiE.element}), with ${stDesc(jiE.strength)} health energy. Generally good.`],
    [`疾厄宫坐${jiE.branch}（${jiE.element}），健康运${stDesc(jiE.strength)}。需更加重视身体健康和定期检查。`,
     `疾厄宮は${jiE.branch}（${jiE.element}）に位置し、健康運は${stDesc(jiE.strength)}です。健康により注意が必要です。`,
     `Your Health Palace is in ${jiE.branch} (${jiE.element}), with ${stDesc(jiE.strength)} health energy. Extra care needed.`],
  ];

  const guanLuLabels = [
    [`官禄宫坐${guanLu.branch}（${guanLu.element}），事业运${stDesc(guanLu.strength)}。事业运势强劲，适合领导角色或创业。`,
     `官禄宮は${guanLu.branch}（${guanLu.element}）に位置し、キャリア運は${stDesc(guanLu.strength)}です。キャリア運は強く、リーダーシップや起業に適しています。`,
     `Your Career Palace resides in ${guanLu.branch} (${guanLu.element}), with ${stDesc(guanLu.strength)} career energy. Suited for leadership.`],
    [`官禄宫坐${guanLu.branch}（${guanLu.element}），事业运${stDesc(guanLu.strength)}。事业稳定发展，通过积累获得成就。`,
     `官禄宮は${guanLu.branch}（${guanLu.element}）に位置し、キャリア運は${stDesc(guanLu.strength)}です。安定発展し蓄積で成果を得ます。`,
     `Your Career Palace resides in ${guanLu.branch} (${guanLu.element}), with ${stDesc(guanLu.strength)} career energy. Steady development.`],
    [`官禄宫坐${guanLu.branch}（${guanLu.element}），事业运${stDesc(guanLu.strength)}。道路可能曲折，但每次挑战都是成长契机。`,
     `官禄宮は${guanLu.branch}（${guanLu.element}）に位置し、キャリア運は${stDesc(guanLu.strength)}です。曲折あるも各挑戦が成長の機会です。`,
     `Your Career Palace resides in ${guanLu.branch} (${guanLu.element}), with ${stDesc(guanLu.strength)} career energy. Challenges bring growth.`],
  ];

  const fuDeLabels = [
    [`福德宫坐${fuDe.branch}（${fuDe.element}），福运${stDesc(fuDe.strength)}。精神充实溢出到各领域，保持感恩好运自来。`,
     `福德宮は${fuDe.branch}（${fuDe.element}）に位置し、福運は${stDesc(fuDe.strength)}です。感謝の心が幸運を引き寄せます。`,
     `Your Fortune Palace in ${fuDe.branch} (${fuDe.element}), with ${stDesc(fuDe.strength)} energy. Gratitude attracts fortune.`],
    [`福德宫坐${fuDe.branch}（${fuDe.element}），福运${stDesc(fuDe.strength)}。通过内省修养找到内心平静与方向。`,
     `福德宮は${fuDe.branch}（${fuDe.element}）に位置し、福運は${stDesc(fuDe.strength)}です。内省を通じて平和と方向性を見出せます。`,
     `Your Fortune Palace in ${fuDe.branch} (${fuDe.element}), with ${stDesc(fuDe.strength)} energy. Inner peace through reflection.`],
    [`福德宫坐${fuDe.branch}（${fuDe.element}），福运${stDesc(fuDe.strength)}。今年修炼内在力量，外在挑战是成长催化剂。`,
     `福德宮は${fuDe.branch}（${fuDe.element}）に位置し、福運は${stDesc(fuDe.strength)}です。内的強さの修練の年です。`,
     `Your Fortune Palace in ${fuDe.branch} (${fuDe.element}), with ${stDesc(fuDe.strength)} energy. Build inner strength this year.`],
  ];

  const personality = `${mingGong.interpretation}\n\n${mingGong.strengthReason}\n\n${palaceText(mingGong, mingLabels[0], mingLabels[1], mingLabels[2])}`;
  const wealth = `${caiBo.interpretation}\n\n${caiBo.strengthReason}\n\n${palaceText(caiBo, caiLabels[0], caiLabels[1], caiLabels[2])}`;
  const love = `${fuQi.interpretation}\n\n${fuQi.strengthReason}\n\n${palaceText(fuQi, fuqiLabels[0], fuqiLabels[1], fuqiLabels[2])}`;
  const health = `${jiE.interpretation}\n\n${jiE.strengthReason}\n\n${palaceText(jiE, jiELabels[0], jiELabels[1], jiELabels[2])}`;
  const career = `${guanLu.interpretation}\n\n${guanLu.strengthReason}\n\n${palaceText(guanLu, guanLuLabels[0], guanLuLabels[1], guanLuLabels[2])}`;
  const yearlyTrend = `${fuDe.interpretation}\n\n${fuDe.strengthReason}\n\n${palaceText(fuDe, fuDeLabels[0], fuDeLabels[1], fuDeLabels[2])}`;

  const summary = lang === "zh"
    ? `紫微斗数命盘揭示——命宫在${mingGong.branch}（${mingGong.element}），${stDesc(mingGong.strength)}之势。十二宫各有其独特的五行互动格局。`
    : lang === "ja"
    ? `紫微斗数命盤が明らかに——命宮は${mingGong.branch}（${mingGong.element}）、${stDesc(mingGong.strength)}の勢い。十二宮それぞれに独自の五行相互作用のパターンがあります。`
    : `Your Ziwei Dou Shu chart reveals your Destiny Palace in ${mingGong.branch} (${mingGong.element}) with ${stDesc(mingGong.strength)} momentum. Each of the twelve palaces holds its unique Five-Element interaction pattern.`;

  const chartData = {
    fiveElements: palaces.map((p) => ({ name: p.name, value: p.strength })),
  };

  const calculationResult = {
    school: "ziwei",
    yearStem,
    yearElement,
    mingGongBranch: mingGong.branch,
    mingGongElement: mingGong.element,
    palaces,
  };

  const rec = elementRecs[mingGong.element] || elementRecs["土"];
  const recommendations = {
    favorableColors: rec.favorableColors[lang] || rec.favorableColors.en,
    unfavorableColors: rec.unfavorableColors[lang] || rec.unfavorableColors.en,
    luckyNumbers: rec.luckyNumbers,
    favorableDirections: rec.favorableDirections[lang] || rec.favorableDirections.en,
    favorableElements: rec.favorableElements[lang] || rec.favorableElements.en,
  };

  return {
    calculationResult,
    aiAnalysis: { personality, wealth, love, health, career, yearlyTrend, summary },
    chartData,
    recommendations,
    palaces,
  };
}

function buildStrengthReason(
  yearEl: string, palaceEl: string, yearStem: string, branch: string,
  birthMonth: number, strength: number, lang: string
): string {
  const parts: string[] = [];

  const gen: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
  const con: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

  // Five Elements interaction explanation
  if (lang === "zh") {
    parts.push(`流年天干${yearStem}（${yearEl}）`);
    if (yearEl === palaceEl) {
      parts.push(`与此宫五行相同，形成比和之势，能量中和。`);
    } else if (gen[yearEl] === palaceEl) {
      parts.push(`生此宫${palaceEl}，形成相生之局，能量得到滋养。`);
    } else if (gen[palaceEl] === yearEl) {
      parts.push(`被此宫${palaceEl}所生，形成泄气之局，能量有所消耗。`);
    } else if (con[yearEl] === palaceEl) {
      parts.push(`克此宫${palaceEl}，形成受克之局，能量受到压制。`);
    } else if (con[palaceEl] === yearEl) {
      parts.push(`被此宫${palaceEl}所克，形成耗气之局，能量需加维护。`);
    }
    // Seasonal
    const seasons: Record<string, string> = { "木": "春", "火": "夏", "金": "秋", "水": "冬", "土": "四季" };
    const seasonMonths: Record<string, number[]> = { "木": [2,3,4], "火": [5,6,7], "金": [8,9,10], "水": [11,12,1], "土": [3,6,9,12] };
    if ((seasonMonths[palaceEl] || []).includes(birthMonth)) {
      parts.push(`出生月份适逢${seasons[palaceEl] || ""}季，此地支${branch}得时令之气加持。`);
    }
    parts.push(`综合评定：${["极弱","弱","偏弱","中和","强旺","极旺"][strength] || "中和"}。`);
  } else if (lang === "ja") {
    parts.push(`年干${yearStem}（${yearEl}）`);
    if (yearEl === palaceEl) {
      parts.push(`はこの宮と同じ五行で、比和の勢いを形成し、エネルギーは中和されています。`);
    } else if (gen[yearEl] === palaceEl) {
      parts.push(`はこの宮${palaceEl}を生み、相生の局を形成し、エネルギーは滋養されています。`);
    } else if (gen[palaceEl] === yearEl) {
      parts.push(`はこの宮${palaceEl}に生み出され、泄気の局を形成し、エネルギーは消耗されています。`);
    } else if (con[yearEl] === palaceEl) {
      parts.push(`はこの宮${palaceEl}を克し、受克の局を形成し、エネルギーは抑制されています。`);
    } else if (con[palaceEl] === yearEl) {
      parts.push(`はこの宮${palaceEl}に克され、耗気の局を形成し、エネルギーはメンテナンスが必要です。`);
    }
    parts.push(`総合評価：${["極弱","弱","偏弱","中和","強旺","極旺"][strength] || "中和"}。`);
  } else {
    parts.push(`Year Stem ${yearStem} (${yearEl}) `);
    if (yearEl === palaceEl) {
      parts.push(`shares the same element as this palace, creating a harmonious balance.`);
    } else if (gen[yearEl] === palaceEl) {
      parts.push(`generates this palace's ${palaceEl}, forming a nourishing cycle.`);
    } else if (gen[palaceEl] === yearEl) {
      parts.push(`is generated by this palace's ${palaceEl}, causing energy drain.`);
    } else if (con[yearEl] === palaceEl) {
      parts.push(`controls this palace's ${palaceEl}, creating suppressive pressure.`);
    } else if (con[palaceEl] === yearEl) {
      parts.push(`is controlled by this palace's ${palaceEl}, requiring energy maintenance.`);
    }
    const labels = ["extremely weak","weak","moderate","balanced","strong","exceptionally strong"];
    parts.push(`Overall: ${labels[strength] || "balanced"}.`);
  }

  return parts.join("");
}

// Localized recommendation tables
const elementRecs: Record<string, {
  favorableColors: Record<string, string[]>; unfavorableColors: Record<string, string[]>;
  luckyNumbers: number[]; favorableDirections: Record<string, string[]>; favorableElements: Record<string, string[]>;
}> = {
  "木": {
    favorableColors: { en: ["Green","Teal","Aqua"], zh: ["绿色","青色","碧色"], ja: ["緑","ティール","アクア"] },
    unfavorableColors: { en: ["White","Gold"], zh: ["白色","金色"], ja: ["白","金"] },
    luckyNumbers: [1,3,8],
    favorableDirections: { en: ["East","Southeast"], zh: ["东方","东南"], ja: ["東","南東"] },
    favorableElements: { en: ["Water","Wood"], zh: ["水","木"], ja: ["水","木"] },
  },
  "火": {
    favorableColors: { en: ["Red","Purple","Pink"], zh: ["红色","紫色","粉色"], ja: ["赤","紫","ピンク"] },
    unfavorableColors: { en: ["Black","Dark Blue"], zh: ["黑色","深蓝"], ja: ["黒","ダークブルー"] },
    luckyNumbers: [2,3,7],
    favorableDirections: { en: ["South"], zh: ["南方"], ja: ["南"] },
    favorableElements: { en: ["Wood","Fire"], zh: ["木","火"], ja: ["木","火"] },
  },
  "土": {
    favorableColors: { en: ["Brown","Yellow","Beige"], zh: ["棕色","黄色","米色"], ja: ["茶色","黄色","ベージュ"] },
    unfavorableColors: { en: ["Green","Dark Green"], zh: ["绿色","深绿"], ja: ["緑","ダークグリーン"] },
    luckyNumbers: [2,5,8],
    favorableDirections: { en: ["Southwest","Northeast"], zh: ["西南","东北"], ja: ["南西","北東"] },
    favorableElements: { en: ["Fire","Earth"], zh: ["火","土"], ja: ["火","土"] },
  },
  "金": {
    favorableColors: { en: ["White","Silver","Gold"], zh: ["白色","银色","金色"], ja: ["白","シルバー","金"] },
    unfavorableColors: { en: ["Red","Pink"], zh: ["红色","粉色"], ja: ["赤","ピンク"] },
    luckyNumbers: [4,6,9],
    favorableDirections: { en: ["West","Northwest"], zh: ["西方","西北"], ja: ["西","北西"] },
    favorableElements: { en: ["Earth","Metal"], zh: ["土","金"], ja: ["土","金"] },
  },
  "水": {
    favorableColors: { en: ["Black","Navy","White"], zh: ["黑色","深蓝","白色"], ja: ["黒","ネイビー","白"] },
    unfavorableColors: { en: ["Brown","Yellow"], zh: ["棕色","黄色"], ja: ["茶色","黄色"] },
    luckyNumbers: [1,6,7],
    favorableDirections: { en: ["North"], zh: ["北方"], ja: ["北"] },
    favorableElements: { en: ["Metal","Water"], zh: ["金","水"], ja: ["金","水"] },
  },
};
