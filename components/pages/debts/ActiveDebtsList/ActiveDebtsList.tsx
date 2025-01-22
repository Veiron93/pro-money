import { ActionsButtons } from '@components/pages/debts/ActiveDebtsList/ActionsButtons';
import { DebtListItem } from '@components/pages/debts/DebtListItem';
import { Box } from '@components/ui/box';
import type { Debt } from '@customTypes/debts';
import { FC } from 'react';
import { FlatList } from 'react-native';

interface ActiveDebtsListProps {
    debts: Debt[];
    className?: string;
    handleCompleteDebt: (id: string) => void;
    handleDeleteDebt: (id: string) => void;
}

export const ActiveDebtsList: FC<ActiveDebtsListProps> = ({
    debts,
    className,
    handleCompleteDebt,
    handleDeleteDebt,
}) => {
    return (
        <FlatList
            ItemSeparatorComponent={() => <Box className="h-4" />}
            contentContainerStyle={{ paddingBottom: 90 }}
            className={`h-full ${className}`}
            data={debts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <DebtListItem data={item}>
                    <ActionsButtons
                        id={item.id}
                        handleCompleteDebt={handleCompleteDebt}
                        handleDeleteDebt={handleDeleteDebt}
                    />
                </DebtListItem>
            )}
        />
    );
};
