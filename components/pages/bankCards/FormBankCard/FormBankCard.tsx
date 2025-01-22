import {
    FormControl,
    FormControlError,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { BankCardFormData } from '@/types/bankCard';

interface FormBankCardProps {
    formData: BankCardFormData;
    invalidName: boolean;
    setFormData: (value: BankCardFormData) => void;
}

export const FormBankCard = ({ formData, invalidName, setFormData }: FormBankCardProps) => {
    return (
        <VStack space="2xl">
            <FormControl isRequired>
                <FormControlLabel className="mb-2">
                    <FormControlLabelText size="xl">Название карты</FormControlLabelText>
                </FormControlLabel>

                <Input isInvalid={invalidName} className="h-[60px] rounded-2xl">
                    <InputField
                        onChangeText={(value) => setFormData({ ...formData, name: value })}
                        value={formData.name}
                        className="text-xl"
                        placeholder="Например: Ю-Банк"
                    />
                </Input>

                <FormControlError>
                    <FormControlErrorText>Поле обязательное для заполнения</FormControlErrorText>
                </FormControlError>
            </FormControl>

            <FormControl>
                <FormControlLabel className="mb-2">
                    <FormControlLabelText size="xl">Доп. описание</FormControlLabelText>
                </FormControlLabel>

                <Input className="h-[60px] rounded-2xl">
                    <InputField
                        onChangeText={(value) => setFormData({ ...formData, description: value })}
                        value={formData.description}
                        className="text-xl"
                        placeholder="Например: Основная дебетовая карта"
                    />
                </Input>
            </FormControl>
        </VStack>
    );
};
