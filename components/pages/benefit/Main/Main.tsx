import { Box } from '@components/ui/box';
import Carousel from 'pinar';
import React from 'react';
import { Text, View } from 'react-native';

export const Main = () => {
    return (
        <>
            <Carousel
                height={170}
                loop={true}
                showsDots={false}
                showsControls={false}
                //containerStyle={{ paddingRight: 0 }}
                mergeStyles={true}
                // autoplay={true}
                // autoplayInterval={3000}
            >
                <Box className="justify-center items-center bg-red-500 h-[170px]">
                    <Text>Россбанк</Text>
                </Box>
                <Box className="justify-center items-center bg-blue-500 h-[170px]">
                    <Text>Сбербанк</Text>
                </Box>
                <Box className="justify-center items-center bg-green-500 h-[170px]">
                    <Text>Тинькофф</Text>
                </Box>
            </Carousel>
        </>
    );
};
