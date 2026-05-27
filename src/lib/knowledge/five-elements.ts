// Five elements balance interpretation
type LocaleText = { en: string; zh: string; ja: string };

interface ElementInterpretation {
  balanced: LocaleText;
  excess: LocaleText;
  deficient: LocaleText;
}

const interpretations: Record<string, ElementInterpretation> = {
  "金": {
    balanced: {
      en: "Metal is well-represented in your chart, granting you a sharp mind, strong principles, and a decisive nature. You have a natural sense of structure and justice.",
      zh: "金元素在你的八字中平衡良好，赋予你清晰的思维、坚定原则和果断性格。你天生具有结构感和正义感。",
      ja: "金のエレメントはあなたの命式でバランスが取れており、鋭い頭脳、強い原則、断固たる性質をもたらします。構造と正義に対する自然な感覚があります。"
    },
    excess: {
      en: "Metal is notably strong in your chart. While this gives you formidable willpower and analytical ability, it may also make you rigid or overly critical at times. Balance with Water-element activities — fluidity and creativity soften Metal's edge.",
      zh: "金元素在你的八字中偏旺。这赋予你强大的意志力和分析能力，但有时也可能让你变得固执或过于挑剔。以水元素的活动来平衡——流动性和创造力可以柔化金的锋利。",
      ja: "金のエレメントがあなたの命式で顕著に強いです。これは強大な意志力と分析力をもたらしますが、時に頑固さや過度の批判性をもたらすこともあります。水の活動でバランスを取りましょう。"
    },
    deficient: {
      en: "Metal is relatively weak in your chart. You may benefit from cultivating more structure and discipline in daily life. Earth-element practices — grounding routines, stability, and patience — help generate Metal energy within you.",
      zh: "金元素在你的八字中偏弱。在日常生活中培养更多的结构和纪律将对你有益。土元素的实践——扎根的日常、稳定性和耐心——有助生金。",
      ja: "金のエレメントはあなたの命式で比較的弱いです。日常生活でより多くの構造と規律を育むことが有益です。土の実践—グラウンディングのルーティン、安定性、忍耐—が内なる金のエネルギーを生成するのを助けます。"
    }
  },
  "木": {
    balanced: {
      en: "Wood is harmoniously present in your chart, endowing you with growth-mindedness, compassion, and adaptability. You balance ambition with patience beautifully.",
      zh: "木元素在你的八字中和合均衡，赋予你成长思维、慈悲心和适应力。你能优美地平衡雄心与耐心。",
      ja: "木のエレメントが調和して存在し、成長志向、思いやり、適応力をもたらします。野心と忍耐を美しくバランスさせます。"
    },
    excess: {
      en: "Wood dominates your chart. Your drive and ambition are remarkable, but you may spread yourself too thin or become impatient when results don't come quickly. Earth-element grounding — routines, stability, and tangible goals — helps channel Wood's expansive energy productively.",
      zh: "木元素主导你的八字。你的动力和雄心令人瞩目，但你可能摊得太薄或在结果不速时变得急躁。土元素的扎根——规律、稳定和具体目标——有助于将木的扩张能量导向生产。",
      ja: "木があなたの命式を支配しています。あなたの意欲と野心は驚くべきものですが、結果が早く出ないときに手を広げすぎたり焦ったりすることがあります。土のグラウンディングが木の拡張的エネルギーを生産的に導くのを助けます。"
    },
    deficient: {
      en: "Wood is relatively weak in your chart. You may sometimes lack initiative or struggle to assert yourself. Water-element nourishment — learning, reflection, and self-care — generates Wood energy. Spend time in nature to replenish your Wood qi.",
      zh: "木元素在你的八字中偏弱。你有时可能缺乏主动性或难以坚持己见。水元素的滋养——学习、反思和自我关怀——能生木。多在自然中度过时光以补充木气。",
      ja: "木のエレメントはあなたの命式で比較的弱いです。時に主導性を欠いたり自己主張に苦労したりするかもしれません。水の滋養—学習、内省、セルフケア—が木のエネルギーを生成します。自然の中で過ごして木の気を補充しましょう。"
    }
  },
  "水": {
    balanced: {
      en: "Water flows gracefully through your chart, gifting you with deep intuition, wisdom, and excellent communication skills. You navigate change with remarkable ease.",
      zh: "水元素在你的八字中流动自如，赋予你深邃的直觉、智慧和出色的沟通能力。你能以惊人的从容应对变化。",
      ja: "水のエレメントが優雅に流れ、深い直感、知恵、優れたコミュニケーション能力をもたらします。変化を驚くべき容易さで乗りこなします。"
    },
    excess: {
      en: "Water is predominant in your chart. Your intuition and emotional depth are extraordinary, but you may experience emotional overwhelm or indecisiveness. Earth-element grounding — structure, routine, and physical activity — provides the banks for your river.",
      zh: "水元素在你的八字中占主导。你的直觉和情感深度非凡，但可能经历情绪淹没或犹豫不决。土元素的扎根——结构、日常规律和身体活动——为你的河流提供堤岸。",
      ja: "水があなたの命式で優勢です。あなたの直感と感情の深さは非凡ですが、感情的な圧倒や優柔不断を経験することがあります。土のグラウンディング—構造、ルーティン、身体活動—があなたの川に土手を提供します。"
    },
    deficient: {
      en: "Water is relatively scarce in your chart. You may benefit from cultivating more reflection, intuition, and emotional awareness. Metal-element practices — precision, structure, and focused learning — generate Water energy. Prioritize rest and hydration.",
      zh: "水元素在你的八字中偏少。培养更多的反思、直觉和情感意识将对你有益。金元素的实践——精准、结构和专注学习——能生水。优先保证休息和补水。",
      ja: "水のエレメントはあなたの命式で比較的少ないです。より多くの内省、直感、感情的な気づきを育むことが有益です。金の実践—精密さ、構造、集中した学習—が水のエネルギーを生成します。休息と水分補給を優先しましょう。"
    }
  },
  "火": {
    balanced: {
      en: "Fire burns brightly in your chart, giving you charisma, passion, and the courage to pursue your dreams. You radiate warmth that naturally attracts others.",
      zh: "火元素在你的八字中明亮燃烧，赋予你魅力、热情和追逐梦想的勇气。你散发温暖，自然吸引他人。",
      ja: "火のエレメントが明るく燃え、カリスマ性、情熱、夢を追求する勇気をもたらします。自然に他者を惹きつける温かさを放ちます。"
    },
    excess: {
      en: "Fire blazes strongly in your chart. Your energy and enthusiasm are infectious, but burnout is a real risk. You may also come across as intense or domineering. Water-element cooling — meditation, rest, and reflective practices — keeps your flame sustainable rather than explosive.",
      zh: "火元素在你的八字中炽烈燃烧。你的能量和热情有感染力，但倦怠是真实的风险。你可能也显得过于强势。水元素的清凉——冥想、休息和反思——让你的火焰可持续而非爆裂。",
      ja: "火があなたの命式で強く燃え盛っています。あなたのエネルギーと熱意は伝染しますが、燃え尽きは本当のリスクです。水の冷却—瞑想、休息、内省的実践—があなたの炎を持続可能にします。"
    },
    deficient: {
      en: "Fire is relatively weak in your chart. You may sometimes lack confidence or struggle to find motivation. Wood-element fuel — growth, learning, and creative expression — feeds Fire. Surround yourself with inspiring people and projects that ignite your passion.",
      zh: "火元素在你的八字中偏弱。你有时可能缺乏自信或难以找到动力。木元素的燃料——成长、学习和创意表达——能生火。用鼓舞人心的人和项目围绕自己，点燃你的热情。",
      ja: "火のエレメントはあなたの命式で比較的弱いです。時に自信を欠いたりモチベーションを見つけるのに苦労したりするかもしれません。木の燃料—成長、学習、創造的表現—が火を養います。情熱に火をつける人々やプロジェクトで自分を囲みましょう。"
    }
  },
  "土": {
    balanced: {
      en: "Earth is steady and reliable in your chart, providing you with practicality, patience, and a nurturing spirit. You are the anchor that others depend upon.",
      zh: "土元素在你的八字中稳重可靠，赋予你实用主义、耐心和滋养他人的精神。你是别人依赖的锚。",
      ja: "土のエレメントが安定して信頼でき、実用性、忍耐、育む精神をもたらします。あなたは他者が依存する錨です。"
    },
    excess: {
      en: "Earth dominates your chart. Your reliability and patience are legendary, but you may resist change or become stuck in routines. Wood-element movement — growth, new experiences, and flexibility — breaks through Earth's inertia and brings fresh energy.",
      zh: "土元素主导你的八字。你的可靠和耐心是传奇，但你可能抗拒变化或陷入惯性。木元素的运动——成长、新体验和灵活性——可以突破土的惯性，带来新能量。",
      ja: "土があなたの命式を支配しています。あなたの信頼性と忍耐は伝説的ですが、変化に抵抗したりルーティンに固執したりすることがあります。木の動き—成長、新しい経験、柔軟性—が土の慣性を突破し新鮮なエネルギーをもたらします。"
    },
    deficient: {
      en: "Earth is relatively weak in your chart. You may benefit from building more stability and routine in your life. Fire-element warmth — community, celebration, and self-expression — generates Earth energy. Ground yourself through regular meals, consistent schedules, and time in nature.",
      zh: "土元素在你的八字中偏弱。在生活中建立更多稳定和规律将对你有益。火元素的温暖——社群、庆祝和自我表达——能生土。通过规律饮食、稳定作息和自然时光来扎根。",
      ja: "土のエレメントはあなたの命式で比較的弱いです。生活により多くの安定性とルーティンを築くことが有益です。火の温かさ—コミュニティ、祝賀、自己表現—が土のエネルギーを生成します。規則正しい食事、一貫したスケジュール、自然の中での時間を通じてグラウンディングしましょう。"
    }
  }
};

export function getElementInterpretation(
  element: string,
  count: number
): LocaleText {
  const interp = interpretations[element] || interpretations["土"];
  if (count >= 4) return interp.excess;
  if (count <= 1) return interp.deficient;
  return interp.balanced;
}

export function getElementNames() {
  return {
    en: ["Metal", "Wood", "Water", "Fire", "Earth"],
    zh: ["金", "木", "水", "火", "土"],
    ja: ["金", "木", "水", "火", "土"],
  };
}
