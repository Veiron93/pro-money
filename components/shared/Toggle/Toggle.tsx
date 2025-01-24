import { HStack } from '@components/ui/hstack';

import { ToggleButton } from './ToggleButton';

interface ToggleProps {
    active: string;
    items: { title: string; value: string }[];
    style?: string;
    setActive: (active: string) => void;
}

export function Toggle({ active, items, style, setActive }: ToggleProps) {
    const toggleStyle = `h-[58px] p-[4px] bg-neutral-800 rounded-2xl flex-none ${style}`;

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
