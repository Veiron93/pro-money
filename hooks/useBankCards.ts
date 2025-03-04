import { cashbackCategoriesService } from '@/services/cashbackCategoriesService';
import type { BankCardFormData, BankCardWithCashback } from '@customTypes/bankCard';
import type { CashbackCategoryData, CashbackCategoryWithPercent } from '@customTypes/cashback';
import { BANK_CARDS_QUERY_KEYS } from '@keys/queryKeys';
import { bankCardManager } from '@managers/bankCardManager';
import { bankCardRepository } from '@repositories/bankCardRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAsyncOperation } from '@utils/handleAsyncOperation';

export const useBankCards = () => {
    const queryClient = useQueryClient();

    // Mutations
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

    // Pending
    const isPending = {
        delete: mutations.deleteBankCard.isPending,
        add: mutations.addBankCard.isPending,
        update: mutations.updateBankCard.isPending,
    };

    // Queries
    const bankCardsQuery = useQuery({
        queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS],
        queryFn: () => bankCardRepository.getAll(),
    });

    const bankCardQuery = (id: string) =>
        useQuery({
            queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD, id],
            queryFn: () => bankCardRepository.getById(id),
            enabled: !!id,
        });

    const bankCardsWithCashbackQuery = useQuery({
        queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS_WITH_CASHBACK],
        queryFn: () => getBankCardsWithCashback(),
        enabled: !!bankCardsQuery.data?.length,
    });

    const bankCardWithCashbackQuery = (id: string) =>
        useQuery({
            queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD_WITH_CASHBACK, id],
            queryFn: () => getBankCardWithCashback(id),
            enabled: !!id,
        });

    /**
     * Получает все банковские карты с кешбеком
     * @returns Массив банковских карт с кешбеком
     */
    const getBankCardsWithCashback = async (): Promise<BankCardWithCashback[]> => {
        const bankCards = bankCardsQuery.data;

        if (!bankCards?.length) {
            return [];
        }

        const categoriesMap = await cashbackCategoriesService.getCategoriesMap();

        return bankCards
            .filter((bankCard) => bankCard.cashbackCategories?.length)
            .map((bankCard) => ({
                bankCard,
                cashbackCategories: bankCard.cashbackCategories?.map(({ code, percent }) => {
                    const cashbackCategory = categoriesMap.get(code);

                    return {
                        ...cashbackCategory,
                        percent,
                    };
                }),
            })) as BankCardWithCashback[];
    };

    /**
     * Получает банковскую карту с кешбеком
     * @param id - Идентификатор банковской карты
     * @returns Банковская карта с кешбеком
     */
    const getBankCardWithCashback = async (id: string): Promise<BankCardWithCashback | undefined> => {
        const bankCard = await bankCardRepository.getById(id);

        if (!bankCard) return;

        if (!bankCard.cashbackCategories?.length) {
            return { bankCard, cashbackCategories: [] };
        }

        const categoriesMap = await cashbackCategoriesService.getCategoriesMap();

        const cashbackCategories = bankCard.cashbackCategories.map(({ code, percent }) => {
            const cashbackCategory = categoriesMap.get(code);

            return {
                ...cashbackCategory,
                percent,
            };
        }) as CashbackCategoryWithPercent[];

        return { bankCard, cashbackCategories };
    };

    const updateCashbackCategoriesBankCard = (id: string, cashbackCategories: CashbackCategoryData[]) => {
        return bankCardManager.updateCashbackCategoriesBankCard(id, cashbackCategories);
    };

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
        isPending,
        bankCardQuery,
        bankCardsQuery,
        bankCardsWithCashbackQuery,
        bankCardWithCashbackQuery,
        getBankCardWithCashback,

        deleteBankCard,
        addBankCard,
        editBankCard,
        updateCashbackCategoriesBankCard,
    };
};
