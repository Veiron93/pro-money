import { BankCardItem } from '@components/pages/bankCards/BankCardItem';
import { ConfirmDelete } from '@components/shared/ConirmDelete';
import { Fab } from '@components/shared/Fab';
import { Spinner } from '@components/shared/Spinner';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { BankCard } from '@customTypes/bankCard';
import { useBankCards } from '@hooks/useBankCards';
import { BANK_CARDS_QUERY_KEYS } from '@keys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router, useFocusEffect } from 'expo-router';
import { Landmark, Plus, Trash } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

export default function BankCardsScreen() {
    const queryClient = useQueryClient();

    const { bankCardsQuery, deleteBankCard, isPending } = useBankCards();

    const { data: cards = [], isLoading: isCardsLoading } = bankCardsQuery;

    const [activeDeleteCard, setActiveDeleteCard] = useState<BankCard | undefined>();

    const [isDeleteBankCardSheetVisible, setIsDeleteBankCardSheetVisible] = useState(false);

    const handleDeleteCard = (card: BankCard) => {
        setActiveDeleteCard(card);
        setIsDeleteBankCardSheetVisible(true);
    };

    const handleCancelDeleteBankCard = () => {
        setActiveDeleteCard(undefined);
        setIsDeleteBankCardSheetVisible(false);
    };

    const handleConfirmDeleteBankCard = () => {
        deleteBankCard(activeDeleteCard!.id).then(() => {
            setActiveDeleteCard(undefined);
            setIsDeleteBankCardSheetVisible(false);
        });
    };

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
        }, [queryClient]),
    );

    return (
        <View className="flex-1 mb-[-12px]">
            <Stack.Screen options={{ title: 'Банковские карты' }} />

            {isCardsLoading && <Spinner />}

            {!isCardsLoading && cards.length > 0 && (
                <FlatList
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ItemSeparatorComponent={() => <View className="h-4" />}
                    data={cards}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <HStack space="md" className="items-center justify-between relative">
                            <Pressable
                                className="w-full"
                                onPress={() => router.navigate(`/settings/bankCards/${item.id}`)}
                            >
                                <BankCardItem data={item}>
                                    <HStack className="flex-row items-center" space="2xl">
                                        <Pressable
                                            className="flex flex-row items-center gap-1"
                                            onPress={() => handleDeleteCard(item)}
                                        >
                                            <Landmark color="#fff" size={18} />
                                            <Text className="text-white">Открыть банк</Text>
                                        </Pressable>

                                        <Pressable
                                            className="flex flex-row items-center gap-1"
                                            onPress={() => handleDeleteCard(item)}
                                        >
                                            <Trash color="#fff" size={18} />
                                            <Text className="text-white">Удалить</Text>
                                        </Pressable>
                                    </HStack>
                                </BankCardItem>
                            </Pressable>
                        </HStack>
                    )}
                />
            )}

            <ConfirmDelete
                title={`Вы действительно хотите удалить ${activeDeleteCard?.name} карту?`}
                confirmText="Удалить"
                onConfirm={handleConfirmDeleteBankCard}
                onCancel={handleCancelDeleteBankCard}
                visible={isDeleteBankCardSheetVisible}
            />

            <Fab onPress={() => router.navigate('/settings/bankCards/addCard')} label="Добавить карту" icon={Plus} />
        </View>
    );
}
