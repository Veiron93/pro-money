import { ActionButtons } from '@components/shared/ActionButtons';
import { ActionSheet } from '@components/shared/ActionSheet';
import { ConfirmDelete } from '@components/shared/ConirmDelete';
import { Input } from '@components/shared/Input';
import { Spinner } from '@components/shared/Spinner';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { CustomCategoryCashback } from '@customTypes/cashback';
import { useCustomCategoriesCashback } from '@hooks/useCustomCategoriesCashback';
import { CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS } from '@keys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useFocusEffect } from 'expo-router';
import { Trash } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

export default function CashbackScreen() {
    const queryClient = useQueryClient();

    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedItem, setSelectedItem] = useState<CustomCategoryCashback>();
    const [selectedItemName, setSelectedItemName] = useState('');

    const { categories, addCategory, updateCategory, deleteCategory, isPending } = useCustomCategoriesCashback();

    const { data: customCategoriesCashback = [], isLoading: isCustomCategoriesCashbackLoading } = categories;

    const [isEditCashbackSheetVisible, setIsEditCashbackSheetVisible] = useState(false);
    const [isDeleteCategorySheetVisible, setIsDeleteCategorySheetVisible] = useState(false);

    const handleAddCustomCategoryCashback = () => {
        if (newCategoryName.trim() === '') {
            return;
        }

        addCategory({
            name: newCategoryName,
        }).then(() => {
            setNewCategoryName('');
        });
    };

    const handleEditCustomCategoryCashback = (item: CustomCategoryCashback) => {
        setSelectedItem(item);
        setSelectedItemName(item.name);
        setIsEditCashbackSheetVisible(true);
    };

    const handleActionConfirmEditCustomCategoryCashback = () => {
        const data: CustomCategoryCashback = {
            name: selectedItemName,
            code: selectedItem?.code ?? '',
        };

        updateCategory(data).then(() => {
            setSelectedItemName('');
            setIsEditCashbackSheetVisible(false);
        });
    };

    const handleActionCancelEditCustomCategoryCashback = () => {
        setIsEditCashbackSheetVisible(false);
    };

    const handleDeleteCategory = (item: CustomCategoryCashback) => {
        setSelectedItem(item);
        setIsDeleteCategorySheetVisible(true);
    };

    const handleConfirmDeleteCategory = () => {
        deleteCategory(selectedItem?.code ?? '').then(() => {
            setIsDeleteCategorySheetVisible(false);
        });
    };

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({
                queryKey: [CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS.CUSTOM_CATEGORIES],
            });
        }, [queryClient]),
    );

    return (
        <View className="flex-1 mb-[-12px]">
            <Stack.Screen options={{ title: 'Пользовательские категории' }} />

            <HStack className="w-full h-[58px] flex-none" space="md">
                <Input
                    className="flex-1"
                    value={newCategoryName}
                    onChange={setNewCategoryName}
                    placeholder="Название категории"
                />

                <Pressable
                    className="rounded-full p-2 items-center justify-center px-5 bg-green-900 hover:bg-green-800 active:bg-green-950"
                    onPress={() => handleAddCustomCategoryCashback()}
                >
                    <Text className="text-white">Добавить</Text>
                </Pressable>
            </HStack>

            {isCustomCategoriesCashbackLoading && <Spinner className="mt-8" />}

            {!isCustomCategoriesCashbackLoading && customCategoriesCashback.length > 0 && (
                <FlatList
                    className="mt-6 pb-4"
                    data={customCategoriesCashback}
                    keyExtractor={(item) => item.code}
                    ItemSeparatorComponent={() => <View className="h-2 bg-neutral-900" />}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <HStack className="w-full items-center justify-between">
                            <Pressable
                                onPress={() => handleEditCustomCategoryCashback(item)}
                                className="w-[93%] bg-neutral-800 rounded-2xl px-4 py-2"
                            >
                                <Text size="lg">{item.name}</Text>
                            </Pressable>

                            <Pressable onPress={() => handleDeleteCategory(item)} className="flex-none">
                                <Trash size={20} color="#991b1b" />
                            </Pressable>
                        </HStack>
                    )}
                />
            )}

            <ActionSheet
                title="Редактировать категорию"
                showCloseButton={false}
                visible={isEditCashbackSheetVisible}
                onClose={() => setIsEditCashbackSheetVisible(false)}
            >
                <VStack space="md" className="w-full">
                    <Input
                        className="mb-2"
                        value={selectedItemName}
                        onChange={setSelectedItemName}
                        placeholder="Название категории"
                    />

                    <ActionButtons
                        confirm={handleActionConfirmEditCustomCategoryCashback}
                        cancel={handleActionCancelEditCustomCategoryCashback}
                        confirmText="Сохранить"
                    />
                </VStack>
            </ActionSheet>

            <ConfirmDelete
                title={`Вы действительно хотите удалить "${selectedItem?.name}"?`}
                confirmText="Удалить"
                visible={isDeleteCategorySheetVisible}
                isPending={isPending.delete}
                onConfirm={() => handleConfirmDeleteCategory()}
                onCancel={() => setIsDeleteCategorySheetVisible(false)}
            />
        </View>
    );
}
