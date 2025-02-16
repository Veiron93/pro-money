import { ActionButtons } from '@components/shared/ActionButtons';
import { Input } from '@components/shared/Input';
import { Toggle } from '@components/shared/Toggle';
import {
    FormControl,
    FormControlError,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
} from '@components/ui/form-control';
import { VStack } from '@components/ui/vstack';
import { BankCardFormData } from '@customTypes/bankCard';
import { useHandleBack } from '@hooks/useHandleBack';
import { useState } from 'react';
import { ScrollView } from 'react-native';

import { BankCardSecurityDisclaimer } from '../BankCardSecurityDisclaimer';

interface FormBankCardProps {
    initialData?: Partial<BankCardFormData>;
    isPending?: boolean;
    btnSubmit: { title: string; onPress: (formData: BankCardFormData) => Promise<void> };
}

export const FormBankCard = ({ initialData, btnSubmit, isPending }: FormBankCardProps) => {
    const handleBack = useHandleBack('/settings/bankCards');

    const [invalidName, setInvalidName] = useState(false);
    const [invalidExpirationDate, setInvalidExpirationDate] = useState(false);
    const [invalidLastFourDigits, setInvalidLastFourDigits] = useState(false);

    const [formData, setFormData] = useState<BankCardFormData>({
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
        lastFourDigits: initialData?.lastFourDigits ?? undefined,
        expirationDate: initialData?.expirationDate ?? undefined,
        isActive: initialData?.isActive ?? true,
    });

    const formatExpirationDate = (value: string) => {
        // Получаем предыдущее значение
        const prevValue = formData.expirationDate || '';

        // Если пользователь удаляет символ и предыдущее значение заканчивается на '/'
        if (value.length < prevValue.length && prevValue.endsWith('/')) {
            // Удаляем последние два символа (цифру и слеш)
            return value.slice(0, -1);
        }

        // Удаляем все нецифровые символы
        const numbers = value.replace(/\D/g, '');

        // Проверяем валидность месяца
        if (numbers.length >= 2) {
            const month = parseInt(numbers.slice(0, 2));
            if (month > 12) {
                return numbers.slice(0, 1);
            }
        }

        // Проверяем валидность года
        if (numbers.length >= 4) {
            const currentYear = new Date().getFullYear() % 100;
            const inputYear = parseInt(numbers.slice(2, 4));

            if (inputYear < currentYear) {
                setInvalidExpirationDate(true);
            } else {
                setInvalidExpirationDate(false);
            }
        }

        // Форматируем в MM/YY
        if (numbers.length >= 2) {
            return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
        }
        return numbers;
    };

    const handleSubmit = () => {
        if (validateFormData()) {
            btnSubmit.onPress(formData).then(() => {
                clearForm();
                handleBack();
            });
        }
    };

    const validateFormData = () => {
        if (formData.name.length === 0) {
            setInvalidName(true);
            return false;
        }

        setInvalidName(false);
        return true;
    };

    const clearForm = () => {
        setFormData({
            name: '',
            description: '',
        });
    };

    const handleCancel = () => {
        clearForm();
        handleBack();
    };

    const handleLastFourDigitsChange = (value: string) => {
        // Проверяем, содержит ли значение только цифры
        if (!/^\d*$/.test(value)) {
            setInvalidLastFourDigits(true);
            return;
        }
        setInvalidLastFourDigits(false);
        setFormData({ ...formData, lastFourDigits: value ? Number(value) : undefined });
    };

    return (
        <VStack className="flex-1" space="2xl">
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space="2xl">
                    <FormControl isRequired>
                        <FormControlLabel className="mb-2">
                            <FormControlLabelText size="xl">Название карты</FormControlLabelText>
                        </FormControlLabel>

                        <Input
                            isInvalid={invalidName}
                            value={formData.name}
                            onChange={(value) => setFormData({ ...formData, name: value })}
                        />

                        <FormControlError>
                            <FormControlErrorText>Поле обязательное для заполнения</FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl isInvalid={invalidLastFourDigits}>
                        <FormControlLabel className="mb-2">
                            <FormControlLabelText size="xl">Последние 4 цифры</FormControlLabelText>
                        </FormControlLabel>

                        <Input
                            keyboardType="number-pad"
                            maxLength={4}
                            className="h-[60px] rounded-2xl"
                            onChange={handleLastFourDigitsChange}
                            value={formData.lastFourDigits?.toString()}
                        />

                        <FormControlError>
                            <FormControlErrorText>Допускаются только цифры</FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl isInvalid={invalidExpirationDate}>
                        <FormControlLabel className="mb-2">
                            <FormControlLabelText size="xl">Срок действия</FormControlLabelText>
                        </FormControlLabel>

                        <Input
                            className="h-[60px] rounded-2xl"
                            onChange={(value) => {
                                const formatted = formatExpirationDate(value);
                                setFormData({ ...formData, expirationDate: formatted });
                            }}
                            value={formData.expirationDate}
                            placeholder="ММ/ГГ"
                            keyboardType="number-pad"
                            maxLength={5}
                        />

                        <FormControlError>
                            <FormControlErrorText>Срок действия карты истёк</FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel className="mb-2">
                            <FormControlLabelText size="xl">Доп. описание</FormControlLabelText>
                        </FormControlLabel>

                        <Input
                            className="h-[60px] rounded-2xl"
                            maxLength={25}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            value={formData.description}
                            placeholder="Например: Основная карта"
                        />
                    </FormControl>

                    <Toggle
                        active={formData.isActive ? 'active' : 'inactive'}
                        setActive={(value) => setFormData({ ...formData, isActive: value === 'active' })}
                        items={[
                            { title: 'Активна', value: 'active' },
                            { title: 'Неактивна', value: 'inactive' },
                        ]}
                    />
                </VStack>
            </ScrollView>

            <BankCardSecurityDisclaimer />

            <ActionButtons
                confirm={handleSubmit}
                cancel={handleCancel}
                isPending={isPending}
                confirmText={btnSubmit.title}
            />
        </VStack>
    );
};
