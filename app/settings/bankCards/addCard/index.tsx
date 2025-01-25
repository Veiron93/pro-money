import { FormBankCard } from '@components/pages/bankCards/FormBankCard';
import { VStack } from '@components/ui/vstack';
import { BankCardFormData } from '@customTypes/bankCard';
import { useBankCards } from '@hooks/useBankCards';
import { paramsToastMessageProps, useToastMessage } from '@hooks/useToastMessage';
import { Stack } from 'expo-router';

export default function AddCardScreen() {
    const showToast = useToastMessage();
    const { addBankCard, isPending } = useBankCards();

    const handleAddBankCard = async (formData: BankCardFormData) => {
        const errorMessageParams: paramsToastMessageProps = {
            title: 'Ошибка!',
            description: 'Ошибка при добавлении карты',
            action: 'error',
        };

        return await addBankCard(formData).catch(() => {
            showToast(errorMessageParams);
        });
    };

    return (
        <VStack className="p-4 flex-1" space="2xl">
            <Stack.Screen options={{ title: 'Добавить банковскую карту' }} />
            <FormBankCard isPending={isPending.add} btnSubmit={{ title: 'Добавить', onPress: handleAddBankCard }} />
        </VStack>
    );
}
