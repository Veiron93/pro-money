import { BankCardItem } from '@components/pages/bankCards/BankCardItem';
import { CashbackCard } from '@components/pages/cashback/CashbackCard';
import { EmptyBankCardState } from '@components/pages/cashback/EmptyBankCardState';
import { ActionSheet } from '@components/shared/ActionSheet';
import { Fab } from '@components/shared/Fab';
import { Spinner } from '@components/shared/Spinner';
import { BANK_CARDS_QUERY_KEYS } from '@constants/queryKeys';
import { useBankCards } from '@hooks/useBankCards';
import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Percent } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CashbackScreen() {
    const queryClient = useQueryClient();

    const { bankCardsQuery, bankCardsWithCashbackQuery } = useBankCards();

    const [isModalVisibleEditCashback, setIsModalVisibleEditCashback] = useState(false);

    const { data: bankCards = [], isLoading: isBankCardsLoading } = bankCardsQuery;
    const { data: bankCardsWithCashback = [], isLoading: isBankCardsWithCashbackLoading } = bankCardsWithCashbackQuery;

    const openEditCashbackModal = () => {
        setIsModalVisibleEditCashback(true);
    };

    const closeEditCashbackModal = () => {
        setIsModalVisibleEditCashback(false);
    };

    const handleSelectCard = (id: string) => {
        router.push(`/cashback/${id}`);
        closeEditCashbackModal();
    };

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS_WITH_CASHBACK] });
        }, [queryClient]),
    );

    return (
        <SafeAreaView className="flex-1 gap-5 mt-4 mb-[-12px]">
            {isBankCardsLoading && <Spinner />}

            {!isBankCardsLoading && bankCards.length === 0 && <EmptyBankCardState />}

            {!isBankCardsLoading && bankCards.length > 0 && (
                <Fab label="Изменить кешбек" icon={Percent} onPress={openEditCashbackModal} />
            )}

            {!isBankCardsWithCashbackLoading && bankCardsWithCashback.length > 0 && (
                <FlatList
                    data={bankCardsWithCashback}
                    ItemSeparatorComponent={() => <View className="h-4" />}
                    contentContainerStyle={{ padding: 0, paddingBottom: 90 }}
                    keyExtractor={(item) => item.bankCard.id}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleSelectCard(item.bankCard.id)}>
                            <CashbackCard {...item} />
                        </Pressable>
                    )}
                />
            )}

            <ActionSheet title="Выберите карту" visible={isModalVisibleEditCashback} onClose={closeEditCashbackModal}>
                {bankCards.length > 0 && (
                    <FlatList
                        style={{ marginBottom: -20, paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View className="h-4" />}
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
        </SafeAreaView>
    );
}
