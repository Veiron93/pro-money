import { SubNavigation } from '@components/pages/settings/SubNavigation';
import { VStack } from '@components/ui/vstack';
import { NavigationLink } from '@customTypes/settings';
import { Stack } from 'expo-router';
import { LayoutList } from 'lucide-react-native';

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
        <VStack className="flex-1 p-4">
            <Stack.Screen options={{ title: 'Кешбек' }} />
            <SubNavigation links={links} />
        </VStack>
    );
}
