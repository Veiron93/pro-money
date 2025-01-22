import { Toggle } from '@/components/shared/Toggle';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Currency, DebtFormData, DebtType, DebtorType } from '@/types/debts';
import { router } from 'expo-router';
import { useState } from 'react';
import { FC } from 'react';
import { ScrollView } from 'react-native';

const DEBTOR_TYPE = {
    I: 'i' as DebtorType,
    ME: 'me' as DebtorType,
} as const;

const DEBT_TYPE = {
    MONEY: 'money' as DebtType,
    OTHER: 'other' as DebtType,
} as const;

const CURRENCY = {
    RUB: '₽' as Currency,
    EUR: '€' as Currency,
    USD: '$' as Currency,
} as const;

interface FormDebtProps {
    initialData?: Partial<DebtFormData>;
    btnSubmit: { title: string; onPress: (formData: DebtFormData) => Promise<void> };
}

export const FormDebt: FC<FormDebtProps> = ({ initialData, btnSubmit }: FormDebtProps) => {
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
                            items={[
                                { title: 'Я должен', value: DEBTOR_TYPE.I },
                                { title: 'Мне должны', value: DEBTOR_TYPE.ME },
                            ]}
                        />

                        <Toggle
                            active={formData.type}
                            setActive={(value) => setFormData({ ...formData, type: value as DebtType })}
                            items={[
                                { title: 'Деньги', value: DEBT_TYPE.MONEY },
                                { title: 'Другое', value: DEBT_TYPE.OTHER },
                            ]}
                        />
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">
                            {formData.debtorType === DEBTOR_TYPE.I ? 'Кому / Куда должен' : 'Кто должен'}
                        </Text>
                        <Input isInvalid={invalidDebtorName} className="h-[56px] rounded-2xl">
                            <InputField
                                onChangeText={(value) => setFormData({ ...formData, debtorName: value })}
                                value={formData.debtorName}
                                className="text-xl"
                                placeholder={formData.debtorType === DEBTOR_TYPE.ME ? 'Иван' : 'Петру'}
                            />
                        </Input>
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
                                className={`flex-0 h-[56px] rounded-2xl ${formData.type === DEBT_TYPE.MONEY ? 'w-[200px]' : 'w-full'}`}
                            >
                                <InputField
                                    onChangeText={(value) => setFormData({ ...formData, amount: value })}
                                    value={formData.amount}
                                    keyboardType={formData.type === DEBT_TYPE.MONEY ? 'numeric' : 'default'}
                                    className="text-xl"
                                    placeholder={formData.type === DEBT_TYPE.MONEY ? '1000' : 'Книгу'}
                                />
                            </Input>

                            {formData.type === DEBT_TYPE.MONEY && (
                                <Toggle
                                    active={formData.currency}
                                    setActive={(value) => setFormData({ ...formData, currency: value as Currency })}
                                    items={[
                                        { title: CURRENCY.RUB, value: CURRENCY.RUB },
                                        { title: CURRENCY.EUR, value: CURRENCY.EUR },
                                        { title: CURRENCY.USD, value: CURRENCY.USD },
                                    ]}
                                />
                            )}
                        </HStack>
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">До какого времени</Text>
                        <Input className="h-[56px] rounded-2xl">
                            <InputField
                                onChangeText={(value) => setFormData({ ...formData, date: value })}
                                value={formData.date}
                                className="text-xl"
                                placeholder="01.01.2024"
                                keyboardType="numeric"
                            />
                        </Input>
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">Примечание</Text>
                        <Input className="h-[56px] rounded-2xl">
                            <InputField
                                onChangeText={(value) => setFormData({ ...formData, description: value })}
                                value={formData.description}
                                className="text-xl"
                                placeholder={formData.type === DEBT_TYPE.MONEY ? 'За обед в столовой' : 'Война и мир'}
                            />
                        </Input>
                    </VStack>
                </VStack>
            </ScrollView>

            <HStack className="mt-auto w-full justify-between">
                <Button onPress={handleSubmit} className="w-[48%] rounded-2xl" size="xl">
                    <ButtonText>{btnSubmit.title}</ButtonText>
                </Button>

                <Button onPress={handleCancel} className="w-[48%] rounded-2xl" size="xl" variant="outline">
                    <ButtonText>Отмена</ButtonText>
                </Button>
            </HStack>
        </VStack>
    );
};
