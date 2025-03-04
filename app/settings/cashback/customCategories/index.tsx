import { ActionButtons } from '@components/shared/ActionButtons';
import { ActionSheet } from '@components/shared/ActionSheet';
import { Input } from '@components/shared/Input';
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

    const [name, setName] = useState('');
    const [editItem, setEditItem] = useState<CustomCategoryCashback>();
    const [editItemName, setEditItemName] = useState('');

    const { categories, addCategory, updateCategory, deleteCategory, isPending } = useCustomCategoriesCashback();

    const { data: customCategoriesCashback = [], isLoading: isCustomCategoriesCashbackLoading } = categories;

    const [isEditCashbackSheetVisible, setIsEditCashbackSheetVisible] = useState(false);

    const handleAddCustomCategoryCashback = () => {
        addCategory({
            name,
        }).then(() => {
            setName('');
        });
    };

    const handleEditCustomCategoryCashback = (item: CustomCategoryCashback) => {
        setEditItem(item);
        setEditItemName(item.name);
        setIsEditCashbackSheetVisible(true);
    };

    const handleActionConfirmEditCustomCategoryCashback = () => {
        const data: CustomCategoryCashback = {
            name: editItemName,
            code: editItem?.code ?? '',
        };

        updateCategory(data);

        setEditItem(undefined);
        setEditItemName('');
        setIsEditCashbackSheetVisible(false);
    };

    const handleActionCancelEditCustomCategoryCashback = () => {
        setEditItem(undefined);
        setIsEditCashbackSheetVisible(false);
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
                <Input className="flex-1" value={name} onChange={setName} placeholder="Название категории" />

                <Pressable
                    className="rounded-full bg-green-800 p-2 items-center justify-center px-5"
                    onPress={() => handleAddCustomCategoryCashback()}
                >
                    <Text className="text-white">Добавить</Text>
                </Pressable>
            </HStack>

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

                        <Pressable onPress={() => deleteCategory(item.code)} className="flex-none">
                            <Trash size={20} color="#991b1b" />
                        </Pressable>
                    </HStack>
                )}
            />

            <ActionSheet
                title="Редактировать категорию"
                showCloseButton={false}
                visible={isEditCashbackSheetVisible}
                onClose={() => setIsEditCashbackSheetVisible(false)}
            >
                <VStack space="md" className="w-full">
                    <Input
                        className="mb-2"
                        value={editItemName}
                        onChange={setEditItemName}
                        placeholder="Название категории"
                    />

                    <ActionButtons
                        confirm={handleActionConfirmEditCustomCategoryCashback}
                        cancel={handleActionCancelEditCustomCategoryCashback}
                        confirmText="Сохранить"
                    />
                </VStack>
            </ActionSheet>
        </View>
    );
}
