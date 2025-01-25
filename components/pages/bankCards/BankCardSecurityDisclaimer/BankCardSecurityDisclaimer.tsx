import { GradientContainer } from '@/components/shared/GradientContainer';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { ShieldAlert } from 'lucide-react-native';

export const BankCardSecurityDisclaimer = () => (
    <GradientContainer>
        <HStack className="flex-row items-center" space="md">
            <ShieldAlert size={50} color="#a3a3a3" className="flex-none" />

            <Text className="text-neutral-400 w-[80%] leading-5" size="md">
                Мы не передаем ваши данные о картах третьим лицам и не используем их для личных целей.
            </Text>
        </HStack>
    </GradientContainer>
);
