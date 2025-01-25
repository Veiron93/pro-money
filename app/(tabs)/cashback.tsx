import { BankCardItem } from '@components/pages/bankCards/BankCardItem';
import { CashbackCard } from '@components/pages/cashback/CashbackCard';
import { EmptyBankCardState } from '@components/pages/cashback/EmptyBankCardState';
import { ActionSheet, ActionSheetRef } from '@components/shared/ActionSheet';
import { Fab } from '@components/shared/Fab';
import { Spinner } from '@components/shared/Spinner';
import { Box } from '@components/ui/box';
import { BANK_CARDS_QUERY_KEYS, CASHBACK_QUERY_KEYS } from '@constants/queryKeys';
import type { CashbackItem } from '@customTypes/cashback';
import { useBankCards } from '@hooks/useBankCards';
import { useCashback } from '@hooks/useCashback';
import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { getMatchedCashbackCategories } from '@utils/getMatchedCashbackCategories';
import { getMatchedCashbackItems } from '@utils/getMatchedCashbackItems';
import { router } from 'expo-router';
import { Percent } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { FlatList as FlatListSheet } from 'react-native-actions-sheet';

export default function CashbackScreen() {
    const queryClient = useQueryClient();

    const { cashbackQuery, isPending } = useCashback();
    const { bankCardsQuery } = useBankCards();

    const editCashbackSheetRef = useRef<ActionSheetRef>(null);

    const { data: bankCards = [] } = bankCardsQuery;
    const { data: cashback = [] } = cashbackQuery;

    const [isLoading, setIsLoading] = useState(true);
    const [cashbackItems, setCashbackItems] = useState<CashbackItem[]>([]);

    const initCashbackList = async () => {
        try {
            setIsLoading(true);

            const matchedCashbackItems = getMatchedCashbackItems(cashback, bankCards);

            if (!matchedCashbackItems.length) {
                setCashbackItems([]);
                return;
            }

            const cashbackMap = new Map(cashback.map((item) => [item.id, item]));
            const bankCardsMap = new Map(bankCards.map((card) => [card.id, card]));

            const cashbackItems = matchedCashbackItems
                .map((item) => {
                    const cashbackItem = cashbackMap.get(item.id);
                    if (!cashbackItem) return null;

                    const cashbackCategories = getMatchedCashbackCategories(cashbackItem);
                    const card = bankCardsMap.get(item.id);

                    if (!card) return null;

                    return {
                        card,
                        cashbackCategories,
                    } satisfies CashbackItem;
                })
                .filter((item): item is CashbackItem => item !== null);

            setCashbackItems(cashbackItems);
        } catch (error) {
            console.error('Ошибка при инициализации списка кэшбэка:', error);
            setCashbackItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    const openEditCashbackSheet = () => {
        editCashbackSheetRef.current?.show();
    };

    const closeEditCashbackSheet = () => {
        editCashbackSheetRef.current?.hide();
    };

    const handleSelectCard = (id: string) => {
        router.push(`/cashback/${id}`);
        closeEditCashbackSheet();
    };

    useEffect(() => {
        if (bankCards && cashback) {
            initCashbackList();
        }
    }, [bankCards, cashback]);

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: [CASHBACK_QUERY_KEYS.CASHBACK] });
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
        }, [queryClient]),
    );

    return (
        <Box className="pt-4 flex-1">
            {isLoading && <Spinner />}
            {!isLoading && !bankCards.length && <EmptyBankCardState />}

            {!isLoading && bankCards.length && (
                <Fab label="Изменить кешбек" icon={Percent} onPress={openEditCashbackSheet} />
            )}

            {cashback.length && (
                <FlatList
                    data={cashbackItems}
                    ItemSeparatorComponent={() => <Box className="h-4" />}
                    contentContainerStyle={{ padding: 0 }}
                    keyExtractor={(item) => item.card.id}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleSelectCard(item.card.id)}>
                            <CashbackCard {...item} />
                        </Pressable>
                    )}
                />
            )}

            <ActionSheet ref={editCashbackSheetRef}>
                {bankCards && (
                    <FlatListSheet
                        style={{ height: 450 }}
                        ItemSeparatorComponent={() => <Box className="h-4" />}
                        data={bankCards}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleSelectCard(item.id)}>
                                <BankCardItem data={item} />
                            </Pressable>
                        )}
                    />
                )}
            </ActionSheet>
        </Box>
    );
}
