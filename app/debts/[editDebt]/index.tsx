import { FormDebt } from '@/components/pages/debts/FormDebt';
import { Box } from '@/components/ui/box';
import { debtManager } from '@/domain/managers/debtManager';
import { paramsToastMessageProps, useToastMessage } from '@/hooks/useToastMessage';
import { DebtFormData } from '@/types/debts';
import { useDebts } from '@hooks/useDebts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function EditDebtScreen() {
    const queryClient = useQueryClient();
    const { editDebt: debtId } = useLocalSearchParams();

    const showToast = useToastMessage();

    const { editDebt } = useDebts();

    const { data } = useQuery({
        queryKey: ['debt', debtId],
        queryFn: async () => {
            return debtManager.getDebtById(debtId.toString());
        },
        enabled: !!debtId,
    });

    const handleEditDebt = async (formData: DebtFormData) => {
        const errorMessageParams: paramsToastMessageProps = {
            title: 'Ошибка!',
            description: 'Ошибка при обновлении долга',
            action: 'error',
        };

        return await editDebt(debtId.toString(), formData)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['debt', debtId] });
            })
            .catch(() => {
                showToast(errorMessageParams);
            });
    };

    return (
        <Box className="p-4 pt-1 flex-1">
            <Stack.Screen options={{ title: 'Изменить долг' }} />
            {data && <FormDebt initialData={data} btnSubmit={{ title: 'Сохранить', onPress: handleEditDebt }} />}
        </Box>
    );
}
