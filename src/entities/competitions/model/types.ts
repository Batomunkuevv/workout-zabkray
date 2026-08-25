export type CompetitionMetaItem = {
    label: string;
    value: string;
};

export type CompetitionStat = {
    value: string;
    label: string;
};

export type CompetitionProgramItem = {
    time: string;
    title: string;
    text: string;
};

export type CompetitionNewsItem = {
    label: string;
    title: string;
    text: string;
};

export type CompetitionCategory = {
    /** Короткий порядковый маркер, например «01». */
    index: string;
    title: string;
    level: string;
    description: string;
};

export type CompetitionFaqItem = {
    question: string;
    answer: string;
};

export type CompetitionJudge = {
    /** Инициалы для бейджа, например «АК». */
    initials: string;
    name: string;
    role: string;
    bio: string;
};

export type CompetitionPrize = {
    place: string;
    title: string;
    reward: string;
};

export type CompetitionPrizes = {
    fund: string;
    fundLabel: string;
    note: string;
    places: readonly CompetitionPrize[];
};

export type CompetitionCta = {
    title: string;
    text: string;
    actionLabel: string;
    actionHref: string;
    note?: string;
};

export type Competition = {
    slug: string;
    label: string;
    /** Разметка заголовка: текст и `<span>` для акцентов (доверенный контент из констант / CMS). */
    title: string;
    /** Текст на странице события и в карточке в списке. */
    description: string;
    /** Короткое описание для meta description, если отличается от текста на странице. */
    seoDescription?: string;
    /** Полный title для SEO, если отличается от шаблона по label. */
    seoTitle?: string;
    status: string;
    image: string;
    imageAlt: string;
    heroBadges: readonly string[];
    meta: readonly CompetitionMetaItem[];
    aboutTitle: string;
    aboutText: string;
    stats: readonly CompetitionStat[];
    categoriesTitle: string;
    categoriesText: string;
    categories: readonly CompetitionCategory[];
    programTitle: string;
    programText: string;
    program: readonly CompetitionProgramItem[];
    judgesTitle: string;
    judgesText: string;
    judges: readonly CompetitionJudge[];
    prizesTitle: string;
    prizesText: string;
    prizes: CompetitionPrizes;
    newsTitle: string;
    newsText: string;
    news: readonly CompetitionNewsItem[];
    faqTitle: string;
    faqText: string;
    faq: readonly CompetitionFaqItem[];
    cta: CompetitionCta;
};
