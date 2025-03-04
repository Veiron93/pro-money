import { forwardRef } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import RNActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import { styles } from './styles';

interface ActionSheetProps {
    children: React.ReactNode;
    styleContainer?: StyleProp<ViewStyle>;
}

// FIXME: починить задуржку при открытии
export const ActionSheet = forwardRef<ActionSheetRef, ActionSheetProps>(
    ({ children, styleContainer, ...props }, ref) => {
        const customStyleContainer = StyleSheet.flatten([styles.container, styleContainer]);

        return (
            <RNActionSheet
                ref={ref}
                gestureEnabled={true}
                containerStyle={customStyleContainer}
                indicatorStyle={styles.indicator}
                defaultOverlayOpacity={0.8}
                overdrawEnabled={false}
                disableDragBeyondMinimumSnapPoint={true}
                {...props}
            >
                {children}
            </RNActionSheet>
        );
    },
);
