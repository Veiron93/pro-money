import { ActiveDebtsList } from '@components/pages/debts/ActiveDebtsList/ActiveDebtsList';
import { ToggleDebtor } from '@components/pages/debts/ToggleDebtor';
import { TotalDebt } from '@components/pages/debts/TotalDebt';
import { Fab } from '@components/shared/Fab';
import { Box } from '@components/ui/box';
import type { DebtorType } from '@customTypes/debts';
import { useDebts } from '@hooks/useDebts';
import { useQueryClient } from '@tanstack/react-query';
import { router, useFocusEffect } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useCallback, useState } from 'react';

// TODO:
// 1. Устранить прыжки переключателя типа должника из за статистики по суммам

export default function Debts() {
    const queryClient = useQueryClient();

    const { handleCompleteDebt, handleDeleteDebt, debtsQuery } = useDebts();

    const [activeDebtorType, setActiveDebtorType] = useState<DebtorType>('i');

    const { data: debtsGrouped = { i: [], me: [] } } = debtsQuery;

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: ['debts'] });
        }, [queryClient]),
    );

    return (
        <Box className="flex-1 gap-5 pt-4 mb-[-12px]">
            <ToggleDebtor debtsTypeActive={activeDebtorType} onPress={setActiveDebtorType} />

            <TotalDebt debts={debtsGrouped} debtsTypeActive={activeDebtorType} />

            <ActiveDebtsList
                debts={debtsGrouped.i}
                handleCompleteDebt={handleCompleteDebt}
                handleDeleteDebt={handleDeleteDebt}
                className={`${activeDebtorType === 'i' ? 'flex' : 'hidden'}`}
            />

            <ActiveDebtsList
                debts={debtsGrouped.me}
                handleCompleteDebt={handleCompleteDebt}
                handleDeleteDebt={handleDeleteDebt}
                className={`${activeDebtorType === 'me' ? 'flex' : 'hidden'}`}
            />

            <Fab onPress={() => router.push('../debts/addDebt')} label="Добавить долг" icon={Plus} />
        </Box>
    );
}
