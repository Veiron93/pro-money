import { ButtonText } from '@/components/ui/button';
import { Button } from '@/components/ui/button';

export function ToggleButton({ title, active, onPress }: { title: string; active: boolean; onPress: () => void }) {
    return (
        <Button
            className={`h-[50px] flex-1 rounded-xl ${active ? 'bg-neutral-700' : 'bg-transparent'}`}
            onPress={onPress}
        >
            <ButtonText className="text-white" size="md">
                {title}
            </ButtonText>
        </Button>
    );
}
