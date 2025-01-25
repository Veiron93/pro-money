import type { BankCardFormData } from '@customTypes/bankCard';
import { BANK_CARDS_QUERY_KEYS, CASHBACK_QUERY_KEYS } from '@keys/queryKeys';
import { bankCardManager } from '@managers/bankCardManager';
import { bankCardRepository } from '@repositories/bankCardRepository';
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
                queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
            },
        }),
        update: useMutation({
            mutationFn: bankCardManager.updateBankCard,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
            },
        }),
    };

    const isPending = {
        delete: mutations.delete.isPending,
        add: mutations.add.isPending,
        update: mutations.update.isPending,
    };

    const bankCardsQuery = useQuery({
        queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS],
        queryFn: () => bankCardRepository.getAll(),
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
        bankCardsQuery,
        deleteCashback,
        addCashback,
        editCashback,
    };
};
