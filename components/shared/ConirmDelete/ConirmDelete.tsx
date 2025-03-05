import { ActionButtons } from '@components/shared/ActionButtons';
import { ActionSheet } from '@components/shared/ActionSheet';

interface ConfirmDeleteProps {
    title: string;
    confirmText: string;
    onConfirm: () => void;
    onCancel: () => void;
    visible: boolean;
    isPending?: boolean;
}

export const ConfirmDelete = ({ title, confirmText, onConfirm, onCancel, visible }: ConfirmDeleteProps) => {
    return (
        <ActionSheet title={title} showCloseButton={false} visible={visible} onClose={onCancel}>
            <ActionButtons confirm={onConfirm} cancel={onCancel} confirmText={confirmText} />
        </ActionSheet>
    );
};
