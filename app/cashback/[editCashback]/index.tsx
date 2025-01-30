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
import { BANK_CARDS_QUERY_KEYS } from '@constants/queryKeys';
import type { CashbackCategoryData } from '@customTypes/cashback';
import { useBankCards } from '@hooks/useBankCards';
import { CashbackCategories } from '@storage/cashbackCategories';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { AlignJustify, Trash } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { FlatList as FlatListSheet } from 'react-native-actions-sheet';

type step = 1 | 2;

const cashbackRates = [1, 3, 5, 7, 10];

export default function EditCashbackScreen() {
    const queryClient = useQueryClient();

    const { editCashback: bankCardId } = useLocalSearchParams();
    const { getBankCardWithCashback, getBankCard, updateCashbackCategoriesBankCard } = useBankCards();

    const { data: bankCard } = getBankCard(bankCardId.toString());

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

    const handleSelectAddCashback = (code: string) => {
        setSelectedCashbackCategoryCode(code);

        const existingCategory = bankCard?.cashbackCategories?.find((category) => category.code === code);
        const percent = existingCategory ? existingCategory.percent : 1;

        setSelectedCashbackCategoryPercent(percent);
        setStepAddCashback(2);
    };

    const handleClearBankCardCashback = () => {
        updateCashbackCategoriesBankCard(bankCardId.toString(), []).then(() => {
            closeDeleteAllCategoriesSheet();
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD] });
        });
    };

    const handleAddCashback = () => {
        const categoryCashbackData = {
            code: selectedCashbackCategoryCode,
            percent: selectedCashbackCategoryPercent,
        };

        const categoriesCashbackBankCard: CashbackCategoryData[] = bankCard?.cashbackCategories || [];

        const indexIsAddedCashbackCategory = categoriesCashbackBankCard.findIndex(
            (cashbackCategory) => cashbackCategory.code === categoryCashbackData.code,
        );

        if (indexIsAddedCashbackCategory !== -1) {
            categoriesCashbackBankCard[indexIsAddedCashbackCategory].percent = categoryCashbackData.percent;
        } else {
            categoriesCashbackBankCard.push(categoryCashbackData);
        }

        updateCashbackCategoriesBankCard(bankCardId.toString(), categoriesCashbackBankCard).then(() => {
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD] });
            resetCashbackParams();
        });
    };

    const resetCashbackParams = () => {
        closeEditCashbackSheet();
        setStepAddCashback(1);
        setSelectedCashbackCategoryPercent(1);
    };

    const handleEditCashbackCategory = (item: CashbackCategoryData) => {
        setStepAddCashback(2);
        setSelectedCashbackCategoryCode(item.code);
        setSelectedCashbackCategoryPercent(item.percent);
        openEditCashbackSheet();
    };

    const handleDeleteCashbackCategory = (code: string) => {
        const categoriesCashbackBankCard =
            bankCard?.cashbackCategories?.filter((category) => category.code !== code) || [];

        updateCashbackCategoriesBankCard(bankCardId.toString(), categoriesCashbackBankCard).then(() => {
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD] });
        });
    };

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
                            confirm={handleClearBankCardCashback}
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
                                        cancel={resetCashbackParams}
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
