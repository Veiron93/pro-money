import { Button, ButtonSpinner, ButtonText } from '@components/ui/button';
import { HStack } from '@components/ui/hstack';

interface ActionButtonsProps {
    confirm: () => void;
    cancel: () => void;
    isPending?: boolean;
    confirmText: string;
}

export const ActionButtons = ({ confirm, cancel, isPending, confirmText }: ActionButtonsProps) => {
    return (
        <HStack className="mt-auto mb-1 w-full justify-between">
            <Button onPress={confirm} className="w-[48%] rounded-2xl" size="xl">
                {isPending && <ButtonSpinner color="#065f46" />}
                <ButtonText>{confirmText}</ButtonText>
            </Button>

            <Button onPress={cancel} className="w-[48%] rounded-2xl" size="xl" variant="outline">
                <ButtonText>Отмена</ButtonText>
            </Button>
        </HStack>
    );
};
