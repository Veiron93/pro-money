import { FormBankCard } from '@components/pages/bankCards/FormBankCard';
import { BANK_CARDS_QUERY_KEYS } from '@constants/queryKeys';
import { BankCardFormData } from '@customTypes/bankCard';
import { useBankCards } from '@hooks/useBankCards';
import { paramsToastMessageProps, useToastMessage } from '@hooks/useToastMessage';
import { bankCardManager } from '@managers/bankCardManager';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function EditCardScreen() {
    const queryClient = useQueryClient();
    const { editCard: cardId } = useLocalSearchParams();

    const showToast = useToastMessage();

    const { editBankCard, isPending } = useBankCards();

    const { data } = useQuery({
        queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD, cardId],
        queryFn: async () => {
            return bankCardManager.getBankCardById(cardId.toString());
        },
        enabled: !!cardId,
    });

    const handleEditBankCard = async (formData: BankCardFormData) => {
        const errorMessageParams: paramsToastMessageProps = {
            title: 'Ошибка!',
            description: 'Ошибка при обновлении карты',
            action: 'error',
        };

        return await editBankCard(cardId.toString(), formData)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: [BANK_CARDS_QUERY_KEYS.BANK_CARD, cardId] });
            })
            .catch(() => {
                showToast(errorMessageParams);
            });
    };

    return (
        <View className="flex-1">
            <Stack.Screen options={{ title: 'Добавить банковскую карту' }} />
            {data && (
                <FormBankCard
                    initialData={data}
                    isPending={isPending.update}
                    btnSubmit={{ title: 'Сохранить', onPress: handleEditBankCard }}
                />
            )}
        </View>
    );
}
