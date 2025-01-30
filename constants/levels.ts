import { AlertOctagon, CircleDot, Zap } from 'lucide-react-native';

export enum LEVELS {
    LOW = 'Низкий',
    MEDIUM = 'Средний',
    HIGH = 'Высокий',
}

export const LEVEL_ICONS = {
    [LEVELS.LOW]: CircleDot,
    [LEVELS.MEDIUM]: AlertOctagon,
    [LEVELS.HIGH]: Zap,
} as const;

export const LEVEL_COLORS = {
    [LEVELS.LOW]: '#71717a',
    [LEVELS.MEDIUM]: '#06b6d4',
    [LEVELS.HIGH]: '#ef4444',
} as const;
