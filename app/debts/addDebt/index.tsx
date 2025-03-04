import { FormDebt } from '@components/pages/debts/FormDebt';
import { DebtFormData } from '@customTypes/debts';
import { useDebts } from '@hooks/useDebts';
import { paramsToastMessageProps, useToastMessage } from '@hooks/useToastMessage';
import { Stack } from 'expo-router';
import { View } from 'react-native';

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
        <View className="flex-1">
            <Stack.Screen options={{ title: 'Добавить долг' }} />
            <FormDebt isPending={isPending.add} btnSubmit={{ title: 'Добавить', onPress: handleAddDebt }} />
        </View>
    );
}
