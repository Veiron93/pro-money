import { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';

export interface CashbackCategoryData {
    code: string;
    percent: number;
}

export interface CashbackCategory {
    code: string;
    name: string;
    percent: number;
    icon: ReactElement<SvgProps>;
}
