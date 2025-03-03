import { CashbackCategoryData, CashbackCategoryWithPercent } from './cashback';

export interface BankCard {
    id: string;
    name: string;
    description?: string;
    lastFourDigits?: number;
    expirationDate?: string;
    isActive?: boolean;
    cashbackCategories?: CashbackCategoryData[];
}

export interface BankCardFormData {
    name: string;
    description?: string;
    lastFourDigits?: number;
    expirationDate?: string;
    isActive?: boolean;
}

export interface BankCardWithCashback {
    bankCard: BankCard;
    cashbackCategories: CashbackCategoryWithPercent[];
}
