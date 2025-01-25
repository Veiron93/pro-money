import type { CashbackCategory, CashbackItemData } from '@customTypes/cashback';
import { CashbackCategories } from '@storage/cashbackCategories';

/**
 * @description Получить совпадающие категории кешбэка по элементу кешбэка
 * @param cashbackItem - Элемент кешбэка
 * @returns Совпадающие категории кешбэка
 */
export const getMatchedCashbackCategories = (cashbackItem: CashbackItemData): CashbackCategory[] => {
    return cashbackItem.cashbackCategories
        .map((cashbackCategory) => {
            const category = CashbackCategories.find((cashback) => cashback.code === cashbackCategory.code);

            if (!category) return;

            return {
                ...category,
                percent: cashbackCategory.percent,
            };
        })
        .filter(Boolean) as CashbackCategory[];
};
