import { useDebts } from '@/hooks/useDebts';
import { ActionsButtons } from '@components/pages/debts/ArchiveDebtsList/ActionsButtons';
import { DebtListItem } from '@components/pages/debts/DebtListItem';
import { Box } from '@components/ui/box';
import type { Debt } from '@customTypes/debts';
import { DEBT_QUERY_KEYS } from '@keys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { FlatList } from 'react-native';

interface ArchiveDebtsListProps {
    debts: Debt[];
    className?: string;
}

export const ArchiveDebtsList: FC<ArchiveDebtsListProps> = ({ debts, className }) => {
    const queryClient = useQueryClient();

    const { restoreDebt, deleteDebt } = useDebts();

    const handleDeleteDebt = async (id: string) => {
        return deleteDebt(id).then(() => {
            queryClient.invalidateQueries({ queryKey: [DEBT_QUERY_KEYS.ARCHIVE_DEBTS] });
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
                    <ActionsButtons id={item.id} onRestoreDebt={restoreDebt} onDeleteDebt={handleDeleteDebt} />
                </DebtListItem>
            )}
        />
    );
};
