import { useCashback } from '@/hooks/useCashback';
import { CashbackCategoryStorage, CustomCategoryCashback } from '@/types/cashback';
import { Toggle } from '@components/shared/Toggle';
import { Box } from '@components/ui/box';
import { Text } from '@components/ui/text';
import { Star } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { FlatList as FlatListSheet } from 'react-native-actions-sheet';

interface EditCasbackCategoriesProps {
    handleSelectAddCashback: (code: string) => void;
}

type TypeCategories = 'system' | 'custom';

export const EditCasbackCategories = ({ handleSelectAddCashback }: EditCasbackCategoriesProps) => {
    const [typeCategories, setTypeCategories] = useState<TypeCategories>('system');

    const { categoriesGroupedQuery } = useCashback();

    const { system: systemCategories, custom: customCategories } = categoriesGroupedQuery.data || {};

    const categories = typeCategories === 'system' ? systemCategories : customCategories;

    const categoriesTypeItems = [
        { title: 'Системные', value: 'system' },
        { title: 'Добавленные', value: 'custom' },
    ];

    const renderCategoryIcon = (item: CashbackCategoryStorage | CustomCategoryCashback) => {
        if ('icon' in item) {
            const Icon = item.icon ?? Star;
            return <Icon color="white" width={20} height={20} style={{ marginRight: 10 }} />;
        }

        return null;
    };

    return (
        <>
            <Toggle
                items={categoriesTypeItems}
                active={typeCategories}
                setActive={(active) => setTypeCategories(active as TypeCategories)}
                className="mb-3"
            />

            <FlatListSheet
                ItemSeparatorComponent={() => <Box className="h-3" />}
                className="min-h-[30vh] max-h-[50vh]"
                data={categories}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <Pressable
                        className="flex-row items-center rounded-2xl bg-neutral-800 p-4"
                        onPress={() => handleSelectAddCashback(item.code)}
                        key={item.code}
                    >
                        {renderCategoryIcon(item)}
                        <Text size="xl">{item.name}</Text>
                    </Pressable>
                )}
            />
        </>
    );
};
