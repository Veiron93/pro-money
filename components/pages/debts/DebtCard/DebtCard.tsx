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

    const RemainingTime = ({ date }: { date: Date }) => {
        const timeLeft = dayjs(date).fromNow(true);
        const daysLeft = dayjs(date).diff(dayjs(), 'days');

        const colors = {
            normal: '#a3a3a3',
            attention: '#f97316',
            overdue: '#ef4444',
        };

        const color = daysLeft < 0 ? colors.overdue : daysLeft < 3 ? colors.attention : colors.normal;
        const text = daysLeft < 0 ? 'просрочен на' : timeLeft === 'день' ? 'остался' : 'осталось';

        return (
            <HStack space="xs" className="items-center">
                <Hourglass size={16} color={color} />
                <Text style={{ color }} size="md">
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
