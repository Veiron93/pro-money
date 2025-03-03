import { ComponentType } from 'react';
import { SvgProps } from 'react-native-svg';

// export type TypeCategories = 'system' | 'custom';

export interface CashbackCategoryData {
    code: string;
    percent: number;
}

export interface CashbackCategoryStorage {
    code: string;
    name: string;
    icon: ComponentType<SvgProps>;
}

export interface CustomCategoryCashback {
    code: string;
    name: string;
}

export interface CashbackCategory {
    code: string;
    name: string;
    icon?: ComponentType<SvgProps>;
}

export interface CashbackCategoryWithPercent extends CashbackCategory {
    percent: number;
}

export interface CustomCategoryCashbackFormData {
    name: string;
}
