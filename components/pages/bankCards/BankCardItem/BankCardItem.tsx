import { GradientContainer } from '@components/shared/GradientContainer';
import { Heading } from '@components/ui/heading';
import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { BankCard } from '@customTypes/bankCard';
import { ReactNode } from 'react';

export const BankCardItem = ({ data, children }: { data: BankCard; children?: ReactNode }) => {
    const { name, description, lastFourDigits, isActive, expirationDate } = data;

    const isExpirationClose = (date?: string) => {
        if (!date) return false;
        const [month, year] = date.split('/').map(Number);
        const expirationDate = new Date(2000 + year, month - 1);
        const threeMonthsFromNow = new Date();
        threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
        return expirationDate <= threeMonthsFromNow;
    };

    return (
        <GradientContainer className={`relative px-5 h-[180px] rounded-2xl ${isActive ? 'opacity-100' : 'opacity-30'}`}>
            <VStack className="h-full">
                <HStack space="md" className="items-center">
                    <Heading size="3xl" className="text-white">
                        {name}
                    </Heading>

                    <Text size="xl" className="text-neutral-400 ml-auto">
                        {lastFourDigits ?? 'xxxx'}
                    </Text>
                </HStack>

                {description && (
                    <Text size="md" className="text-neutral-400 leading-5 mt-3">
                        {description}
                    </Text>
                )}

                <HStack className="items-center justify-between gap-2 mt-auto">
                    <Text
                        size="md"
                        className={`leading-5 ${
                            isExpirationClose(expirationDate) ? 'text-red-500' : 'text-neutral-400'
                        }`}
                    >
                        {expirationDate ?? 'xx/xx'}
                    </Text>

                    {children}
                </HStack>
            </VStack>
        </GradientContainer>
    );
};
