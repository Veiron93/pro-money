import { Text } from '@components/ui/text';
import { router } from 'expo-router';
import { CreditCard } from 'lucide-react-native';
import { Pressable } from 'react-native';

export const EmptyBankCardState = () => (
    <Pressable onPress={() => router.push('/settings/bankCards')} className="mt-10 items-center">
        <CreditCard color="#404040" size={100} />
        <Text className="text-neutral-700 text-2xl text-center">Для начала добавьте свои банковские карты</Text>
    </Pressable>
);
