export const DEBT_QUERY_KEYS = {
    ACTIVE_DEBTS: 'activeDebtsGrouped',
    ARCHIVE_DEBTS: 'archiveDebts',
    DEBT: 'debt',
} as const;

export const BANK_CARDS_QUERY_KEYS = {
    BANK_CARDS: 'bankCards',
    BANK_CARD: 'bankCard',
    BANK_CARDS_WITH_CASHBACK: 'bankCardsWithCashback',
    BANK_CARD_WITH_CASHBACK: 'bankCardWithCashback',
} as const;

export const CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS = {
    CUSTOM_CATEGORIES: 'customCategoriesCashback',
    CUSTOM_CATEGORY: 'customCategoryCashback',
} as const;
