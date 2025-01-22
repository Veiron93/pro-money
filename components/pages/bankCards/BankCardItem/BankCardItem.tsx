import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { BankCard } from '@/types/bankCard';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard } from 'lucide-react-native';
import { FC } from 'react';

export const BankCardItem: FC<{ data: BankCard }> = ({ data }) => {
    const { name, description } = data;

    return (
        <LinearGradient
            className="relative py-7 px-5 h-[180px] w-full rounded-2xl overflow-hidden"
            colors={['#262626', '#404040']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Box className="absolute top-3 right-3 opacity-10">
                <CreditCard size={64} color="#c4c4c4" />
            </Box>
            <Box className="relative z-10">
                <Heading size="3xl" className="text-white">
                    {name}
                </Heading>
                <Text size="xl" className="text-neutral-300 mt-3 leading-5">
                    {description}
                </Text>
            </Box>
        </LinearGradient>
    );
};
