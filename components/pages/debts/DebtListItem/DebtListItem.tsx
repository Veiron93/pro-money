import { GradientContainer } from '@components/shared/GradientContainer';
import { HStack } from '@components/ui/hstack';
import { Debt } from '@customTypes/debts';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable } from 'react-native';

import { DebtCard } from '../DebtCard';

interface DebtListItemProps {
    children: ReactNode;
    data: Debt;
}

export const DebtListItem = ({ children, data }: DebtListItemProps) => {
    const handleSelectDebt = (id: string) => {
        router.push(`/services/debts/${id}`);
    };

    return (
        <GradientContainer className="p-[0]">
            <Pressable onPress={() => handleSelectDebt(data.id)} className="w-full flex-1 p-[14px]">
                <DebtCard data={data} />
            </Pressable>

            <HStack className="items-center bg-neutral-800 rounded-3xl p-3" space="md">
                {children}
            </HStack>
        </GradientContainer>
    );
};
