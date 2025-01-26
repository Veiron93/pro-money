import type { BankCard } from '@customTypes/bankCard';
import { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';

interface CashbackCategoryData {
    code: string;
    percent: number;
}

export interface CashbackItemData {
    id: string;
    cashbackCategories: CashbackCategoryData[];
}

export interface CashbackCategory {
    code: string;
    name: string;
    percent: number;
    icon: ReactElement<SvgProps>;
}

export interface CashbackItem {
    card: BankCard;
    cashbackCategories: CashbackCategory[];
}
