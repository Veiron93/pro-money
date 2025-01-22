import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';

export interface paramsToastMessageProps {
    title: string;
    description?: string;
    duration?: number;
    placement?: 'top' | 'bottom';
    variant?: 'solid' | 'outline';
    action: 'error' | 'success' | 'warning' | 'info';
}

export const useToastMessage = () => {
    const toast = useToast();

    const showToast = (params: paramsToastMessageProps) => {
        const { title, description, duration, placement, variant, action } = params;

        toast.show({
            placement: placement || 'top',
            duration: duration || 4000,
            render: () => {
                return (
                    <Toast action={action} variant={variant}>
                        <ToastTitle>{title}</ToastTitle>
                        <ToastDescription>{description}</ToastDescription>
                    </Toast>
                );
            },
        });
    };

    return showToast;
};
