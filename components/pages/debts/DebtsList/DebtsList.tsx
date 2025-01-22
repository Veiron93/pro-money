// TODO: Дописать компонент
import { DebtListItem } from '@components/pages/debts/DebtListItem';
import { Box } from '@components/ui/box';
import type { Debt } from '@customTypes/debts';
import { ReactNode } from 'react';
import { FlatList } from 'react-native';

export const DebtsList = ({ debts, actionButtons }: { debts: Debt[]; actionButtons: ReactNode }) => {
    return (
        <FlatList
            ItemSeparatorComponent={() => <Box className="h-4" />}
            contentContainerStyle={{ paddingBottom: 90 }}
            className="h-full"
            data={debts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DebtListItem actions={<actionButtons id={item.id} />} data={item} />}
        />
    );
};
