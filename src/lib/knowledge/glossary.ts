// Plain-language explanations for Ba Zi terminology

type LocaleText = { en: string; zh: string; ja: string };

export function explainChartType(chartType: string, dayElement: string, locale: string): LocaleText {
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";

  // Determine if it's a strong/weak/balanced pattern
  const isStrong = chartType.includes("旺");
  const isWeak = chartType.includes("弱");
  const isBalanced = chartType.includes("中和");

  const elementName = elementNames[dayElement] || { en: dayElement, zh: dayElement, ja: dayElement };

  const explanations: Record<string, LocaleText> = {
    strong: {
      en: `A ${chartType} means your ${elementName.en} energy is dominant in your chart. People with strong day masters have pronounced ${elementName.en}-type qualities: they are naturally forceful in their element's expression. The key to balance is channeling this strong energy productively rather than letting it overwhelm other aspects of life. Your strengths are obvious and powerful — the challenge is moderation and receptivity to other perspectives. Think of it as having a very loud instrument in an orchestra: when played well, it leads magnificently; unchecked, it drowns out the harmony.`,
      zh: `${chartType}意味着你的${elementName.zh}能量在命盘中占主导地位。日主强旺之人，其五行特质极为鲜明。关键在于将这股强大的能量导入正轨，而不是让它在生活中横冲直撞。你的优势显而易见且强大——挑战在于学会节制和接纳其他视角。好比乐团中一把极响亮的乐器：演奏得当则引领全场；不加约束则压过和声。`,
      ja: `${chartType}はあなたの${elementName.ja}のエネルギーが命式で優勢であることを意味します。日主が強い人は、その元素の特質が顕著に現れます。この強いエネルギーを生産的に導くことがバランスの鍵です。あなたの強みは明白で力強いものですが、節度と他者の視点を受け入れることが課題です。`,
    },
    weak: {
      en: `A ${chartType} means your ${elementName.en} energy is relatively gentle in your chart. This is not a weakness — it means your ${elementName.en} qualities express in a more subtle, adaptable way. You may feel less forceful than others, but you possess the gift of flexibility. Your path is about nurturing your innate energy rather than forcing outcomes. Think of a young tree versus an ancient oak: the young tree bends with the wind and survives the storm that topples rigid giants. Your strength lies in adaptability and the wisdom to seek support from favorable elements.`,
      zh: `${chartType}意味着你的${elementName.zh}能量在命盘中相对柔和。这并非缺陷——而是你的${elementName.zh}特质以更细腻、更灵活的方式表达。你可能不似他人那般强势，但你拥有灵活变通的天赋。你的道路是滋养内在能量，而非强行求果。好比幼苗与古木：幼苗随风而弯，在摧折巨木的风暴中存活。你的力量在于适应力和寻求支持的智慧。`,
      ja: `${chartType}はあなたの${elementName.ja}のエネルギーが命式で比較的穏やかであることを意味します。これは弱点ではなく、より繊細で適応力のある表現方法です。他者より力強くないと感じるかもしれませんが、柔軟性という才能を持っています。あなたの道は結果を強制するのではなく、生来のエネルギーを育むことです。`,
    },
    balanced: {
      en: `A ${chartType} is a harmonious pattern — your ${elementName.en} energy is neither excessive nor deficient. This is considered one of the most fortunate chart types, as it grants you natural adaptability. You can be strong when needed and gentle when appropriate, like a skilled martial artist who uses force and yielding in equal measure. Your life path is not dominated by a single extreme; instead, you have the freedom to respond to circumstances with wisdom. The balanced chart is like fertile soil that can grow many kinds of plants — your potential is diverse and resilient.`,
      zh: `${chartType}是一种和谐的格局——你的${elementName.zh}能量不过旺也不过弱。这被认为是最吉利的命格之一，因为它赋予你天然的适应力。你能在该强时强、该柔时柔，如同一位能用刚柔并济的武者。你的人生不被单一极端所支配，而是能凭智慧应对万变。中和之格如同沃土，能生长万物——你的潜力是多元而坚韧的。`,
      ja: `${chartType}は調和のとれたパターンです——あなたの${elementName.ja}のエネルギーは過剰でも不足でもありません。これは最も幸運な命式の一つとされ、自然な適応力をもたらします。必要なときには強く、適切なときには優しく、力と柔軟さを等しく使う熟練の武道家のようです。あなたの人生は単一の極端に支配されず、知恵をもって状況に対応する自由があります。`,
    },
  };

  const key = isStrong ? "strong" : isWeak ? "weak" : "balanced";
  return explanations[key] || explanations.balanced;
}

