import { Toggle } from '@components/shared/Toggle';
import { HStack } from '@components/ui/hstack';
import type { DebtorType } from '@customTypes/debts';
import { useRouter } from 'expo-router';
import { Archive } from 'lucide-react-native';
import { FC } from 'react';
import { Pressable } from 'react-native';

interface ToggleDebtorProps {
    debtsTypeActive: DebtorType;
    onPress: (value: DebtorType) => void;
}

export const ToggleDebtor: FC<ToggleDebtorProps> = ({ debtsTypeActive, onPress }) => {
    const router = useRouter();

    const items = [
        { title: 'Я должен', value: 'i' },
        { title: 'Мне должны', value: 'me' },
    ];

    return (
        <HStack className="justify-between items-center gap-3">
            <Toggle active={debtsTypeActive} setActive={(value) => onPress(value as DebtorType)} items={items} />

            <Pressable
                onPress={() => router.push('/debts/archive')}
                className="bg-neutral-800 w-[58px] h-[58px] rounded-full flex flex-none items-center justify-center"
            >
                <Archive size={22} color="#fff" />
            </Pressable>
        </HStack>
    );
};
