import { Fab as FabGluestack, FabIcon, FabLabel } from '@components/ui/fab';
import { SvgProps } from 'react-native-svg';

interface FabProps {
    onPress: () => void;
    icon?: React.FC<SvgProps>;
    label: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    placement?: 'top center' | 'bottom center' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
}

export const Fab = ({ onPress, className, size, placement, icon, label }: FabProps) => {
    const sizeFab = size || 'lg';
    const placementFab = placement || 'bottom center';
    const classNameFab = className || 'bg-green-900 shadow-md';

    return (
        <FabGluestack onPress={onPress} className={classNameFab} size={sizeFab} placement={placementFab}>
            {icon && <FabIcon as={icon} style={{ color: 'white' }} />}
            <FabLabel className="text-white">{label}</FabLabel>
        </FabGluestack>
    );
};
