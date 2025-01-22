import type { DebtsGrouped } from '@customTypes/debts';
import { debtManager } from '@managers/debtManager';
import { getDebts } from '@services/debtService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useDebts = () => {
    const queryClient = useQueryClient();

    const debtsQuery = useQuery({
        queryKey: ['debts'],
        queryFn: async () => {
            const debts = await getDebts();

            if (!debts?.length) {
                return { i: [], me: [] };
            }

            return debts.reduce<DebtsGrouped>(
                (acc, debt) => {
                    if (!debt.isCompleted) {
                        acc[debt.debtorType].push(debt);
                    }
                    return acc;
                },
                { i: [], me: [] },
            );
        },
    });

    const completeMutation = useMutation({
        mutationFn: debtManager.completeDebt,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debts'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: debtManager.deleteDebt,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debts'] });
        },
    });

    const handleCompleteDebt = async (id: string) => {
        try {
            await completeMutation.mutateAsync(id);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteDebt = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
        } catch (e) {
            console.log(e);
        }
    };

    return {
        debtsQuery,
        handleCompleteDebt,
        handleDeleteDebt,
    };
};
