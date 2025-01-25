import { CashbackCategoryItem } from '@components/pages/cashback/CashbackCategoryItem';
import { GradientContainer } from '@components/shared/GradientContainer';
import { Heading } from '@components/ui/heading';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import type { CashbackItem } from '@customTypes/cashback';

export const CashbackCard = ({ card, cashbackCategories }: CashbackItem) => {
    return (
        <GradientContainer>
            <Heading className="text-white font-bold" size="3xl">
                {card.name}
            </Heading>

            <Text>{card.description}</Text>

            <VStack className="mt-2" space="md">
                {cashbackCategories?.map((category, index) => <CashbackCategoryItem key={index} {...category} />)}
            </VStack>
        </GradientContainer>
    );
};
