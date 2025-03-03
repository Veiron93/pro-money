import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { NavigationLink } from '@customTypes/settings';
import { router } from 'expo-router';
import { FlatList, Pressable, View } from 'react-native';

export const SubNavigation = ({ links }: { links: NavigationLink[] }) => {
    return (
        <FlatList
            data={links}
            ItemSeparatorComponent={() => <View className="h-[10px]" />}
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => router.navigate(item.path)}
                    className="flex-row gap-4 w-full bg-neutral-700 rounded-3xl p-5"
                >
                    {item.icon}

                    <VStack className="flex-1">
                        <Text className="text-white font-medium" size="xl">
                            {item.title}
                        </Text>

                        <Text className="text-neutral-300 mt-2" size="md">
                            {item.description}
                        </Text>
                    </VStack>
                </Pressable>
            )}
        />
    );
};
