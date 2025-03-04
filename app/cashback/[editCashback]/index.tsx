import { BankCardItem } from '@components/pages/bankCards/BankCardItem';
import { CashbackCategoryItem } from '@components/pages/cashback/CashbackCategoryItem/CashbackCategoryItem';
import { CashbackActionButtons } from '@components/pages/cashback/editCashback/CashbackActionButtons';
import { CashbackCategorySelector } from '@components/pages/cashback/editCashback/CashbackCategorySelector';
import { CashbackPercentSlider } from '@components/pages/cashback/editCashback/CashbackPercentSlider/CashbackPercentSlider';
import { ActionButtons } from '@components/shared/ActionButtons';
import { ActionSheet } from '@components/shared/ActionSheet';
import { ConfirmDelete } from '@components/shared/ConirmDelete';
import { Fab } from '@components/shared/Fab';
import { Box } from '@components/ui/box';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { BANK_CARDS_QUERY_KEYS } from '@constants/queryKeys';
import type { CashbackCategoryData } from '@customTypes/cashback';
import { useBankCards } from '@hooks/useBankCards';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { AlignJustify, Star, Trash } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';

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

    const [isEditCashbackSheetVisible, setIsEditCashbackSheetVisible] = useState(false);
    const [isDeleteAllCategoriesSheetVisible, setIsDeleteAllCategoriesSheetVisible] = useState(false);

    const openEditCashbackSheet = () => {
        setStepAddCashback(1);
        setSelectedCashbackCategoryPercent(1);
        setIsEditCashbackSheetVisible(true);
    };

    const closeEditCashbackSheet = () => {
        setIsEditCashbackSheetVisible(false);
    };

    const openDeleteAllCategoriesSheet = () => {
        setIsDeleteAllCategoriesSheetVisible(true);
    };

    const closeDeleteAllCategoriesSheet = () => {
        setIsDeleteAllCategoriesSheetVisible(false);
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
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD_WITH_CASHBACK] });
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
            queryClient.invalidateQueries({
                queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD_WITH_CASHBACK],
            });
            closeEditCashbackSheet();
        });
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
            queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD_WITH_CASHBACK] });
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
                            <CashbackActionButtons
                                onClearPress={openDeleteAllCategoriesSheet}
                                onLoadPress={openDeleteAllCategoriesSheet}
                            />

                            <FlatList
                                data={cashbackCategories}
                                ItemSeparatorComponent={() => <Box className="h-4" />}
                                contentContainerStyle={{ padding: 0 }}
                                keyExtractor={(item) => item.code}
                                renderItem={({ item }) => (
                                    <HStack space="md" className="items-center">
                                        <Pressable className="w-[85%]" onPress={() => handleEditCashbackCategory(item)}>
                                            <CashbackCategoryItem {...item} />
                                        </Pressable>

                                        <Pressable
                                            className="items-center ml-auto w-[30px]"
                                            onPress={() => handleDeleteCashbackCategory(item.code)}
                                        >
                                            <Trash color="#991b1b" />
                                        </Pressable>
                                    </HStack>
                                )}
                            />
                        </Box>
                    )}

                    <ConfirmDelete
                        title="Вы действительно хотите очистить весь список?"
                        confirmText="Очистить"
                        onConfirm={handleClearBankCardCashback}
                        onCancel={closeDeleteAllCategoriesSheet}
                        visible={isDeleteAllCategoriesSheetVisible}
                    />

                    <ActionSheet
                        title={stepAddCashback === 1 ? 'Выберите категорию' : 'Процент кешбека'}
                        showCloseButton={false}
                        visible={isEditCashbackSheetVisible}
                        onClose={closeEditCashbackSheet}
                    >
                        {stepAddCashback === 1 && (
                            <CashbackCategorySelector handleSelectAddCashback={handleSelectAddCashback} />
                        )}

                        {stepAddCashback === 2 && (
                            <VStack space="md" className="w-full">
                                <CashbackPercentSlider
                                    initialValue={selectedCashbackCategoryPercent}
                                    onValueChange={setSelectedCashbackCategoryPercent}
                                />

                                <ActionButtons
                                    confirm={handleAddCashback}
                                    cancel={closeEditCashbackSheet}
                                    confirmText="Готово"
                                />
                            </VStack>
                        )}
                    </ActionSheet>
                </>
            )}
        </VStack>
    );
}
