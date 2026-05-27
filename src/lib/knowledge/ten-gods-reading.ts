// Comprehensive Ten Gods reading — contextualized per pillar, with strength analysis and combinations
type LocaleText = { zh: string; en: string; ja: string };

interface PillarReading {
  godName: string; pillarName: string; element: string;
  interpretation: LocaleText;
}

interface CombinationReading {
  name: LocaleText; analysis: LocaleText; advice: LocaleText;
}

interface TenGodsReadingOutput {
  // DM strength analysis
  dmStrength: LocaleText;
  favorableGods: string[];
  challengingGods: string[];
  // Pillar-by-pillar readings
  pillarReadings: PillarReading[];
  // Combination readings
  combinations: CombinationReading[];
  // Real-world guidance
  personalityGuide: LocaleText;
  careerGuide: LocaleText;
  relationshipGuide: LocaleText;
  wealthGuide: LocaleText;
}

export function generateTenGodsReading(
  tenGods: Record<string, { name: string; short: string; element: string; relation: string }>,
  dmElement: string,
  fiveElements: Record<string, number>,
  locale: string
): TenGodsReadingOutput {
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";

  // Determine DM strength
  const dmCount = fiveElements[dmElement] || 0;
  const isStrong = dmCount >= 3;
  const isWeak = dmCount <= 1;

  const dmStrength: LocaleText = {
    zh: `日主为${dmElement}，命局中${dmElement}出现${dmCount}次，${isStrong ? "偏旺" : isWeak ? "偏弱" : "中和"}。${isStrong ? "日主强旺，喜克泄耗（官杀、食伤、财星）来平衡。" : isWeak ? "日主偏弱，喜生扶（印星、比劫）来助力。" : "日主中和，各十神作用相对均衡。"}`,
    en: `Day Master is ${dmElement}, appearing ${dmCount} times in the chart — ${isStrong ? "Strong" : isWeak ? "Weak" : "Balanced"}. ${isStrong ? "A strong Day Master benefits from controlling/draining gods (Officer, Eating God, Wealth)." : isWeak ? "A weak Day Master benefits from supporting gods (Seal, Peer)." : "A balanced Day Master works harmoniously with all gods."}`,
    ja: `日主は${dmElement}、命式中に${dmCount}回出現—${isStrong ? "強旺" : isWeak ? "偏弱" : "中和"}。${isStrong ? "強い日主は制御・消耗の神（官殺・食傷・財星）でバランスを取ります。" : isWeak ? "弱い日主は支援の神（印星・比劫）で力を得ます。" : "中和された日主はすべての神と調和的に働きます。"}`,
  };

  // Determine which gods are favorable/challenging
  const supportiveGods = ["正印", "偏印", "比肩", "劫财"];
  const controllingGods = ["正官", "七杀", "正财", "偏财", "食神", "伤官"];
  const favorableGods = isStrong ? controllingGods : supportiveGods;
  const challengingGods = isStrong ? supportiveGods : controllingGods;

  // Pillar interpretations
  const pillarLabels = {
    year: { en: "Year Pillar", zh: "年柱", ja: "年柱" },
    month: { en: "Month Pillar", zh: "月柱", ja: "月柱" },
    hour: { en: "Hour Pillar", zh: "时柱", ja: "時柱" },
  };

  const pillarReadings: PillarReading[] = [];
  for (const p of ["year", "month", "hour"] as const) {
    const god = tenGods[p];
    if (!god) continue;
    pillarReadings.push({
      godName: god.name,
      pillarName: pillarLabels[p][lang] || pillarLabels[p].en,
      element: god.element,
      interpretation: getPillarGodReading(p, god.name, god.element, dmElement, isStrong, lang),
    });
  }

  // Detect combinations
  const combinations: CombinationReading[] = [];
  const allGods = [tenGods.year?.name, tenGods.month?.name, tenGods.hour?.name].filter(Boolean);

  // 官杀混杂: both 正官 and 七杀 present
  if (allGods.includes("正官") && allGods.includes("七杀")) {
    combinations.push({
      name: { en: "Mixed Officers (官杀混杂)", zh: "官杀混杂", ja: "官殺混雜" },
      analysis: {
        zh: "月柱七杀与时柱正官同现，形成官杀混杂格局。七杀代表突发压力与竞争，正官代表规则与责任。两者并存意味着你的人生既有清晰的规则目标，也伴随突发的挑战。性格上既有责任感也有叛逆心，事业上容易出现多重身份或多个发展方向。这种格局的关键在于调和——用正官的稳重来驾驭七杀的冲劲。",
        en: "Seven Killings and Direct Officer appearing together creates a mixed pattern. Seven Killings brings sudden pressure and competition, while Direct Officer brings rules and responsibility. This means your life has both clear goals and unexpected challenges. Your personality mixes responsibility with rebellion, and your career may involve multiple roles. The key is harmonization — using Direct Officer's steadiness to channel Seven Killings' drive.",
        ja: "七殺と正官が同時に現れる混合パターン。七殺は突然のプレッシャーと競争、正官は規則と責任をもたらします。あなたの人生には明確な目標と予期せぬ挑戦の両方があります。責任感と反逆心が混ざり合い、キャリアでは複数の役割を持つことがあります。鍵は調和—正官の安定性で七殺の勢いを導くことです。"
      },
      advice: {
        zh: "适合管理、法律、军警、竞技等规则性强又充满挑战的行业。需注意事业中不可贪多求全，要学会聚焦。情绪上需注意压力管理，正官的冷静可以平复七杀的焦躁。",
        en: "Suited for management, law, military, and competitive fields that combine rules with challenge. Avoid spreading yourself too thin across multiple pursuits. Use Direct Officer's calmness to temper Seven Killings' intensity.",
        ja: "管理、法律、軍事、競技など、規則と挑戦を組み合わせた分野に適しています。複数の追求に手を広げすぎないこと。正官の冷静さで七殺の激しさを和らげましょう。"
      }
    });
  }

  // 劫财+官杀
  if (allGods.includes("劫财") && (allGods.includes("七杀") || allGods.includes("正官"))) {
    const officerName = allGods.includes("七杀") ? "七杀" : "正官";
    combinations.push({
      name: { en: `Peer + ${officerName}`, zh: `劫财 + ${officerName}`, ja: `劫財 + ${officerName}` },
      analysis: {
        zh: `劫财与${officerName}同现，形成帮扶与克制的矛盾格局。劫财帮日主抵抗${officerName}的压力，但自身也带来竞争和不稳定性。这意味着你的人生中，同辈朋友既是助力也是变数——朋友可以帮你分担压力，但也可能在利益面前变成竞争者。在事业上，团队合作既是机遇也是挑战。`,
        en: `Peer and ${officerName} appearing together creates a tension between support and control. Peer helps the Day Master resist ${officerName}'s pressure, but also brings competition. Friends and colleagues are both help and variables — they can share your burden but also become rivals.`,
        ja: `劫財と${officerName}が同時に現れ、支援と制御の間に緊張を生み出します。劫財は日主が${officerName}の圧力に抵抗するのを助けますが、競争ももたらします。友人や同僚は助けであり変数でもあります。`
      },
      advice: {
        zh: "人际上需注意同辈合作中的利益边界，避免合伙投资中的纠纷。团队合作时保持独立判断。把压力转化为动力时，借助朋友的支持但要保持自主权。",
        en: "Be mindful of boundaries in peer collaborations. Avoid disputes in joint investments. Maintain independent judgment in teamwork. Use friends' support to transform pressure into motivation, while keeping autonomy.",
        ja: "同僚との協力では利益の境界に注意し、共同投資でのトラブルを避けましょう。チームワークでは独立した判断を保ちます。プレッシャーを動力に変える際、友人の支援を借りつつ自律性を保ちましょう。"
      }
    });
  }

  // 食神+正官: orderly creativity
  if (allGods.includes("食神") && allGods.includes("正官")) {
    combinations.push({
      name: { en: "Eating God + Direct Officer", zh: "食神 + 正官", ja: "食神 + 正官" },
      analysis: {
        zh: "食神与正官同现，是非常吉利的格局。食神代表才华与创造力，正官代表规则与责任，两者结合意味着你能在规范的框架内发挥创意，既守规矩又有灵气。这种格局的人往往在体制内也能做出创新成绩。",
        en: "Eating God and Direct Officer together is very auspicious. Creativity meets responsibility — you can innovate within structured environments. Such people often achieve creative success within established systems.",
        ja: "食神と正官の組み合わせは非常に吉兆です。創造性と責任が出会い—構造化された環境内で革新できます。このような人々はしばしば確立されたシステム内で創造的成功を収めます。"
      },
      advice: { zh: "适合需要创意和规则兼重的行业：设计管理、教育创新、文化产业的运营岗位。", en: "Suited for fields balancing creativity and rules: design management, educational innovation, cultural ops.", ja: "創造性と規則のバランスが必要な分野：デザイン管理、教育革新、文化運営に適しています。" }
    });
  }

  // Real-world guidance
  const personalityGuide = buildPersonalityGuide(allGods, isStrong, dmElement, lang);
  const careerGuide = buildCareerGuide(allGods, isStrong, lang);
  const relationshipGuide = buildRelationshipGuide(allGods, lang);
  const wealthGuide = buildWealthGuide(allGods, lang);

  return {
    dmStrength, favorableGods, challengingGods,
    pillarReadings, combinations,
    personalityGuide, careerGuide, relationshipGuide, wealthGuide,
  };
}

