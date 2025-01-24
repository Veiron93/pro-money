import { HStack } from '@components/ui/hstack';

import { ToggleButton } from './ToggleButton';

interface ToggleProps {
    active: string;
    items: { title: string; value: string }[];
    style?: string;
    setActive: (active: string) => void;
}

export function Toggle({ active, items, style, setActive }: ToggleProps) {
    const toggleStyle = `max-h-[58px] h-[58px] flex-none bg-neutral-800 p-[5px] rounded-2xl ${style}`;

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
