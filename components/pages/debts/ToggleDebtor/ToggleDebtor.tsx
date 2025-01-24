import { Toggle } from '@components/shared/Toggle';
import type { DebtorType } from '@customTypes/debts';

interface ToggleDebtorProps {
    debtsTypeActive: DebtorType;
    style?: string;
    onPress: (value: DebtorType) => void;
}

export const ToggleDebtor = ({ debtsTypeActive, onPress, style }: ToggleDebtorProps) => {
    const items = [
        { title: 'Я должен', value: 'i' },
        { title: 'Мне должны', value: 'me' },
    ];

    return (
        <Toggle
            active={debtsTypeActive}
            setActive={(value) => onPress(value as DebtorType)}
            items={items}
            style={style}
        />
    );
};
