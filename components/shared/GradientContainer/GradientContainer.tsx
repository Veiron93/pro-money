import { LinearGradient } from 'expo-linear-gradient';
import { FC, ReactNode } from 'react';

export const GradientContainer: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <LinearGradient
            className={`p-4 w-full rounded-3xl overflow-hidden gap-2 ${className}`}
            colors={['#262626', '#404040']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {children}
        </LinearGradient>
    );
};
