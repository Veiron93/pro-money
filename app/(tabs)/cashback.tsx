import { BankCardItem } from '@components/pages/bankCards/BankCardItem';
import { CashbackCard } from '@components/pages/cashback/CashbackCard';
import { EmptyBankCardState } from '@components/pages/cashback/EmptyBankCardState';
import { ActionSheet, ActionSheetRef } from '@components/shared/ActionSheet';
import { Fab } from '@components/shared/Fab';
import { Spinner } from '@components/shared/Spinner';
import { Box } from '@components/ui/box';
import { BANK_CARDS_QUERY_KEYS } from '@constants/queryKeys';
import { useBankCards } from '@hooks/useBankCards';
import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Percent } from 'lucide-react-native';
import { useCallback, useRef } from 'react';
import { FlatList, Pressable } from 'react-native';
import { FlatList as FlatListSheet } from 'react-native-actions-sheet';

export default function CashbackScreen() {
    const queryClient = useQueryClient();

    const { bankCardsQuery, getBankCardsWithCashback } = useBankCards();

    const editCashbackSheetRef = useRef<ActionSheetRef>(null);

    const { data: bankCards = [], isLoading: isBankCardsLoading } = bankCardsQuery;

    const bankCardsWithCashback = getBankCardsWithCashback();

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

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
        }, [queryClient]),
    );

    return (
        <Box className="pt-4 flex-1">
            {isBankCardsLoading && <Spinner />}

            {!isBankCardsLoading && bankCards.length === 0 && <EmptyBankCardState />}

            {!isBankCardsLoading && bankCards.length > 0 && (
                <Fab label="Изменить кешбек" icon={Percent} onPress={openEditCashbackSheet} />
            )}

            {bankCardsWithCashback.length > 0 && (
                <FlatList
                    data={bankCardsWithCashback}
                    ItemSeparatorComponent={() => <Box className="h-4" />}
                    contentContainerStyle={{ padding: 0 }}
                    keyExtractor={(item) => item.bankCard.id}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleSelectCard(item.bankCard.id)}>
                            <CashbackCard data={item} />
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
