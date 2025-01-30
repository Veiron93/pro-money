import { CURRENCY } from '@keys/currency';
import { LEVELS } from '@keys/levels';

export type DebtorType = 'i' | 'me';
export type DebtType = 'money' | 'other';

export interface Debt {
    id: string;
    debtorType: DebtorType;
    debtorName: string;
    type: DebtType;
    currency: CURRENCY;
    moneyAmount: string;
    otherAmount: string;
    date: Date | undefined;
    description: string;
    isCompleted: boolean;
    level: LEVELS;
}

export interface DebtFormData {
    debtorType: DebtorType;
    debtorName: string;
    type: DebtType;
    currency: CURRENCY;
    moneyAmount: string;
    otherAmount: string;
    date: Date | undefined;
    description: string;
    level: LEVELS;
}

export interface DebtsGrouped {
    i: Debt[];
    me: Debt[];
}