const elementNames: Record<string, LocaleText> = {
  "木": { en: "Wood", zh: "木", ja: "木" },
  "火": { en: "Fire", zh: "火", ja: "火" },
  "土": { en: "Earth", zh: "土", ja: "土" },
  "金": { en: "Metal", zh: "金", ja: "金" },
  "水": { en: "Water", zh: "水", ja: "水" },
};

export function explainFiveElements(elements: Record<string, number>, locale: string): LocaleText {
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";
  const entries = Object.entries(elements).sort((a, b) => (b[1] as number) - (a[1] as number));
  const strongest = entries[0];
  const weakest = entries[4];

  const strongestName = elementNames[strongest[0]] || { en: strongest[0], zh: strongest[0], ja: strongest[0] };
  const weakestName = elementNames[weakest[0]] || { en: weakest[0], zh: weakest[0], ja: weakest[0] };

  const texts: Record<string, string> = {
    en: `Your Five Elements distribution reveals a natural strength in ${strongestName.en} (${strongest[1]} counts) and a relative deficiency in ${weakestName.en} (${weakest[1]} counts). The Five Elements are not just abstract concepts — they correspond to real aspects of your life: Wood is growth and creativity, Fire is passion and expression, Earth is stability and nurture, Metal is structure and justice, Water is wisdom and adaptability. Your dominant element shapes your instinctive responses, while your weakest element points to areas of potential growth. Balance is not about having equal amounts — it's about each element serving its proper function.`,
    zh: `你的五行分布中，${strongestName.zh}最旺（${strongest[1]}个单位），${weakestName.zh}最弱（${weakest[1]}个单位）。五行并非抽象概念——它们对应你生活的真实面向：木主生长与创造，火主热情与表达，土主稳重与滋养，金主规则与正义，水主智慧与变通。你的主导元素塑造你的本能反应，而最弱元素则指向你潜在的成长方向。平衡不是均等分配——而是各元素各司其职、各得其所。`,
    ja: `あなたの五行分布では、${strongestName.ja}が最も強く（${strongest[1]}単位）、${weakestName.ja}が最も弱い（${weakest[1]}単位）です。五行は抽象的な概念ではなく、人生の具体的な側面に対応します：木は成長と創造、火は情熱と表現、土は安定と滋養、金は構造と正義、水は知恵と適応力です。あなたの優勢な元素が本能的な反応を形作り、最も弱い元素が潜在的な成長分野を示します。`,
  };

  return { en: texts.en, zh: texts.zh, ja: texts.ja };
}

export function explainDayMaster(stem: string, element: string, locale: string): LocaleText {
  const lang = locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en";
  const polarity = ["甲","丙","戊","庚","壬"].includes(stem) ? "阳" : "阴";
  const polarityName = polarity === "阳"
    ? { en: "Yang", zh: "阳", ja: "陽" }
    : { en: "Yin", zh: "阴", ja: "陰" };

  const texts: Record<string, string> = {
    en: `Your Day Master is ${stem} — ${polarityName.en} ${element}. In Ba Zi, the Day Master represents YOU: your core self, your innate nature, and how you instinctively interact with the world. The Heavenly Stem ${stem} carries the energy of ${element} in its ${polarityName.en} form. ${polarityName.en === "Yang" ? `Yang ${element} is outward, active, and expressive — like sunlight on water or a blazing fire.` : `Yin ${element} is inward, reflective, and receptive — like moonlight on a lake or a quietly burning candle.`} Understanding your Day Master is the first and most important step to understanding your entire chart.`,
    zh: `你的日主是${stem}——${polarityName.zh}${element}。在八字中，日主代表"你"：你的核心自我、先天本性以及你本能地与世界互动的方式。天干${stem}承载着${element}的${polarityName.zh}性能量。${polarityName.zh === "阳" ? `阳${element}外向、主动、表现——如阳光照水或烈火燃烧。` : `阴${element}内向、沉静、接纳——如月映湖面或烛光静静燃烧。`}理解你的日主是理解整个命盘的第一步，也是最重要的一步。`,
    ja: `あなたの日主は${stem}——${polarityName.ja}${element}です。八字において日主は「あなた自身」を表します：あなたの核心的な自己、生来の性質、そして本能的に世界と交流する方法です。天干${stem}は${element}の${polarityName.ja}のエネルギーを帯びています。${polarityName.ja === "陽" ? `陽${element}は外向的、能動的、表現的です——水面の陽光や燃え盛る炎のように。` : `陰${element}は内向的、内省的、受容的です——湖上の月光や静かに燃えるろうそくのように。`}日主を理解することは、命盤全体を理解するための最初で最も重要なステップです。`,
  };

  return { en: texts.en, zh: texts.zh, ja: texts.ja };
}
