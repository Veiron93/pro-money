import { HStack } from '@components/ui/hstack';
import { Trash, Undo2 } from 'lucide-react-native';
import { Pressable } from 'react-native';

const DEBT_ACTION_BUTTON_STYLES =
    'w-[40px] h-[40px] bg-neutral-700 rounded-full items-center justify-center hover:bg-neutral-600 active:bg-neutral-500';

interface DebtItemActionsProps {
    id: string;
    onRestoreDebt: (id: string) => void;
    onDeleteDebt: (id: string) => void;
}

export const ActionsButtons = ({ id, onRestoreDebt, onDeleteDebt }: DebtItemActionsProps) => {
    return (
        <HStack space="md">
            <Pressable className={DEBT_ACTION_BUTTON_STYLES} onPress={() => onRestoreDebt(id)}>
                <Undo2 size={20} color="white" />
            </Pressable>

            <Pressable className={DEBT_ACTION_BUTTON_STYLES} onPress={() => onDeleteDebt(id)}>
                <Trash size={20} color="white" />
            </Pressable>
        </HStack>
    );
};
