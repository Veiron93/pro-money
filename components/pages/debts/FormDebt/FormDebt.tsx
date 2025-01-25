import { ActionButtons } from '@components/shared/ActionButtons';
import { Input } from '@components/shared/Input';
import { Toggle } from '@components/shared/Toggle';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { DebtFormData, DebtType, DebtorType } from '@customTypes/debts';
import { CURRENCY } from '@keys/currency';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';

const DEBTOR_TYPE = {
    I: 'i' as DebtorType,
    ME: 'me' as DebtorType,
} as const;

const DEBT_TYPE = {
    MONEY: 'money' as DebtType,
    OTHER: 'other' as DebtType,
} as const;

interface FormDebtProps {
    initialData?: Partial<DebtFormData>;
    isPending?: boolean;
    btnSubmit: { title: string; onPress: (formData: DebtFormData) => Promise<void> };
}

export const FormDebt = ({ initialData, btnSubmit, isPending }: FormDebtProps) => {
    const [invalidDebtorName, setInvalidDebtorName] = useState(false);
    const [invalidAmount, setInvalidAmount] = useState(false);

    const [formData, setFormData] = useState<DebtFormData>({
        debtorType: initialData?.debtorType ?? DEBTOR_TYPE.I,
        type: initialData?.type ?? DEBT_TYPE.MONEY,
        currency: initialData?.currency ?? CURRENCY.RUB,
        debtorName: initialData?.debtorName ?? '',
        amount: initialData?.amount ?? '',
        date: initialData?.date ?? '',
        description: initialData?.description ?? '',
    });

    const debtorTypeItems = [
        { title: 'Я должен', value: DEBTOR_TYPE.I },
        { title: 'Мне должны', value: DEBTOR_TYPE.ME },
    ];

    const debtTypeItems = [
        { title: 'Деньги', value: DEBT_TYPE.MONEY },
        { title: 'Другое', value: DEBT_TYPE.OTHER },
    ];

    const currencyItems = [
        { title: CURRENCY.RUB, value: CURRENCY.RUB },
        { title: CURRENCY.EUR, value: CURRENCY.EUR },
        { title: CURRENCY.USD, value: CURRENCY.USD },
    ];

    const handleSubmit = () => {
        if (validateFormData()) {
            btnSubmit.onPress(formData).then(() => {
                clearFormData();
                handleBack();
            });
        }
    };

    const validateFormData = () => {
        if (formData.debtorName.length === 0) {
            setInvalidDebtorName(true);
            return false;
        } else {
            setInvalidDebtorName(false);
        }

        if (formData.amount.length === 0) {
            setInvalidAmount(true);
            return false;
        } else {
            setInvalidAmount(false);
        }

        return true;
    };

    const handleCancel = () => {
        clearFormData();
        handleBack();
    };

    const clearFormData = () => {
        setFormData({
            debtorType: DEBTOR_TYPE.I,
            type: DEBT_TYPE.MONEY,
            currency: CURRENCY.RUB,
            debtorName: '',
            amount: '',
            date: '',
            description: '',
        });
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <VStack className="gap-y-[20px] flex-1">
            <ScrollView>
                <VStack space="xl">
                    <VStack space="md">
                        <Toggle
                            active={formData.debtorType}
                            setActive={(value) => setFormData({ ...formData, debtorType: value as DebtorType })}
                            items={debtorTypeItems}
                        />

                        <Toggle
                            active={formData.type}
                            setActive={(value) => setFormData({ ...formData, type: value as DebtType })}
                            items={debtTypeItems}
                        />
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">
                            {formData.debtorType === DEBTOR_TYPE.I ? 'Кому / Куда должен' : 'Кто должен'}
                        </Text>

                        <Input
                            isInvalid={invalidDebtorName}
                            value={formData.debtorName}
                            onChange={(value) => setFormData({ ...formData, debtorName: value })}
                        />
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">
                            {formData.type === DEBT_TYPE.MONEY
                                ? 'Сумма'
                                : formData.debtorType === DEBTOR_TYPE.I
                                  ? 'Что должен'
                                  : 'Что должны'}
                        </Text>

                        <HStack space="md" className="items-center">
                            <Input
                                isInvalid={invalidAmount}
                                onChange={(value) => setFormData({ ...formData, amount: value })}
                                className={`${formData.type === DEBT_TYPE.MONEY ? 'flex-1' : 'w-full'}`}
                                value={formData.amount}
                                placeholder={formData.type === DEBT_TYPE.MONEY ? '1000' : 'Книгу'}
                                keyboardType={formData.type === DEBT_TYPE.MONEY ? 'numeric' : 'default'}
                            />

                            {formData.type === DEBT_TYPE.MONEY && (
                                <Toggle
                                    style="flex-1"
                                    active={formData.currency}
                                    setActive={(value) => setFormData({ ...formData, currency: value as CURRENCY })}
                                    items={currencyItems}
                                />
                            )}
                        </HStack>
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">До какого времени</Text>
                        <Input
                            value={formData.date}
                            placeholder="01.01.2024"
                            onChange={(value) => setFormData({ ...formData, date: value })}
                        />
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">Примечание</Text>
                        <Input
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            value={formData.description}
                            placeholder={formData.type === DEBT_TYPE.MONEY ? 'За обед в столовой' : 'Гуси лебеди'}
                        />
                    </VStack>
                </VStack>
            </ScrollView>

            <ActionButtons
                confirm={handleSubmit}
                cancel={handleCancel}
                isPending={isPending}
                confirmText={btnSubmit.title}
            />
        </VStack>
    );
};
