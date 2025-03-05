import { ActionsButtons } from '@components/pages/debts/ActiveDebtsList/ActionsButtons';
import { DebtListItem } from '@components/pages/debts/DebtListItem';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { LEVELS, LEVEL_COLORS, LEVEL_ICONS } from '@constants/levels';
import type { Debt } from '@customTypes/debts';
import { useDebts } from '@hooks/useDebts';
import { DEBT_QUERY_KEYS } from '@keys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { FlatList, View } from 'react-native';

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

    const Level = ({ level }: { level: LEVELS }) => {
        const Icon = level ? LEVEL_ICONS[level] : null;
        const color = level ? LEVEL_COLORS[level] : '#a3a3a3';

        return (
            <HStack
                space="xs"
                style={{ borderColor: color }}
                className="w-[96px] rounded-full py-1 px-2 ml-auto border items-center justify-center flex-none border-dashed"
            >
                {Icon && <Icon size={14} color={color} />}

                <Text size="sm" style={{ color }}>
                    {level}
                </Text>
            </HStack>
        );
    };

    return (
        <FlatList
            ItemSeparatorComponent={() => <View className="h-4" />}
            contentContainerStyle={{ paddingBottom: 90 }}
            className={`h-full ${className}`}
            data={debts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <DebtListItem data={item}>
                    <ActionsButtons id={item.id} onCompleteDebt={completeDebt} onDeleteDebt={handleDeleteDebt} />
                    <Level level={item.level} />
                </DebtListItem>
            )}
        />
    );
};
