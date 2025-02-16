import React, { useCallback, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SliderProps {
    children: React.ReactNode[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    onSlideChange?: (index: number) => void;
    slidesPerView?: number;
}

export const Slider: React.FC<SliderProps> = ({
    children,
    autoPlay = false,
    autoPlayInterval = 3000,
    onSlideChange,
    slidesPerView = 1,
}) => {
    const translateX = useSharedValue(0);
    const currentIndex = useRef(0);
    const autoPlayTimer = useRef<NodeJS.Timeout>();

    const MAX_SLIDE_LENGTH = children.length - 1;

    const slideWidth = SCREEN_WIDTH / slidesPerView;

    const changeSlide = useCallback(
        (direction: 'next' | 'prev') => {
            let newIndex = currentIndex.current;

            if (direction === 'next') {
                newIndex = currentIndex.current === MAX_SLIDE_LENGTH ? 0 : currentIndex.current + 1;
            } else {
                newIndex = currentIndex.current === 0 ? MAX_SLIDE_LENGTH : currentIndex.current - 1;
            }

            translateX.value = withSpring(-newIndex * slideWidth);
            currentIndex.current = newIndex;
            onSlideChange?.(newIndex);
        },
        [MAX_SLIDE_LENGTH, translateX, onSlideChange, slideWidth],
    );

    const startAutoPlay = useCallback(() => {
        if (autoPlayTimer.current) {
            clearInterval(autoPlayTimer.current);
        }
        autoPlayTimer.current = setInterval(() => {
            changeSlide('next');
        }, autoPlayInterval);
    }, [autoPlayInterval, changeSlide]);

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            if (autoPlayTimer.current) {
                clearInterval(autoPlayTimer.current);
            }
        })
        .onUpdate((e) => {
            const currentOffset = -currentIndex.current * slideWidth;
            translateX.value = currentOffset + e.translationX;
        })
        .onEnd((e) => {
            const currentOffset = -currentIndex.current * slideWidth;

            if (Math.abs(e.velocityX) > 500) {
                if (e.velocityX > 0) {
                    runOnJS(changeSlide)('prev');
                } else {
                    runOnJS(changeSlide)('next');
                }
            } else {
                translateX.value = withTiming(currentOffset);
            }

            if (autoPlay) {
                startAutoPlay();
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    useEffect(() => {
        if (autoPlay) {
            startAutoPlay();
        }
        return () => {
            if (autoPlayTimer.current) {
                clearInterval(autoPlayTimer.current);
            }
        };
    }, [autoPlay, startAutoPlay]);

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.slidesContainer, animatedStyle]}>
                    {children.map((child, index) => (
                        <View key={index} style={[styles.slide, { width: slideWidth }]}>
                            {child}
                        </View>
                    ))}
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    slidesContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    slide: {
        flex: 1,
    },
});
