import { FormDebt } from '@components/pages/debts/FormDebt';
import { Box } from '@components/ui/box';
import { DebtFormData } from '@customTypes/debts';
import { useDebts } from '@hooks/useDebts';
import { paramsToastMessageProps, useToastMessage } from '@hooks/useToastMessage';
import { Stack } from 'expo-router';

export default function AddDebtScreen() {
    const showToast = useToastMessage();
    const { addDebt, isPending } = useDebts();

    const handleAddDebt = async (formData: DebtFormData) => {
        const errorMessageParams: paramsToastMessageProps = {
            title: 'Ошибка!',
            description: 'Ошибка при добавлении долга',
            action: 'error',
        };

        return await addDebt(formData).catch(() => {
            showToast(errorMessageParams);
        });
    };

    return (
        <Box className="p-4 pt-1 flex-1">
            <Stack.Screen options={{ title: 'Добавить долг' }} />
            <FormDebt isPending={isPending.add} btnSubmit={{ title: 'Добавить', onPress: handleAddDebt }} />
        </Box>
    );
}
