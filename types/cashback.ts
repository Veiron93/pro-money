import type { BankCard } from '@/types/bankCard';
import { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';

interface CashbackCategoryStorage {
    code: string;
    precent: number;
}

export interface CashbackItemStorage {
    id: string;
    cashbackCategories: CashbackCategoryStorage[];
}

export interface CashbackCategory {
    code: string;
    name: string;
    precent: number;
    icon: ReactElement<SvgProps>;
}

export interface CashbackItem {
    card: BankCard;
    cashbackCategories: CashbackCategory[];
}
