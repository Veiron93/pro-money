import { GradientContainer } from '@components/shared/GradientContainer';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { Debt } from '@customTypes/debts';
import { ClockIcon } from 'lucide-react-native';

export const DebtCard = ({ data }: { data: Debt }) => {
    const { debtorName, amount, date, description, type, currency } = data;

    const AmountText = ({ text }: { text: string }) => {
        return (
            <Text className="text-green-600" size="2xl">
                {text}
            </Text>
        );
    };

    return (
        <GradientContainer>
            <VStack space="sm">
                <HStack space="md" className="items-center justify-between">
                    <Text size="2xl">{debtorName}</Text>
                    <HStack className="flex-none" space="xs">
                        <AmountText text={amount} />
                        {type === 'money' && <AmountText text={currency} />}
                    </HStack>
                </HStack>

                {date && (
                    <HStack space="sm" className="items-center">
                        <ClockIcon size={16} color="white" />
                        <Text size="md">{date}</Text>
                    </HStack>
                )}

                {description && (
                    <Text className="text-neutral-400" size="md">
                        {description}
                    </Text>
                )}
            </VStack>
        </GradientContainer>
    );
};
