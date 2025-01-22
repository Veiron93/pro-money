import { FormDebt } from '@/components/pages/debts/FormDebt';
import { Box } from '@/components/ui/box';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { getDebtById, getDebts } from '@/services/debtService';
import { STORAGE_NAMES } from '@/storage/names';
import { Debt, DebtFormData } from '@/types/debts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function EditDebtScreen() {
    const toast = useToast();

    const { editDebt: debtId } = useLocalSearchParams();
    const [debt, setDebt] = useState<Debt | null>(null);

    const handleEditDebt = (formData: DebtFormData) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const debts = await getDebts();

                const debt = debts.find((debt) => debt.id === debtId);

                if (!debt) {
                    showError('Долг не найден');
                    reject(new Error('Долг не найден'));
                }

                const updatedDebt = {
                    ...debt,
                    ...formData,
                };

                const updatedDebts = debts.map((debt) => (debt.id === debtId ? updatedDebt : debt));

                const jsonValue = JSON.stringify(updatedDebts);
                await AsyncStorage.setItem(STORAGE_NAMES.DEBTS, jsonValue);

                resolve();
            } catch (e) {
                showError('Ошибка при обновлении долга');
                reject(e);
            }
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

    useEffect(() => {
        if (debtId) {
            getDebtById(debtId as string)
                .then((debt) => {
                    if (debt) {
                        setDebt(debt);
                    } else {
                        router.push('/debts');
                    }
                })
                .catch((error) => {
                    router.push('/debts');
                });
        }
    }, [debtId]);

    return (
        <Box className="p-4 pt-1 flex-1">
            <Stack.Screen options={{ title: 'Изменить долг' }} />
            {debt && <FormDebt initialData={debt} btnSubmit={{ title: 'Сохранить', onPress: handleEditDebt }} />}
        </Box>
    );
}