function getPillarGodReading(
  pillar: string, godName: string, element: string,
  dmElement: string, isStrong: boolean, lang: string
): LocaleText {
  const gen: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
  const con: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

  const isFavorable = isStrong
    ? ["正官","七杀","正财","偏财","食神","伤官"].includes(godName)
    : ["正印","偏印","比肩","劫财"].includes(godName);

  const pillarContext = {
    year: {
      zh: "早年/家庭层面：",
      en: "Early life / family: ",
      ja: "幼少期・家庭："
    },
    month: {
      zh: "青年/事业层面：",
      en: "Youth / career: ",
      ja: "青年期・キャリア："
    },
    hour: {
      zh: "晚年/子女层面：",
      en: "Later life / children: ",
      ja: "晩年・子女："
    },
  };

  const context = pillarContext[pillar as keyof typeof pillarContext];

  const godContexts: Record<string, LocaleText> = {
    "劫财": {
      zh: `${context.zh}劫财代表同辈竞争与合作。${pillar === "year" ? "在年柱，早年和家庭层面表现出热情仗义、好胜心强的性格，兄弟姐妹关系密切但也伴随资源竞争或破耗倾向。" : pillar === "month" ? "在月柱，事业发展中同辈关系既是助力也是变数，易有合伙机会但也需注意利益分配。" : "在时柱，晚年子女关系活跃，子女性格独立好胜，需注意代际沟通。"}${isFavorable ? "劫财为用，同辈、朋友能给你实质性的帮助和支持。" : "劫财为忌，需注意同辈间的过度竞争和冲动决策带来的损失。"}`,
      en: `${context.en}Peer represents peer competition and cooperation. ${isFavorable ? "As a favorable god, friends and peers bring support." : "As a challenging god, beware of peer rivalry and impulsive decisions."}`,
      ja: `${context.ja}劫財は同僚との競争と協力を表します。${isFavorable ? "有利な神として、友人や同僚がサポートをもたらします。" : "挑戦的な神として、仲間との過度な競争や衝動的な決定に注意してください。"}`,
    },
    "比肩": {
      zh: `${context.zh}比肩代表自我意识和独立精神。${pillar === "year" ? "早年性格独立自主，自我意识强，与同辈关系平等。" : pillar === "month" ? "事业中追求公平和自主权，适合独立负责的工作。" : "晚年保持独立的个性和生活方式。"}${isFavorable ? "比肩为用，独立自主的能力是你的核心优势。" : "比肩为忌，需注意固执己见带来的局限。"}`,
      en: `${context.en}Peer (Bi Jian) represents self-reliance and independence. ${isFavorable ? "As a favorable god, independence is your strength." : "Be mindful of stubbornness."}`,
      ja: `${context.ja}比肩は自立と独立を表します。${isFavorable ? "有利な神として、独立性があなたの強みです。" : "頑固さに注意してください。"}`,
    },
    "七杀": {
      zh: `${context.zh}七杀为偏官，代表压力、竞争和魄力。${pillar === "year" ? "早年环境充满竞争和挑战，塑造了你不服输的性格。" : pillar === "month" ? "事业发展中面临高强度竞争，但七杀也赋予你决断力和领导魄力。压力即动力——这是你成就事业的核心引擎。" : "晚年仍有进取心，子女关系需注意威严与温和的平衡。"}${isFavorable ? "七杀为用，压力转化为事业成就和领导权威。" : "七杀为忌，压力过重需学会借印星（学习、贵人）化解。"}`,
      en: `${context.en}Seven Killings brings intensity, competition and courage. ${isFavorable ? "Pressure transforms into achievement." : "Manage stress through learning and support."}`,
      ja: `${context.ja}七殺は激しさ、競争、勇気をもたらします。${isFavorable ? "プレッシャーが達成に変わります。" : "学習とサポートを通じてストレスを管理しましょう。"}`,
    },
    "正官": {
      zh: `${context.zh}正官代表规则、责任和权威。${pillar === "year" ? "早年家庭环境重视规矩，培养了你强烈的责任感。" : pillar === "month" ? "事业上适合体制内或规则性强的行业，能通过遵守规则获得晋升和认可。" : "晚年生活规律，子女教育严格但关系融洽。"}${isFavorable ? "正官为用，规则和责任是你的立身之本。" : "正官为忌，需避免过度循规蹈矩而失去灵活性。"}`,
      en: `${context.en}Direct Officer represents rules, responsibility and authority. ${isFavorable ? "Discipline is your foundation." : "Avoid excessive rigidity."}`,
      ja: `${context.ja}正官は規則、責任、権威を表します。${isFavorable ? "規律があなたの基盤です。" : "過度な硬直性を避けましょう。"}`,
    },
    "正印": {
      zh: `${context.zh}正印代表学识、贵人和慈爱。${pillar === "year" ? "早年得长辈宠爱和良好教育，学习能力强。" : pillar === "month" ? "事业中常有贵人相助，适合教育、文化、研究等领域。" : "晚年安逸好静，子女孝顺。"}${isFavorable ? "正印为用，学识和贵人是你的最大资源。" : "正印为忌，需避免过度依赖他人而失去自主。"}`,
      en: `${context.en}Direct Seal represents learning, mentors and compassion. ${isFavorable ? "Knowledge and mentors are your resources." : "Avoid over-dependence on others."}`,
      ja: `${context.ja}正印は学び、メンター、慈悲を表します。${isFavorable ? "知識とメンターがあなたのリソースです。" : "他者への過度な依存を避けましょう。"}`,
    },
    "偏印": {
      zh: `${context.zh}偏印代表特殊才能、直觉和非传统智慧。${pillar === "year" ? "早年展现出与众不同的天赋或兴趣。" : pillar === "month" ? "事业上适合技术、研究、玄学等需要深度思考的领域。" : "晚年喜欢独处，有精神追求。"}${isFavorable ? "偏印为用，独特的思维方式是你脱颖而出的关键。" : "偏印为忌，需注意孤僻或过度思虑的倾向。"}`,
      en: `${context.en}Indirect Seal represents unique talents and unconventional wisdom. ${isFavorable ? "Your unique thinking sets you apart." : "Guard against isolation and overthinking."}`,
      ja: `${context.ja}偏印は独自の才能と非従来型の知恵を表します。${isFavorable ? "独自の思考があなたを際立たせます。" : "孤立や考えすぎに注意しましょう。"}`,
    },
    "食神": {
      zh: `${context.zh}食神代表才华、享受和创造力。${pillar === "year" ? "早年在艺术或表达方面展现天赋，性格乐观开朗。" : pillar === "month" ? "事业上适合创意、娱乐、餐饮等让人享受的行业。" : "晚年安逸享受生活，子女关系融洽。"}${isFavorable ? "食神为用，创造力是你最大的财富。" : "食神为忌，需避免过度享乐和缺乏自律。"}`,
      en: `${context.en}Eating God represents creativity and enjoyment. ${isFavorable ? "Creativity is your greatest asset." : "Balance enjoyment with discipline."}`,
      ja: `${context.ja}食神は創造性と享受を表します。${isFavorable ? "創造性があなたの最大の資産です。" : "楽しみと規律のバランスを取りましょう。"}`,
    },
    "伤官": {
      zh: `${context.zh}伤官代表才华、反叛和创新思维。${pillar === "year" ? "早年表现出特立独行的性格和不拘一格的思维方式。" : pillar === "month" ? "事业上适合创新型行业，不惧打破常规。但需注意与权威的相处方式。" : "晚年思维活跃，子女有个性有才华。"}${isFavorable ? "伤官为用，突破常规的创新能力是你的核心竞争力。" : "伤官为忌，需注意言行过激带来的负面影响。"}`,
      en: `${context.en}Hurting Officer represents brilliance and unconventional thinking. ${isFavorable ? "Innovation is your edge." : "Watch for overly sharp words."}`,
      ja: `${context.ja}傷官は才気と非従来型思考を表します。${isFavorable ? "革新があなたの強みです。" : "鋭すぎる言葉に注意しましょう。"}`,
    },
    "正财": {
      zh: `${context.zh}正财代表稳定收入和实际责任。${pillar === "year" ? "早年家境稳定，培养了务实的金钱观。" : pillar === "month" ? "事业上通过踏实努力获得稳定收入，适合传统行业。" : "晚年经济稳定，有积蓄。"}${isFavorable ? "正财为用，稳健理财是你安身立命之本。" : "正财为忌，需注意过度保守错失机会。"}`,
      en: `${context.en}Direct Wealth represents steady income and responsibility. ${isFavorable ? "Steady finance is your foundation." : "Don't let conservatism block opportunities."}`,
      ja: `${context.ja}正財は安定した収入と責任を表します。${isFavorable ? "安定した財務があなたの基盤です。" : "保守性が機会を妨げないようにしましょう。"}`,
    },
    "偏财": {
      zh: `${context.zh}偏财代表意外之财和商业直觉。${pillar === "year" ? "早年家境有起伏，培养了灵活的商业头脑。" : pillar === "month" ? "事业上适合投资、贸易、创业等灵活多变的领域。" : "晚年有意外收入，但也需注意财务波动。"}${isFavorable ? "偏财为用，灵活的商业嗅觉是你的财富密码。" : "偏财为忌，需注意投机风险和财务不稳定。"}`,
      en: `${context.en}Indirect Wealth represents unexpected gains and business instinct. ${isFavorable ? "Your business sense is your wealth key." : "Beware of speculation risks."}`,
      ja: `${context.ja}偏財は予期せぬ収入とビジネス直感を表します。${isFavorable ? "ビジネスセンスが富の鍵です。" : "投機リスクに注意しましょう。"}`,
    },
  };

  const entry = godContexts[godName];
  const fallback: LocaleText = {
    zh: `${context.zh}${godName}在此柱位的具体含义需结合整体格局深入分析`,
    en: `${context.en}${godName} at this pillar requires holistic analysis`,
    ja: `${context.ja}${godName}のこの柱での意味は全体的分析が必要`,
  };
  return entry || fallback;
}

