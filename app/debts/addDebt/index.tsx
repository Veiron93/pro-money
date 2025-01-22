import { FormDebt } from '@/components/pages/debts/FormDebt';
import { Box } from '@/components/ui/box';
import { useToastMessage } from '@/hooks/useToastMessage';
import type { paramsToastMessageProps } from '@/hooks/useToastMessage';
import { addDebt } from '@/services/debtService';
import type { DebtFormData } from '@/types/debts';
import { Stack } from 'expo-router';

export default function AddDebtScreen() {
    const showToast = useToastMessage();

    const errorMessageParams: paramsToastMessageProps = {
        title: 'Ошибка!',
        description: 'Ошибка при добавлении долга',
        action: 'error',
    };

    const handleAddDebt = async (formData: DebtFormData) => {
        return addDebt(formData).catch(() => {
            showToast(errorMessageParams);
        });
    };

    return (
        <Box className="p-4 pt-1 flex-1">
            <Stack.Screen options={{ title: 'Добавить долг' }} />
            <FormDebt btnSubmit={{ title: 'Добавить', onPress: handleAddDebt }} />
        </Box>
    );
}
