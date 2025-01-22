import { BankCardItem } from '@/components/pages/bankCards/BankCardItem';
import { ActionSheet, ActionSheetRef } from '@/components/shared/ActionSheet';
import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { CashbackCategories } from '@/storage/cashbackCategories';
import { BankCard } from '@/types/bankCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { AlignJustify, Trash } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { FlatList as FlatListSheet } from 'react-native-actions-sheet';

type step = 1 | 2;

interface CashbackItem {
    code: string;
    precent: number;
}

interface BankCardCashback {
    id: string;
    cashbackCategories: CashbackItem[];
}

const cashbackRates = [1, 3, 5, 7, 10];

export default function EditCashbackScreen() {
    const router = useRouter();
    const { editCashback } = useLocalSearchParams();

    const [bankCard, setBankCard] = useState<BankCard>();
    const [bankCardCashbackCategories, setBankCardCashbackCategories] = useState<CashbackItem[]>([]);

    const [stepAddCashback, setStepAddCashback] = useState<step>(1);

    const [selectedCashbackCategoryPrecent, setSelectedCashbackCategoryPrecent] = useState(1);
    const [selectedCashbackCategoryCode, setSelectedCashbackCategoryCode] = useState('');

    const [isLoadingClearBankCardCashback, setIsLoadingClearBankCardCashback] = useState(false);

    const deleteAllCategoriesSheetRef = useRef<ActionSheetRef>(null);
    const editCashbackSheetRef = useRef<ActionSheetRef>(null);

    const getBankCard = async () => {
        try {
            const cards = await getBankCardsStorage();
            const card = cards.find((card: BankCard) => card.id === editCashback);

            if (!card) {
                router.replace('/cashback');
                return;
            }

            setBankCard(card);
        } catch (e) {
            console.log(e);
        }
    };

    const getBankCardsStorage = async () => {
        try {
            const cards = await AsyncStorage.getItem('bankCards');
            return cards !== null ? JSON.parse(cards) : [];
        } catch (e) {
            console.log(e);
        }
    };

    const getBankCardCashbackCategoriesStorage = async () => {
        try {
            const cashbackStorage = await AsyncStorage.getItem('cashback');

            if (!cashbackStorage) {
                return false;
            }

            const bankCards = JSON.parse(cashbackStorage);
            const bankCard = bankCards.find((card: BankCard) => card.id === editCashback);

            if (!bankCard) {
                return false;
            }

            setBankCardCashbackCategories(bankCard.cashbackCategories);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSelectAddCashback = (code: string) => {
        setSelectedCashbackCategoryCode(code);
        setStepAddCashback(2);
    };

    const handleAddCashback = () => {
        if (!bankCard) {
            return;
        }

        const newCashbackCategory: CashbackItem = {
            code: selectedCashbackCategoryCode,
            precent: selectedCashbackCategoryPrecent,
        };

        const bankCardData: BankCardCashback = {
            id: bankCard.id,
            cashbackCategories: [],
        };

        const isAddedCashbackCategory = bankCardCashbackCategories.some(
            (cashbackCategory) => cashbackCategory.code === newCashbackCategory.code,
        );

        if (isAddedCashbackCategory) {
            const categories = bankCardCashbackCategories.map((cashbackCategory) => {
                if (cashbackCategory.code === newCashbackCategory.code) {
                    cashbackCategory.precent = selectedCashbackCategoryPrecent;
                }

                return cashbackCategory;
            });

            bankCardData.cashbackCategories = categories;
        }

        if (!isAddedCashbackCategory) {
            bankCardData.cashbackCategories = [...bankCardCashbackCategories, newCashbackCategory];
        }

        addCashbackStorage(bankCardData).then(() => {
            setBankCardCashbackCategories(bankCardData.cashbackCategories);
            handleCancelAddCashback();
        });
    };

    const addCashbackStorage = async (data: BankCardCashback) => {
        try {
            const cashbackStorage = await AsyncStorage.getItem('cashback');

            if (cashbackStorage) {
                const items = JSON.parse(cashbackStorage);
                const cashbackIndex = items.findIndex((item: BankCard) => item.id === data.id);

                if (cashbackIndex !== -1) {
                    items[cashbackIndex].cashbackCategories = data.cashbackCategories;
                }

                const jsonValue = JSON.stringify(cashbackIndex !== -1 ? items : [...items, data]);
                await AsyncStorage.setItem('cashback', jsonValue);
            }

            if (!cashbackStorage) {
                const jsonValue = JSON.stringify([data]);
                await AsyncStorage.setItem('cashback', jsonValue);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditCashbackCategory = (item: CashbackItem) => {
        openEditCashbackSheet();
        setStepAddCashback(2);
        setSelectedCashbackCategoryCode(item.code);
        setSelectedCashbackCategoryPrecent(item.precent);
    };

    const handleDeleteCashbackCategory = async (code: string) => {
        try {
            const cashbackStorage = await AsyncStorage.getItem('cashback');

            if (cashbackStorage) {
                const bankCards = JSON.parse(cashbackStorage);
                const indexBankCard = bankCards.findIndex((item: BankCard) => item.id === bankCard?.id);

                if (indexBankCard !== -1) {
                    bankCards[indexBankCard].cashbackCategories = bankCards[indexBankCard].cashbackCategories.filter(
                        (item: CashbackItem) => item.code !== code,
                    );
                }

                const jsonValue = JSON.stringify(bankCards);
                await AsyncStorage.setItem('cashback', jsonValue);

                getBankCardCashbackCategoriesStorage();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancelAddCashback = () => {
        closeEditCashbackSheet();
        setStepAddCashback(1);
        setSelectedCashbackCategoryPrecent(1);
    };

    const handlerClearBankCardCashback = async () => {
        try {
            setIsLoadingClearBankCardCashback(true);
            const cashbackStorage = await AsyncStorage.getItem('cashback');

            if (!cashbackStorage) {
                return;
            }

            const bankCards = JSON.parse(cashbackStorage);
            const items = bankCards.filter((item: BankCard) => item.id !== bankCard?.id);

            const jsonValue = JSON.stringify(items);

            await AsyncStorage.setItem('cashback', jsonValue).then(() => {
                setBankCardCashbackCategories([]);
            });
        } finally {
            setIsLoadingClearBankCardCashback(false);
            closeDeleteAllCategoriesSheet();
        }
    };

    const cashbackCategoryName = (code: string): string => {
        return CashbackCategories.find((cashback) => cashback.code === code)?.name || '-';
    };

    const cashbackCategoryIcon = (code: string): any => {
        return CashbackCategories.find((cashback) => cashback.code === code)?.icon;
    };

    // Delete all categories
    const openDeleteAllCategoriesSheet = () => {
        deleteAllCategoriesSheetRef.current?.show();
    };

    const closeDeleteAllCategoriesSheet = () => {
        deleteAllCategoriesSheetRef.current?.hide();
    };

    // Edit cashback
    const openEditCashbackSheet = () => {
        editCashbackSheetRef.current?.show();
    };

    const closeEditCashbackSheet = () => {
        editCashbackSheetRef.current?.hide();
    };

    useFocusEffect(
        useCallback(() => {
            getBankCard();
            getBankCardCashbackCategoriesStorage();
        }, []),
    );

    return (
        <VStack className="p-4 pt-1 flex-1">
            <Stack.Screen options={{ title: 'Управление кешбеком' }} />

            {bankCard && (
                <>
                    <Pressable onPress={() => router.push(`/settings/bankCards/${bankCard.id}`)}>
                        <BankCardItem data={bankCard} />
                    </Pressable>

                    <Box className="mt-6">
                        {bankCardCashbackCategories.length === 0 && (
                            <Text size="2xl" className="text-neutral-400">
                                Выберите категории кешбека
                            </Text>
                        )}

                        {bankCardCashbackCategories.length > 0 && (
                            <>
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
                                    data={bankCardCashbackCategories}
                                    keyExtractor={(item) => item.code}
                                    renderItem={({ item }) => (
                                        <HStack space="md" className="items-center">
                                            <Pressable
                                                className="w-[85%]"
                                                onPress={() => handleEditCashbackCategory(item)}
                                            >
                                                <HStack className="items-center">
                                                    <Box className="rounded-full bg-green-800 p-2">
                                                        {cashbackCategoryIcon(item.code)}
                                                    </Box>
                                                    <Text className="ml-3" size="2xl">
                                                        {cashbackCategoryName(item.code)}
                                                    </Text>
                                                    <Text className="ml-auto" size="2xl">
                                                        {item.precent}%
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
                            </>
                        )}
                    </Box>
                </>
            )}

            <Fab onPress={openEditCashbackSheet} className="bg-green-900 shadow-md" size="lg" placement="bottom center">
                <FabIcon as={AlignJustify} style={{ color: 'white' }} size="xl" />
                <FabLabel className="text-white">Категории</FabLabel>
            </Fab>

            <ActionSheet ref={deleteAllCategoriesSheetRef}>
                <Heading size="xl" className="text-center">
                    Вы действительно хотите очистить весь список?
                </Heading>

                <HStack className="mt-7 mb-1 w-full justify-between">
                    <Button onPress={handlerClearBankCardCashback} className="w-[48%] rounded-2xl" size="xl">
                        {isLoadingClearBankCardCashback && <ButtonSpinner color="#065f46" />}
                        <ButtonText>Очистить</ButtonText>
                    </Button>

                    <Button
                        onPress={closeDeleteAllCategoriesSheet}
                        className="w-[48%] rounded-2xl"
                        size="xl"
                        variant="outline"
                    >
                        <ButtonText>Отмена</ButtonText>
                    </Button>
                </HStack>
            </ActionSheet>

            <ActionSheet ref={editCashbackSheetRef}>
                <VStack space="md" className="w-full mt-4">
                    <Heading size="2xl" className="text-center mb-3">
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
                                    defaultValue={selectedCashbackCategoryPrecent}
                                    value={selectedCashbackCategoryPrecent}
                                    size="sm"
                                    minValue={1}
                                    maxValue={100}
                                    onChange={setSelectedCashbackCategoryPrecent}
                                    className="w-[85%]"
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>

                                    <SliderThumb />
                                </Slider>

                                <Text size="2xl" className="text-emerald-500 text-right">
                                    {selectedCashbackCategoryPrecent}%
                                </Text>
                            </HStack>

                            <HStack className="w-full mt-1 justify-between">
                                {cashbackRates.map((item) => (
                                    <Pressable
                                        className="bg-neutral-800 rounded-2xl py-3 w-[18%] "
                                        key={item}
                                        onPress={() => setSelectedCashbackCategoryPrecent(item)}
                                    >
                                        <Text size="xl" className="font-bold text-center">
                                            {item}%
                                        </Text>
                                    </Pressable>
                                ))}
                            </HStack>

                            <HStack className="mt-6 w-full justify-between">
                                <Button onPress={handleAddCashback} className="w-[48%] rounded-2xl" size="xl">
                                    <ButtonText>Готово</ButtonText>
                                </Button>

                                <Button
                                    onPress={handleCancelAddCashback}
                                    className="w-[48%] rounded-2xl"
                                    size="xl"
                                    variant="outline"
                                >
                                    <ButtonText>Отмена</ButtonText>
                                </Button>
                            </HStack>
                        </VStack>
                    )}
                </VStack>
            </ActionSheet>
        </VStack>
    );
}
