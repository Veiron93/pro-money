import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { Debt, DebtorType, DebtsGrouped } from '@customTypes/debts';
import { useMemo } from 'react';

interface TotalDebt {
    rub: number;
    eur: number;
    usd: number;
}

interface DebtListProps {
    debts: DebtsGrouped;
    debtsTypeActive: DebtorType;
}

const TOTAL_DEBT_ITEM_STYLES = 'px-[10px] py-[2px] bg-neutral-800 rounded-full';

const CURRENCIES = {
    '₽': 'rub',
    '€': 'eur',
    $: 'usd',
} as const;

export const TotalDebt = ({ debts, debtsTypeActive }: DebtListProps) => {
    const { totalDebtI, totalDebtMe, isTotalDebtI, isTotalDebtMe } = useMemo(() => {
        const calculateTotal = (debtsList: Debt[]) => {
            const total = {
                rub: 0,
                eur: 0,
                usd: 0,
            };

            debtsList.forEach((debt) => {
                if (debt.type === 'money') {
                    const currency = CURRENCIES[debt.currency as keyof typeof CURRENCIES];

                    if (currency) {
                        total[currency] += Number(debt.moneyAmount);
                    }
                }
            });

            return total;
        };

        const totalI = calculateTotal(debts.i);
        const totalMe = calculateTotal(debts.me);

        return {
            totalDebtI: totalI,
            totalDebtMe: totalMe,
            isTotalDebtI: Object.values(totalI).some((value) => value > 0),
            isTotalDebtMe: Object.values(totalMe).some((value) => value > 0),
        };
    }, [debts]);

    const renderTotalDebt = (total: TotalDebt) => (
        <HStack className="items-center" space="sm">
            <Text>Итого:</Text>
            {total.rub > 0 && <Text className={TOTAL_DEBT_ITEM_STYLES}>{total.rub} ₽</Text>}
            {total.eur > 0 && <Text className={TOTAL_DEBT_ITEM_STYLES}>{total.eur} €</Text>}
            {total.usd > 0 && <Text className={TOTAL_DEBT_ITEM_STYLES}>{total.usd} $</Text>}
        </HStack>
    );

    if (!isTotalDebtI && !isTotalDebtMe) return null;

    return (
        <HStack className="w-full h-[32px]" space="md">
            {debtsTypeActive === 'i' && isTotalDebtI && renderTotalDebt(totalDebtI)}
            {debtsTypeActive === 'me' && isTotalDebtMe && renderTotalDebt(totalDebtMe)}
        </HStack>
    );
};
