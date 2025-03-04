import { Main } from '@components/pages/benefit/Main';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { STORAGE_KEYS } from '@constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BenefitScreen() {
    const [activeTab, setActiveTab] = useState('finance');

    useEffect(() => {
        const loadActiveTab = async () => {
            try {
                const savedTab = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_TAB_BENEFIT);
                if (savedTab) {
                    setActiveTab(savedTab);
                }
            } catch (error) {
                console.error('Ошибка при загрузке активной вкладки:', error);
            }
        };
        loadActiveTab();
    }, []);

    const handleTabPress = async (code: string) => {
        setActiveTab(code);

        try {
            await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_TAB_BENEFIT, code);
        } catch (error) {
            console.error('Ошибка при сохранении активной вкладки:', error);
        }
    };

    const navigationItems = [
        {
            title: 'Финансы',
            code: 'finance',
        },
        {
            title: 'Услуги',
            code: 'services',
        },
        {
            title: 'Товары',
            code: 'products',
        },
        {
            title: '18+',
            code: '18plus',
        },
    ];

    const NAVIGATION_ITEM_STYLE = 'bg-neutral-700 rounded-full h-[46px] items-center justify-center px-3 py-1';

    return (
        <SafeAreaView className="flex-1 mt-4">
            <HStack space="sm" className="justify-between flex-none">
                <Pressable className={NAVIGATION_ITEM_STYLE + ' w-[46px]'}>
                    <Home size="18" />
                </Pressable>

                {navigationItems.map((item) => (
                    <Pressable
                        key={item.code}
                        className={`${NAVIGATION_ITEM_STYLE} ${activeTab === item.code ? 'bg-primary-500' : ''}`}
                        onPress={() => handleTabPress(item.code)}
                    >
                        <Text size="md">{item.title}</Text>
                    </Pressable>
                ))}
            </HStack>

            <ScrollView className="mt-4">
                {activeTab === 'finance' && <Main />}
                {/* Добавьте другие компоненты для остальных вкладок */}
            </ScrollView>
        </SafeAreaView>
    );
}
