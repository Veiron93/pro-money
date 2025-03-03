import { GradientContainer } from '@components/shared/GradientContainer';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { CURRENCY } from '@constants/currency';
import { Debt } from '@customTypes/debts';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Hourglass } from 'lucide-react-native';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export const DebtCard = ({ data }: { data: Debt }) => {
    const { debtorName, moneyAmount, otherAmount, date, description, type, currency, isCompleted } = data;

    const MoneyAmount = ({ value, currency }: { value: string; currency: CURRENCY }) => {
        const formattedText = value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '0';

        return (
            <Text className="text-neutral-400" size="2xl">
                {formattedText} {currency}
            </Text>
        );
    };

    const OtherAmount = ({ value }: { value: string }) => {
        return (
            <Text className="text-neutral-400" size="md">
                {value}
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
        <VStack space="sm" className="rounded-3xl">
            <HStack space="md" className="items-center justify-between">
                <Text size="2xl" className="text-white">
                    {debtorName}
                </Text>
                <HStack className="flex-none" space="xs">
                    {type === 'money' && <MoneyAmount value={moneyAmount} currency={currency} />}
                    {type === 'other' && <OtherAmount value={otherAmount} />}
                </HStack>
            </HStack>

            {description && (
                <Text className="text-neutral-400" size="md">
                    {description}
                </Text>
            )}

            {date && !isCompleted && <RemainingTime date={date} />}
        </VStack>
    );
};
