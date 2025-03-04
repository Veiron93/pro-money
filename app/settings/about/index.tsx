import { Text } from '@components/ui/text';
import { LINK_FEEDBACK } from '@constants/app';
import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

export default function AboutScreen() {
    const textStyle = { fontSize: 18 };
    return (
        <View className="flex-1">
            <Stack.Screen options={{ title: 'О приложении' }} />

            <View>
                <Text style={textStyle} className="leading-9">
                    Приложение создано, чтобы упростить контроль за своими финансами.
                </Text>

                <Text style={{ ...textStyle, marginTop: 20 }} className="leading-9">
                    Если у вас есть какие-то идеи по улучшению и добавлению новых функций, вы можете{' '}
                    <Link
                        href={LINK_FEEDBACK}
                        style={textStyle}
                        className="text-orange-800 font-medium"
                        target="_blank"
                    >
                        связаться со мной!
                    </Link>
                </Text>
            </View>

            <Text className="mt-auto text-center" size="sm">
                Версия: 0.1.0
            </Text>
        </View>
    );
}
