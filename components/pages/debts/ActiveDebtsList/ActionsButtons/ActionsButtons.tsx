import { HStack } from '@components/ui/hstack';
import { Check, Trash } from 'lucide-react-native';
import { Pressable } from 'react-native';

const DEBT_ACTION_BUTTON_STYLES = {
    base: 'w-[40px] h-[40px] bg-neutral-700 rounded-full items-center justify-center hover:bg-neutral-600 active:bg-neutral-500',
    completed: 'w-[60px]',
};

interface DebtItemActionsProps {
    id: string;
    onCompleteDebt: (id: string) => void;
    onDeleteDebt: (id: string) => void;
}

export const ActionsButtons = ({ id, onCompleteDebt, onDeleteDebt }: DebtItemActionsProps) => {
    return (
        <HStack space="md">
            <Pressable
                className={`${DEBT_ACTION_BUTTON_STYLES.base} ${DEBT_ACTION_BUTTON_STYLES.completed}`}
                onPress={() => onCompleteDebt(id)}
            >
                <Check size={28} color="#fff" />
            </Pressable>

            <Pressable className={DEBT_ACTION_BUTTON_STYLES.base} onPress={() => onDeleteDebt(id)}>
                <Trash size={20} color="#fff" />
            </Pressable>
        </HStack>
    );
};
