import { ArchiveDebtsList } from '@components/pages/debts/ArchiveDebtsList';
import { ToggleDebtor } from '@components/pages/debts/ToggleDebtor';
import { DebtorType } from '@customTypes/debts';
import { useDebts } from '@hooks/useDebts';
import { DEBT_QUERY_KEYS } from '@keys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

export default function Archive() {
    const queryClient = useQueryClient();

    const { debtsArchiveQuery } = useDebts();

    const [activeDebtorType, setActiveDebtorType] = useState<DebtorType>('i');

    const { data: debtsArchiveGrouped = { i: [], me: [] } } = debtsArchiveQuery;

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: [DEBT_QUERY_KEYS.ARCHIVE_DEBTS] });
        }, [queryClient]),
    );

    return (
        <View className="flex-1">
            <Stack.Screen options={{ title: 'Архив' }} />

            <ToggleDebtor debtsTypeActive={activeDebtorType} onPress={setActiveDebtorType} />

            {Object.entries(debtsArchiveGrouped).map(([debtorType, debts]) => {
                return (
                    <ArchiveDebtsList
                        key={debtorType}
                        debts={debts}
                        className={`${activeDebtorType === debtorType ? 'flex' : 'hidden'} mt-5`}
                    />
                );
            })}
        </View>
    );
}