function buildPersonalityGuide(gods: string[], isStrong: boolean, dmElement: string, lang: string): LocaleText {
  const traits: string[] = [];
  if (gods.includes("劫财")) traits.push(lang === "zh" ? "热情仗义、好胜心强" : lang === "ja" ? "情熱的で義理堅い" : "passionate and competitive");
  if (gods.includes("七杀")) traits.push(lang === "zh" ? "果断强势、不畏挑战" : lang === "ja" ? "断固として挑戦を恐れない" : "decisive and fearless");
  if (gods.includes("正官")) traits.push(lang === "zh" ? "责任感强、遵纪守法" : lang === "ja" ? "責任感が強い" : "responsible and disciplined");
  if (gods.includes("食神")) traits.push(lang === "zh" ? "温和乐观、有创造力" : lang === "ja" ? "温和で楽観的" : "gentle and creative");
  if (gods.includes("正印")) traits.push(lang === "zh" ? "学识渊博、心地善良" : lang === "ja" ? "学識豊かで善良" : "learned and kind");

  const zh = `你的性格融合了${traits.join("、")}的特质。${isStrong ? "日主强旺，这些特质表现明显且富有力量。" : "日主中和，这些特质相互调和，在不同场合自然切换。"}${gods.includes("七杀") && gods.includes("正官") ? "官杀并存让你既有规则意识又有突破魄力，懂得何时遵守、何时打破。" : ""}`;
  const en = `Your personality blends ${traits.join(", ")}. ${isStrong ? "These traits are pronounced and powerful." : "These traits balance each other naturally."}`;
  const ja = `あなたの性格は${traits.join("、")}の特質を融合しています。${isStrong ? "これらの特質は顕著で力強いです。" : "これらの特質は自然にバランスを取ります。"}`;

  return { zh, en, ja };
}

