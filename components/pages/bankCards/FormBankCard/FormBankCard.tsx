import { ActionButtons } from '@components/shared/ActionButtons';
import { Input } from '@components/shared/Input';
import {
    FormControl,
    FormControlError,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
} from '@components/ui/form-control';
import { VStack } from '@components/ui/vstack';
import { BankCardFormData } from '@customTypes/bankCard';
import { router } from 'expo-router';
import { useState } from 'react';

import { BankCardSecurityDisclaimer } from '../BankCardSecurityDisclaimer';

interface FormBankCardProps {
    initialData?: Partial<BankCardFormData>;
    isPending?: boolean;
    btnSubmit: { title: string; onPress: (formData: BankCardFormData) => Promise<void> };
}

export const FormBankCard = ({ initialData, btnSubmit, isPending }: FormBankCardProps) => {
    const [invalidName, setInvalidName] = useState(false);

    const [formData, setFormData] = useState<BankCardFormData>({
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
    });

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

    const handleBack = () => {
        router.back();
    };

    const handleCancel = () => {
        clearForm();
        handleBack();
    };

    return (
        <VStack className="flex-1" space="2xl">
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

            <FormControl>
                <FormControlLabel className="mb-2">
                    <FormControlLabelText size="xl">Доп. описание</FormControlLabelText>
                </FormControlLabel>

                <Input
                    className="h-[60px] rounded-2xl"
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    value={formData.description}
                    placeholder="Например: Основная карта"
                />
            </FormControl>

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
