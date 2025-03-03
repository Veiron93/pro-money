import { CashbackCategoryItem } from '@components/pages/cashback/CashbackCategoryItem';
import { GradientContainer } from '@components/shared/GradientContainer';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { BankCardWithCashback } from '@customTypes/bankCard';

export const CashbackCard = ({ bankCard, cashbackCategories }: BankCardWithCashback) => {
    const { name, lastFourDigits, description } = bankCard;

    const isLastFourDigits = Boolean(lastFourDigits);
    const isDescription = Boolean(description);

    return (
        <GradientContainer>
            <HStack className="justify-between items-center" space="md">
                <Text className="text-white font-bold" size="2xl">
                    {name}
                </Text>

                {isLastFourDigits && <Text className="text-neutral-400">{lastFourDigits}</Text>}
            </HStack>

            {isDescription && <Text className="text-neutral-400">{description}</Text>}

            {cashbackCategories.length > 0 && (
                <VStack className="mt-3" space="md">
                    {cashbackCategories.map((category, index) => (
                        <CashbackCategoryItem key={index} {...category} />
                    ))}
                </VStack>
            )}
        </GradientContainer>
    );
};