function buildCareerGuide(gods: string[], isStrong: boolean, lang: string): LocaleText {
  const zh = `${gods.includes("七杀") && gods.includes("正官") ? "官杀混杂的格局适合管理、法律、军警、竞技等规则性强又充满挑战的行业。正官带来的责任感让你在体制内也能获得信任，七杀的魄力则让你在关键时刻敢于突破。" : ""}${gods.includes("劫财") ? "劫财的特质适合需要人际交往和团队协作的工作，但需注意合伙中的利益分配。" : ""}${gods.includes("食神") ? "食神的创造力适合文化创意、餐饮娱乐等行业。" : ""}事业上${isStrong ? "适合主动出击、担当重任" : "适合借力发展、以柔克刚"}。`;
  const en = `${gods.includes("七杀") && gods.includes("正官") ? "The mixed officer pattern suits law, management, and competitive fields." : ""}${gods.includes("劫财") ? "Peer energy benefits team-based work, but watch partnership boundaries." : ""}Career: ${isStrong ? "take initiative and lead" : "build alliances and adapt"}.`;
  const ja = `${gods.includes("七杀") && gods.includes("正官") ? "官殺混雜のパターンは法律、管理、競争的分野に適しています。" : ""}キャリア：${isStrong ? "主導権を取る" : "同盟を築き適応する"}。`;
  return { zh, en, ja };
}

