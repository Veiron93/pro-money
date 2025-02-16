import { HStack } from '@/components/ui/hstack';
import { useRouter } from 'expo-router';
import { CreditCard } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 pt-[20px]">
                <Pressable onPress={() => router.navigate('/settings/bankCards')}>
                    <HStack space="md" className="items-center bg-neutral-800 p-4 rounded-full">
                        <CreditCard size={24} color="#fff" />
                        <Text className="text-white">Карты</Text>
                    </HStack>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
