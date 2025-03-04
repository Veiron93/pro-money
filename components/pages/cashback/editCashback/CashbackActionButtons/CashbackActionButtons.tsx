import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { Image, Trash } from 'lucide-react-native';
import { Pressable } from 'react-native';

interface CashbackActionButtonsProps {
    onClearPress: () => void;
    onLoadPress: () => void;
}

export function CashbackActionButtons({ onClearPress, onLoadPress }: CashbackActionButtonsProps) {
    return (
        <HStack className="items-center justify-between mb-6" space="md">
            <Pressable
                className="flex-row flex-1 gap-[5px] justify-center items-center bg-neutral-700 rounded-full px-4 py-3"
                onPress={onClearPress}
            >
                <Trash size={20} color="#d4d4d4" />
                <Text className="text-neutral-300" size="lg">
                    Очистить
                </Text>
            </Pressable>

            <Pressable
                className="flex-row flex-1 gap-[5px] justify-center items-center bg-neutral-700 rounded-full px-4 py-3"
                onPress={onLoadPress}
            >
                <Image size={20} color="#d4d4d4" />
                <Text className="text-neutral-300" size="lg">
                    Загрузить
                </Text>
            </Pressable>
        </HStack>
    );
}