function buildRelationshipGuide(gods: string[], lang: string): LocaleText {
  const zh = `人际方面${gods.includes("劫财") ? "，同辈朋友众多但需注意利益边界，友情和合作要分清楚" : ""}${gods.includes("七杀") ? "，对上级和权威既有敬畏也有挑战，需找到平衡的表达方式" : ""}${gods.includes("正官") ? "，对伴侣和家庭责任感强，是可靠的伴侣类型" : ""}。感情中${gods.includes("劫财") ? "热情主动" : gods.includes("正印") ? "温和体贴" : "真诚直接"}。`;
  const en = `${gods.includes("劫财") ? "Many peers but set boundaries. " : ""}${gods.includes("七杀") ? "Balance authority with autonomy. " : ""}In love, you're ${gods.includes("劫财") ? "passionate" : gods.includes("正印") ? "gentle" : "sincere"}.`;
  const ja = { zh, en, ja: "" }[lang] || zh;
  return { zh, en, ja };
}

function buildWealthGuide(gods: string[], lang: string): LocaleText {
  const zh = `财运方面${gods.includes("劫财") ? "，有赚钱动力但也易冲动消费或合伙破财，建议建立独立的财务账户和储蓄习惯" : ""}${gods.includes("七杀") ? "，财富往往伴随压力和竞争而来，高风险高回报的模式更适合你" : ""}${gods.includes("正官") ? "，正财稳定，适合长期积累和稳健投资" : ""}。${gods.includes("七杀") && gods.includes("劫财") ? "需特别注意，劫财与官杀的组合意味着财务上既有机遇也有风险，建议分散投资、保守理财。" : ""}`;
  const en = `${gods.includes("劫财") ? "Strong earning drive but watch impulsive spending. " : ""}${gods.includes("七杀") ? "Wealth comes with pressure. " : ""}Build independent savings habits.`;
  const ja = { zh, en, ja: "" }[lang] || zh;
  return { zh, en, ja };
}
