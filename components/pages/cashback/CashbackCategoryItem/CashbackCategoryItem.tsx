import { Box } from '@components/ui/box';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import type { CashbackCategoryWithPercent } from '@customTypes/cashback';
import { Star } from 'lucide-react-native';

export const CashbackCategoryItem = ({ name, percent, icon }: CashbackCategoryWithPercent) => {
    const IconCategory = icon ?? Star;

    return (
        <HStack className="items-center">
            <Box className="rounded-full bg-orange-800 p-2">
                <IconCategory color="white" size={20} />
            </Box>

            <Text className="ml-3" size="2xl">
                {name}
            </Text>

            <Text className="ml-auto" size="xl">
                {percent}%
            </Text>
        </HStack>
    );
};
