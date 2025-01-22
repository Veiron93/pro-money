export type DebtorType = 'i' | 'me';
export type DebtType = 'money' | 'other';
export type Currency = '₽' | '€' | '$';

export interface Debt {
    id: string;
    debtorType: DebtorType;
    debtorName: string;
    type: DebtType;
    currency: Currency;
    amount: string;
    date: string;
    description: string;
    isCompleted: boolean;
}

export interface DebtFormData {
    debtorType: DebtorType;
    debtorName: string;
    type: DebtType;
    currency: Currency;
    amount: string;
    date: string;
    description: string;
}

export interface DebtsGrouped {
    i: Debt[];
    me: Debt[];
}
