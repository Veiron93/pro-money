import { Box } from '@components/ui/box';
import { Heading } from '@components/ui/heading';
import { Text } from '@components/ui/text';
import { LINK_FEEDBACK, NUMBER_CARD_DONATE } from '@constants/app';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Check, Copy } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

export default function Help() {
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = async () => {
        try {
            setIsCopied(true);
            await Clipboard.setStringAsync(NUMBER_CARD_DONATE.replace(/\s/g, ''));
            setTimeout(() => setIsCopied(false), 1000);
        } catch (error) {
            console.error('Ошибка при копировании:', error);
            setIsCopied(false);
        }
    };

    return (
        <View className="flex-1 pt-4">
            <Box className="rounded-2xl overflow-hidden">
                <LinearGradient colors={['#262626', '#404040']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text className="text-white p-4" size="xl">
                        Если Вам нравится приложение, Вы можете поддержать его развитие.
                    </Text>
                </LinearGradient>

                <Pressable onPress={onCopy} className="flex-row justify-between bg-red-800 p-4">
                    <Text className="text-white" size="xl">
                        {NUMBER_CARD_DONATE}
                    </Text>
                    <Box>{isCopied ? <Check color="white" /> : <Copy color="white" />}</Box>
                </Pressable>
            </Box>

            <Box className="mt-12 items-center">
                <Heading className="text-white mb-3" size="xl">
                    Связь с разработчиком!
                </Heading>

                <Link href={LINK_FEEDBACK} target="_blank">
                    <Text className="text-neutral-400" size="xl">
                        Дмитрий Юдин
                    </Text>
                </Link>
            </Box>
        </View>
    );
}
