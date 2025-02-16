import { Box } from '@components/ui/box';
import { Heading } from '@components/ui/heading';
import { Text } from '@components/ui/text';
import { LINK_FEEDBACK } from '@constants/app';
import { Link } from 'expo-router';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function AboutScreen() {
    return (
        <View className="flex-1 p-4 pt-[20px]">
            <Stack.Screen options={{ title: 'О приложении' }} />

            <Box>
                <Text size="md">Приложение создано, чтобы упростить контроль за своими финансами.</Text>

                <Text className="mt-2" size="md">
                    Если у вас есть какие-то идеи по улучшению и добавлению новых функций, вы можете связаться со мной
                    по ссылке ниже!
                </Text>
            </Box>

            <Box className="mt-10 items-center">
                <Heading className="text-white mb-3" size="xl">
                    Связь с разработчиком
                </Heading>

                <Link href={LINK_FEEDBACK} target="_blank">
                    <Text className="text-neutral-400" size="xl">
                        Дмитрий Юдин
                    </Text>
                </Link>
            </Box>

            <Text className="mt-auto text-center" size="sm">
                Версия: 0.1.0
            </Text>
        </View>
    );
}
