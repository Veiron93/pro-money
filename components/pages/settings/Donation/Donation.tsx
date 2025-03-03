import { Box } from '@components/ui/box';
import { Text } from '@components/ui/text';
import { NUMBER_CARD_DONATE } from '@constants/app';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Copy } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable } from 'react-native';

export const Donation = () => {
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
        <Box className="rounded-3xl overflow-hidden mb-7">
            <LinearGradient colors={['#262626', '#404040']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text className="text-white p-4" size="xl">
                    Если Вам нравится приложение, Вы можете поддержать его развитие.
                </Text>
            </LinearGradient>

            <Pressable onPress={onCopy} className="flex-row justify-between bg-orange-800 p-4">
                <Text className="text-white" size="xl">
                    {NUMBER_CARD_DONATE}
                </Text>
                <Box>{isCopied ? <Check color="white" /> : <Copy color="white" />}</Box>
            </Pressable>
        </Box>
    );
};
