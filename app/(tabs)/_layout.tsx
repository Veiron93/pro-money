import { TAB_OPTIONS } from '@configs/theme';
import { Tabs } from 'expo-router';
import { Coins, Heart, Home, Percent, Settings } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs initialRouteName="index" screenOptions={TAB_OPTIONS}>
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
