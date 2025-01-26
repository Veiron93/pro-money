import { BankCardItem } from '@components/pages/bankCards/BankCardItem';
import { ActionButtons } from '@components/shared/ActionButtons';
import { ActionSheet, ActionSheetRef } from '@components/shared/ActionSheet';
import { Fab } from '@components/shared/Fab';
import { Box } from '@components/ui/box';
import { Heading } from '@components/ui/heading';
import { HStack } from '@components/ui/hstack';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@components/ui/slider';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { useBankCards } from '@hooks/useBankCards';
import { CashbackCategories, CashbackCategory } from '@storage/cashbackCategories';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { AlignJustify, Trash } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { FlatList as FlatListSheet } from 'react-native-actions-sheet';

type step = 1 | 2;

const cashbackRates = [1, 3, 5, 7, 10];

export default function EditCashbackScreen() {
    const queryClient = useQueryClient();

    const { editCashback: bankCardId } = useLocalSearchParams();
    const { getBankCardWithCashback } = useBankCards();

    const bankCardWithCashback = getBankCardWithCashback(bankCardId.toString());

    const [stepAddCashback, setStepAddCashback] = useState<step>(1);
    const [selectedCashbackCategoryCode, setSelectedCashbackCategoryCode] = useState('');
    const [selectedCashbackCategoryPercent, setSelectedCashbackCategoryPercent] = useState(1);

    const editCashbackSheetRef = useRef<ActionSheetRef>(null);
    const deleteAllCategoriesSheetRef = useRef<ActionSheetRef>(null);

    const openEditCashbackSheet = () => {
        editCashbackSheetRef.current?.show();
    };

    const closeEditCashbackSheet = () => {
        editCashbackSheetRef.current?.hide();
    };

    const openDeleteAllCategoriesSheet = () => {
        deleteAllCategoriesSheetRef.current?.show();
    };

    const closeDeleteAllCategoriesSheet = () => {
        deleteAllCategoriesSheetRef.current?.hide();
    };

    const handlerClearBankCardCashback = () => {};

    const handleSelectAddCashback = (code: string) => {
        setSelectedCashbackCategoryCode(code);
        setStepAddCashback(2);
    };

    const handleAddCashback = () => {};

    const handleCancelAddCashback = () => {};

    const handleEditCashbackCategory = (item: CashbackCategory) => {};

    const handleDeleteCashbackCategory = (code: string) => {};

    // useFocusEffect(
    //     useCallback(() => {
    //         queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARDS] });
    //     }, [queryClient]),
    // );

    // const router = useRouter();
    // const { editCashback } = useLocalSearchParams();

    // const [bankCard, setBankCard] = useState<BankCard>();
    // const [bankCardCashbackCategories, setBankCardCashbackCategories] = useState<CashbackItem[]>([]);

    // const [stepAddCashback, setStepAddCashback] = useState<step>(1);

    // const [selectedCashbackCategoryPrecent, setSelectedCashbackCategoryPrecent] = useState(1);
    // const [selectedCashbackCategoryCode, setSelectedCashbackCategoryCode] = useState('');

    // const [isLoadingClearBankCardCashback, setIsLoadingClearBankCardCashback] = useState(false);

    // const deleteAllCategoriesSheetRef = useRef<ActionSheetRef>(null);
    // const editCashbackSheetRef = useRef<ActionSheetRef>(null);

    // const getBankCard = async () => {
    //     try {
    //         const cards = await getBankCardsStorage();
    //         const card = cards.find((card: BankCard) => card.id === editCashback);

    //         if (!card) {
    //             router.replace('/cashback');
    //             return;
    //         }

    //         setBankCard(card);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const getBankCardsStorage = async () => {
    //     try {
    //         const cards = await AsyncStorage.getItem('bankCards');
    //         return cards !== null ? JSON.parse(cards) : [];
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const getBankCardCashbackCategoriesStorage = async () => {
    //     try {
    //         const cashbackStorage = await AsyncStorage.getItem('cashback');

    //         if (!cashbackStorage) {
    //             return false;
    //         }

    //         const bankCards = JSON.parse(cashbackStorage);
    //         const bankCard = bankCards.find((card: BankCard) => card.id === editCashback);

    //         if (!bankCard) {
    //             return false;
    //         }

    //         setBankCardCashbackCategories(bankCard.cashbackCategories);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const handleSelectAddCashback = (code: string) => {
    //     setSelectedCashbackCategoryCode(code);
    //     setStepAddCashback(2);
    // };

    // const handleAddCashback = () => {
    //     if (!bankCard) {
    //         return;
    //     }

    //     const newCashbackCategory: CashbackItem = {
    //         code: selectedCashbackCategoryCode,
    //         percent: selectedCashbackCategoryPrecent,
    //     };

    //     const bankCardData: BankCardCashback = {
    //         id: bankCard.id,
    //         cashbackCategories: [],
    //     };

    //     const isAddedCashbackCategory = bankCardCashbackCategories.some(
    //         (cashbackCategory) => cashbackCategory.code === newCashbackCategory.code,
    //     );

    //     if (isAddedCashbackCategory) {
    //         const categories = bankCardCashbackCategories.map((cashbackCategory) => {
    //             if (cashbackCategory.code === newCashbackCategory.code) {
    //                 cashbackCategory.percent = selectedCashbackCategoryPrecent;
    //             }

    //             return cashbackCategory;
    //         });

    //         bankCardData.cashbackCategories = categories;
    //     }

    //     if (!isAddedCashbackCategory) {
    //         bankCardData.cashbackCategories = [...bankCardCashbackCategories, newCashbackCategory];
    //     }

    //     addCashbackStorage(bankCardData).then(() => {
    //         setBankCardCashbackCategories(bankCardData.cashbackCategories);
    //         handleCancelAddCashback();
    //     });
    // };

    // const addCashbackStorage = async (data: BankCardCashback) => {
    //     try {
    //         const cashbackStorage = await AsyncStorage.getItem('cashback');

    //         if (cashbackStorage) {
    //             const items = JSON.parse(cashbackStorage);
    //             const cashbackIndex = items.findIndex((item: BankCard) => item.id === data.id);

    //             if (cashbackIndex !== -1) {
    //                 items[cashbackIndex].cashbackCategories = data.cashbackCategories;
    //             }

    //             const jsonValue = JSON.stringify(cashbackIndex !== -1 ? items : [...items, data]);
    //             await AsyncStorage.setItem('cashback', jsonValue);
    //         }

    //         if (!cashbackStorage) {
    //             const jsonValue = JSON.stringify([data]);
    //             await AsyncStorage.setItem('cashback', jsonValue);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const handleEditCashbackCategory = (item: CashbackItem) => {
    //     openEditCashbackSheet();
    //     setStepAddCashback(2);
    //     setSelectedCashbackCategoryCode(item.code);
    //     setSelectedCashbackCategoryPrecent(item.percent);
    // };

    // const handleDeleteCashbackCategory = async (code: string) => {
    //     try {
    //         const cashbackStorage = await AsyncStorage.getItem('cashback');

    //         if (cashbackStorage) {
    //             const bankCards = JSON.parse(cashbackStorage);
    //             const indexBankCard = bankCards.findIndex((item: BankCard) => item.id === bankCard?.id);

    //             if (indexBankCard !== -1) {
    //                 bankCards[indexBankCard].cashbackCategories = bankCards[indexBankCard].cashbackCategories.filter(
    //                     (item: CashbackItem) => item.code !== code,
    //                 );
    //             }

    //             const jsonValue = JSON.stringify(bankCards);
    //             await AsyncStorage.setItem('cashback', jsonValue);

    //             getBankCardCashbackCategoriesStorage();
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const handleCancelAddCashback = () => {
    //     closeEditCashbackSheet();
    //     setStepAddCashback(1);
    //     setSelectedCashbackCategoryPrecent(1);
    // };

    // const handlerClearBankCardCashback = async () => {
    //     try {
    //         setIsLoadingClearBankCardCashback(true);
    //         const cashbackStorage = await AsyncStorage.getItem('cashback');

    //         if (!cashbackStorage) {
    //             return;
    //         }

    //         const bankCards = JSON.parse(cashbackStorage);
    //         const items = bankCards.filter((item: BankCard) => item.id !== bankCard?.id);

    //         const jsonValue = JSON.stringify(items);

    //         await AsyncStorage.setItem('cashback', jsonValue).then(() => {
    //             setBankCardCashbackCategories([]);
    //         });
    //     } finally {
    //         setIsLoadingClearBankCardCashback(false);
    //         closeDeleteAllCategoriesSheet();
    //     }
    // };

    // const cashbackCategoryName = (code: string): string => {
    //     return CashbackCategories.find((cashback) => cashback.code === code)?.name || '-';
    // };

    // const cashbackCategoryIcon = (code: string): any => {
    //     return CashbackCategories.find((cashback) => cashback.code === code)?.icon;
    // };

    // // Delete all categories
    // const openDeleteAllCategoriesSheet = () => {
    //     deleteAllCategoriesSheetRef.current?.show();
    // };

    // const closeDeleteAllCategoriesSheet = () => {
    //     deleteAllCategoriesSheetRef.current?.hide();
    // };

    // // Edit cashback
    // const openEditCashbackSheet = () => {
    //     editCashbackSheetRef.current?.show();
    // };

    // const closeEditCashbackSheet = () => {
    //     editCashbackSheetRef.current?.hide();
    // };

    // useFocusEffect(
    //     useCallback(() => {
    //         getBankCard();
    //         getBankCardCashbackCategoriesStorage();
    //     }, []),
    // );

    return (
        <VStack className="p-4 pt-1 flex-1">
            <Stack.Screen options={{ title: 'Управление кешбеком' }} />

            {bankCardWithCashback && (
                <>
                    <Pressable onPress={() => router.push(`/settings/bankCards/${bankCardWithCashback.bankCard.id}`)}>
                        <BankCardItem data={bankCardWithCashback.bankCard} />
                    </Pressable>

                    <Fab onPress={openEditCashbackSheet} label="Категории" icon={AlignJustify} />

                    {bankCardWithCashback.cashbackCategories.length === 0 && (
                        <Text className="text-neutral-400 text-center mt-6" size="2xl">
                            Выберите категории кешбека {'\n'} на этот месяц
                        </Text>
                    )}

                    {bankCardWithCashback.cashbackCategories.length > 0 && (
                        <Box className="mt-6">
                            <Pressable className="mb-6" onPress={openDeleteAllCategoriesSheet}>
                                <HStack
                                    className="justify-center items-center bg-neutral-800 rounded-full p-4"
                                    space="sm"
                                >
                                    <Trash color="#a3a3a3" />
                                    <Text className="text-neutral-400" size="xl">
                                        Очистить список
                                    </Text>
                                </HStack>
                            </Pressable>

                            <FlatList
                                data={bankCardWithCashback.cashbackCategories}
                                keyExtractor={(item) => item.code}
                                renderItem={({ item }) => (
                                    <HStack space="md" className="items-center">
                                        <Pressable className="w-[85%]" onPress={() => handleEditCashbackCategory(item)}>
                                            <HStack className="items-center">
                                                <Box className="rounded-full bg-green-800 p-2">{item.icon}</Box>
                                                <Text className="ml-3" size="2xl">
                                                    {item.name}
                                                </Text>
                                                <Text className="ml-auto" size="2xl">
                                                    {item.percent}%
                                                </Text>
                                            </HStack>
                                        </Pressable>

                                        <Pressable
                                            className="items-center ml-auto w-[30px]"
                                            onPress={() => handleDeleteCashbackCategory(item.code)}
                                        >
                                            <Trash color="#991b1b" />
                                        </Pressable>
                                    </HStack>
                                )}
                                ItemSeparatorComponent={() => <Box className="h-4" />}
                                contentContainerStyle={{ padding: 0 }}
                            />
                        </Box>
                    )}

                    <ActionSheet ref={deleteAllCategoriesSheetRef}>
                        <Heading size="xl" className="text-center mb-6">
                            Вы действительно хотите очистить весь список?
                        </Heading>

                        <ActionButtons
                            confirm={handlerClearBankCardCashback}
                            cancel={closeDeleteAllCategoriesSheet}
                            confirmText="Очистить"
                        />
                    </ActionSheet>

                    <ActionSheet ref={editCashbackSheetRef}>
                        <VStack space="md" className="w-full mt-4">
                            <Heading className="text-center mb-3" size="2xl">
                                {stepAddCashback === 1 ? 'Выберите категорию' : 'Процент кешбека'}
                            </Heading>

                            {stepAddCashback === 1 && (
                                <FlatListSheet
                                    ItemSeparatorComponent={() => <Box className="h-3" />}
                                    className="min-h-[30vh] max-h-[50vh]"
                                    data={CashbackCategories}
                                    keyExtractor={(item) => item.code}
                                    renderItem={({ item }) => (
                                        <Pressable
                                            className="flex-row items-center rounded-2xl bg-neutral-800 p-4"
                                            onPress={() => handleSelectAddCashback(item.code)}
                                            key={item.code}
                                        >
                                            {item.icon}

                                            <Text className="ml-3" size="xl">
                                                {item.name}
                                            </Text>
                                        </Pressable>
                                    )}
                                />
                            )}

                            {stepAddCashback === 2 && (
                                <VStack space="md" className="w-full">
                                    <HStack className="items-center justify-between" space="lg">
                                        <Slider
                                            defaultValue={selectedCashbackCategoryPercent}
                                            value={selectedCashbackCategoryPercent}
                                            size="sm"
                                            minValue={1}
                                            maxValue={100}
                                            onChange={setSelectedCashbackCategoryPercent}
                                            className="w-[85%]"
                                        >
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>

                                            <SliderThumb />
                                        </Slider>

                                        <Text size="2xl" className="text-emerald-500 text-right">
                                            {selectedCashbackCategoryPercent}%
                                        </Text>
                                    </HStack>

                                    <HStack className="w-full mt-1 mb-6 justify-between">
                                        {cashbackRates.map((item) => (
                                            <Pressable
                                                className="bg-neutral-800 rounded-2xl py-3 w-[18%] "
                                                key={item}
                                                onPress={() => setSelectedCashbackCategoryPercent(item)}
                                            >
                                                <Text size="xl" className="font-bold text-center">
                                                    {item}%
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </HStack>

                                    <ActionButtons
                                        confirm={handleAddCashback}
                                        cancel={handleCancelAddCashback}
                                        confirmText="Готово"
                                    />
                                </VStack>
                            )}
                        </VStack>
                    </ActionSheet>
                </>
            )}
        </VStack>
    );
}
