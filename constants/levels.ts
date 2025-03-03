import { Flag, Flame, Zap } from 'lucide-react-native';

export enum LEVELS {
    LOW = 'Низкий',
    MEDIUM = 'Средний',
    HIGH = 'Высокий',
}

export const LEVEL_ICONS = {
    [LEVELS.LOW]: Flag,
    [LEVELS.MEDIUM]: Zap,
    [LEVELS.HIGH]: Flame,
} as const;

export const LEVEL_COLORS = {
    [LEVELS.LOW]: '#a3a3a3',
    [LEVELS.MEDIUM]: '#eab308',
    [LEVELS.HIGH]: '#dc2626',
} as const;
