import { Button } from '@components/ui/button';
import { HStack } from '@components/ui/hstack';
import { Check, Trash } from 'lucide-react-native';

const DEBT_ACTION_BUTTON_STYLES = {
    base: 'p-1 w-[40px] h-[40px] bg-neutral-700 rounded-full',
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
            <Button
                className={`${DEBT_ACTION_BUTTON_STYLES.base} ${DEBT_ACTION_BUTTON_STYLES.completed}`}
                onPress={() => onCompleteDebt(id)}
            >
                <Check size={28} color="#fff" />
            </Button>

            <Button className={DEBT_ACTION_BUTTON_STYLES.base} onPress={() => onDeleteDebt(id)}>
                <Trash size={20} color="#fff" />
            </Button>
        </HStack>
    );
};
