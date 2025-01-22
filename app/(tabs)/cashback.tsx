import { BankCardItem } from '@/components/pages/bankCards/BankCardItem';
import { CashbackCard } from '@/components/pages/cashback/CashbackCard';
import { EmptyBankCardState } from '@/components/pages/cashback/EmptyBankCardState';
import { ActionSheet, ActionSheetRef } from '@/components/shared/ActionSheet';
import { Fab } from '@/components/shared/Fab';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { getBankCards } from '@/services/bankCardService';
import { getCashback } from '@/services/cashbackService';
import { CashbackCategories } from '@/storage/cashbackCategories';
import type { BankCard } from '@/types/bankCard';
import type { CashbackItem, CashbackItemStorage } from '@/types/cashback';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Percent } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { FlatList as FlatListSheet } from 'react-native-actions-sheet';

export default function CashbackScreen() {
    const router = useRouter();

    const [bankCards, setBankCards] = useState<BankCard[]>([]);
    const [cashback, setCashback] = useState<CashbackItem[]>([]);
    const [loadingBankCards, setLoadingBankCards] = useState(false);

    const editCashbackSheetRef = useRef<ActionSheetRef>(null);

    const getMatchedCashbackItems = (cashbackItemsStorage: CashbackItemStorage[], cards: BankCard[]) => {
        return cashbackItemsStorage.filter((item) => cards.find((card: BankCard) => card.id === item.id));
    };

    const getMatchedCashbackCategories = (cashbackItem: CashbackItemStorage) => {
        return cashbackItem.cashbackCategories
            .map((cashbackCategory) => {
                const category = CashbackCategories.find((cashback) => cashback.code === cashbackCategory.code);

                if (!category) return;

                return {
                    ...category,
                    precent: cashbackCategory.precent,
                };
            })
            .filter(Boolean);
    };

    const initCashbackList = async (cards: BankCard[]) => {
        const cashbackItemsStorage = await getCashback();

        if (!cashbackItemsStorage) return;

        const matchedCashbackItems = getMatchedCashbackItems(cashbackItemsStorage, cards);

        const cashbackItems = matchedCashbackItems
            .map((item) => {
                const cashbackItem = cashbackItemsStorage.find((cashback) => cashback.id === item.id);

                if (!cashbackItem) return;

                const cashbackCategories = getMatchedCashbackCategories(cashbackItem);

                const card = cards.find((card: BankCard) => card.id === item.id);

                if (!card) return;

                return {
                    card,
                    cashbackCategories,
                };
            })
            .filter(Boolean) as CashbackItem[];

        setCashback(cashbackItems);
    };

    const handleSelectCard = (id: string) => {
        router.push(`/cashback/${id}`);
        editCashbackSheetRef.current?.hide();
    };

    const loadData = async () => {
        try {
            setLoadingBankCards(true);

            const cards = await getBankCards();

            if (cards.length > 0) {
                setBankCards(cards);
                await initCashbackList(cards);
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoadingBankCards(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, []),
    );

    return (
        <Box className="pt-4 flex-1">
            {loadingBankCards && <Spinner size="large" color="#166534" className="mt-5" />}

            {!loadingBankCards && !bankCards && <EmptyBankCardState />}

            {cashback.length > 0 && (
                <FlatList
                    data={cashback}
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

            {bankCards && (
                <Fab label="Изменить кешбек" icon={Percent} onPress={() => editCashbackSheetRef.current?.show()} />
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
