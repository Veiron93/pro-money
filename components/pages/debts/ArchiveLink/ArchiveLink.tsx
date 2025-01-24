import { router } from 'expo-router';
import { Archive } from 'lucide-react-native';
import { Pressable } from 'react-native';

export const ArchiveLink = () => (
    <Pressable
        onPress={() => router.push('/debts/archive')}
        className="bg-neutral-800 w-[58px] h-[58px] rounded-full flex flex-none items-center justify-center"
    >
        <Archive size={22} color="#fff" />
    </Pressable>
);
