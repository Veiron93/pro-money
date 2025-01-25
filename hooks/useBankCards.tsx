import type { BankCardFormData } from '@customTypes/bankCard';
import { BANK_CARDS_QUERY_KEYS } from '@keys/queryKeys';
import { bankCardManager } from '@managers/bankCardManager';
import { bankCardRepository } from '@repositories/bankCardRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useBankCards = () => {
    const queryClient = useQueryClient();

    const mutations = {
        deleteBankCard: useMutation({
            mutationFn: bankCardManager.deleteBankCard,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
            },
        }),
        addBankCard: useMutation({
            mutationFn: bankCardManager.addBankCard,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
            },
        }),
        updateBankCard: useMutation({
            mutationFn: bankCardManager.updateBankCard,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
            },
        }),
    };

    const isPending = {
        delete: mutations.deleteBankCard.isPending,
        add: mutations.addBankCard.isPending,
        update: mutations.updateBankCard.isPending,
    };

    const handleAsyncOperation = async <T,>(operation: Promise<T>): Promise<T | void> => {
        try {
            return await operation;
        } catch (e) {
            console.log(e);
        }
    };

    const bankCardsQuery = useQuery({
        queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS],
        queryFn: () => bankCardRepository.getAll(),
    });

    const addBankCard = (formData: BankCardFormData) =>
        handleAsyncOperation(mutations.addBankCard.mutateAsync(formData));

    const deleteBankCard = (id: string) => handleAsyncOperation(mutations.deleteBankCard.mutateAsync(id));

    const editBankCard = async (cardId: string, formData: BankCardFormData) => {
        const item = await handleAsyncOperation(bankCardManager.enrichBankCardWithUpdates(cardId, formData));

        if (!item) {
            return;
        }

        return await handleAsyncOperation(mutations.updateBankCard.mutateAsync(item));
    };

    return {
        bankCardsQuery,
        deleteBankCard,
        addBankCard,
        editBankCard,
        isPending,
    };
};
