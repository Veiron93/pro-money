import { Box } from '@components/ui/box';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import type { CashbackCategory } from '@customTypes/cashback';

export const CashbackCategoryItem = ({ name, precent, icon }: CashbackCategory) => {
    return (
        <HStack className="items-center">
            <Box className="rounded-full bg-green-800 p-2">{icon}</Box>
            <Text className="ml-3" size="2xl">
                {name}
            </Text>
            <Text className="ml-auto" size="2xl">
                {precent}%
            </Text>
        </HStack>
    );
};
