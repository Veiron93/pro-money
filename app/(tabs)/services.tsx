import { useRouter } from 'expo-router';
import { ArrowRightLeft, Coins } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ServicesScreen() {
    const router = useRouter();

    const services = [
        {
            icon: <Coins size={24} color="#fff" />,
            title: 'Кешбек',
            onPress: () => router.navigate('../services/cashback'),
        },
        {
            icon: <ArrowRightLeft size={24} color="#fff" />,
            title: 'Долги',
            onPress: () => router.navigate('../services/debts'),
        },
    ];

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="mt-4 grid grid-cols-2 gap-4">
                    {services &&
                        services.map((service) => (
                            <Pressable
                                onPress={service.onPress}
                                className="items-center flex-row gap-2 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-800 p-4 rounded-full"
                            >
                                {service.icon}
                                <Text className="text-white">{service.title}</Text>
                            </Pressable>
                        ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
