import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Debt } from '@/types/debts';
import { router } from 'expo-router';
import { FC, ReactNode } from 'react';
import { Pressable } from 'react-native';

import { DebtCard } from '../DebtCard';

interface DebtListItemProps {
    children: ReactNode;
    data: Debt;
}

export const DebtListItem: FC<DebtListItemProps> = ({ children, data }) => {
    const handleSelectDebt = (id: string) => {
        router.push(`/debts/${id}`);
    };

    return (
        <VStack className="w-full bg-neutral-800 rounded-3xl">
            <Pressable onPress={() => handleSelectDebt(data.id)} className="w-full flex-1">
                <DebtCard data={data} />
            </Pressable>

            <HStack className="p-2 items-center" space="md">
                {children}
            </HStack>
        </VStack>
    );
};
