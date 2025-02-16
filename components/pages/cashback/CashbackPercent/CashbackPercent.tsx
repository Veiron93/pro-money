import { HStack } from '@components/ui/hstack';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Platform, Pressable, Vibration } from 'react-native';

interface CashbackSliderProps {
    initialValue: number;
    onValueChange: (value: number) => void;
}

const cashbackRates = [1, 3, 5, 7, 10];

export const CashbackPercent = ({ initialValue, onValueChange }: CashbackSliderProps) => {
    const [sliderValue, setSliderValue] = useState(1);

    return (
        <VStack space="lg" className="w-full">
            <HStack className="items-center justify-between bg-neutral-700 rounded-2xl px-[20px]" space="xl">
                <Slider
                    style={{
                        height: 60,
                        width: Platform.select({ ios: '85%', android: '90%', web: '80%' }),
                        marginLeft: Platform.select({ ios: 0, android: -15 }),
                        marginRight: Platform.select({ ios: 0, android: -15 }),
                    }}
                    onValueChange={(value) => setSliderValue(value)}
                    onSlidingComplete={(value) => {
                        setSliderValue(value);
                        onValueChange(value);
                    }}
                    step={1}
                    value={initialValue}
                    minimumValue={1}
                    maximumValue={100}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#d4d4d8"
                />

                <Text size="2xl" className="text-emerald-500 text-right">
                    {sliderValue}%
                </Text>
            </HStack>

            <HStack className="w-full mt-1 mb-6 justify-between">
                {cashbackRates.map((item) => (
                    <Pressable
                        className="bg-neutral-800 rounded-2xl py-3 w-[18%] "
                        key={item}
                        onPress={() => {
                            Vibration.vibrate(30);
                            setSliderValue(item);
                            onValueChange(item);
                        }}
                    >
                        <Text size="xl" className="font-bold text-center">
                            {item}%
                        </Text>
                    </Pressable>
                ))}
            </HStack>
        </VStack>
    );
};
