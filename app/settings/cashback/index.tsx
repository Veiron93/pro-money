import { SubNavigation } from '@components/pages/settings/SubNavigation';
import { NavigationLink } from '@customTypes/settings';
import { Stack } from 'expo-router';
import { LayoutList } from 'lucide-react-native';
import { View } from 'react-native';

const iconsParams = {
    color: 'white',
    size: 25,
};

const links: NavigationLink[] = [
    {
        title: 'Пользовательские категории',
        description: 'Добавьте категорию кешбека, которой нет в списке',
        path: '../settings/cashback/customCategories',
        icon: <LayoutList {...iconsParams} />,
    },
];

export default function CashbackScreen() {
    return (
        <View className="flex-1">
            <Stack.Screen options={{ title: 'Кешбек' }} />
            <SubNavigation links={links} />
        </View>
    );
}
