import { Donation } from '@components/pages/settings/Donation';
import { Text } from '@components/ui/text';
import { Link, RelativePathString, router } from 'expo-router';
import { CreditCard, Info } from 'lucide-react-native';
import { ReactElement } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

const iconsParams = {
    color: 'white',
    size: 28,
};

interface Link {
    title: string;
    path: RelativePathString;
    icon: ReactElement<SvgProps>;
}

const links: Link[] = [
    {
        title: 'Банковские карты',
        path: '../settings/bankCards',
        icon: <CreditCard {...iconsParams} />,
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

                <FlatList
                    data={links}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.push(item.path)}
                            className="flex-row gap-3 rounded-full bg-neutral-800 mb-3 py-4 px-5"
                        >
                            {item.icon}
                            <Text className="text-white" size="xl">
                                {item.title}
                            </Text>
                        </Pressable>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}
