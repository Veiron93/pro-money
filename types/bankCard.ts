import { CashbackCategory, CashbackCategoryData } from './cashback';

export interface BankCard {
    id: string;
    name: string;
    description?: string;
    cashbackCategories?: CashbackCategoryData[];
}

export interface BankCardFormData {
    name: string;
    description?: string;
}

export interface BankCardWithCashback {
    bankCard: BankCard;
    cashbackCategories: CashbackCategory[];
}
