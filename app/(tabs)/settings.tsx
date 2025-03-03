import { Donation } from '@components/pages/settings/Donation';
import { Box } from '@components/ui/box';
import { Text } from '@components/ui/text';
import { NavigationLink } from '@customTypes/settings';
import { router } from 'expo-router';
import { Coins, CreditCard, Info } from 'lucide-react-native';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const iconsParams = {
    color: 'white',
    size: 25,
};

const links: NavigationLink[] = [
    {
        title: 'Банковские карты',
        path: '../settings/bankCards',
        icon: <CreditCard {...iconsParams} />,
    },
    {
        title: 'Кешбек',
        path: '../settings/cashback',
        icon: <Coins {...iconsParams} />,
    },
    {
        title: 'О приложении',
        path: '../settings/about',
        icon: <Info {...iconsParams} />,
    },
];

export default function SettingsScreen() {
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 pt-4">
                <Donation />

                <Box className="rounded-3xl overflow-hidden bg-neutral-700">
                    <FlatList
                        data={links}
                        ItemSeparatorComponent={() => <View className="h-[2px] bg-neutral-900" />}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => router.navigate(item.path)} className="flex-row gap-4 p-5">
                                {item.icon}

                                <Text className="text-white" size="xl">
                                    {item.title}
                                </Text>
                            </Pressable>
                        )}
                    />
                </Box>
            </View>
        </SafeAreaView>
    );
}
