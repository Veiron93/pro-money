import { Stack } from 'expo-router';

export const Layout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171717',
                },
                headerTintColor: '#fff',
                contentStyle: {
                    backgroundColor: '#171717',
                },
                headerShadowVisible: false,
            }}
        />
    );
};
