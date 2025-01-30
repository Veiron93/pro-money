import type { BankCardFormData, BankCardWithCashback } from '@customTypes/bankCard';
import type { CashbackCategory, CashbackCategoryData } from '@customTypes/cashback';
import { BANK_CARDS_QUERY_KEYS } from '@keys/queryKeys';
import { bankCardManager } from '@managers/bankCardManager';
import { bankCardRepository } from '@repositories/bankCardRepository';
import { CashbackCategories } from '@storage/cashbackCategories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAsyncOperation } from '@utils/handleAsyncOperation';

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

    const bankCardsQuery = useQuery({
        queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS],
        queryFn: () => bankCardRepository.getAll(),
    });

    const getBankCard = (id: string) =>
        useQuery({
            queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD, id],
            queryFn: () => bankCardRepository.getById(id),
            enabled: !!id,
        });

    const getCashbackCategoriesMap = () => {
        return new Map(CashbackCategories.map((category) => [category.code, category]));
    };

    const getBankCardsWithCashback = (): BankCardWithCashback[] => {
        const bankCards = bankCardsQuery.data;

        if (!bankCards?.length) {
            return [];
        }

        const cashbackCategoriesMap = getCashbackCategoriesMap();

        return bankCards
            .filter((bankCard) => bankCard.cashbackCategories?.length)
            .map((bankCard) => ({
                bankCard,
                cashbackCategories: bankCard.cashbackCategories?.map(({ code, percent }) => ({
                    ...cashbackCategoriesMap.get(code),
                    percent,
                })),
            })) as BankCardWithCashback[];
    };

    const getBankCardWithCashback = (id: string): BankCardWithCashback | undefined => {
        const bankCardItem = getBankCard(id).data;

        if (!bankCardItem) return;

        const cashbackCategoriesMap = getCashbackCategoriesMap();

        if (!bankCardItem.cashbackCategories?.length) {
            return { bankCard: bankCardItem, cashbackCategories: [] };
        }

        const cashbackCategories = bankCardItem.cashbackCategories.reduce<CashbackCategory[]>(
            (acc, { code, percent }) => {
                const categoryData = cashbackCategoriesMap.get(code);

                if (categoryData) {
                    acc.push({
                        code,
                        percent,
                        name: categoryData.name,
                        icon: categoryData.icon,
                    });
                }
                return acc;
            },
            [],
        );

        return { bankCard: bankCardItem, cashbackCategories };
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
        bankCardsQuery,
        deleteBankCard,
        addBankCard,
        editBankCard,
        getBankCard,
        getBankCardsWithCashback,
        getBankCardWithCashback,
        getCashbackCategoriesMap,
        updateCashbackCategoriesBankCard,
    };
};
