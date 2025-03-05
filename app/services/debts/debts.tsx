import { ActiveDebtsList } from '@components/pages/debts/ActiveDebtsList/ActiveDebtsList';
import { ArchiveLink } from '@components/pages/debts/ArchiveLink';
import { ToggleDebtor } from '@components/pages/debts/ToggleDebtor';
import { TotalDebt } from '@components/pages/debts/TotalDebt';
import { Fab } from '@components/shared/Fab';
import { HStack } from '@components/ui/hstack';
import { DEBT_QUERY_KEYS } from '@constants/queryKeys';
import type { DebtorType } from '@customTypes/debts';
import { useDebts } from '@hooks/useDebts';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router, useFocusEffect } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Debts() {
    const queryClient = useQueryClient();

    const { activeDebtsGroupedQuery } = useDebts();

    const [activeDebtorType, setActiveDebtorType] = useState<DebtorType>('i');

    const { data: debtsGrouped = { i: [], me: [] } } = activeDebtsGroupedQuery;

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: [DEBT_QUERY_KEYS.ACTIVE_DEBTS] });
        }, [queryClient]),
    );

    return (
        <SafeAreaView className="flex-1 gap-5 mb-[-12px]">
            <Stack.Screen options={{ title: 'Долги' }} />

            <HStack className="justify-between items-center gap-3 flex-none">
                <ToggleDebtor debtsTypeActive={activeDebtorType} onPress={setActiveDebtorType} className="flex-1" />
                <ArchiveLink />
            </HStack>

            <TotalDebt debts={debtsGrouped} debtsTypeActive={activeDebtorType} />

            {Object.entries(debtsGrouped).map(([debtorType, debts]) => {
                return (
                    <ActiveDebtsList
                        key={debtorType}
                        debts={debts}
                        className={`${activeDebtorType === debtorType ? 'flex' : 'hidden'}`}
                    />
                );
            })}

            <Fab onPress={() => router.push('/services/debts/addDebt')} label="Добавить долг" icon={Plus} />
        </SafeAreaView>
    );
}
