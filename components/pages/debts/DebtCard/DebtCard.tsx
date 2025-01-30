import { GradientContainer } from '@components/shared/GradientContainer';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { Debt } from '@customTypes/debts';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Hourglass } from 'lucide-react-native';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export const DebtCard = ({ data }: { data: Debt }) => {
    const { debtorName, amount, date, description, type, currency } = data;

    const AmountText = ({ text }: { text: string }) => {
        return (
            <Text className="text-green-600" size="2xl">
                {text}
            </Text>
        );
    };

    // FIXME: разобраться с датой когда остался 1 день
    const RemainingTime = ({ date }: { date: Date }) => {
        const timeLeft = dayjs(date).fromNow(true);
        const daysLeft = dayjs(date).diff(dayjs(), 'days');

        const сolor = daysLeft <= 3 ? '#f97316' : '#a3a3a3';
        const text = timeLeft === 'день' ? 'остался' : 'осталось';

        return (
            <HStack space="xs" className="items-center">
                <Hourglass size={16} color={сolor} />
                <Text style={{ color: сolor }} size="md">
                    {text} {timeLeft}
                </Text>
            </HStack>
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

                {date && <RemainingTime date={date} />}

                {description && (
                    <Text className="text-neutral-400" size="md">
                        {description}
                    </Text>
                )}
            </VStack>
        </GradientContainer>
    );
};
