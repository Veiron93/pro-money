import { DebtListItem } from '@/components/pages/debts/DebtListItem';
import { Toggle } from '@/components/shared/Toggle';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { deleteDebt, getDebts, restoreDebt } from '@/services/debtService';
import { Debt, DebtorType } from '@/types/debts';
import { DebtsGrouped } from '@/types/debts';
import { Stack, useFocusEffect } from 'expo-router';
import { Trash, Undo2 } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

const DEBT_ACTION_BUTTON_STYLE = 'p-1 w-[40px] h-[40px] bg-neutral-900 rounded-full';

export default function Archive() {
    const [debtsTypeActive, setDebtsTypeActive] = useState<DebtorType>('i');

    const [debtsGrouped, setDebtsGrouped] = useState<DebtsGrouped>({
        i: [],
        me: [],
    });

    const initDebts = async () => {
        try {
            const debts = await getDebts();

            if (!debts) {
                return;
            }

            const filteredDebts = debts.filter((debt: Debt) => debt.isCompleted);

            const groupedDebts = filteredDebts.reduce<DebtsGrouped>(
                (acc, debt) => {
                    acc[debt.debtorType].push(debt);
                    return acc;
                },
                { i: [], me: [] },
            );

            setDebtsGrouped(groupedDebts);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    const handleRestore = async (id: string) => {
        try {
            await restoreDebt(id);
            initDebts();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDebt(id);
            initDebts();
        } catch (e) {
            console.log(e);
        }
    };

    const DebtsList = ({ debts, isVisible }: { debts: Debt[]; isVisible: boolean }) => {
        if (!isVisible) return null;

        return debts.length > 0 ? (
            <FlatList
                ItemSeparatorComponent={() => <Box className="h-4" />}
                contentContainerStyle={{ paddingBottom: 15 }}
                className="h-full"
                data={debts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <DebtListItem children={ActionButtons(item.id)} data={item} />}
            />
        ) : (
            <Text>Нет долгов</Text>
        );
    };

    const ActionButtons = (id: string) => {
        return (
            <>
                <Button className={DEBT_ACTION_BUTTON_STYLE} onPress={() => handleRestore(id)}>
                    <Undo2 size={20} color="white" />
                </Button>

                <Button className={DEBT_ACTION_BUTTON_STYLE} onPress={() => handleDelete(id)}>
                    <Trash size={20} color="#b91c1c" />
                </Button>
            </>
        );
    };

    useFocusEffect(
        useCallback(() => {
            initDebts();
        }, []),
    );

    return (
        <Box className="flex-1 gap-5 p-4 pb-0 bg-neutral-900">
            <Stack.Screen options={{ title: 'Архив' }} />

            <Toggle
                active={debtsTypeActive}
                setActive={(value) => setDebtsTypeActive(value as DebtorType)}
                items={[
                    { title: 'Я должен', value: 'i' },
                    { title: 'Мне должны', value: 'me' },
                ]}
            />

            <Box className="flex-1">
                <DebtsList debts={debtsGrouped.i} isVisible={debtsTypeActive === 'i'} />
                <DebtsList debts={debtsGrouped.me} isVisible={debtsTypeActive === 'me'} />
            </Box>
        </Box>
    );
}
