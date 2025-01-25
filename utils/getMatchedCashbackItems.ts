import type { BankCard } from '@customTypes/bankCard';
import type { CashbackItemData } from '@customTypes/cashback';

/**
 * @description Получить совпадающие элементы кешбэка по банковским картам
 * @param cashbackItemsData - Данные элементов кешбэка
 * @param bankCards - Банковские карты
 * @returns Совпадающие элементы кешбэка
 */
export const getMatchedCashbackItems = (
    cashbackItemsData: CashbackItemData[],
    bankCards: BankCard[],
): CashbackItemData[] => {
    if (!cashbackItemsData?.length || !bankCards?.length) {
        return [];
    }

    const bankCardIds = new Set(bankCards.map((card) => card.id));

    return cashbackItemsData.filter((item) => bankCardIds.has(item.id));
};
