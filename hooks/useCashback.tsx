import type { BankCardFormData } from '@customTypes/bankCard';
import { CASHBACK_QUERY_KEYS } from '@keys/queryKeys';
import { bankCardManager } from '@managers/bankCardManager';
import { cashbackRepository } from '@repositories/cashbackRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAsyncOperation } from '@utils/handleAsyncOperation';

export const useCashback = () => {
    const queryClient = useQueryClient();

    const mutations = {
        delete: useMutation({
            mutationFn: bankCardManager.deleteBankCard,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CASHBACK_QUERY_KEYS.CASHBACK] });
            },
        }),
        add: useMutation({
            mutationFn: bankCardManager.addBankCard,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CASHBACK_QUERY_KEYS.CASHBACK] });
            },
        }),
        update: useMutation({
            mutationFn: bankCardManager.updateBankCard,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CASHBACK_QUERY_KEYS.CASHBACK] });
            },
        }),
    };

    const isPending = {
        delete: mutations.delete.isPending,
        add: mutations.add.isPending,
        update: mutations.update.isPending,
    };

    const cashbackQuery = useQuery({
        queryKey: [CASHBACK_QUERY_KEYS.CASHBACK],
        queryFn: () => cashbackRepository.getAll(),
    });

    const addCashback = (formData: BankCardFormData) => handleAsyncOperation(mutations.add.mutateAsync(formData));

    const deleteCashback = (id: string) => handleAsyncOperation(mutations.delete.mutateAsync(id));

    const editCashback = async (cardId: string, formData: BankCardFormData) => {
        const item = await handleAsyncOperation(bankCardManager.enrichBankCardWithUpdates(cardId, formData));

        if (!item) {
            return;
        }

        return await handleAsyncOperation(mutations.update.mutateAsync(item));
    };

    return {
        isPending,
        cashbackQuery,
        deleteCashback,
        addCashback,
        editCashback,
    };
};
