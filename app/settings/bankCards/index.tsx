import { BankCardItem } from '@/components/pages/bankCards/BankCardItem';
import { ActionButtons } from '@/components/shared/ActionButtons';
import { ActionSheet, ActionSheetRef } from '@/components/shared/ActionSheet';
import { Fab } from '@/components/shared/Fab';
import { Spinner } from '@/components/shared/Spinner';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { deleteBankCard, getBankCards } from '@/services/bankCardService';
import { BankCard } from '@/types/bankCard';
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router';
import { Plus, Trash } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';

export default function BankCardsScreen() {
    const toast = useToast();
    const router = useRouter();

    const [isCardsLoading, setIsCardsLoading] = useState(true);
    const [isPendingDelete, setIsPendingDelete] = useState(false);

    const [cards, setCards] = useState<BankCard[]>([]);
    const [activeDeleteCard, setActiveDeleteCard] = useState<BankCard | undefined>();

    const deleteBankCardSheetRef = useRef<ActionSheetRef>(null);

    const handleDeleteCard = (card: BankCard) => {
        setActiveDeleteCard(card);
        openDeleteBankCardSheet();
    };

    const showError = (errorText: string) => {
        toast.show({
            placement: 'top',
            duration: 3000,
            render: () => {
                return (
                    <Toast action="error" variant="solid">
                        <ToastTitle>Ошибка!</ToastTitle>
                        <ToastDescription>{errorText}</ToastDescription>
                    </Toast>
                );
            },
        });
    };

    const handleCancelDeleteBankCard = () => {
        setActiveDeleteCard(undefined);
        closeDeleteBankCardSheet();
    };

    const handleConfirmDeleteBankCard = () => {
        setIsPendingDelete(true);

        deleteBankCard(activeDeleteCard!.id)
            .then(() => {
                setActiveDeleteCard(undefined);
                closeDeleteBankCardSheet();
                loadData();
            })
            .catch(() => {
                showError('Карта не удалена');
            })
            .finally(() => {
                setIsPendingDelete(false);
            });
    };

    const openDeleteBankCardSheet = () => {
        deleteBankCardSheetRef.current?.show();
    };

    const closeDeleteBankCardSheet = () => {
        deleteBankCardSheetRef.current?.hide();
    };

    const loadData = async () => {
        try {
            setIsCardsLoading(true);
            const cards = await getBankCards();
            setCards(cards);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setIsCardsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, []),
    );

    return (
        <VStack className="flex-1">
            <Stack.Screen options={{ title: 'Банковские карты' }} />

            {isCardsLoading && <Spinner />}

            {!isCardsLoading && cards.length > 0 && (
                <Box className="flex-1">
                    <FlatList
                        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                        ItemSeparatorComponent={() => <Box className="h-4" />}
                        data={cards}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <HStack space="md" className="items-center justify-between relative">
                                <Link className="w-full" href={`/settings/bankCards/${item.id}`}>
                                    <BankCardItem data={item} />
                                </Link>

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
                </Box>
            )}

            <ActionSheet ref={deleteBankCardSheetRef}>
                <Heading size="xl" className="text-center mb-7">
                    Вы действительно хотите удалить {activeDeleteCard?.name} карту?
                </Heading>

                <ActionButtons
                    confirm={handleConfirmDeleteBankCard}
                    cancel={handleCancelDeleteBankCard}
                    isPending={isPendingDelete}
                    confirmText="Удалить"
                />
            </ActionSheet>

            <Fab onPress={() => router.navigate('/settings/bankCards/addCard')} label="Добавить карту" icon={Plus} />
        </VStack>
    );
}
