import '@/global.css';
import { GluestackUIProvider } from '@components/ui/gluestack-ui-provider';
import { COLORS } from '@configs/theme';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { registerTranslation, ru } from 'react-native-paper-dates';

SplashScreen.preventAutoHideAsync();

registerTranslation('ru', ru);

const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
    }
}

export default function RootLayout() {
    useEffect(() => {
        const subscription = AppState.addEventListener('change', onAppStateChange);

        if (Platform.OS === 'web') {
            // Для веб-платформы используем события окна
            window.addEventListener('focus', () => focusManager.setFocused(true));
            window.addEventListener('blur', () => focusManager.setFocused(false));
        }

        return () => {
            subscription.remove();
            if (Platform.OS === 'web') {
                window.removeEventListener('focus', () => focusManager.setFocused(true));
                window.removeEventListener('blur', () => focusManager.setFocused(false));
            }
        };
    }, []);

    return (
        <GestureHandlerRootView>
            <StatusBar style="auto" backgroundColor={COLORS.background} />

            <GluestackUIProvider mode="dark">
                <QueryClientProvider client={queryClient}>
                    <Stack screenOptions={{ headerShown: false }} />
                </QueryClientProvider>
            </GluestackUIProvider>
        </GestureHandlerRootView>
    );
}
