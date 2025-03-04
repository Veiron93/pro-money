import { FormBankCard } from '@components/pages/bankCards/FormBankCard';
import { BankCardFormData } from '@customTypes/bankCard';
import { useBankCards } from '@hooks/useBankCards';
import { paramsToastMessageProps, useToastMessage } from '@hooks/useToastMessage';
import { Stack } from 'expo-router';
import { View } from 'react-native';

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
        <View className="flex-1">
            <Stack.Screen options={{ title: 'Добавить банковскую карту' }} />
            <FormBankCard isPending={isPending.add} btnSubmit={{ title: 'Добавить', onPress: handleAddBankCard }} />
        </View>
    );
}
