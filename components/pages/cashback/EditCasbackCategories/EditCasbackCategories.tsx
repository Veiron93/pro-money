import { Toggle } from '@components/shared/Toggle';
import { Box } from '@components/ui/box';
import { Text } from '@components/ui/text';
import { TypeCategories } from '@customTypes/cashback';
import { useCustomCategoriesCashback } from '@hooks/useCustomCategoriesCashback';
import { CashbackCategories } from '@storage/cashbackCategories';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { FlatList as FlatListSheet } from 'react-native-actions-sheet';

interface EditCasbackCategoriesProps {
    handleSelectAddCashback: (code: string) => void;
}

export const EditCasbackCategories = ({ handleSelectAddCashback }: EditCasbackCategoriesProps) => {
    const [typeCategories, setTypeCategories] = useState<TypeCategories>('system');

    const { categories: customCategoriesCashback } = useCustomCategoriesCashback();

    // TODO: вынести список в компонент
    return (
        <>
            <Toggle
                items={[
                    { title: 'Системные', value: 'system' },
                    { title: 'Добавленные', value: 'custom' },
                ]}
                active={typeCategories}
                setActive={(active) => setTypeCategories(active as TypeCategories)}
                className="mb-3"
            />

            {typeCategories === 'system' && (
                <FlatListSheet
                    ItemSeparatorComponent={() => <Box className="h-3" />}
                    className="min-h-[30vh] max-h-[50vh]"
                    data={CashbackCategories}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <Pressable
                            className="flex-row items-center rounded-2xl bg-neutral-800 p-4 gap-4"
                            onPress={() => handleSelectAddCashback(item.code)}
                            key={item.code}
                        >
                            {item.icon}

                            <Text size="xl">{item.name}</Text>
                        </Pressable>
                    )}
                />
            )}

            {typeCategories === 'custom' && (
                <FlatListSheet
                    ItemSeparatorComponent={() => <Box className="h-3" />}
                    className="min-h-[30vh] max-h-[50vh]"
                    data={customCategoriesCashback.data}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <Pressable
                            className="flex-row items-center rounded-2xl bg-neutral-800 p-4"
                            onPress={() => handleSelectAddCashback(item.code)}
                            key={item.code}
                        >
                            <Text size="xl">{item.name}</Text>
                        </Pressable>
                    )}
                />
            )}
        </>
    );
};
