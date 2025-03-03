import { HStack } from '@components/ui/hstack';

import { ToggleButton } from './ToggleButton';

interface ToggleProps {
    active: string;
    items: { title: string; value: string }[];
    className?: string;
    setActive: (active: string) => void;
}

export function Toggle({ active, items, className, setActive }: ToggleProps) {
    return (
        <HStack className={`h-[58px] p-[4px] bg-neutral-700 rounded-[16px] flex-none ${className}`} space="sm">
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
