// Ten Gods (十神) knowledge base — interpretations for each god

type LocaleText = { en: string; zh: string; ja: string };

interface TenGodInfo {
  name: LocaleText;
  personality: LocaleText;
  career: LocaleText;
  relationships: LocaleText;
}

const INFO: Record<string, TenGodInfo> = {
  "比肩": {
    name: { en: "Peer (Bi Jian)", zh: "比肩", ja: "比肩" },
    personality: {
      en: "Bi Jian represents self-reliance and independence. It makes you competitive yet cooperative, with a strong sense of self. People with strong Bi Jian are natural equals — they neither dominate nor submit. They value fairness and prefer partnerships of mutual respect. In excess, it can bring stubbornness.",
      zh: "比肩代表自我与独立。它让你既有竞争心又懂得合作，自我意识强烈。比肩旺的人天生平等待人——既不高高在上也不卑躬屈膝。他们重视公平，喜欢互相尊重的伙伴关系。过旺则易固执己见。",
      ja: "比肩は自立と独立を表します。競争心がありながら協調性も持ち、強い自己意識をもたらします。比肩が強い人は自然に対等な関係を築きます。公平さを重視し、相互尊重のパートナーシップを好みます。過剰になると頑固さをもたらすことも。"
    },
    career: {
      en: "Suited for entrepreneurial roles, freelance work, or positions requiring self-direction. You work best when given autonomy. Competitive industries like sales, sports, and independent consulting are natural fits.",
      zh: "适合创业、自由职业或需要自主性的岗位。你在有自主权时发挥最佳。销售、体育竞技、独立咨询等竞争性行业天然契合。",
      ja: "起業やフリーランス、自律性が求められる役割に適しています。自律性があるときに最高の力を発揮します。営業、スポーツ、独立コンサルティングなどの競争的業界が自然に適合します。"
    },
    relationships: {
      en: "In relationships, you seek an equal partner. You value shared decision-making and mutual growth. Compatible with those who respect your independence.",
      zh: "在感情中，你寻求平等伴侣。重视共同决策和互相成长。与尊重你独立性的人相配。",
      ja: "関係性においては対等なパートナーを求めます。共有された意思決定と相互成長を重視します。あなたの独立性を尊重する人と相性が良いです。"
    }
  },
  "劫财": {
    name: { en: "Rob Wealth (Jie Cai)", zh: "劫财", ja: "劫財" },
    personality: {
      en: "Jie Cai brings social charm and networking ability. You connect easily with others and thrive in group settings. However, it can also indicate a tendency to spend freely and struggle with financial discipline. You're generous to a fault — learning to set boundaries is key.",
      zh: "劫财带来社交魅力和人脉能力。你轻松与人连接，在群体中如鱼得水。但也可能花钱大手大脚，缺乏财务自律。你过于慷慨——学会设立边界是关键。",
      ja: "劫財は社交的な魅力とネットワーキング能力をもたらします。他者と容易につながり、グループ設定で繁栄します。しかし自由にお金を使う傾向も示し、財務的な規律に苦労することもあります。寛大すぎるので、境界を設定することを学ぶことが鍵です。"
    },
    career: {
      en: "Excellent for people-facing roles: sales, PR, networking, hospitality, and entertainment. You excel at building relationships. Watch financial boundaries in business partnerships.",
      zh: "擅长与人打交道的岗位：销售、公关、社交、酒店、娱乐。你在建立关系方面表现出色。注意商业合作中的财务边界。",
      ja: "人と接する役割に優れています：営業、PR、ネットワーキング、ホスピタリティ、エンターテインメント。関係構築に優れています。ビジネスパートナーシップでの財務的境界に注意。"
    },
    relationships: {
      en: "You're warm and sociable in love, but may struggle with spending on partners. Seek someone who appreciates your generosity while helping you maintain balance.",
      zh: "在感情中热情外向，但可能为伴侣过度消费。寻找一个欣赏你的慷慨同时帮你保持平衡的人。",
      ja: "恋愛では温かく社交的ですが、パートナーへの支出に苦労することがあります。バランスを保ちながらあなたの寛大さを評価してくれる人を探しましょう。"
    }
  },
  "食神": {
    name: { en: "Eating God (Shi Shen)", zh: "食神", ja: "食神" },
    personality: {
      en: "Shi Shen is the star of creativity and enjoyment. You have a refined taste for life's pleasures — good food, art, and comfort. You're naturally optimistic and easygoing. Your creative expression flows effortlessly. This is one of the most auspicious stars for happiness and fulfillment.",
      zh: "食神是创意与享受之星。你对生活的美好有精致的品味——美食、艺术、舒适。你天性乐观随和。创意表达自然流淌。这是最吉利的幸福之星之一。",
      ja: "食神は創造性と享受の星です。人生の喜び—良い食べ物、芸術、快適さ—に対する洗練された趣味を持っています。天性楽観的でのんびりしています。創造的表現が自然に流れます。これは幸福と充実のための最も吉兆な星の一つです。"
    },
    career: {
      en: "Creative fields shine: art, design, culinary arts, writing, entertainment, and hospitality. You produce work that others enjoy. Freelance or flexible work arrangements suit your nature.",
      zh: "创意领域发光：艺术、设计、烹饪、写作、娱乐、酒店。你的作品让人享受。自由职业或弹性工作安排适合你的天性。",
      ja: "創造的分野が輝きます：アート、デザイン、料理、執筆、エンターテインメント、ホスピタリティ。他者が楽しむ作品を生み出します。フリーランスや柔軟な仕事の調整があなたの性質に合います。"
    },
    relationships: {
      en: "You express love through care and thoughtful gestures. A peaceful, harmonious home life is important to you. Compatible with partners who appreciate the simple joys.",
      zh: "你通过关怀和贴心举动来表达爱。安宁和谐的家庭生活对你很重要。与懂得欣赏简单快乐的伴侣相配。",
      ja: "ケアと思いやりのあるジェスチャーを通じて愛を表現します。平和で調和のとれた家庭生活があなたにとって重要です。シンプルな喜びを評価するパートナーと相性が良いです。"
    }
  },
  "伤官": {
    name: { en: "Hurting Officer (Shang Guan)", zh: "伤官", ja: "傷官" },
    personality: {
      en: "Shang Guan brings brilliance and unconventional thinking. You see the world differently and aren't afraid to challenge norms. Your intelligence is sharp but can become critical. You're a natural rebel with a cause — channel your contrarian energy into innovation rather than conflict.",
      zh: "伤官带来才华与反叛思维。你以不同的眼光看世界，不惧挑战常规。你的智慧锐利但可能变得尖刻。你天生是个有追求的叛逆者——将你反传统的能量导向创新而非冲突。",
      ja: "傷官は才能と反逆的思考をもたらします。世界を異なる目で見て、規範に挑戦することを恐れません。知性は鋭いですが批判的になることも。大義を持つ生まれながらの反逆者です—反伝統的エネルギーを衝突ではなく革新に向けましょう。"
    },
    career: {
      en: "Innovation and disruption are your domains: technology, design, research, strategy consulting, and any field where breaking conventions is valued. You need creative freedom.",
      zh: "创新与颠覆是你的领域：科技、设计、研究、战略咨询、任何打破常规被重视的领域。你需要创作自由。",
      ja: "革新と破壊があなたの領域です：テクノロジー、デザイン、研究、戦略コンサルティング、慣習を破ることが評価されるあらゆる分野。創造的自由が必要です。"
    },
    relationships: {
      en: "You need intellectual stimulation in love. Conventional relationships may feel stifling. Seek a partner who appreciates your uniqueness and gives you space to be yourself.",
      zh: "在爱情中需要智识刺激。传统关系可能令你窒息。寻找一个欣赏你的独特、给你做自己空间的伴侣。",
      ja: "恋愛では知的刺激が必要です。従来の関係は息苦しく感じるかもしれません。あなたの独自性を評価し、自分らしくいる空間を与えてくれるパートナーを探しましょう。"
    }
  },
  "正财": {
    name: { en: "Direct Wealth (Zheng Cai)", zh: "正财", ja: "正財" },
    personality: {
      en: "Zheng Cai represents steady, earned wealth and practical responsibility. You're hardworking, reliable, and value financial security. You build wealth through consistent effort rather than speculation. Conservative with money but generous when needed. The archetype of the responsible provider.",
      zh: "正财代表稳定收入和实际责任。你勤劳可靠，重视财务安全。通过持续努力而非投机积累财富。用钱保守但该花时慷慨。责任感强的供养者原型。",
      ja: "正財は安定した収入と実用的責任を表します。勤勉で信頼でき、財務的安全を重視します。投機ではなく一貫した努力を通じて富を築きます。お金には保守的ですが必要なときは寛大です。責任感の強い提供者の原型です。"
    },
    career: {
      en: "Finance, accounting, management, government, and any stable industry suit you. You thrive in structured environments with clear progression paths. Building long-term value is your strength.",
      zh: "金融、会计、管理、政府及任何稳定行业适合你。你在有清晰晋升路径的结构化环境中茁壮。建立长期价值是你的优势。",
      ja: "金融、会計、管理、政府、安定した業界があなたに適しています。明確な進歩の道がある構造化された環境で繁栄します。長期的価値の構築があなたの強みです。"
    },
    relationships: {
      en: "You're a committed, responsible partner. You show love through providing and protecting. Traditional family values resonate deeply. Compatible with those who appreciate stability.",
      zh: "你是忠诚负责的伴侣。通过供养和保护来表达爱。传统家庭价值观引起深层共鸣。与欣赏稳定的人相配。",
      ja: "コミットした責任感のあるパートナーです。提供することと守ることを通じて愛を示します。伝統的な家族の価値観が深く共鳴します。安定を評価する人と相性が良いです。"
    }
  },
  "偏财": {
    name: { en: "Indirect Wealth (Pian Cai)", zh: "偏财", ja: "偏財" },
    personality: {
      en: "Pian Cai brings unexpected wealth and entrepreneurial flair. You have a natural instinct for business opportunities and can profit where others see chaos. Risk-taking comes naturally. Your financial life has ups and downs — the thrill of the deal excites you more than steady accumulation.",
      zh: "偏财带来意外之财和商业直觉。你对商机有天然的嗅觉，能在他人看到混乱之处获利。敢于冒险。你的财务生活有起有落——交易的刺激比稳定积累更让你兴奋。",
      ja: "偏財は予期せぬ富と起業家的才能をもたらします。ビジネスチャンスに対する自然な直感を持ち、他者が混沌と見るところで利益を得られます。リスクテイクが自然にできます。財務生活には浮き沈みがあります—取引のスリルが安定した蓄積よりもあなたを興奮させます。"
    },
    career: {
      en: "Entrepreneurship, trading, investment, sales, and speculative ventures are your playground. You excel at spotting undervalued opportunities. Independent business or commission-based work suits your risk-reward mindset.",
      zh: "创业、交易、投资、销售和投机项目是你的游乐场。你擅长发现被低估的机会。独立经营或提成制工作适合你的风险回报思维。",
      ja: "起業、取引、投資、営業、投機的事業があなたの遊び場です。過小評価された機会を見つけることに優れています。独立したビジネスやコミッションベースの仕事があなたのリスク・リワード思考に合います。"
    },
    relationships: {
      en: "You're exciting and generous in love, but may need to work on consistency. Grand gestures come naturally; daily commitment requires conscious effort. Attracted to dynamic partners.",
      zh: "在爱情中令人兴奋且大方，但可能需要加强一致性。大手笔天然发生，日常承诺需要刻意努力。被有活力的伴侣吸引。",
      ja: "恋愛では刺激的で寛大ですが、一貫性に取り組む必要があるかもしれません。大きなジェスチャーは自然にできますが、日々のコミットメントには意識的な努力が必要です。ダイナミックなパートナーに惹かれます。"
    }
  },
  "正官": {
    name: { en: "Direct Officer (Zheng Guan)", zh: "正官", ja: "正官" },
    personality: {
      en: "Zheng Guan represents authority, discipline, and moral integrity. You have a strong sense of duty and justice. You respect rules and hierarchy, and others respect you in return. This is the star of leadership through virtue. You command authority naturally without being domineering.",
      zh: "正官代表权威、纪律和道德正直。你有强烈的责任感和正义感。尊重规则和层级，他人也因此尊重你。这是以德服人的领导之星。你天然具有不怒自威的权威。",
      ja: "正官は権威、規律、道徳的誠実さを表します。強い義務感と正義感を持っています。規則と階層を尊重し、他者もあなたを尊重します。これは美徳によるリーダーシップの星です。威圧的にならずに自然に権威を発揮します。"
    },
    career: {
      en: "Management, government, law, military, and corporate leadership are your domains. You rise through merit and integrity. Organizations trust you with their most important responsibilities.",
      zh: "管理、政府、法律、军队和企业领导是你的领域。你凭借功绩和正直晋升。组织把最重要的责任托付给你。",
      ja: "管理、政府、法律、軍隊、企業リーダーシップがあなたの領域です。功績と誠実さを通じて上昇します。組織は最も重要な責任をあなたに託します。"
    },
    relationships: {
      en: "You seek a partner of good character and social standing. Loyalty and commitment define your romantic style. Traditional and reliable, you build lasting partnerships.",
      zh: "你寻求品格良好和社会地位匹配的伴侣。忠诚和承诺定义你的恋爱风格。传统可靠，建立持久的伴侣关系。",
      ja: "良い人格と社会的地位を持つパートナーを求めます。忠誠とコミットメントがあなたの恋愛スタイルを定義します。伝統的で信頼でき、持続的なパートナーシップを築きます。"
    }
  },
  "七杀": {
    name: { en: "Seven Killings (Qi Sha)", zh: "七杀", ja: "七殺" },
    personality: {
      en: "Qi Sha is the warrior star — intense, driven, and fearless. You have formidable willpower and thrive under pressure. This star produces leaders who rise through crisis. You can be ruthless when needed but must guard against becoming domineering. Your energy transforms challenges into victories.",
      zh: "七杀是将星——激烈、进取、无畏。你有强大的意志力，在压力下茁壮。此星造就的是能在危机中崛起的领袖。必要时你可以不留情面，但须警惕变得霸道。你的能量将挑战转化为胜利。",
      ja: "七殺は戦士の星—強烈で、意欲的で、恐れを知りません。強大な意志力を持ち、プレッシャーの下で繁栄します。この星は危機を通じて上昇するリーダーを生み出します。必要なときには非情になれますが、支配的になりすぎないよう警戒しなければなりません。あなたのエネルギーは挑戦を勝利に変えます。"
    },
    career: {
      en: "Military, law enforcement, surgery, competitive sports, emergency management, and high-stakes business. You're at your best when the pressure is highest. Crisis management and turnaround situations call your name.",
      zh: "军事、执法、外科、竞技体育、应急管理、高风险商业。你在压力最大时状态最佳。危机管理和扭转局面是你的天命。",
      ja: "軍隊、法執行、外科、競技スポーツ、緊急管理、ハイステークスビジネス。プレッシャーが最も高いときに最高の状態になります。危機管理と状況の転換があなたを呼んでいます。"
    },
    relationships: {
      en: "Passionate and protective in love. You need a partner who can match your intensity without being overwhelmed. Loyalty is absolute — you defend your loved ones fiercely.",
      zh: "在爱情中热情且保护欲强。你需要一个能匹配你强度而不被压垮的伴侣。忠诚是绝对的——你猛烈地保护你所爱之人。",
      ja: "恋愛では情熱的で保護的です。圧倒されずにあなたの強度に匹敵できるパートナーが必要です。忠誠は絶対的です—愛する人を激しく守ります。"
    }
  },
  "正印": {
    name: { en: "Direct Seal (Zheng Yin)", zh: "正印", ja: "正印" },
    personality: {
      en: "Zheng Yin represents wisdom, knowledge, and nurturing support. You're scholarly, compassionate, and naturally drawn to learning. This is the star of the mentor and teacher. You absorb knowledge easily and have a calming presence. Others seek your guidance and wisdom.",
      zh: "正印代表智慧、知识和培育支持。你学术性格、富有同情心、自然被学习吸引。这是导师和教师之星。你轻松吸收知识，散发着镇定的气场。他人寻求你的指引和智慧。",
      ja: "正印は知恵、知識、育成支援を表します。学問的で、思いやりがあり、自然に学習に惹かれます。これはメンターと教師の星です。知識を容易に吸収し、落ち着いた存在感を持っています。他者はあなたの導きと知恵を求めます。"
    },
    career: {
      en: "Education, research, counseling, medicine, writing, and academia are your callings. You're a natural teacher and mentor. Any role that values deep understanding and the transmission of knowledge suits you.",
      zh: "教育、研究、咨询、医学、写作和学术是你的天命。你是天生的教师和导师。任何重视深度理解和知识传递的角色都适合你。",
      ja: "教育、研究、カウンセリング、医学、執筆、学術があなたの天職です。生まれながらの教師でありメンターです。深い理解と知識の伝達を重視するあらゆる役割があなたに適しています。"
    },
    relationships: {
      en: "Gentle and supportive in love. You nurture your partner's growth. Seek someone who values emotional depth and intellectual connection. Traditional and devoted, you create a warm home.",
      zh: "在爱情中温柔而支持。你滋养伴侣的成长。寻找一个重视情感深度和智识连接的人。传统且忠诚，你创造一个温暖的家。",
      ja: "恋愛では優しく支援的です。パートナーの成長を育みます。感情の深さと知的つながりを重視する人を探しましょう。伝統的で献身的で、温かい家庭を作ります。"
    }
  },
  "偏印": {
    name: { en: "Indirect Seal (Pian Yin)", zh: "偏印", ja: "偏印" },
    personality: {
      en: "Pian Yin brings unconventional wisdom and intuitive insight. You think outside the box and have a natural talent for esoteric knowledge. You're drawn to the mysterious and profound. This is the star of the mystic and innovator. You see patterns others miss.",
      zh: "偏印带来非常规智慧和直觉洞察。你跳脱框架思考，对玄学知识有天然天赋。你被神秘和深邃所吸引。这是隐士和创新者之星。你看到他人忽略的模式。",
      ja: "偏印は非従来型の知恵と直感的洞察をもたらします。枠にとらわれずに考え、神秘的な知識に対する自然な才能を持っています。神秘的で深遠なものに惹かれます。これは神秘家と革新者の星です。他者が見逃すパターンを見ます。"
    },
    career: {
      en: "Research, technology, metaphysics, psychology, investigation, and creative fields suit you. You excel in roles requiring deep, unconventional thinking. Solitude and focus are your productivity tools.",
      zh: "研究、科技、玄学、心理学、调查和创意领域适合你。在需要非常规深度思考的角色中表现出色。独处和专注是你的生产力工具。",
      ja: "研究、テクノロジー、形而上学、心理学、調査、創造的分野があなたに適しています。深く非従来型の思考を必要とする役割で優れています。孤独と集中があなたの生産性ツールです。"
    },
    relationships: {
      en: "You need a partner who respects your need for solitude and deep thinking. Superficial connections don't satisfy. Seek intellectual and spiritual compatibility above all.",
      zh: "你需要一个尊重你独处和深度思考需求的伴侣。肤浅的连接无法满足你。追求智识和精神上的契合高于一切。",
      ja: "孤独と深い思考の必要性を尊重するパートナーが必要です。表面的なつながりは満足させません。何よりも知的および精神的な互換性を求めましょう。"
    }
  },
};

export function getTenGodInfo(name: string): TenGodInfo {
  return INFO[name] || INFO["比肩"];
}
