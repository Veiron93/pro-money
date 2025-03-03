import { Pressable, Text } from 'react-native';

export function ToggleButton({ title, active, onPress }: { title: string; active: boolean; onPress: () => void }) {
    return (
        <Pressable
            className={`h-[50px] flex-1  justify-center items-center rounded-[14px] ${active ? 'bg-neutral-800' : 'bg-transparent'}`}
            onPress={onPress}
        >
            <Text className="text-white text-lg">{title}</Text>
        </Pressable>
    );
}
