import { BankCardWithCashback } from '@/types/bankCard';
import { CashbackCategoryItem } from '@components/pages/cashback/CashbackCategoryItem';
import { GradientContainer } from '@components/shared/GradientContainer';
import { Heading } from '@components/ui/heading';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';

interface CashbackCardProps {
    data: BankCardWithCashback;
}

export const CashbackCard = ({ data }: CashbackCardProps) => {
    return (
        <GradientContainer>
            <Heading className="text-white font-bold" size="3xl">
                {data.bankCard.name}
            </Heading>

            <Text>{data.bankCard.description}</Text>

            <VStack className="mt-2" space="md">
                {data.cashbackCategories?.map((category, index) => <CashbackCategoryItem key={index} {...category} />)}
            </VStack>
        </GradientContainer>
    );
};
