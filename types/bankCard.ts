import { CashbackCategory } from './cashback';

export interface BankCard {
    id: string;
    name: string;
    description?: string;
    cashbackCategories?: CashbackCategory[];
}

export interface BankCardFormData {
    name: string;
    description?: string;
}

export interface BankCardWithCashback {
    bankCard: BankCard;
    cashbackCategories: CashbackCategory[];
}
