import { TAB_OPTIONS } from '@configs/theme';
import { Tabs } from 'expo-router';
import { ArrowRightLeft, Coins, Home, Percent, Settings } from 'lucide-react-native';

export default function TabLayout() {
    const iconSize = 27;

    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                ...TAB_OPTIONS,
                animation: 'shift',
                transitionSpec: {
                    animation: 'timing',
                    config: {
                        duration: 150,
                    },
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Главная',
                    tabBarIcon: ({ color }) => <Home color={color} size={iconSize} />,
                }}
            />

            <Tabs.Screen
                name="cashback"
                options={{
                    title: 'Кешбек',
                    tabBarIcon: ({ color }) => <Coins color={color} size={iconSize} />,
                }}
            />

            <Tabs.Screen
                name="debts"
                options={{
                    title: 'Долги',
                    tabBarIcon: ({ color }) => <ArrowRightLeft color={color} size={iconSize} />,
                }}
            />

            <Tabs.Screen
                name="benefit"
                options={{
                    title: 'Выгода',
                    tabBarIcon: ({ color }) => <Percent color={color} size={iconSize} />,
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Настройки',
                    tabBarIcon: ({ color }) => <Settings color={color} size={iconSize} />,
                }}
            />
        </Tabs>
    );
}
