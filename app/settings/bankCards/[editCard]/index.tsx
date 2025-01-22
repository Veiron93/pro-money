import { FormBankCard } from '@/components/pages/bankCards/FormBankCard/FormBankCard';
import { ActionButtons } from '@/components/shared/ActionButtons';
import { Spinner } from '@/components/shared/Spinner';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { getBankCardById } from '@/services/bankCardService';
import { updateBankCard } from '@/services/bankCardService';
import type { BankCardFormData } from '@/types/bankCard';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export default function EditCardScreen() {
    const toast = useToast();
    const router = useRouter();

    const { editCard } = useLocalSearchParams();

    const [isCardLoading, setIsCardLoading] = useState(true);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);

    const [invalidName, setInvalidName] = useState(false);

    const [formData, setFormData] = useState<BankCardFormData>({
        name: '',
        description: '',
    });

    const handleUpdate = async () => {
        if (formData.name.length === 0) {
            setInvalidName(true);
            return false;
        }

        setInvalidName(false);
        setIsPendingUpdate(true);

        await updateBankCard(String(editCard), formData)
            .then(() => {
                router.back();
            })
            .catch((e) => {
                showError('Ошибка при обновлении карты');
            })
            .finally(() => {
                setIsPendingUpdate(false);
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
        setInvalidName(false);
        router.back();
    };

    const loadData = async () => {
        setIsCardLoading(true);

        await getBankCardById(String(editCard))
            .then((card) => {
                setFormData({
                    name: card?.name || '',
                    description: card?.description || '',
                });
            })
            .finally(() => {
                setIsCardLoading(false);
            });
    };

    useEffect(() => {
        if (!editCard) {
            router.replace('/settings/bankCards');
        }
    }, [editCard]);

    useFocusEffect(
        useCallback(() => {
            if (editCard && typeof editCard === 'string') {
                loadData();
            }
        }, [editCard]),
    );

    return (
        <VStack className="p-4 flex-1">
            <Stack.Screen options={{ title: 'Редактировать карту' }} />

            {isCardLoading && <Spinner />}

            {!isCardLoading && (
                <>
                    <FormBankCard formData={formData} setFormData={setFormData} invalidName={invalidName} />

                    <ActionButtons
                        confirm={handleUpdate}
                        cancel={handleCancel}
                        isPending={isPendingUpdate}
                        confirmText="Сохранить"
                    />
                </>
            )}
        </VStack>
    );
}
