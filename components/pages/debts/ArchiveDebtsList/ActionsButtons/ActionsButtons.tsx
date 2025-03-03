import { HStack } from '@/components/ui/hstack';
import { Button } from '@components/ui/button';
import { Trash, Undo2 } from 'lucide-react-native';

const DEBT_ACTION_BUTTON_STYLES = 'p-1 w-[40px] h-[40px] bg-neutral-700 rounded-full';

interface DebtItemActionsProps {
    id: string;
    onRestoreDebt: (id: string) => void;
    onDeleteDebt: (id: string) => void;
}

export const ActionsButtons = ({ id, onRestoreDebt, onDeleteDebt }: DebtItemActionsProps) => {
    return (
        <HStack space="md">
            <Button className={DEBT_ACTION_BUTTON_STYLES} onPress={() => onRestoreDebt(id)}>
                <Undo2 size={20} color="white" />
            </Button>

            <Button className={DEBT_ACTION_BUTTON_STYLES} onPress={() => onDeleteDebt(id)}>
                <Trash size={20} color="white" />
            </Button>
        </HStack>
    );
};
