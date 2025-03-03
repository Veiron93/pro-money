import { router } from 'expo-router';
import { Archive } from 'lucide-react-native';
import { Pressable } from 'react-native';

export const ArchiveLink = () => (
    <Pressable
        onPress={() => router.push('/debts/archive')}
        className="bg-neutral-700 w-[46px] h-[46px] rounded-full flex flex-none items-center justify-center"
    >
        <Archive size={18} color="#fff" />
    </Pressable>
);
