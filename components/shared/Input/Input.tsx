import { InputField, Input as InputUI } from '@components/ui/input';
import { IInputFieldProps } from '@gluestack-ui/input/lib/types';
import { KeyboardTypeOptions } from 'react-native';

interface InputProps extends IInputFieldProps {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
}

export const Input = ({ onChange, ...props }: InputProps) => {
    return (
        <InputUI {...props} className={`h-[58px] rounded-2xl ${props.className}`} size="xl">
            <InputField
                onChangeText={(value) => onChange?.(value)}
                value={props.value}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
            />
        </InputUI>
    );
};
