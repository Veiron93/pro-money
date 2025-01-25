import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { BankCard } from '@/types/bankCard';
import { GradientContainer } from '@components/shared/GradientContainer';
import { CreditCard } from 'lucide-react-native';

export const BankCardItem = ({ data }: { data: BankCard }) => {
    const { name, description } = data;

    return (
        <GradientContainer className="relative py-7 px-5 h-[180px] rounded-2xl ">
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
        </GradientContainer>
    );
};
