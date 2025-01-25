import { BankCardItem } from '@components/pages/bankCards/BankCardItem';
import { ActionButtons } from '@components/shared/ActionButtons';
import { ActionSheet, ActionSheetRef } from '@components/shared/ActionSheet';
import { Fab } from '@components/shared/Fab';
import { Spinner } from '@components/shared/Spinner';
import { Box } from '@components/ui/box';
import { Heading } from '@components/ui/heading';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { BankCard } from '@customTypes/bankCard';
import { useBankCards } from '@hooks/useBankCards';
import { BANK_CARDS_QUERY_KEYS } from '@keys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router, useFocusEffect } from 'expo-router';
import { Plus, Trash } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';

export default function BankCardsScreen() {
    const queryClient = useQueryClient();

    const { bankCardsQuery, deleteBankCard, isPending } = useBankCards();

    const { data: cards = [], isLoading: isCardsLoading } = bankCardsQuery;

    const [activeDeleteCard, setActiveDeleteCard] = useState<BankCard | undefined>();

    const deleteBankCardSheetRef = useRef<ActionSheetRef>(null);

    const handleDeleteCard = (card: BankCard) => {
        setActiveDeleteCard(card);
        openDeleteBankCardSheet();
    };

    const handleCancelDeleteBankCard = () => {
        setActiveDeleteCard(undefined);
        closeDeleteBankCardSheet();
    };

    const handleConfirmDeleteBankCard = () => {
        deleteBankCard(activeDeleteCard!.id).then(() => {
            setActiveDeleteCard(undefined);
            closeDeleteBankCardSheet();
        });
    };

    const openDeleteBankCardSheet = () => {
        deleteBankCardSheetRef.current?.show();
    };

    const closeDeleteBankCardSheet = () => {
        deleteBankCardSheetRef.current?.hide();
    };

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
        }, [queryClient]),
    );

    return (
        <VStack className="flex-1">
            <Stack.Screen options={{ title: 'Банковские карты' }} />

            {isCardsLoading && <Spinner />}

            {!isCardsLoading && cards.length > 0 && (
                <FlatList
                    contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                    ItemSeparatorComponent={() => <Box className="h-4" />}
                    data={cards}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <HStack space="md" className="items-center justify-between relative">
                            <Pressable
                                className="w-full"
                                onPress={() => router.navigate(`/settings/bankCards/${item.id}`)}
                            >
                                <BankCardItem data={item} />
                            </Pressable>

                            <Pressable
                                className="flex flex-row items-center gap-1 absolute right-2 bottom-2 p-2"
                                onPress={() => handleDeleteCard(item)}
                            >
                                <Trash color="#fff" size={18} />
                                <Text className="text-white">Удалить</Text>
                            </Pressable>
                        </HStack>
                    )}
                />
            )}

            <ActionSheet ref={deleteBankCardSheetRef}>
                <Heading size="xl" className="text-center mb-7">
                    Вы действительно хотите удалить {activeDeleteCard?.name} карту?
                </Heading>

                <ActionButtons
                    confirm={handleConfirmDeleteBankCard}
                    cancel={handleCancelDeleteBankCard}
                    isPending={isPending.delete}
                    confirmText="Удалить"
                />
            </ActionSheet>

            <Fab onPress={() => router.navigate('/settings/bankCards/addCard')} label="Добавить карту" icon={Plus} />
        </VStack>
    );
}
