// Day Master interpretations. Organized by stem, then by analysis dimension.
// Each entry has en/zh/ja variants.

type LocaleText = { en: string; zh: string; ja: string };

interface DayMasterProfile {
  personality: LocaleText;
  wealth: LocaleText;
  love: LocaleText;
  health: LocaleText;
  career: LocaleText;
  yearlyTrend: LocaleText;
  summary: LocaleText;
}

// prettier-ignore
const profiles: Record<string, DayMasterProfile> = {
  "甲": {
    personality: {
      en: "Your Day Master is Jia (Yang Wood), the towering tree that reaches skyward. You possess a natural dignity and an innate drive to grow, lead, and build. Others see you as reliable, principled, and straight-talking — a person of integrity who stands firm like an ancient pine. You thrive when given responsibility and space to expand your vision. At times, your directness can be perceived as inflexibility, but those who know you understand it comes from a place of deep conviction.",
      zh: "日主甲木，乃参天大树之象。你天生具有领袖气质与进取之心，为人正直可靠，行事光明磊落。如同古松挺立，你坚守原则，不轻易动摇。你需要施展空间来发挥才能，不喜欢被过多束缚。有时直接坦率的性格可能显得不够圆融，但这正是你内心坚定的表现。",
      ja: "あなたの日主は甲（陽の木）—天に向かって伸びる大樹です。生まれながらの品格と、成長・リード・構築への強い意志を持っています。周囲からは信頼でき、誠実で、率直な人物と見られています。古松のように揺るがない信念の持ち主です。時に率直さが柔軟性のなさと受け取られることもありますが、それは深い信念から来るものです。"
    },
    wealth: {
      en: "As Jia Wood, your wealth comes through steady growth rather than quick wins. You excel in industries related to education, publishing, law, real estate, and environmental sectors. Your financial peak tends to arrive in your 30s and 50s when Wood meets its supporting elements of Water and Earth. Avoid speculative investments — your path to prosperity is through building lasting value. Partnerships with Fire-day people often bring financial opportunities.",
      zh: "甲木之财，来自稳健积累而非投机取巧。你适合教育、出版、法律、地产、环保等行业。财运高峰期多在30多岁和50多岁，木得水土相生之时。忌投机，宜以长期价值为导向。与火日主之人合作常能带来财运。",
      ja: "甲木の財運は、短期的な利益ではなく着実な成長によってもたらされます。教育、出版、法律、不動産、環境分野との相性が良好です。財運のピークは30代と50代に訪れ、木が水と土の支えを得るときです。投機的な投資は避け、持続的な価値構築が繁栄への道です。火の日主との協力関係が財務的な機会をもたらします。"
    },
    love: {
      en: "In relationships, Jia Wood seeks a partner who respects their independence while providing emotional grounding. You may appear reserved initially, but once committed, your loyalty runs deep like roots. Best compatibility with Ji (Earth) and Ding (Fire) day masters, who soften your intensity and kindle your passion. Be mindful of work-life balance — your drive to achieve can sometimes overshadow emotional availability.",
      zh: "甲木在感情中需要一个尊重你独立性又能给你情感依靠的伴侣。初识时你可能显得内敛，但一旦认定，忠诚如根深蒂固。与己土、丁火日主最为匹配，能以柔克刚、以暖生发。注意工作与感情的平衡——事业心过强时容易忽略伴侣的情感需求。",
      ja: "甲木は関係性において、自分の独立性を尊重しつつ感情的な支えを提供してくれるパートナーを求めます。最初は控えめに見えるかもしれませんが、一度コミットすると根のような深い忠誠心を示します。己（土）と丁（火）の日主との相性が良く、あなたの強さを和らげ情熱を灯します。仕事と生活のバランスに注意が必要です。"
    },
    health: {
      en: "Your Wood constitution gives you robust vitality, but be mindful of your liver and gallbladder — the organs associated with Wood. Stress tends to manifest as headaches, eye strain, or muscle tension. Regular outdoor exercise, especially in the morning, keeps your Wood energy flowing smoothly. A diet rich in green vegetables and sour flavors supports your constitutional balance. Practice letting go — holding onto anger or resentment depletes your Wood qi.",
      zh: "木性体质赋予你旺盛的生命力，但需关注肝胆健康——木对应肝胆。压力常表现为头痛、眼疲劳或肌肉紧张。晨间户外运动最能疏泄木气。多食绿色蔬菜和酸味食物有助于保持平衡。学会放下——郁怒伤肝，最损木气。",
      ja: "木の体質は強靭な生命力をもたらしますが、肝胆（木に関連する臓器）に注意が必要です。ストレスは頭痛、眼精疲労、筋肉の緊張として現れやすいです。特に朝の戸外運動が木のエネルギーをスムーズに流します。緑の野菜と酸味のある食事が体質的バランスをサポートします。怒りや恨みを溜め込まないことです。"
    },
    career: {
      en: "Your ideal career path involves leadership, strategy, or creative direction. You are a natural entrepreneur or executive — corporate management, architecture, urban planning, and environmental law are strong fits. You work best when given autonomy and a long-term vision to execute. Avoid micromanagement-heavy roles. Your career rises steadily, with major breakthroughs around ages 31-33 and 51-53 when the luck cycles favor your element.",
      zh: "你最适合领导、策略或创意方向的工作。天生的企业家或高管人才——企业管理、建筑设计、城市规划、环境法律等领域都能大展拳脚。你需要自主权和长远目标才能发挥最佳状态。避开琐碎管理型的岗位。事业稳步上升，31-33岁和51-53岁有大运助力。",
      ja: "理想的なキャリアパスは、リーダーシップ、戦略、クリエイティブディレクションです。生まれながらの起業家または経営者であり、企業経営、建築、都市計画、環境法が適職です。自律性と長期的ビジョンを与えられたときに最高の力を発揮します。31-33歳と51-53歳に大きなキャリアの飛躍があります。"
    },
    yearlyTrend: {
      en: "This year, the cosmic energies bring a mixed landscape for Jia Wood. Spring and summer favor action — launch projects, expand your network, and pursue advancement. Autumn calls for consolidation and reflection. Pay attention to Water-element months (winter) for unexpected opportunities. An Earth-branch clash in the mid-year suggests caution with major financial decisions. Overall, a year of steady progress rather than dramatic change.",
      zh: "今年甲木运势总体稳中有升。春夏宜进取——启动项目、拓展人脉、争取晋升。秋冬宜收敛巩固。冬季水旺之月或有意外之机。年中地支相冲，大额财务决策需谨慎。总体而言，稳健进步之年，不宜冒进。",
      ja: "今年の甲木は、穏やかな上昇運です。春と夏は行動の季節—プロジェクトを立ち上げ、人脈を広げ、昇進を目指しましょう。秋は整理と内省の時期です。冬の水の月には予期せぬチャンスが訪れます。年央の地支の衝突は大きな財務判断に注意を促します。全体として、着実な進歩の年です。"
    },
    summary: {
      en: "A noble tree standing firm — your path is one of steady growth, principled leadership, and lasting achievement.",
      zh: "参天大树，挺立不移——你的命运之路是稳健成长、正直引领、基业长青。",
      ja: "天を衝く大樹—あなたの道は着実な成長、信念のリーダーシップ、永続的な達成の道です。"
    }
  },

  "乙": {
    personality: {
      en: "Your Day Master is Yi (Yin Wood), the graceful vine and delicate flower. Where Jia is the mighty tree, Yi is the beautiful orchid — flexible, charming, and adaptive. You possess remarkable social intelligence and an aesthetic sensibility. You navigate complex social landscapes with elegance and tact. Beneath your gentle exterior lies surprising resilience — like ivy that can crack stone walls. You are persuasive without being aggressive, achieving goals through diplomacy and patience.",
      zh: "日主乙木，乃花草藤萝之象。不同于甲木的刚直，乙木柔美婉转，善于适应。你具有出色的社交智慧和审美天赋，能在复杂的人际关系中游刃有余。表面柔韧，内心却异常坚韧——如藤萝可穿石。你以柔克刚，以耐心和智慧达成目标，不靠强攻而靠浸润。",
      ja: "あなたの日主は乙（陰の木）—優美な蔓草であり繊細な花です。甲が大樹なら、乙は美しい蘭—柔軟で魅力的、適応力に富みます。優れた社会的知性と美的感覚を持ち、複雑な人間関係を優雅に渡り歩きます。穏やかな外見の下には驚くべき粘り強さが隠れており、石壁をも砕く蔦のようなものです。攻撃的にならず説得力を持ち、忍耐と外交で目標を達成します。"
    },
    wealth: {
      en: "Yi Wood attracts wealth through creativity, networking, and service. Your financial strength lies in art, design, fashion, beauty, wellness, and consulting. You have a gift for spotting trends before others. Multiple income streams suit you better than a single salary. Your wealth grows through relationships — collaborations and partnerships are key. The most prosperous periods come when Wood meets Water (support) and Earth (wealth). Be cautious of lending to friends.",
      zh: "乙木之财来自创意、人脉与服务。艺术、设计、时尚、美容、养生、咨询是你的财富领域。你有先于他人发现趋势的天赋。多元化收入优于单一工资。财富因关系而增长——合作共赢是核心。木得水润土培之时最为富足。慎为友人担保借贷。",
      ja: "乙木の財は創造性、人脈、サービスを通じて引き寄せられます。アート、デザイン、ファッション、美容、ウェルネス、コンサルティングが強みです。トレンドを人より早く見抜く才能があります。単一の給与より複数の収入源が適しています。人間関係を通じて財が成長します。木が水（支援）と土（財）を得るときが最も繁栄します。友人への貸付には注意を。"
    },
    love: {
      en: "Yi Wood is the romantic of the ten stems. You love deeply and express affection through thoughtful gestures and aesthetic touches. You seek a partner who appreciates beauty and emotional depth. Best matched with Geng (Metal) who provides structure without crushing your spirit, or Jia (Wood) who understands your nature. Be aware of your tendency to sacrifice too much in relationships — your giving nature needs boundaries. You thrive in partnerships with mutual artistic appreciation.",
      zh: "乙木乃十天干中的浪漫之人。你爱得深沉，以细腻的关怀和审美的表达来传递情感。你寻求懂得欣赏美与情感深度的伴侣。与庚金最配——他给你框架却不压制你的灵气；与甲木也合——他懂你的本性。需留意在感情中过度付出的倾向——你的温柔需要有边界。在互相欣赏的伴侣关系中最为绽放。",
      ja: "乙木は十干の中で最もロマンチックです。深く愛し、思いやりのあるしぐさと美的センスで感情を表現します。美しさと感情の深さを理解するパートナーを求めます。庚（金）は構造を与えつつ精神を押し潰さず、甲（木）はあなたの本質を理解します。人間関係で犠牲を払いすぎる傾向に注意が必要です。相互の芸術的理解のあるパートナーシップで最も輝きます。"
    },
    health: {
      en: "Your Yi Wood constitution is more delicate than Jia's — pay attention to your liver and nervous system. Stress tends to manifest as anxiety, insomnia, or skin sensitivities. Gentle exercise like yoga, tai chi, or walking in nature is ideal. Overwork depletes your Wood qi quickly. A diet with lightly cooked greens, herbal teas, and moderate amounts of fermented foods supports your system. Creative expression is actually medicinal for you — your health is tied to your artistic outlet.",
      zh: "乙木体质较甲木更为娇嫩——注意肝与神经系统。压力易表现为焦虑、失眠或皮肤敏感。瑜伽、太极、林中散步等柔和运动最为适宜。过劳最伤元气。清淡蔬菜、花草茶、适量发酵食品有益。对你而言，创作即良药——身心健康与艺术表达密切相关。",
      ja: "乙木の体質は甲より繊細です—肝臓と神経系に注意が必要です。ストレスは不安、不眠、肌の敏感さとして現れます。ヨガ、太極拳、自然散策などの穏やかな運動が理想的です。過労は木の気を急速に消耗させます。軽く調理した緑の野菜、ハーブティー、適量の発酵食品があなたのシステムをサポートします。創造的表現そのものが薬です。"
    },
    career: {
      en: "Your ideal career leverages your creativity and social skills. Interior design, fashion, landscape architecture, art direction, counseling, diplomacy, and brand strategy are excellent fits. You excel as a connector and curator rather than a commander. Freelance or entrepreneurial paths often work better than rigid corporate structures. Your career blossoms through mentorship — both receiving and giving guidance. Major career shifts align with Water-element luck cycles, typically in your late 20s and mid 40s.",
      zh: "你最适合发挥创意与社交能力的职业。室内设计、时尚、景观设计、艺术指导、心理咨询、外交、品牌策略都极适合。你是出色的连接者和策展人而非发号施令者。自由职业或创业往往比刻板的公司体制更适合你。你的职业因师徒关系而繁荣——教学相长。水运之年有重要职业转折，通常在28岁前后和45岁前后。",
      ja: "理想的なキャリアは創造性と社交性を活かせるものです。インテリアデザイン、ファッション、造園、アートディレクション、カウンセリング、外交、ブランド戦略が適職です。指揮官というより、コネクターやキュレーターとして優れています。フリーランスや起業が厳格な企業構造よりもうまくいくことが多いです。メンターシップを通じてキャリアが開花します。20代後半と40代半ばに大きな転機があります。"
    },
    yearlyTrend: {
      en: "This year favors expansion through connection for Yi Wood. Spring ignites creative energy — start new artistic projects. Summer brings social opportunities and potential romantic encounters. Metal-heavy autumn months may feel constraining; use them for refinement rather than resistance. A Water-element boost in winter signals fresh collaborations. Financially, an Earth-branch harmony in the third quarter suggests a promising investment or contract. Trust your intuition this year — it is especially sharp.",
      zh: "今年乙木因连接而扩张。春季点燃创作之火——开启新的艺术项目。夏季带来社交机会和桃花。金旺之秋或感束缚，宜顺势打磨而非抗争。冬季水旺有新的合作契机。第三季度的地支和谐暗示着有利的投资或合约。今年你的直觉格外敏锐，相信它。",
      ja: "今年の乙木は人との繋がりによる拡大がテーマです。春は創造的エネルギーに火をつけます—新しい芸術的プロジェクトを始めましょう。夏は社交の機会と恋愛運をもたらします。金の強い秋は制約を感じるかもしれません—抵抗ではなく洗練に使いましょう。冬の水のエレメントは新しいコラボレーションの兆しです。第三四半期の地支の調和は有望な投資や契約を示唆します。今年は直感が特に鋭いので信じましょう。"
    },
    summary: {
      en: "A flowering vine of grace and resilience — your path weaves beauty, connection, and quiet strength into every endeavor.",
      zh: "柔美的藤萝，坚韧的内核——你的命运之路以优雅、连接和柔韧之力编织万象。",
      ja: "優美に咲く蔓草—あなたの道は美しさ、繋がり、静かな強さをすべての営みに織り込みます。"
    }
  },

  "丙": {
    personality: {
      en: "Your Day Master is Bing (Yang Fire), the blazing sun that illuminates all. You radiate warmth, enthusiasm, and charisma wherever you go. People are drawn to your natural brightness — you light up rooms and inspire those around you. You are generous, open-hearted, and passionate about your beliefs. Your transparency can be both a strength and a vulnerability, as you wear your heart on your sleeve. You thrive in the spotlight and excel at motivating others toward a shared vision.",
      zh: "日主丙火，乃煌煌烈日之象。你热情洋溢，光芒四射，所到之处皆被你照亮。人们被你天然的光彩所吸引——你点燃空间，激励他人。你慷慨大方、心胸开阔、对信念充满热忱。光明磊落是你的优点也是软肋，因为你喜怒皆形于色。你享受聚光灯，擅长激发众人共赴愿景。",
      ja: "あなたの日主は丙（陽の火）—すべてを照らす輝く太陽です。温かさ、熱意、カリスマ性をどこでも放ちます。人々はあなたの自然な輝きに惹かれます。寛大で、オープンハートで、信念に情熱的です。透明性は強みであると同時に脆さでもあり、感情を表に出します。スポットライトを浴びることで輝き、共通のビジョンに向けて人を動機づけることに優れています。"
    },
    wealth: {
      en: "Bing Fire generates wealth through visibility and influence. Media, entertainment, marketing, technology, energy sector, and hospitality are your wealth domains. You have a Midas touch for turning ideas into profitable ventures. However, your generosity can lead to overspending — financial discipline is essential. Wealth peaks when Fire meets Wood (fuel) and Metal (the wealth element itself). The years around 35 and 55 are typically your most prosperous periods. Invest in what you believe in.",
      zh: "丙火之财来自知名度与影响力。传媒、娱乐、市场营销、科技、能源、酒店餐饮是你的财富沃土。你有点石成金的能力，能将创意化为盈利事业。但慷慨也易导致过度支出——理财务必自律。火得木生金成之时财富最旺。35岁和55岁前后通常是财运高峰。投资你所相信的。",
      ja: "丙火の財は可視性と影響力を通じて生み出されます。メディア、エンターテインメント、マーケティング、テクノロジー、エネルギー、ホスピタリティがあなたの財の領域です。アイデアを収益性のある事業に変えるミダスタッチを持っています。しかし寛大さが過剰支出につながることも—財務的な規律が不可欠です。35歳と55歳前後が最も繁栄する時期です。信念のあるものに投資しましょう。"
    },
    love: {
      en: "Bing Fire loves passionately and openly. You bring warmth and excitement to relationships, making your partner feel cherished and alive. Your ideal match is Xin (Yin Metal) — the delicate jewel that reflects and focuses your radiance — or Gui (Yin Water) whose mystery tempers your intensity. Be aware that your bright flame can sometimes overwhelm more introverted partners. You need someone who can bask in your light without being burned. Romance for you is an adventure to be shared.",
      zh: "丙火爱得炽热而坦荡。你给感情带来温暖与激情，让伴侣感到被珍视、被点燃。最佳匹配是辛金——如精致的珠宝反射你的光芒；或癸水——以柔情调和你的炽热。需注意，你的烈焰有时会让内向的伴侣感到压力。你需要一个能被你照亮而不被灼伤的人。对你而言，爱情是一场共享的冒险。",
      ja: "丙火は情熱的かつオープンに愛します。関係に温かさと興奮をもたらし、パートナーを大切にされ生き生きと感じさせます。理想的な相手は辛（陰の金）—あなたの輝きを反射する繊細な宝石—または癸（陰の水）—神秘性があなたの強さを和らげます。明るい炎が内向的なパートナーを時に圧倒することに注意。あなたの光を浴びつつ燃え尽きない人が必要です。あなたにとって恋愛は共有すべき冒険です。"
    },
    health: {
      en: "Your Fire constitution gives you abundant energy, but you're prone to burnout. The heart and small intestine are your key organs to monitor. Heat-related conditions — inflammation, high blood pressure, skin rashes — may arise when Fire is excessive. Cooling activities like swimming, meditation, and evening walks help balance your yang energy. Bitter foods (dark chocolate, bitter greens) and adequate hydration are your allies. Most importantly, practice moderation — your tendency to go all-in depletes your reserves.",
      zh: "火性体质赋予你充沛精力，但易透支。心脏与小肠是需关注的器官。火过旺时可能出现炎症、高血压、皮疹等热症。游泳、冥想、夜间散步等清凉活动有助于平衡阳气。苦味食物（黑巧克力、苦菜）和充足饮水对你有益。最重要的是学会节制——你全力以赴的习惯最消耗元气。",
      ja: "火の体質は豊富なエネルギーをもたらしますが、燃え尽きやすいです。心臓と小腸がモニターすべき主要臓器です。炎症、高血圧、皮膚の発疹など熱関連の症状が火の過剰時に現れることがあります。水泳、瞑想、夕方の散歩などの冷却活動が陽のエネルギーのバランスを助けます。苦味のある食べ物と十分な水分補給が味方です。何よりも節度を実践することです。"
    },
    career: {
      en: "As the Sun, you are born to lead and inspire. CEO, entrepreneur, creative director, public speaker, politician, and performer are your natural roles. You need a career with visibility and impact. You excel in fast-paced, dynamic environments where your energy can fuel team momentum. Bureaucratic or isolated roles drain you. Your career trajectory has notable peaks at ages 33-35 and 53-55 when Fire meets Wood in the luck cycle. Recognition and awards tend to find you.",
      zh: "丙火如日，天生就是领袖与激励者。CEO、创业者、创意总监、演说家、政治家、表演者都是你的天然舞台。你需要有能见度和影响力的职业。你在快节奏、充满活力的环境中如鱼得水，你的能量能带动整个团队。官僚体制或孤立型工作会让你枯竭。33-35岁和53-55岁火得木助之时有大成就。荣誉和认可总会找到你。",
      ja: "太陽として、あなたはリードし触発するために生まれました。CEO、起業家、クリエイティブディレクター、演説家、政治家、パフォーマーがあなたの自然な役割です。可視性とインパクトのあるキャリアが必要です。ペースの速いダイナミックな環境で優れています。官僚的または孤立した役割はあなたを消耗させます。33-35歳と53-55歳に大きなキャリアの山があります。"
    },
    yearlyTrend: {
      en: "This year, the Sun's radiance brings a dynamic period for Bing Fire. Early spring through summer is your power season — seize initiative in career and creative pursuits. A Wood-element boost in late spring signals fresh growth opportunities. Mid-autumn Metal energy may challenge your momentum; use it for strategic planning rather than direct confrontation. Winter water months advise caution with finances. Overall, a year of high energy and significant visibility — make your mark.",
      zh: "今年太阳之光带来多变而精彩的时期。春夏是你的权力季——主动出击，抢占先机。晚春木旺有新的发展机遇。中秋金气或对你形成挑战，宜战略规划而非正面冲撞。冬季水旺之月理财需谨慎。总体而言，高能量、高能见度之年——留下你的印记。",
      ja: "今年、太陽の輝きが丙火にダイナミックな時期をもたらします。春から夏があなたのパワーシーズンです—キャリアと創造的な追求において主導権を握りましょう。晩春の木のエレメントが新たな成長の機会を示します。中秋の金のエネルギーはあなたの勢いに挑戦するかもしれません—直接対決ではなく戦略的計画に使いましょう。冬の水の月は財務に注意。全体として、高エネルギーで大きな可視性の年です。"
    },
    summary: {
      en: "The radiant sun that warms all it touches — your path illuminates, inspires, and transforms everything in its reach.",
      zh: "煌煌烈日，普照万物——你的命运之路以光与热照亮、激励、转化一切所及。",
      ja: "すべてを温める輝く太陽—あなたの道は届くすべてを照らし、触発し、変容させます。"
    }
  },

  "丁": {
    personality: {
      en: "Your Day Master is Ding (Yin Fire), the candle flame and the starlight — not the blazing sun but the warm, focused glow that guides through darkness. You possess a quiet intensity and refined sensitivity. You are observant, thoughtful, and deeply intuitive, often perceiving what others miss. Your fire burns inward, giving you remarkable focus and persistence. You may appear reserved, but within burns a passionate heart with strong convictions. You are the strategist of the Fire element — precise, measured, and purposeful.",
      zh: "日主丁火，乃烛光星火之象——不是烈日，而是温暖而专注的光芒，在黑暗中指引方向。你内敛而敏锐，观察入微，直觉深刻，常能察觉他人所忽略的。你的火焰向内燃烧，赋予你惊人的专注力与毅力。外表克制，内心却有燃烧的激情与坚定的信念。你是火中的谋略家——精准、有度、有目标。",
      ja: "あなたの日主は丁（陰の火）—ろうそくの炎と星の光です。燃え盛る太陽ではなく、闇を導く温かく集中した輝きです。静かな強さと洗練された感受性を持っています。観察力があり、思慮深く、深く直感的で、他者が見逃すものをしばしば察知します。あなたの火は内側に燃え、驚くべき集中力と持続性をもたらします。控えめに見えるかもしれませんが、内側には強い信念を持つ情熱的な心が燃えています。"
    },
    wealth: {
      en: "Ding Fire wealth comes through expertise, precision, and timing. Your financial strengths lie in technology, data science, finance, research, precision engineering, and specialized consulting. You have a gift for understanding complex systems and finding value where others see chaos. Wealth accumulates through patient, methodical approaches — you are the marathon investor, not the sprinter. Wood-element allies (mentors, education) and Metal-element opportunities (markets, contracts) are your wealth triggers. Peak financial periods align with your late 30s and 50s.",
      zh: "丁火之财来自专业、精准与时机。科技、数据分析、金融、研究、精密工程、专业咨询是你的财富领域。你有洞悉复杂系统的天赋，能在他人眼中的混乱中发现价值。财富通过耐心、系统的方式积累——你是马拉松型投资者。木元素助力（导师、学历）和金元素机会（市场、合约）触发财运。财富高峰在38岁和50多岁。",
      ja: "丁火の財は専門性、正確さ、タイミングを通じてもたらされます。テクノロジー、データサイエンス、金融、研究、精密工学、専門コンサルティングが強みです。複雑なシステムを理解し、他者が混沌と見るところに価値を見出す才能があります。財は忍耐強く系統的なアプローチで蓄積されます。木（メンター、教育）と金（市場、契約）が富の引き金です。30代後半と50代に財運のピークがあります。"
    },
    love: {
      en: "Ding Fire loves with depth and devotion rather than flash. You are a loyal, attentive partner who expresses love through consistent care and thoughtful details. Best compatibility with Ren (Yang Water) who balances your intensity with expansive vision, or Jia (Yang Wood) who provides stable grounding. You need a partner who understands your need for solitude and doesn't mistake your quietness for coldness. Trust builds slowly with you, but once earned, you are unwavering.",
      zh: "丁火之爱深沉而专注，不张扬。你是忠诚、体贴的伴侣，以持续的关怀和细腻的细节表达爱意。与壬水最配——他的开阔能平衡你的专注；与甲木也合——他提供稳定的根基。你需要一个理解你独处需求、不把你的安静误认为冷漠的伴侣。信任在你这里建立缓慢，但一旦建立便坚定不移。",
      ja: "丁火は華やかさよりも深さと献身で愛します。一貫したケアと思いやりのある細部を通じて愛を表現する、忠実で注意深いパートナーです。壬（陽の水）はあなたの集中力を広い視野でバランスさせ、甲（陽の木）は安定した基盤を提供します。あなたの孤独の必要性を理解し、静けさを冷たさと誤解しないパートナーが必要です。信頼はゆっくりと築かれますが、一度得られれば揺るぎません。"
    },
    health: {
      en: "Your Ding Fire constitution requires careful energy management. The heart and eyes are your sensitive areas — eye strain, palpitations, and sleep disturbances are warning signs of imbalance. You benefit from consistent, moderate routines rather than intense bursts of activity. Evening meditation, reading, and calming teas (chamomile, lavender) support your nervous system. Hot, spicy foods should be moderated — your internal fire needs tending, not fanning. Emotional suppression is particularly harmful; find trusted outlets for expression.",
      zh: "丁火体质需要精心管理能量。心脏和眼睛是你需要关注的部位——眼疲劳、心悸、睡眠不佳是失衡信号。持续适度的作息优于剧烈运动。夜间冥想、阅读、花茶有助于安抚你的神经系统。辛辣食物宜适量——你的内在之火需要的是养护而非助燃。情绪压抑对丁火尤其有害，找到可信赖的表达出口。",
      ja: "丁火の体質は慎重なエネルギー管理が必要です。心臓と目が敏感な領域です—眼精疲労、動悸、睡眠障害は不調の警告サインです。激しい活動よりも一貫した適度なルーティンが効果的です。夜の瞑想、読書、カモミールやラベンダーなどの心を落ち着かせるお茶が神経系をサポートします。辛い食べ物は控えめに。感情の抑圧は特に有害です。"
    },
    career: {
      en: "Your career thrives in roles requiring analytical depth and strategic thinking. Software engineering, financial analysis, scientific research, investigative journalism, quality control, and strategic consulting are excellent fits. You are a master of craft — choose depth over breadth. You work best in quiet, focused environments with clear objectives. Your career ascends through demonstrated expertise rather than office politics. Key breakthroughs come with Water-element luck cycles — typically ages 29-31 and 47-49.",
      zh: "你的职业生涯在需要分析深度和战略思维的岗位上最为出色。软件工程、金融分析、科研、调查记者、品控、战略咨询都是绝佳匹配。你是精工细作的大师——选择深度而非广度。你在安静、专注、目标明确的环境中工作最佳。你的职业靠实力而非关系晋升。水运之年有突破——通常在29-31岁和47-49岁。",
      ja: "あなたのキャリアは分析的深さと戦略的思考を必要とする役割で開花します。ソフトウェアエンジニアリング、財務分析、科学研究、調査報道、品質管理、戦略コンサルティングが適職です。職人技の達人です—広さより深さを選びましょう。静かで集中できる環境で最も力を発揮します。キャリアは実証された専門性を通じて上昇します。29-31歳と47-49歳に大きなブレイクスルーがあります。"
    },
    yearlyTrend: {
      en: "This year, the stars favor depth and refinement for Ding Fire. The first half rewards focused effort — immerse yourself in a project or skill. Summer amplifies your natural glow; use this visibility strategically. Autumn brings a Metal-energy check — review investments and contracts carefully. Winter Water months enhance your intuition and may bring a mentor or wise advisor. A Wood-branch alignment in late spring signals a window for career advancement or credential acquisition.",
      zh: "今年星象利于丁火的深耕与精进。上半年专注投入将获回报——深耕一个项目或技能。夏季放大你的自然光彩，善用这波能见度。秋季金气当头——审慎复核投资与合约。冬季水旺增强直觉，或有贵人导师出现。晚春木支调和，暗示职业晋升或学历提升的窗口。",
      ja: "今年の星は丁火に深さと洗練をもたらします。前半は集中した努力が報われます—プロジェクトやスキルに没頭しましょう。夏はあなたの自然な輝きを増幅します—この可視性を戦略的に活用しましょう。秋は金のエネルギーがチェックをもたらします—投資と契約を注意深く見直しましょう。冬の水の月は直感を高め、メンターや賢明なアドバイザーをもたらすかもしれません。晩春の木の枝の調和はキャリアアップの窓を示します。"
    },
    summary: {
      en: "The steadfast candle burning through the night — your path is one of quiet mastery, deep insight, and unwavering purpose.",
      zh: "长夜明烛，专注不移——你的命运之路是静水深流、精进不止、心有所向。",
      ja: "夜を照らし続けるろうそく—あなたの道は静かな熟達、深い洞察、揺るぎない目的の道です。"
    }
  },

  "戊": {
    personality: {
      en: "Your Day Master is Wu (Yang Earth), the great mountain and the solid ground beneath our feet. You are the bedrock others lean on — steady, dependable, and deeply practical. You move at your own deliberate pace, unmoved by passing trends or shallow persuasion. Your presence brings stability to chaotic situations. You value tradition, loyalty, and tangible results over abstract theories. Beneath your calm exterior lies formidable endurance — you can carry burdens that would break others. You are the anchor of any team or family.",
      zh: "日主戊土，乃巍峨山岳、厚重大地之象。你是他人倚靠的基石——稳重、可靠、极为实际。你有自己的节奏，不为潮流所动。你的存在为混乱带来稳定。你重视传统、忠诚和实际成果而非空洞理论。平静的外表下是惊人的耐力——你能承担别人无法承受的重担。你是任何团队或家庭的定海神针。",
      ja: "あなたの日主は戊（陽の土）—偉大なる山、足元の堅固な大地です。あなたは他者が頼る岩盤です—着実で、信頼でき、極めて実践的です。自分のペースで動き、一時的な流行や浅い説得には動じません。あなたの存在は混沌とした状況に安定をもたらします。伝統、忠誠、具体的な結果を重視します。穏やかな外見の下には驚異的な持久力があります。あなたはどんなチームや家族の錨です。"
    },
    wealth: {
      en: "Wu Earth wealth is built brick by brick — real estate, construction, agriculture, mining, infrastructure, and asset management are your domains. You are an accumulator, not a speculator. Long-term property investments and land-based assets align perfectly with your element. Wealth grows slowly but surely, with major accumulations in your 40s and 60s when Earth meets its seasonal strengths. Beware of Water-element years (volatility) and trust your instinct for tangible, touchable assets. Partnership with Wood-day people brings growth opportunities.",
      zh: "戊土之财一砖一瓦筑成——房地产、建筑、农业、矿产、基建、资产管理是你的领域。你是积累者而非投机者。长期物业投资和土地资产与你的元素完美契合。财富缓慢但稳健增长，40多岁和60多岁土当令之时有大的积累。慎防水旺之年（市场波动），坚持你看得见摸得着的资产。与木日主之人合作带来增长机会。",
      ja: "戊土の財はレンガを一つずつ積むように築かれます—不動産、建設、農業、鉱業、インフラ、資産管理があなたの領域です。投機家ではなく蓄積者です。長期的な不動産投資と土地ベースの資産があなたのエレメントと完璧に調和します。富はゆっくりとしかし確実に成長し、40代と60代に大きな蓄積があります。水の年のボラティリティに注意し、触れられる具体的な資産を信頼しましょう。木の日主との協力が成長機会をもたらします。"
    },
    love: {
      en: "Wu Earth loves with profound loyalty and steadfast commitment. You may not be the most verbally expressive partner, but your love shows through actions — providing stability, solving problems, and being unfailingly present. Best compatibility with Gui (Yin Water) whose fluidity softens your solidity, or Yi (Yin Wood) whose grace brings beauty to your world. You seek a partner who appreciates reliability over romance-novel gestures. Once committed, you are in it for life — divorce or separation is alien to your nature.",
      zh: "戊土之爱深沉而忠诚。你可能不是最善于甜言蜜语的伴侣，但你的爱落地有声——提供稳定、解决问题、始终在场。与癸水最配——她的柔性能软化你的刚硬；与乙木也合——她的优雅为你的世界增添色彩。你寻求的是一个懂得欣赏可靠而非浪漫姿态的伴侣。一旦承诺，便是一生——分离对你而言几乎不可想象。",
      ja: "戊土は深い忠誠心と揺るぎないコミットメントで愛します。最も言葉で表現するパートナーではないかもしれませんが、愛は行動を通じて示されます—安定を提供し、問題を解決し、常にそこにいることです。癸（陰の水）はその流動性があなたの固さを和らげ、乙（陰の木）はその優美さがあなたの世界に美しさをもたらします。ロマンス小説のようなジェスチャーより信頼性を評価するパートナーを求めます。一度コミットすれば生涯です。"
    },
    health: {
      en: "Your Earth constitution generally grants strong physical endurance. The spleen and stomach are your key organs — digestive health should be a priority. You tend toward sluggishness when out of balance, with weight management and blood sugar as watch points. Regular, moderate exercise (walking, hiking, gardening) suits you better than high-intensity training. Warm, cooked foods and a regular meal schedule support your Earth energy. Emotionally, worry is your biggest toxin — cultivate practices that release overthinking.",
      zh: "土性体质赋予你强健的体魄。脾胃是重点器官——消化健康应优先关注。失衡时易感困重，需注意体重与血糖管理。规律适度运动（散步、爬山、园艺）优于高强度训练。温热熟食和规律进餐有助于培补土气。情绪上，忧思是你最大的毒素——学会放下过度思虑。",
      ja: "土の体質は一般的に強い身体的持久力を与えます。脾臓と胃が主要臓器です—消化器系の健康を優先すべきです。バランスを崩すと鈍重になりやすく、体重管理と血糖値が注意点です。定期的で適度な運動（ウォーキング、ハイキング、ガーデニング）が高強度トレーニングより適しています。温かい調理済みの食事と規則正しい食事スケジュールが土のエネルギーをサポートします。感情的には、心配が最大の毒素です。"
    },
    career: {
      en: "Your career strength lies in building, managing, and preserving. Engineering, construction management, real estate development, finance (especially risk management), agriculture, geology, and operations leadership are your domains. You are the person organizations trust with their most critical infrastructure — literal or metaphorical. You rise through demonstrated reliability and accumulated wisdom rather than flash. Your career has a slow, unstoppable momentum. Key leadership roles tend to come in your 40s when Earth energy matures.",
      zh: "你的职业优势在于建设、管理和守护。工程、建筑管理、房地产开发、金融风控、农业、地质、运营管理是你的天地。你是组织中最被信赖的人——托付最关键的基业。你靠可靠性和累积智慧晋升，不靠花哨。你的职业生涯有缓慢但不可阻挡的动能。高层领导角色多在40多岁土运成熟之时到来。",
      ja: "あなたのキャリアの強みは構築、管理、保全にあります。エンジニアリング、建設管理、不動産開発、金融（特にリスク管理）、農業、地質学、運営リーダーシップがあなたの領域です。組織が最も重要なインフラを託す人物です。派手さではなく、実証された信頼性と蓄積された知恵を通じて上昇します。キャリアには遅いが止められない勢いがあります。主要なリーダーシップの役割は40代に訪れる傾向があります。"
    },
    yearlyTrend: {
      en: "This year rewards patience and persistence for Wu Earth. The first half is ideal for consolidating gains and strengthening foundations. Summer brings Fire energy that nourishes your Earth — a favorable period for recognition and career moves. Late autumn's Metal energy may bring restructuring; adapt without resistance. A Water-branch clash in mid-winter warns against major purchases. Wood months in spring signal fresh projects. Overall, a year of solidification — strengthen what you have rather than chasing the new.",
      zh: "今年戊土以稳为主。上半年宜巩固成果、夯实基础。夏季火旺生土——是获得认可和职业发展的好时机。晚秋金气或带来结构调整，顺势而为。仲冬地支水冲，大额采购需谨慎。春季木旺有新项目信号。总体是稳固之年——深耕已有而非追逐新机。",
      ja: "今年の戊土は忍耐と持続が報われます。前半は成果を固め基盤を強化するのに理想的です。夏は火のエネルギーがあなたの土を育みます—認知とキャリアの動きに有利な期間です。晩秋の金のエネルギーは再構築をもたらすかもしれません—抵抗せず適応しましょう。真冬の水の衝突は大きな買い物に警告します。春の木の月は新しいプロジェクトの兆しです。全体として固める年です。"
    },
    summary: {
      en: "The immovable mountain, the patient earth — your path is built on enduring strength, unwavering loyalty, and timeless wisdom.",
      zh: "巍巍山岳，厚德载物——你的命运之路建立在持久的坚韧、不移的忠诚和永恒的智慧之上。",
      ja: "動かざる山、忍耐の大地—あなたの道は不朽の強さ、揺るぎない忠誠、永遠の知恵の上に築かれています。"
    }
  },

  "己": {
    personality: {
      en: "Your Day Master is Ji (Yin Earth), the fertile soil and the cultivated field. You are nurturing, receptive, and quietly resourceful. Where Wu Earth is the mountain, you are the garden — humble, life-giving, and endlessly productive. You possess a remarkable ability to transform raw potential into tangible results through patient cultivation. Others confide in you naturally because you listen without judgment. Your modesty can hide your true capabilities, but underestimating you is a mistake — your quiet persistence achieves what force cannot.",
      zh: "日主己土，乃肥沃田园、耕作之土。你温润包容，善于滋养，内藏智慧。如果说戊土是高山，你就是花园——谦逊、孕育生机、持续产出。你有将原始潜能转化为实际成果的非凡能力。别人自然愿意向你倾诉，因为你无评判地倾听。你的谦逊可能掩盖了你的真正实力，但低估你是错误——你的静默坚持能达成强力所不能。",
      ja: "あなたの日主は己（陰の土）—肥沃な土壌、耕された田畑です。育み、受容し、静かに機知に富みます。戊土が山なら、あなたは庭園です—謙虚で、生命を与え、無限に生産的です。生の可能性を忍耐強い育成を通じて具体的な結果に変える驚くべき能力を持っています。判断せずに聞くため、他者は自然にあなたに打ち明けます。謙虚さが真の能力を隠すことがありますが、あなたを過小評価するのは間違いです。"
    },
    wealth: {
      en: "Ji Earth wealth comes through service, cultivation, and steady accumulation. Education, healthcare, hospitality, food industry, social services, and human resources are your wealth channels. You prosper by helping others prosper — your financial karma is tied to the value you create for people. Small, consistent investments compound beautifully for you. Real estate (especially agricultural or residential) and education-related ventures are auspicious. Your wealth peaks in your late 30s and mid 50s when Earth is supported by Fire. Avoid get-rich-quick schemes.",
      zh: "己土之财来自服务、培育和稳健积累。教育、医疗、酒店、餐饮、社工、人力资源是你的财富通道。你因成就他人而成就自己——你的财运与你为他人创造的价值挂钩。小额持续投资能为你带来复利效应。房地产（尤其农业或住宅类）和文教事业最为吉利。财富高峰在38岁和55岁前后火土相生之际。远离快速致富的诱惑。",
      ja: "己土の財は奉仕、育成、着実な蓄積を通じてもたらされます。教育、ヘルスケア、ホスピタリティ、食品業界、社会福祉、人事があなたの富のチャネルです。他者の繁栄を助けることで繁栄します—財務的なカルマはあなたが人々のために創る価値と結びついています。小さく一貫した投資が美しく複利効果を生みます。不動産（特に農業用または住宅用）と教育関連の事業が吉です。富のピークは30代後半と50代半ばに訪れます。"
    },
    love: {
      en: "Ji Earth loves through nurturing care and thoughtful presence. You are the partner who remembers the small things — a favorite meal, an unspoken need, a quiet moment of support. Best matched with Jia (Yang Wood) who provides structure and vision, or Bing (Yang Fire) whose warmth energizes your receptive nature. You seek a partner who values emotional depth and domestic harmony. Be mindful of your tendency to put others' needs before your own — your nurturing nature needs reciprocal care. Your ideal relationship is a true partnership of equals.",
      zh: "己土以滋养和体贴来表达爱。你是那种记得所有细节的伴侣——最爱吃的菜、未曾说出的需求、安静的陪伴。与甲木最配——他给你框架与远见；与丙火也合——他的温暖激发你的潜能。你寻求一个重视情感深度和家庭和谐的伴侣。注意不要过度牺牲自己——你的滋养天性同样需要被滋养。你理想中的关系是平等的真正伴侣关系。",
      ja: "己土は育むケアと思いやりのある存在を通じて愛します。あなたは小さなことを覚えているパートナーです—好きな食事、言葉にならないニーズ、静かな支えの瞬間。甲（陽の木）は構造とビジョンを提供し、丙（陽の火）はその温かさがあなたの受容的な性質を活性化します。感情の深さと家庭の調和を大切にするパートナーを求めます。他者のニーズを自分の前に置く傾向に注意—あなたの育む性質には相互のケアが必要です。理想的な関係は真の対等なパートナーシップです。"
    },
    health: {
      en: "Your Ji Earth constitution is generally balanced but needs attention to the spleen and digestive system. You are sensitive to dampness — both environmental humidity and dietary damp-producing foods (dairy, sugar, processed foods). Gentle, grounding activities like yoga, tai chi, and walking on grass support your well-being. Warm, cooked foods and regular meal times are essential. Emotionally, overthinking and excessive empathy can drain you — create boundaries and practice self-care without guilt. Herbal teas with ginger or cinnamon support your digestive fire.",
      zh: "己土体质总体平衡，但需关注脾胃。你对湿气敏感——环境潮湿和饮食中的湿气（奶制品、糖、加工食品）都需注意。瑜伽、太极、草地散步等温和扎根的活动有益身心。温热熟食和规律进食必不可少。情绪上，过度思虑和过度共情会消耗你——建立边界，心安理得地关爱自己。姜茶、肉桂茶有助脾胃。",
      ja: "己土の体質は一般的にバランスが取れていますが、脾臓と消化器系に注意が必要です。湿気に敏感です—環境の湿度と食事からの湿気（乳製品、砂糖、加工食品）の両方に。ヨガ、太極拳、芝生の上を歩くなどの穏やかでグラウンディングする活動があなたの健康をサポートします。温かい調理済みの食事と規則正しい食事時間が不可欠です。感情的に、考えすぎと過度の共感があなたを消耗させます—境界を作り、罪悪感なくセルフケアを実践しましょう。"
    },
    career: {
      en: "Your career thrives in service-oriented, nurturing roles. Teaching, counseling, healthcare, hospitality management, human resources, social work, and nonprofit leadership are your natural domains. You excel at developing people and creating systems where others can grow. You may not seek the spotlight, but your behind-the-scenes influence is profound. Your career builds through reputation and word-of-mouth rather than aggressive self-promotion. Key promotions come with Fire-element years — ages 32-34 and 50-52. The world needs more leaders like you.",
      zh: "你的职业在服务型、培育型岗位上最为出色。教育、心理咨询、医疗、酒店管理、人力资源、社工、公益领导是你的天然领域。你擅长培养人才、搭建让他人成长的系统。你或许不追求聚光灯，但你的幕后影响力深远。你的职业靠口碑和声誉积累，而非激进的自我推销。火旺之年晋升——32-34岁和50-52岁。世界需要更多像你这样的领导者。",
      ja: "あなたのキャリアはサービス指向で育成的な役割で開花します。教育、カウンセリング、ヘルスケア、ホスピタリティ管理、人事、社会福祉、非営利団体のリーダーシップが自然な領域です。人材育成と他者が成長できるシステム作りに優れています。スポットライトを求めないかもしれませんが、あなたの舞台裏での影響力は深遠です。キャリアは積極的な自己宣伝ではなく評判と口コミを通じて構築されます。32-34歳と50-52歳に重要な昇進があります。"
    },
    yearlyTrend: {
      en: "This year, the Earth welcomes nourishment and gradual progress. Spring brings Wood energy that may feel challenging — use it as motivation for self-improvement. Summer Fire months are your power period — excellent for career moves, launching projects, and expanding your influence. Autumn calls for reflection and refinement. Winter Water months favor planning over action. A Fire-branch harmony in late summer signals a window for relationship deepening or partnership formation. Overall, a year where your nurturing investments begin to bear visible fruit.",
      zh: "今年己土迎来滋养与渐进。春季木气或感挑战——把它当作自我提升的动力。夏季火旺是你的黄金期——适合职业变动、启动项目和扩大影响。秋季宜反思与打磨。冬季水旺重规划轻行动。夏末火支和谐为关系深入或合作形成创造良机。总体而言，你过往的滋养投入开始结出可见果实的一年。",
      ja: "今年の己土は滋養と漸進を歓迎します。春の木のエネルギーは挑戦的に感じるかもしれません—自己改善のモチベーションとして活用しましょう。夏の火の月があなたのパワー期間です—キャリアの動き、プロジェクトの立ち上げ、影響力の拡大に絶好です。秋は内省と洗練を求めます。冬の水の月は行動より計画が有利です。晩夏の火の調和は関係の深化やパートナーシップ形成の窓を示します。全体として、あなたの育成的な投資が目に見える実を結び始める年です。"
    },
    summary: {
      en: "The fertile field that feeds the world — your path nourishes, cultivates, and transforms through quiet devotion and endless generosity.",
      zh: "肥沃的田野，滋养万物——你的命运之路以静默的奉献和不竭的慷慨培育、转化、成就。",
      ja: "世界を養う肥沃な田畑—あなたの道は静かな献身と無限の寛大さを通じて育み、耕し、変容させます。"
    }
  },

  "庚": {
    personality: {
      en: "Your Day Master is Geng (Yang Metal), the sword, the axe, and unyielding steel. You possess a sharp mind, decisive nature, and an innate sense of justice. You cut through ambiguity and take action where others hesitate. Your willpower is formidable — once you set a goal, nothing deters you. You value competence, efficiency, and honor above all. Your directness can be intimidating, but those who earn your respect find a fiercely loyal ally. You are the warrior of the ten stems, born to overcome challenges and forge new paths.",
      zh: "日主庚金，乃刀剑斧钺、百炼精钢。你头脑锐利，行事果决，正义感与生俱来。你斩断犹豫，在他人踌躇时果断出击。你的意志力惊人——一旦确立目标便势不可挡。你看重能力、效率和荣誉胜过一切。你的直率可能令人敬畏，但赢得你尊重的人会得到一个忠诚无比的盟友。你是十天干中的战士，生来就是披荆斩棘的开路者。",
      ja: "あなたの日主は庚（陽の金）—剣、斧、不屈の鋼です。鋭い頭脳、断固たる性質、生来の正義感を持っています。曖昧さを断ち切り、他者が躊躇するときに行動を起こします。意志力は強大で、一度目標を定めれば何もあなたを妨げません。能力、効率、名誉を何よりも重視します。率直さは時に威圧的ですが、あなたの尊敬を得た者は猛烈に忠実な味方を見出します。あなたは十干の戦士であり、挑戦を克服し新しい道を切り開くために生まれました。"
    },
    wealth: {
      en: "Geng Metal generates wealth through decisive action and strategic advantage. Finance, law, engineering, military/defense, security, surgery, and competitive business are your domains. You have a talent for cutting through complexity to find the profitable core. Your wealth comes in decisive moves rather than steady accumulation — you win big when you commit fully. Metal-element partners and Fire-element challenges (competition) both drive your financial growth. Peak wealth periods align with Earth-element support — ages 35-40 and 55-60. Calculated risks favor you.",
      zh: "庚金之财来自果决行动和战略优势。金融、法律、工程、军工、安保、外科医学、竞争性商业是你的领域。你有穿透复杂性直达盈利核心的天赋。你的财富来自果断出击而非稳步积累——全力投入时大获全胜。金元素伙伴和火元素挑战（竞争）都能驱动你的财富增长。土运支持之时财运最旺——35-40岁和55-60岁。计算过的风险往往眷顾你。",
      ja: "庚金の財は断固たる行動と戦略的優位を通じて生み出されます。金融、法律、工学、軍事/防衛、セキュリティ、外科、競争的ビジネスがあなたの領域です。複雑さを断ち切って収益性の高い核心を見つける才能があります。富は着実な蓄積ではなく断固たる動きによってもたらされます—完全にコミットしたときに大きく勝ちます。金のパートナーと火の挑戦（競争）の両方が財務的成長を駆動します。35-40歳と55-60歳に富のピークがあります。計算されたリスクがあなたに有利です。"
    },
    love: {
      en: "Geng Metal loves with fierce loyalty and unwavering protection. You may not be the most romantic in conventional terms, but your commitment is absolute. You express love through actions — solving problems, providing security, standing guard. Best compatibility with Yi (Yin Wood) whose flexibility complements your rigidity, or Jia (Yang Wood) who can match your strength without breaking. You need a partner who respects your independence and doesn't try to soften your edges too much. In love, you are the protector — choose someone who appreciates that strength.",
      zh: "庚金以铁血忠诚和坚定守护来表达爱。你可能不是传统定义中最浪漫的人，但你的承诺是绝对的。你以行动表达爱——解决问题、提供安全、挺身守护。与乙木最配——她的柔韧补你的刚硬；与甲木也合——他能在不被折断的情况下与你对等。你需要一个尊重你独立性、不试图过度磨平你棱角的伴侣。在感情中，你是守护者——选择一个懂得欣赏这份力量的人。",
      ja: "庚金は激しい忠誠心と揺るぎない保護で愛します。従来の意味で最もロマンチックではないかもしれませんが、コミットメントは絶対的です。行動を通じて愛を表現します—問題を解決し、安全を提供し、守ることです。乙（陰の木）はその柔軟性があなたの硬さを補完し、甲（陽の木）は折れることなくあなたの強さに対応できます。あなたの独立心を尊重し、あなたの鋭さを過度に和らげようとしないパートナーが必要です。恋愛において、あなたは守護者です。"
    },
    health: {
      en: "Your Metal constitution gives you strong bones and a resilient immune system. The lungs and large intestine are your key organs — respiratory health deserves attention. You tend to hold tension in your shoulders and jaw. High-intensity exercise (martial arts, weight training, competitive sports) suits your nature and releases accumulated stress. Pungent and spicy foods (in moderation) support your Metal energy. Emotionally, unexpressed grief or anger can manifest physically — you need healthy outlets for your intense emotions. Periodic solitude and meditation help you recalibrate.",
      zh: "金性体质赋予你坚强的骨骼和强大的免疫力。肺与大肠是重点器官——呼吸系统需留意。你容易在肩部和下颌积存紧张。高强度运动（武术、力量训练、竞技体育）符合你的天性，有助于释放积压的压力。适量辛辣食物有助于金气运行。情绪上，未曾表达的悲伤或愤怒会在身体层面显现——你需要健康的方式释放强烈情绪。定期独处与冥想帮助你重新校准。",
      ja: "金の体質は強い骨と回復力のある免疫系をもたらします。肺と大腸が主要臓器です—呼吸器系の健康に注意が必要です。肩と顎に緊張を溜め込みやすいです。高強度の運動（武道、ウェイトトレーニング、競技スポーツ）があなたの性質に合い、蓄積されたストレスを解放します。適度な辛味のある食べ物が金のエネルギーをサポートします。感情的に、表現されない悲しみや怒りが身体的に現れることがあります。定期的な孤独と瞑想が再調整を助けます。"
    },
    career: {
      en: "Your career demands challenge and authority. Military, law enforcement, surgery, corporate leadership, investment banking, engineering, and competitive sports are your arenas. You thrive in hierarchies where merit determines rank. You need clear goals and the autonomy to achieve them your way. Entrepreneurship suits you — you build organizations as formidable as yourself. Your career is marked by decisive breakthroughs rather than gradual ascent. Ages 33-37 and 53-57, when Earth supports Metal in the luck cycle, bring your greatest professional victories.",
      zh: "你的职业需要挑战和权威。军警、外科、企业管理、投资银行、工程、竞技体育是你的战场。你在凭实力说话的层级制度中如鱼得水。你需要清晰的目标和自主执行的空间。创业极适合你——你能建立和自己一样强悍的组织。你的职业以果断突破而非逐步升迁为特征。33-37岁和53-57岁土金相生的大运带来最大的职业胜利。",
      ja: "あなたのキャリアは挑戦と権威を要求します。軍隊、法執行機関、外科、企業リーダーシップ、投資銀行、工学、競技スポーツがあなたのアリーナです。実力が階級を決めるヒエラルキーで最も力を発揮します。明確な目標と、自分の方法で達成する自律性が必要です。起業家精神があなたに適しています。キャリアは徐々の上昇ではなく断固たる突破口によって特徴づけられます。33-37歳と53-57歳に最大の職業的勝利が訪れます。"
    },
    yearlyTrend: {
      en: "This year tests and refines Geng Metal like a blade in the forge. Spring challenges your patience — use friction to sharpen, not to break. Summer Fire is intense; channel this heat into decisive career moves rather than interpersonal conflict. Autumn is your season of power — Metal thrives in Metal months. Launch initiatives, close deals, and assert your position. Winter Water months call for strategic rest and planning. A Wood-branch alignment in mid-spring suggests a new venture worth pursuing. This year forges you into a finer blade.",
      zh: "今年庚金如刃在锻。春季考验耐心——以摩擦磨砺而非折断。夏季火旺炽烈，将这股热度化为职业上的果断出击而非人际冲突。秋季是你当令之时——金在金月最旺。启动项目、敲定交易、确立地位。冬季水旺宜战略性休整与规划。仲春木支调和暗示值得追求的新事业。今年将把你锻造成更锋利的刀。",
      ja: "今年の庚金は鍛冶場の刃のように試され洗練されます。春は忍耐を試します—摩擦を研ぎに使い、折れるために使わないでください。夏の火は強烈です—この熱を対人衝突ではなく断固たるキャリアの動きに向けましょう。秋はあなたの権力の季節です—金は金の月に最も輝きます。冬の水の月は戦略的な休息と計画を求めます。春半ばの木の調和は追求する価値のある新事業を示唆します。今年はあなたをより優れた刃に鍛え上げます。"
    },
    summary: {
      en: "The honed blade that cleaves truth from chaos — your path is one of courage, honor, and the relentless pursuit of justice.",
      zh: "百炼之刃，劈开混沌见真章——你的命运之路是勇气、荣誉与正义的不懈追求。",
      ja: "混沌から真実を断つ鍛えられた刃—あなたの道は勇気、名誉、正義への執拗な追求の道です。"
    }
  },

  "辛": {
    personality: {
      en: "Your Day Master is Xin (Yin Metal), the jewel, the mirror, and the finely crafted ornament. You possess refined taste, sharp perception, and an eye for detail that borders on perfectionism. You are elegant, discerning, and deeply principled. Your beauty — internal and external — radiates a sophisticated charm. You have high standards for yourself and others, which can make you seem critical, but it comes from a genuine desire for excellence. You are the connoisseur of the ten stems, appreciating quality over quantity in all things.",
      zh: "日主辛金，乃珠玉宝器、明镜精工。你品味高雅，感知敏锐，对细节的追求近乎完美。你优雅、有眼光、极具原则。你内外的光华散发出精致的魅力。你对自己和他人都要求很高，可能显得挑剔，但这源于对卓越的真正追求。你是十天干中的鉴赏家，崇尚品质而非数量。",
      ja: "あなたの日主は辛（陰の金）—宝石、鏡、精巧に作られた装飾品です。洗練された趣味、鋭い知覚、完璧主義に近い細部への目を持っています。エレガントで、洞察力があり、深く原則的です。内面と外面の美しさが洗練された魅力を放ちます。自分と他者に高い基準を持ち、批判的に見えることがありますが、それは卓越性への真の欲求から来ています。あなたは十干の鑑定家であり、すべてにおいて量より質を重視します。"
    },
    wealth: {
      en: "Xin Metal wealth comes through refinement, curation, and precision. Luxury goods, jewelry, art, high-end consulting, precision manufacturing, quality assurance, and wealth management are your domains. You add value by improving what already exists — polishing rough gems into brilliant jewels. Your financial talent lies in recognizing undervalued assets and elevating them. Quality over quantity defines your approach. Wealth peaks when Metal meets Earth (support) — ages 33-37 and 53-57. Collaborations with Fire-day people can bring lucrative visibility.",
      zh: "辛金之财来自精炼、甄选与精准。奢侈品、珠宝、艺术品、高端咨询、精密制造、品控、财富管理是你的领域。你通过打磨已有之物来创造价值——将原石雕琢为璀璨珠宝。你的财务天赋在于识别被低估的资产并提升它们。品质优先于数量定义了你的风格。土生金运之时财富高峰——33-37岁和53-57岁。与火日主合作能带来丰厚的曝光。",
      ja: "辛金の財は洗練、キュレーション、精密さを通じてもたらされます。高級品、宝飾、アート、ハイエンドコンサルティング、精密製造、品質保証、資産管理があなたの領域です。既存のものを改善することで価値を加えます—原石を磨いて輝く宝石にします。過小評価された資産を認識し高めることに財務的才能があります。量より質があなたのアプローチを定義します。33-37歳と53-57歳に富のピークがあります。火の日主との協力が lucrative な可視性をもたらします。"
    },
    love: {
      en: "Xin Metal loves with elegance, discernment, and quiet devotion. You are selective in choosing a partner — casual romance rarely appeals to your refined nature. Once committed, you bring beauty, order, and thoughtful care to the relationship. Best compatibility with Bing (Yang Fire) whose warmth brings out your luster, or Ren (Yang Water) who washes away your tendency toward self-criticism. You need a partner who appreciates subtlety and doesn't mistake your reserve for coldness. Your love deepens over time, like wine aging in a fine vessel.",
      zh: "辛金之爱优雅而有品味。你择偶慎重——随意恋情很难打动你的心。一旦承诺，你会将美、秩序和细致的关怀带入关系中。与丙火最配——他的温暖让你更加璀璨；与壬水也合——他洗去你的自我苛责。你需要一个懂得欣赏细腻、不把你的内敛误解为冷漠的伴侣。你的爱随时间愈发深沉，如美酒在精致的容器中陈酿。",
      ja: "辛金は優雅さ、識別力、静かな献身で愛します。パートナー選びは選択的です—カジュアルなロマンスはあなたの洗練された性質にはほとんど響きません。一度コミットすると、美しさ、秩序、思慮深いケアを関係にもたらします。丙（陽の火）はその温かさがあなたの輝きを引き出し、壬（陽の水）は自己批判への傾向を洗い流します。繊細さを理解し、あなたの控えめさを冷たさと誤解しないパートナーが必要です。あなたの愛は時の経過とともに深まります。"
    },
    health: {
      en: "Your Xin Metal constitution is refined and needs careful maintenance. The lungs, skin, and respiratory system require attention. You are sensitive to environmental toxins and air quality. Gentle, aesthetic activities like dance, pilates, or tai chi suit your constitution. Your nervous system can be delicate — overstimulation depletes you. Pear and white-colored foods (cauliflower, white beans, rice) support your Metal element. Emotionally, unexpressed grief and chronic dissatisfaction can manifest as physical symptoms. Beauty and order in your environment are genuinely therapeutic for you.",
      zh: "辛金体质精致，需要精心维护。肺、皮肤和呼吸系统要格外关注。你对环境毒素和空气质量敏感。舞蹈、普拉提、太极等优雅运动适合你的体质。你的神经系统较为娇嫩——过度刺激会消耗你。梨和白色食物（花菜、白豆、大米）有助金气。情绪上，郁结的悲伤和长期不满会在身体上显现。环境的美与秩序对你而言确实是一种疗愈。",
      ja: "辛金の体質は洗練されており、注意深いメンテナンスが必要です。肺、皮膚、呼吸器系に注意が必要です。環境毒素や空気の質に敏感です。ダンス、ピラティス、太極拳などの優雅な活動があなたの体質に合います。神経系は繊細で、過剰刺激があなたを消耗させます。梨や白い食べ物（カリフラワー、白インゲン豆、米）が金のエレメントをサポートします。感情的に、表現されない悲しみや慢性的な不満が身体症状として現れることがあります。環境の美しさと秩序はあなたにとって真に治療的です。"
    },
    career: {
      en: "Your career thrives where quality, precision, and aesthetics matter. Jewelry design, art curation, luxury brand management, quality assurance, editing, precision engineering, law (especially intellectual property), and financial analysis are your realms. You excel as a specialist rather than a generalist — depth is your advantage. You rise through demonstrated excellence and refined expertise. Major career milestones align with Earth-element luck cycles — ages 34-38 and 54-58. Your reputation is built on the unmistakable quality of your work.",
      zh: "你的职业在品质、精度和美感被看重的地方最出色。珠宝设计、艺术策展、奢侈品牌管理、品控、编辑、精密工程、知识产权法律、财务分析是你的天地。你是专家型而非通才型——深度是你的优势。你靠卓越的成果和精湛的专业能力晋升。土运周期有重大职业里程碑——34-38岁和54-58岁。你的声誉建立在无可挑剔的工作品质之上。",
      ja: "あなたのキャリアは品質、精密さ、美学が重要視される場所で開花します。宝飾デザイン、アートキュレーション、高級ブランド管理、品質保証、編集、精密工学、法律（特に知的財産）、財務分析があなたの領域です。ジェネラリストよりスペシャリストとして優れています—深さがあなたの強みです。実証された卓越性と洗練された専門知識を通じて上昇します。主要なキャリアのマイルストーンは34-38歳と54-58歳に訪れます。あなたの評判は仕事の紛れもない品質の上に築かれます。"
    },
    yearlyTrend: {
      en: "This year polishes Xin Metal to a higher shine. Spring Wood energy may feel draining — guard your energy and delegate where possible. Summer Fire illuminates your talents; use this visibility for career advancement or creative recognition. Autumn Metal months are your power season — refine your skills, make strategic moves, and present your best work. Winter Water months favor reflection and planning. An Earth-branch harmony in the fourth quarter supports a significant financial or property decision. This year rewards refinement over expansion.",
      zh: "今年辛金被打磨得更加闪亮。春季木气或感消耗——守护能量，尽可能分派。夏季火光照亮你的才华，利用这波能见度推动职业或创意上的认可。秋季金旺是你当令之时——精进技能、战略出击、展示最佳作品。冬季水旺宜反思规划。第四季度地支土和有利重大财务或房产决策。今年精进胜于扩张。",
      ja: "今年の辛金はより高い輝きに磨かれます。春の木のエネルギーは消耗を感じさせるかもしれません—エネルギーを守り、可能なところでは委任しましょう。夏の火があなたの才能を照らします—この可視性をキャリアアップや創造的な認知に活用しましょう。秋の金の月はあなたのパワーシーズンです—スキルを磨き、戦略的な動きをし、最高の仕事を提示しましょう。冬の水の月は内省と計画に有利です。第4四半期の土の調和が重要な財務または不動産の決定をサポートします。今年は拡大より洗練が報われます。"
    },
    summary: {
      en: "The flawless jewel refined by time and pressure — your path is one of elegance, discernment, and the pursuit of perfection.",
      zh: "时光淬炼的无瑕珍宝——你的命运之路是优雅、洞察与极致追求。",
      ja: "時と圧力によって磨かれた完璧な宝石—あなたの道は優雅さ、識別力、完璧の追求の道です。"
    }
  },

  "壬": {
    personality: {
      en: "Your Day Master is Ren (Yang Water), the ocean, the great river, and the boundless sea. You are visionary, expansive, and deeply intuitive. Your mind flows like water — adaptable, penetrating, and impossible to contain. You possess natural wisdom that transcends book learning and a charisma that draws people from all walks of life. Freedom is your oxygen; confinement of any kind stifles your spirit. You think big, dream bigger, and have the rare ability to turn visions into reality through sheer fluid persistence. You are the philosopher and explorer of the ten stems.",
      zh: "日主壬水，乃江河湖海、浩瀚汪洋。你目光远大，胸怀广阔，直觉深邃。你的思维如水流动——灵活、穿透、无法禁锢。你拥有超越书本的天然智慧和无差别吸引人的魅力。自由是你的氧气，任何形式的束缚都让你窒息。你想得大、梦得更大，并有罕见的能力将愿景化为现实——以水般的柔韧坚持。你是十天干中的哲学家和探索者。",
      ja: "あなたの日主は壬（陽の水）—海、大河、果てしない大洋です。先見の明があり、広大で、深く直感的です。心は水のように流れます—適応力があり、浸透し、閉じ込めることは不可能です。本の学びを超えた自然の知恵と、あらゆる階層の人々を引きつけるカリスマ性を持っています。自由があなたの酸素です—いかなる種類の閉じ込めもあなたの精神を窒息させます。大きく考え、さらに大きく夢見、水のような粘り強さでビジョンを現実に変える稀有な能力を持っています。あなたは十干の哲学者であり探検家です。"
    },
    wealth: {
      en: "Ren Water wealth flows through movement, communication, and scale. International trade, logistics, shipping, media, education technology, travel, and global consulting are your domains. You think in terms of ecosystems and networks — your wealth grows through connections and the free flow of information. You are not a hoarder but a circulator of wealth; money flows through you abundantly when you align with your purpose. Peak financial periods come with Metal-element support (ideas, systems) — ages 32-36 and 52-56. Think global from day one; your market is the world.",
      zh: "壬水之财来自流动、沟通和规模。国际贸易、物流、航运、传媒、教育科技、旅游、全球咨询是你的领域。你以生态和网络的视角思考——你的财富因连接和信息自由流动而增长。你不是财富的囤积者而是流通者；当与使命对齐时，金钱丰盛地流过你。金属支持之时财运最旺——32-36岁和52-56岁。从第一天起就瞄准全球——你的市场是整个世界的。",
      ja: "壬水の財は動き、コミュニケーション、規模を通じて流れます。国際貿易、物流、海運、メディア、教育技術、旅行、グローバルコンサルティングがあなたの領域です。エコシステムとネットワークの観点で考えます—あなたの富はつながりと情報の自由な流れを通じて成長します。あなたは富を貯め込む者ではなく循環させる者です。金のサポートがあるときに財務的ピークが訪れます—32-36歳と52-56歳。初日からグローバルに考えましょう。"
    },
    love: {
      en: "Ren Water loves with vastness and depth — you seek a connection that is both intellectually stimulating and spiritually liberating. You fear being trapped more than being alone. Best compatibility with Ding (Yin Fire) whose focused warmth gives your vastness a center, or Wu (Yang Earth) whose solidity provides banks for your river without damming it. You need a partner who gives you space to flow and explore, who understands that your love is no less real for being free. Conventional relationship structures may feel confining — design your own.",
      zh: "壬水之爱深邃广阔——你寻求一个既有智识激荡又有精神自由的连接。你害怕被束缚甚于孤独。与丁火最配——她专注的温暖给了你浩瀚一个中心；与戊土也合——他的坚固为你的河流提供堤岸而不筑坝。你需要一个给你流动和探索空间的伴侣，一个懂得你的爱不因自由而减少分毫的人。传统关系结构可能让你感到窒息——去设计属于你自己的。",
      ja: "壬水は広大さと深さで愛します—知的に刺激的で霊的に解放するつながりを求めます。孤独よりも閉じ込められることを恐れます。丁（陰の火）はその集中した温かさがあなたの広大さに中心を与え、戊（陽の土）はその堅固さがあなたの川にダムではなく土手を提供します。あなたが流れ探索する空間を与え、自由であるからといって愛が本物でないわけではないと理解するパートナーが必要です。従来の関係構造は窮屈に感じるかもしれません—自分自身のものをデザインしましょう。"
    },
    health: {
      en: "Your Water constitution gives you remarkable adaptability and recovery ability. The kidneys and bladder are your key organs — hydration and kidney health are paramount. You are sensitive to cold and dampness. Swimming, sailing, and any water-adjacent activity are deeply restorative for you. Adequate sleep is non-negotiable — your Water element recharges through rest. Sea vegetables, dark beans, and mineral-rich foods support your constitution. Emotionally, fear is your toxin — excessive worry about the future can stagnate your flowing nature. Movement — physical or metaphorical — is your medicine.",
      zh: "水性体质赋予你惊人的适应力和恢复力。肾与膀胱是重点器官——补水和肾脏健康至关重要。你对寒湿敏感。游泳、航海及任何近水活动都能深层修复你。充足睡眠不容商量——你的水元素通过休息来充电。海藻、黑豆、富含矿物质的食物有助你的体质。情绪上，恐惧是你的毒素——对未来的过度担忧会滞涩你的流动本质。动——物理或精神的——是你的良药。",
      ja: "水の体質は驚くべき適応力と回復力をもたらします。腎臓と膀胱が主要臓器です—水分補給と腎臓の健康が最も重要です。寒さと湿気に敏感です。水泳、セーリング、水に関連するあらゆる活動が深くあなたを回復させます。十分な睡眠は交渉不可です—水のエレメントは休息を通じて再充電されます。海藻、黒豆、ミネラル豊富な食品があなたの体質をサポートします。感情的には、恐怖があなたの毒素です—未来への過度の心配があなたの流れる性質を停滞させます。動きがあなたの薬です。"
    },
    career: {
      en: "Your career demands freedom, scale, and intellectual challenge. Entrepreneurship, international business, academia, media, technology strategy, diplomacy, and exploration (literal or metaphorical) are your callings. You are a natural visionary leader — not commanding from the front but inspiring from the center of a network. You need constant learning and new horizons. Corporate routine may feel suffocating unless you're at the very top setting strategy. Your career breakthroughs come with Metal-element luck cycles — ages 31-35 and 51-55. The world is your office.",
      zh: "你的职业需要自由、规模和智识挑战。创业、国际贸易、学术、传媒、科技战略、外交、探索是你的天职。你是天生的远见领袖——不是在前方号令，而是在网络中心激发。你需要持续学习和新视野。公司日常会令你窒息——除非你站在顶端制定战略。金运周期有职业突破——31-35岁和51-55岁。世界就是你的办公室。",
      ja: "あなたのキャリアは自由、規模、知的挑戦を要求します。起業、国際ビジネス、学術、メディア、テクノロジー戦略、外交、探検があなたの天職です。あなたは生まれながらの先見的リーダーです—前線から指揮するのではなくネットワークの中心から触発します。絶え間ない学習と新しい地平が必要です。企業のルーティンは、戦略を設定する最上位にいない限り息苦しく感じるかもしれません。キャリアの突破口は31-35歳と51-55歳に訪れます。世界があなたのオフィスです。"
    },
    yearlyTrend: {
      en: "This year, the ocean finds new shores. Spring brings Wood energy — channel your expansive ideas into concrete plans. Summer Fire may feel draining; protect your energy while maintaining visibility. Autumn Metal sharpens your thinking — an excellent season for strategic decisions and contracts. Winter is your power season; Water thrives in Water months. Launch bold initiatives now. A Metal-branch harmony in late summer suggests a publishing, speaking, or international opportunity. This year rewards bold thinking and global reach. Trust your intuition — it is your compass.",
      zh: "今年壬水江海寻找新的海岸。春季木旺——将你宏大的创意转化为具体计划。夏季火旺或感消耗，保持可见度的同时守护能量。秋季金旺锐化你的思维——是做战略决策和签约的绝佳季节。冬季是你当令之时，水在水月最旺，大胆启动新项目。夏末金支和谐暗示出版、演讲或国际机遇。今年奖赏大胆思考和全球布局。相信你的直觉——它是你的指南针。",
      ja: "今年の壬水、大洋は新しい岸辺を見つけます。春は木のエネルギー—あなたの広大なアイデアを具体的な計画に変えましょう。夏の火は消耗的に感じるかもしれません—可視性を保ちながらエネルギーを守りましょう。秋の金はあなたの思考を鋭くします—戦略的決定と契約に絶好の季節です。冬はあなたのパワーシーズンです。大胆なイニシアチブを今立ち上げましょう。晩夏の金の調和は出版、講演、または国際的な機会を示唆します。今年は大胆な思考とグローバルなリーチを報います。"
    },
    summary: {
      en: "The boundless ocean touching every shore — your path flows with visionary wisdom, unrestrained freedom, and limitless possibility.",
      zh: "无垠之海，连接天下——你的命运之路以远见智慧、无拘自由和无限可能奔流不息。",
      ja: "すべての岸辺に触れる果てしない大洋—あなたの道は先見の知恵、無制限の自由、無限の可能性とともに流れます。"
    }
  },

  "癸": {
    personality: {
      en: "Your Day Master is Gui (Yin Water), the mist, the rain, and the quiet spring. You are mysterious, deeply perceptive, and possess an almost psychic sensitivity to the world around you. Your strength is not in force but in penetration — like water that seeps into the smallest cracks and eventually reshapes stone. You are the most intuitive of the ten stems, often knowing things without knowing how you know. You value depth over breadth in relationships and ideas. Your quiet exterior conceals profound emotional currents. You are the mystic, the artist of the inner world.",
      zh: "日主癸水，乃雨露甘霖、幽泉静水。你神秘而深邃，对周遭世界有着近乎通灵的感知力。你的力量不在强力而在渗透——如水渗入微小的裂缝，最终重塑岩石。你是十天干中最具直觉力的，常能不经推理而直达真相。你在关系和思想中都追求深度而非广度。安静的外表下隐藏着深邃的情感暗流。你是内在世界的艺术家和神秘主义者。",
      ja: "あなたの日主は癸（陰の水）—霧、雨、静かな泉です。神秘的で、深く知覚力があり、周囲の世界に対してほとんど霊的な感受性を持っています。あなたの強さは力ではなく浸透にあります—最も小さな亀裂に染み込み、やがて石を再形成する水のように。あなたは十干の中で最も直感的で、どうやって知ったかわからずに物事を知ることがよくあります。人間関係やアイデアにおいて広さより深さを重視します。静かな外見は深遠な感情の流れを隠しています。あなたは神秘家であり、内なる世界の芸術家です。"
    },
    wealth: {
      en: "Gui Water wealth flows through insight, creativity, and behind-the-scenes influence. Psychology, research, writing, healing arts, spiritual guidance, data analysis, entertainment, and strategic consulting are your domains. You have a gift for seeing what others overlook and finding value in the invisible. Your wealth often comes through quiet channels — royalties, intellectual property, investments made on deep research. You prosper by understanding the hidden patterns that drive markets and human behavior. Peak wealth periods come with Metal-element support — ages 31-35 and 51-55. Trust your hunches; they are data processed by a genius subconscious.",
      zh: "癸水之财来自洞察、创造和幕后的影响力。心理学、研究、写作、疗愈艺术、灵性指导、数据分析、娱乐、战略咨询是你的领域。你有看到被忽视之物的天赋和在无形中发现价值的能力。你的财富常来自安静的渠道——版税、知识产权、基于深度研究的投资。你通过理解驱动市场与人类行为的隐藏模式而获利。金运支持之期财富高峰——31-35岁和51-55岁。相信你的直觉——它是你天才潜意识处理过的数据。",
      ja: "癸水の財は洞察、創造性、舞台裏の影響力を通じて流れます。心理学、研究、執筆、癒しの芸術、霊的指導、データ分析、エンターテインメント、戦略コンサルティングがあなたの領域です。他者が見落とすものを見抜き、見えないものに価値を見出す才能があります。あなたの富はしばしば静かなチャネルを通じてもたらされます—ロイヤリティ、知的財産、深い研究に基づく投資。市場と人間行動を駆動する隠れたパターンを理解することで繁栄します。31-35歳と51-55歳に富のピークがあります。あなたの直感を信じましょう。"
    },
    love: {
      en: "Gui Water loves with profound depth and spiritual connection. You seek a soulmate, not just a partner — someone who understands your inner world without requiring explanation. Your love is subtle, expressed through intuitive understanding rather than grand gestures. Best compatibility with Bing (Yang Fire) who brings warmth to your depths, or Wu (Yang Earth) who provides grounding without smothering your mystery. You need a partner who respects your need for solitude and doesn't mistake your complexity for aloofness. Love for you is a merging of souls, not just lives.",
      zh: "癸水之爱深邃而灵性。你寻找的是灵魂伴侣而非仅仅是伴侣——一个无需解释就能理解你内心世界的人。你的爱是细腻的，通过直觉理解而非盛大仪式来表达。与丙火最配——他为你的深邃带来温暖；与戊土也合——他提供根基却不窒息你的神秘。你需要一个尊重你独处需求、不把你的复杂误解为冷漠的伴侣。对你而言，爱是灵魂的融合而不仅是生活的合并。",
      ja: "癸水は深遠な深さと霊的なつながりで愛します。あなたは単なるパートナーではなくソウルメイトを求めます—説明を必要とせずにあなたの内なる世界を理解する人です。あなたの愛は繊細で、大げさなジェスチャーではなく直感的な理解を通じて表現されます。丙（陽の火）はあなたの深みに温かさをもたらし、戊（陽の土）はあなたの神秘性を窒息させることなくグラウンディングを提供します。孤独の必要性を尊重し、あなたの複雑さをよそよそしさと誤解しないパートナーが必要です。あなたにとって愛は単なる生活の統合ではなく魂の融合です。"
    },
    health: {
      en: "Your Gui Water constitution is delicate but deeply regenerative. The kidneys, reproductive system, and nervous system require attention. You absorb environmental energies easily — both good and bad — making energetic hygiene essential. Gentle, flowing exercises like qigong, swimming, and long walks in nature suit you perfectly. Warmth is healing for you; cold environments drain your energy. Bone broths, mineral-rich spring water, and dark-colored foods (black sesame, black beans) support your Water essence. Emotionally, unexpressed emotions can manifest as physical symptoms — journaling or therapy is as vital as exercise for you.",
      zh: "癸水体质细腻但再生力强。肾、生殖系统和神经系统需关注。你容易吸收环境能量——好坏都吸收——因此能量层面的洁净至关重要。气功、游泳、林中漫步等柔和流动的运动最适合你。温暖对你有疗愈作用，寒冷环境会消耗你的能量。骨头汤、矿泉水、黑色食物（黑芝麻、黑豆）有助肾精。情绪上，未曾表达的感受会在身体上显现——写日记或心理咨询对你而言与锻炼同等重要。",
      ja: "癸水の体質は繊細ですが深く再生的です。腎臓、生殖系、神経系に注意が必要です。環境のエネルギーを容易に吸収します—良いものも悪いものも—そのためエネルギー的な衛生が不可欠です。気功、水泳、自然の中での長い散歩などの穏やかで流れるような運動が完璧に適しています。温かさがあなたを癒します。骨のブロス、ミネラル豊富な湧き水、黒い食べ物（黒ゴマ、黒豆）があなたの水の精髄をサポートします。感情的に、表現されない感情が身体症状として現れることがあります—ジャーナリングやセラピーは運動と同じくらい重要です。"
    },
    career: {
      en: "Your career thrives in roles of depth, insight, and behind-the-scenes influence. Psychologist, researcher, writer, strategist, intelligence analyst, creative director, healer, and spiritual teacher are your callings. You work best in quiet, focused environments where you can dive deep without interruption. You may not seek the spotlight, but your ideas and insights can change organizations and lives. Your career builds through the profound value of your contributions rather than visibility. Key breakthroughs come with Metal-element luck cycles — ages 30-34 and 50-54. Trust your process; your way of working is different, not wrong.",
      zh: "你的职业在深度、洞察和幕后影响力中茁壮。心理学家、研究员、作家、策略师、情报分析、创意总监、疗愈师、灵性导师是你的天命。你在安静、专注的环境中工作最佳。你或许不追求聚光灯，但你的思想和洞察可以改变组织和生命。你的职业靠贡献的深度价值而非能见度建立。金运周期有关键突破——30-34岁和50-54岁。相信你的节奏，你的工作方式与众不同，而非错误。",
      ja: "あなたのキャリアは深さ、洞察、舞台裏の影響力の役割で開花します。心理学者、研究者、作家、戦略家、情報分析官、クリエイティブディレクター、ヒーラー、霊的教師があなたの天職です。中断なく深く潜れる静かで集中した環境で最も力を発揮します。スポットライトを求めないかもしれませんが、あなたのアイデアと洞察は組織と人生を変えることができます。キャリアは可視性ではなく貢献の深遠な価値を通じて構築されます。30-34歳と50-54歳に重要な突破口が訪れます。あなたのプロセスを信頼しましょう。"
    },
    yearlyTrend: {
      en: "This year deepens Gui Water's intuitive powers. Spring Wood energy channels your insights into creative expression — write, paint, or share your ideas. Summer Fire may feel overstimulating; retreat strategically to preserve your clarity. Autumn Metal sharpens your mind — an excellent season for research, analysis, and strategic planning. Winter is your season of power; your intuition peaks and hidden opportunities surface. A Metal-branch harmony in late summer suggests an important mentor or educational opportunity. This year rewards going deep rather than going wide. Follow your inner knowing — it will not lead you astray.",
      zh: "今年癸水直觉力加深。春季木旺将你的洞见化为创意表达——写、画、分享你的想法。夏季火旺或感过度刺激，战略性退守以保护清明。秋季金旺锐化你的思维——是做研究、分析和战略规划的绝佳季节。冬季你当令之时，直觉达到巅峰，隐藏的机会浮出水面。夏末金支和谐暗示重要的导师或教育机会。今年深耕胜于广撒。跟随你内在的知晓——它不会将你引入歧途。",
      ja: "今年の癸水は直感力が深まります。春の木のエネルギーがあなたの洞察を創造的表現に変えます—書いて、描いて、アイデアを共有しましょう。夏の火は過剰刺激に感じるかもしれません—明晰さを保つために戦略的に撤退しましょう。秋の金は思考を鋭くします—研究、分析、戦略的計画に絶好の季節です。冬はあなたの力の季節。晩夏の金の調和は重要なメンターや教育の機会を示唆します。今年は広く行くより深く行くことが報われます。あなたの内なる知に従いましょう。"
    },
    summary: {
      en: "The quiet spring that carves canyons — your path flows with deep intuition, quiet power, and the wisdom that transforms from within.",
      zh: "幽泉之水，穿石成谷——你的命运之路以深邃的直觉、静默的力量和从内而外的转化智慧流淌。",
      ja: "峡谷を刻む静かな泉—あなたの道は深い直感、静かな力、内側から変容させる知恵とともに流れます。"
    }
  }
};

export function getDayMasterProfile(stem: string): DayMasterProfile {
  return profiles[stem] || profiles["甲"];
}
