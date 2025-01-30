import { ActionButtons } from '@components/shared/ActionButtons';
import { Input } from '@components/shared/Input';
import { Toggle } from '@components/shared/Toggle';
import { Button, ButtonText } from '@components/ui/button';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { DebtFormData, DebtType, DebtorType } from '@customTypes/debts';
import { useHandleBack } from '@hooks/useHandleBack';
import { CURRENCY } from '@keys/currency';
import { LEVELS } from '@keys/levels';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';

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
    const handleBack = useHandleBack('/debts');

    const [formData, setFormData] = useState<DebtFormData>({
        debtorType: initialData?.debtorType ?? DEBTOR_TYPE.I,
        type: initialData?.type ?? DEBT_TYPE.MONEY,
        currency: initialData?.currency ?? CURRENCY.RUB,
        debtorName: initialData?.debtorName ?? '',
        moneyAmount: initialData?.moneyAmount ?? '',
        otherAmount: initialData?.otherAmount ?? '',
        date: initialData?.date || undefined,
        description: initialData?.description ?? '',
        level: initialData?.level ?? LEVELS.LOW,
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

    const levelItems = [
        { title: LEVELS.LOW, value: LEVELS.LOW },
        { title: LEVELS.MEDIUM, value: LEVELS.MEDIUM },
        { title: LEVELS.HIGH, value: LEVELS.HIGH },
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

        if (
            (formData.type === DEBT_TYPE.MONEY && formData.moneyAmount.length === 0) ||
            (formData.type === DEBT_TYPE.OTHER && formData.otherAmount.length === 0)
        ) {
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
            moneyAmount: '',
            otherAmount: '',
            date: undefined,
            description: '',
            level: LEVELS.LOW,
        });
    };

    const handleMoneyAmountChange = (value: string) => {
        const numericValue = value.replace(/[^0-9.,]/g, '');
        const formattedValue = numericValue.replace(',', '.').replace(/(\..*)\./g, '$1');
        setFormData({ ...formData, moneyAmount: formattedValue });
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
                            maxLength={15}
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
                            {formData.type === DEBT_TYPE.MONEY ? (
                                <>
                                    <Input
                                        isInvalid={invalidAmount}
                                        onChange={handleMoneyAmountChange}
                                        className="flex-1"
                                        value={formData.moneyAmount}
                                        placeholder="1000"
                                        keyboardType="numeric"
                                        maxLength={11}
                                    />
                                    <Toggle
                                        className="flex-1"
                                        active={formData.currency}
                                        setActive={(value) => setFormData({ ...formData, currency: value as CURRENCY })}
                                        items={currencyItems}
                                    />
                                </>
                            ) : (
                                <Input
                                    isInvalid={invalidAmount}
                                    onChange={(value) => setFormData({ ...formData, otherAmount: value })}
                                    className="w-full"
                                    value={formData.otherAmount}
                                    placeholder="Книгу"
                                    maxLength={20}
                                />
                            )}
                        </HStack>
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">До какого времени</Text>

                        <HStack space="lg">
                            <DatePickerInput
                                locale="ru"
                                value={formData.date ? new Date(formData.date) : undefined}
                                onChange={(d) => setFormData({ ...formData, date: d })}
                                startYear={new Date().getFullYear()}
                                validRange={{
                                    startDate: new Date(),
                                }}
                                inputMode="start"
                                label=" "
                                mode="outlined"
                                startWeekOnMonday={true}
                                withDateFormatInLabel={false}
                                textColor="white"
                                style={{ height: 58, marginTop: -6 }}
                                outlineStyle={{ borderRadius: 16 }}
                                iconColor="white"
                                theme={{
                                    colors: {
                                        background: 'none',
                                        primary: 'white',
                                        outline: '#747474',
                                    },
                                }}
                            />

                            <Button
                                onPress={() => setFormData({ ...formData, date: undefined })}
                                className="w-[150px] h-[58px] rounded-2xl"
                                size="xl"
                                variant={formData.date ? 'outline' : 'solid'}
                            >
                                <ButtonText>Без даты</ButtonText>
                            </Button>
                        </HStack>
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">Уровень важности</Text>

                        <Toggle
                            active={formData.level}
                            setActive={(value) => setFormData({ ...formData, level: value as LEVELS })}
                            items={levelItems}
                        />
                    </VStack>

                    <VStack space="md">
                        <Text size="xl">Примечание</Text>
                        <Input
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            value={formData.description}
                            placeholder={formData.type === DEBT_TYPE.MONEY ? 'За обед в столовой' : 'Буратино'}
                            maxLength={100}
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
