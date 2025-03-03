import { RelativePathString } from 'expo-router';
import { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';

export type NavigationLink = {
    title: string;
    description?: string;
    path: RelativePathString;
    icon: ReactElement<SvgProps>;
};
