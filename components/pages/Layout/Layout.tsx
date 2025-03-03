import { COLORS } from '@configs/theme';
import { Stack } from 'expo-router';

export const Layout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
                headerTintColor: COLORS.white,
                contentStyle: {
                    backgroundColor: COLORS.background,
                },
                headerShadowVisible: false,
                animation: 'fade',
                animationTypeForReplace: 'push',
            }}
        />
    );
};
