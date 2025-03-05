import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { Image, Trash } from 'lucide-react-native';
import { Pressable } from 'react-native';

interface CashbackActionButtonsProps {
    onClearPress: () => void;
    onLoadPress: () => void;
}

const btnStyle =
    'flex-row flex-1 gap-[5px] justify-center items-center rounded-full px-4 py-3 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-800';

export function CashbackActionButtons({ onClearPress, onLoadPress }: CashbackActionButtonsProps) {
    return (
        <HStack className="items-center justify-between mb-6" space="md">
            <Pressable className={btnStyle} onPress={onClearPress}>
                <Trash size={20} color="#d4d4d4" />
                <Text className="text-neutral-300" size="lg">
                    Очистить
                </Text>
            </Pressable>

            <Pressable className={btnStyle} onPress={onLoadPress}>
                <Image size={20} color="#d4d4d4" />
                <Text className="text-neutral-300" size="lg">
                    Загрузить
                </Text>
            </Pressable>
        </HStack>
    );
}
