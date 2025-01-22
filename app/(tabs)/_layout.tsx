import { Tabs } from 'expo-router';
import { Coins, Heart, Home, Percent, Settings } from 'lucide-react-native';

export default function TabLayout() {
    const COLORS = {
        active: '#14532d',
        background: '#171717',
        white: '#ffffff',
    } as const;

    const tabsOptions = {
        headerShown: false,
        tabBarActiveTintColor: COLORS.active,
        headerTintColor: COLORS.white,
        tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopWidth: 0,
        },
        headerStyle: {
            backgroundColor: COLORS.background,
            borderBottomWidth: 0,
        },
        sceneStyle: {
            backgroundColor: COLORS.background,
            padding: 15,
            paddingTop: 0,
        },
    };

    return (
        <Tabs initialRouteName="index" screenOptions={tabsOptions}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Главная',
                    tabBarIcon: ({ color }) => <Home color={color} size={22} />,
                }}
            />

            <Tabs.Screen
                name="cashback"
                options={{
                    title: 'Кешбек',
                    tabBarIcon: ({ color }) => <Percent color={color} size={22} />,
                }}
            />

            <Tabs.Screen
                name="debts"
                options={{
                    title: 'Долги',
                    tabBarIcon: ({ color }) => <Coins color={color} size={22} />,
                }}
            />

            <Tabs.Screen
                name="help"
                options={{
                    title: 'Поддержать',
                    tabBarIcon: ({ color }) => <Heart color={color} size={22} />,
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Настройки',
                    tabBarIcon: ({ color }) => <Settings color={color} size={22} />,
                }}
            />
        </Tabs>
    );
}
