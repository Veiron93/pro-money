import { CustomCategoryCashback } from '@/types/cashback';
import { ActionButtons } from '@components/shared/ActionButtons';
import { ActionSheet, ActionSheetRef } from '@components/shared/ActionSheet';
import { Input } from '@components/shared/Input';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { useCustomCategoriesCashback } from '@hooks/useCustomCategoriesCashback';
import { CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS } from '@keys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useFocusEffect } from 'expo-router';
import { Trash } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

export default function CashbackScreen() {
    const queryClient = useQueryClient();

    const [name, setName] = useState('');
    const [editItem, setEditItem] = useState<CustomCategoryCashback>();
    const [editItemName, setEditItemName] = useState('');

    const editCustomCategoryCashbackSheetRef = useRef<ActionSheetRef>(null);

    const { categories, addCategory, updateCategory, deleteCategory, isPending } = useCustomCategoriesCashback();

    const { data: customCategoriesCashback = [], isLoading: isCustomCategoriesCashbackLoading } = categories;

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
        openEditCustomCategoryCashbackSheet();
    };

    const handleActionConfirmEditCustomCategoryCashback = () => {
        const data: CustomCategoryCashback = {
            name: editItemName,
            code: editItem?.code ?? '',
        };

        updateCategory(data);

        setEditItem(undefined);
        setEditItemName('');
        closeEditCustomCategoryCashbackSheet();
    };

    const handleActionCancelEditCustomCategoryCashback = () => {
        setEditItem(undefined);
        closeEditCustomCategoryCashbackSheet();
    };

    const openEditCustomCategoryCashbackSheet = () => {
        editCustomCategoryCashbackSheetRef.current?.show();
    };

    const closeEditCustomCategoryCashbackSheet = () => {
        editCustomCategoryCashbackSheetRef.current?.hide();
    };

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({
                queryKey: [CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS.CUSTOM_CATEGORIES],
            });
        }, [queryClient]),
    );

    return (
        <VStack className="flex-1 p-4">
            <Stack.Screen options={{ title: 'Пользовательские категории' }} />

            <HStack className="w-full h-[58px] flex-none" space="sm">
                <Input className="flex-1" value={name} onChange={setName} placeholder="Название категории" />

                <Pressable
                    className="rounded-full bg-green-800 p-2 items-center justify-center px-5"
                    onPress={() => handleAddCustomCategoryCashback()}
                >
                    <Text className="text-white">Добавить</Text>
                </Pressable>
            </HStack>

            <FlatList
                className="mt-6"
                data={customCategoriesCashback}
                keyExtractor={(item) => item.code}
                ItemSeparatorComponent={() => <View className="h-[8px] bg-neutral-900" />}
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

            <ActionSheet ref={editCustomCategoryCashbackSheetRef}>
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
        </VStack>
    );
}
