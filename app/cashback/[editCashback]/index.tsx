import { CashbackPercent } from '@/components/pages/cashback/CashbackPercent/CashbackPercent';
import { BankCardItem } from '@components/pages/bankCards/BankCardItem';
import { EditCasbackCategories } from '@components/pages/cashback/EditCasbackCategories';
import { ActionButtons } from '@components/shared/ActionButtons';
import { ActionSheet, ActionSheetRef } from '@components/shared/ActionSheet';
import { Fab } from '@components/shared/Fab';
import { Box } from '@components/ui/box';
import { Heading } from '@components/ui/heading';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { BANK_CARDS_QUERY_KEYS } from '@constants/queryKeys';
import type { CashbackCategoryData } from '@customTypes/cashback';
import { useBankCards } from '@hooks/useBankCards';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { AlignJustify, Image, Star, Trash } from 'lucide-react-native';
import { ComponentType, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { SvgProps } from 'react-native-svg';

type step = 1 | 2;

export default function EditCashbackScreen() {
    const queryClient = useQueryClient();

    const { editCashback: bankCardId } = useLocalSearchParams();

    const { bankCardWithCashbackQuery, updateCashbackCategoriesBankCard } = useBankCards();

    const { data, isLoading: isBankCardLoading } = bankCardWithCashbackQuery(bankCardId.toString());

    const { bankCard, cashbackCategories } = data || {};

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

    const getCashbackCategoryIcon = (icon: ComponentType<SvgProps> | undefined) => {
        const Icon = icon ?? Star;
        return <Icon color="#fff" size={20} />;
    };

    const handleSelectAddCashback = (code: string) => {
        setSelectedCashbackCategoryCode(code);

        const existingCategory = cashbackCategories?.find((category) => category.code === code);
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

        const categoriesCashbackBankCard: CashbackCategoryData[] = cashbackCategories || [];

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
        const categoriesCashbackBankCard = cashbackCategories?.filter((category) => category.code !== code) || [];

        updateCashbackCategoriesBankCard(bankCardId.toString(), categoriesCashbackBankCard).then(() => {
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD] });
        });
    };

    return (
        <VStack className="p-4 pt-1 flex-1">
            <Stack.Screen options={{ title: 'Управление кешбеком' }} />

            {bankCard && (
                <>
                    <Pressable onPress={() => router.push(`/settings/bankCards/${bankCard.id}`)}>
                        <BankCardItem data={bankCard} />
                    </Pressable>

                    <Fab onPress={openEditCashbackSheet} label="Категории" icon={AlignJustify} />

                    {cashbackCategories?.length === 0 && (
                        <Text className="text-neutral-400 text-center mt-6" size="2xl">
                            Выберите категории кешбека {'\n'} на этот месяц
                        </Text>
                    )}

                    {cashbackCategories && cashbackCategories?.length > 0 && (
                        <Box className="mt-6">
                            <HStack className="items-center justify-between mb-6" space="md">
                                <Pressable
                                    className="flex-row flex-1 gap-[5px] justify-center items-center bg-neutral-700 rounded-full px-4 py-3"
                                    onPress={openDeleteAllCategoriesSheet}
                                >
                                    <Trash size={20} color="#d4d4d4" />
                                    <Text className="text-neutral-300" size="lg">
                                        Очистить
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="flex-row flex-1 gap-[5px] justify-center items-center bg-neutral-700 rounded-full px-4 py-3"
                                    onPress={openDeleteAllCategoriesSheet}
                                >
                                    <Image size={20} color="#d4d4d4" />
                                    <Text className="text-neutral-300" size="lg">
                                        Загрузить
                                    </Text>
                                </Pressable>
                            </HStack>

                            <FlatList
                                data={cashbackCategories}
                                keyExtractor={(item) => item.code}
                                renderItem={({ item }) => (
                                    <HStack space="md" className="items-center">
                                        <Pressable className="w-[85%]" onPress={() => handleEditCashbackCategory(item)}>
                                            <HStack className="items-center">
                                                <Box className="rounded-full bg-orange-800 p-2">
                                                    {getCashbackCategoryIcon(item.icon)}
                                                </Box>
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
                        <VStack space="md" className="w-full">
                            <Heading className="text-center mb-3" size="2xl">
                                {stepAddCashback === 1 ? 'Выберите категорию' : 'Процент кешбека'}
                            </Heading>

                            {stepAddCashback === 1 && (
                                <EditCasbackCategories handleSelectAddCashback={handleSelectAddCashback} />
                            )}

                            {stepAddCashback === 2 && (
                                <VStack space="md" className="w-full">
                                    <CashbackPercent
                                        initialValue={selectedCashbackCategoryPercent}
                                        onValueChange={setSelectedCashbackCategoryPercent}
                                    />

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
