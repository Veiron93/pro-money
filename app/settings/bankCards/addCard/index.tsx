import { BankCardSecurityDisclaimer } from '@/components/pages/bankCards/BankCardSecurityDisclaimer';
import { FormBankCard } from '@/components/pages/bankCards/FormBankCard';
import { ActionButtons } from '@/components/shared/ActionButtons';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { addBankCard } from '@/services/bankCardService';
import type { BankCardFormData } from '@/types/bankCard';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';

export default function AddCardScreen() {
    const toast = useToast();
    const router = useRouter();

    const [invalidName, setInvalidName] = useState(false);
    const [isPendingAdd, setIsPendingAdd] = useState(false);

    const [formData, setFormData] = useState<BankCardFormData>({
        name: '',
        description: '',
    });

    const handleAddCard = () => {
        const { name, description } = formData;

        if (name.length === 0) {
            setInvalidName(true);
            return false;
        }

        setInvalidName(false);
        setIsPendingAdd(true);

        addBankCard({ name, description })
            .then(() => {
                onClearForm();
                router.back();
            })
            .catch(() => {
                showError('Карта не добавлена');
            })
            .finally(() => {
                setIsPendingAdd(false);
            });
    };

    const showError = (errorText: string) => {
        toast.show({
            placement: 'top',
            duration: 4000,
            render: () => {
                return (
                    <Toast action="error" variant="solid">
                        <ToastTitle>Ошибка!</ToastTitle>
                        <ToastDescription>{errorText}</ToastDescription>
                    </Toast>
                );
            },
        });
    };

    const handleCancel = () => {
        router.back();
    };

    const onClearForm = () => {
        setFormData({
            name: '',
            description: '',
        });
    };

    return (
        <VStack className="p-4 flex-1" space="2xl">
            <Stack.Screen options={{ title: 'Добавить банковскую карту' }} />

            <FormBankCard formData={formData} setFormData={setFormData} invalidName={invalidName} />

            <BankCardSecurityDisclaimer />

            <ActionButtons
                confirm={handleAddCard}
                cancel={handleCancel}
                isPending={isPendingAdd}
                confirmText="Добавить"
            />
        </VStack>
    );
}
