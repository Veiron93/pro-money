import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Debt } from '@/types/debts';
import { LinearGradient } from 'expo-linear-gradient';
import { ClockIcon } from 'lucide-react-native';
import { FC } from 'react';

const amountStyle = 'text-green-600';

export const DebtCard: FC<{ data: Debt }> = ({ data }) => {
    const { debtorName, amount, date, description, type, currency } = data;

    return (
        <LinearGradient
            className="overflow-hidden rounded-3xl p-4"
            colors={['#262626', '#404040']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <VStack space="sm">
                <HStack space="md" className="items-center justify-between">
                    <Text size="2xl">{debtorName}</Text>
                    <HStack space="xs">
                        <Text className={amountStyle} size="2xl">
                            {amount}
                        </Text>
                        {type === 'money' && (
                            <Text className={amountStyle} size="2xl">
                                {currency}
                            </Text>
                        )}
                    </HStack>
                </HStack>

                {date && (
                    <HStack space="sm" className="items-center">
                        <ClockIcon size={16} color="white" />
                        <Text size="md">{date}</Text>
                    </HStack>
                )}

                {description && (
                    <Text size="md" className="text-neutral-400">
                        {description}
                    </Text>
                )}
            </VStack>
        </LinearGradient>
    );
};
