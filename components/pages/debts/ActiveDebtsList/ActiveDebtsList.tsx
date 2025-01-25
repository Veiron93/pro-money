import { ActionsButtons } from '@components/pages/debts/ActiveDebtsList/ActionsButtons';
import { DebtListItem } from '@components/pages/debts/DebtListItem';
import { Box } from '@components/ui/box';
import type { Debt } from '@customTypes/debts';
import { useDebts } from '@hooks/useDebts';
import { DEBT_QUERY_KEYS } from '@keys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { FlatList } from 'react-native';

interface ActiveDebtsListProps {
    debts: Debt[];
    className?: string;
}

export const ActiveDebtsList = ({ debts, className }: ActiveDebtsListProps) => {
    const queryClient = useQueryClient();

    const { completeDebt, deleteDebt } = useDebts();

    const handleDeleteDebt = async (id: string) => {
        return deleteDebt(id).then(() => {
            queryClient.invalidateQueries({ queryKey: [DEBT_QUERY_KEYS.ACTIVE_DEBTS] });
        });
    };

    return (
        <FlatList
            ItemSeparatorComponent={() => <Box className="h-4" />}
            contentContainerStyle={{ paddingBottom: 90 }}
            className={`h-full ${className}`}
            data={debts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <DebtListItem data={item}>
                    <ActionsButtons id={item.id} onCompleteDebt={completeDebt} onDeleteDebt={handleDeleteDebt} />
                </DebtListItem>
            )}
        />
    );
};
