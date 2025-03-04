import { COLORS } from '@configs/theme';
import { Stack } from 'expo-router';

export const RootLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
                headerTintColor: COLORS.white,
                contentStyle: {
                    backgroundColor: COLORS.background,
                    padding: 15,
                    paddingTop: 5,
                },
                headerShadowVisible: false,
                animation: 'fade',
                animationTypeForReplace: 'push',
            }}
        />
    );
};
