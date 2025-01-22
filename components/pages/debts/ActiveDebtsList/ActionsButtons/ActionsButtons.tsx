import { Button } from '@components/ui/button';
import { Check, Trash } from 'lucide-react-native';

const DEBT_ACTION_BUTTON_STYLES = {
    base: 'p-1 w-[40px] h-[40px] bg-neutral-900 rounded-full',
    completed: 'w-[80px]',
};

interface DebtItemActionsProps {
    id: string;
    handleCompleteDebt: (id: string) => void;
    handleDeleteDebt: (id: string) => void;
}

export const ActionsButtons = ({ id, handleCompleteDebt, handleDeleteDebt }: DebtItemActionsProps) => {
    return (
        <>
            <Button
                className={`${DEBT_ACTION_BUTTON_STYLES.base} ${DEBT_ACTION_BUTTON_STYLES.completed}`}
                onPress={() => handleCompleteDebt(id)}
            >
                <Check size={28} color="#fff" />
            </Button>

            <Button className={DEBT_ACTION_BUTTON_STYLES.base} onPress={() => handleDeleteDebt(id)}>
                <Trash size={20} color="#b91c1c" />
            </Button>
        </>
    );
};
