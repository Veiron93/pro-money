import { Button } from '@components/ui/button';
import { Trash, Undo2 } from 'lucide-react-native';

const DEBT_ACTION_BUTTON_STYLES = {
    base: 'p-1 w-[40px] h-[40px] bg-neutral-900 rounded-full',
    completed: 'w-[80px]',
};

interface DebtItemActionsProps {
    id: string;
    onRestoreDebt: (id: string) => void;
    onDeleteDebt: (id: string) => void;
}

export const ActionsButtons = ({ id, onRestoreDebt, onDeleteDebt }: DebtItemActionsProps) => {
    return (
        <>
            <Button className={DEBT_ACTION_BUTTON_STYLES.base} onPress={() => onRestoreDebt(id)}>
                <Undo2 size={20} color="white" />
            </Button>

            <Button className={DEBT_ACTION_BUTTON_STYLES.base} onPress={() => onDeleteDebt(id)}>
                <Trash size={20} color="#b91c1c" />
            </Button>
        </>
    );
};
