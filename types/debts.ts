import { CURRENCY } from '@keys/currency';

export type DebtorType = 'i' | 'me';
export type DebtType = 'money' | 'other';

export interface Debt {
    id: string;
    debtorType: DebtorType;
    debtorName: string;
    type: DebtType;
    currency: CURRENCY;
    amount: string;
    date: string;
    description: string;
    isCompleted: boolean;
}

export interface DebtFormData {
    debtorType: DebtorType;
    debtorName: string;
    type: DebtType;
    currency: CURRENCY;
    amount: string;
    date: string;
    description: string;
}

export interface DebtsGrouped {
    i: Debt[];
    me: Debt[];
}
