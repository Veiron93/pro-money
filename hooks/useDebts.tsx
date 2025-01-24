import { debtRepository } from '@/repositories/debtRepository';
import type { Debt, DebtFormData, DebtsGrouped } from '@customTypes/debts';
import { DEBT_QUERY_KEYS } from '@keys/queryKeys';
import { debtManager } from '@managers/debtManager';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useDebts = () => {
    const queryClient = useQueryClient();

    const mutations = {
        completeDebt: useMutation({
            mutationFn: debtManager.completeDebt,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [DEBT_QUERY_KEYS.ACTIVE_DEBTS] });
            },
        }),
        restoreDebt: useMutation({
            mutationFn: debtManager.restoreDebt,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [DEBT_QUERY_KEYS.ARCHIVE_DEBTS] });
            },
        }),
        deleteDebt: useMutation({
            mutationFn: debtManager.deleteDebt,
        }),
        addDebt: useMutation({
            mutationFn: debtManager.addDebt,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [DEBT_QUERY_KEYS.ACTIVE_DEBTS] });
            },
        }),
        updateDebt: useMutation({
            mutationFn: debtManager.updateDebt,
            onSuccess: () => {
                const keysToInvalidate = [DEBT_QUERY_KEYS.ACTIVE_DEBTS, DEBT_QUERY_KEYS.ARCHIVE_DEBTS];

                keysToInvalidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
            },
        }),
    };

    const handleAsyncOperation = async <T,>(operation: Promise<T>): Promise<T | void> => {
        try {
            return await operation;
        } catch (e) {
            console.log(e);
        }
    };

    const getDebts = async (): Promise<Debt[]> => {
        return await debtRepository.getAll();
    };

    const getDebtsGrouped = async (completed: boolean): Promise<DebtsGrouped> => {
        const debts = await getDebts();
        const initialValue: DebtsGrouped = { i: [], me: [] };

        if (!debts?.length) {
            return initialValue;
        }

        return debts
            .filter((debt) => debt.isCompleted === completed)
            .reduce<DebtsGrouped>((acc, debt) => {
                acc[debt.debtorType].push(debt);
                return acc;
            }, initialValue);
    };

    // Возвращает активные долги
    const activeDebtsGroupedQuery = useQuery({
        queryKey: [DEBT_QUERY_KEYS.ACTIVE_DEBTS],
        queryFn: async () => {
            return getDebtsGrouped(false);
        },
    });

    // Возвращает архивные долги
    const debtsArchiveQuery = useQuery({
        queryKey: [DEBT_QUERY_KEYS.ARCHIVE_DEBTS],
        queryFn: async () => {
            return getDebtsGrouped(true);
        },
    });

    const addDebt = (formData: DebtFormData) => handleAsyncOperation(mutations.addDebt.mutateAsync(formData));

    const completeDebt = (id: string) => handleAsyncOperation(mutations.completeDebt.mutateAsync(id));

    const restoreDebt = (id: string) => handleAsyncOperation(mutations.restoreDebt.mutateAsync(id));

    const deleteDebt = (id: string) => handleAsyncOperation(mutations.deleteDebt.mutateAsync(id));

    const editDebt = async (debtId: string, formData: DebtFormData) => {
        const updatedDebt = await handleAsyncOperation(debtManager.enrichDebtWithUpdates(debtId, formData));

        if (!updatedDebt) {
            return;
        }

        return await handleAsyncOperation(mutations.updateDebt.mutateAsync(updatedDebt));
    };

    return {
        activeDebtsGroupedQuery,
        debtsArchiveQuery,
        completeDebt,
        deleteDebt,
        restoreDebt,
        addDebt,
        editDebt,
    };
};
