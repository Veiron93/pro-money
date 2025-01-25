import { FormDebt } from '@components/pages/debts/FormDebt';
import { Box } from '@components/ui/box';
import { DEBT_QUERY_KEYS } from '@constants/queryKeys';
import { DebtFormData } from '@customTypes/debts';
import { useDebts } from '@hooks/useDebts';
import { paramsToastMessageProps, useToastMessage } from '@hooks/useToastMessage';
import { debtManager } from '@managers/debtManager';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function EditDebtScreen() {
    const queryClient = useQueryClient();
    const { editDebt: debtId } = useLocalSearchParams();

    const showToast = useToastMessage();

    const { editDebt, isPending } = useDebts();

    const { data } = useQuery({
        queryKey: [DEBT_QUERY_KEYS.DEBT, debtId],
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
                queryClient.invalidateQueries({ queryKey: [DEBT_QUERY_KEYS.DEBT, debtId] });
            })
            .catch(() => {
                showToast(errorMessageParams);
            });
    };

    return (
        <Box className="p-4 pt-1 flex-1">
            <Stack.Screen options={{ title: 'Изменить долг' }} />

            {data && (
                <FormDebt
                    initialData={data}
                    isPending={isPending.update}
                    btnSubmit={{ title: 'Сохранить', onPress: handleEditDebt }}
                />
            )}
        </Box>
    );
}
