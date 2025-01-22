import { HStack } from '@/components/ui/hstack';

import { ToggleButton } from './ToggleButton';

interface ToggleProps {
    active: string;
    setActive: (active: string) => void;
    items: { title: string; value: string }[];
    style?: string;
}

export function Toggle({ active, setActive, items, style }: ToggleProps) {
    const toggleStyle = 'max-h-[58px] bg-neutral-800 p-[5px] rounded-2xl flex-1' + ' ' + style;

    return (
        <HStack className={toggleStyle} space="sm">
            {items.map((item) => (
                <ToggleButton
                    key={item.value}
                    title={item.title}
                    active={active === item.value}
                    onPress={() => setActive(item.value)}
                />
            ))}
        </HStack>
    );
}
