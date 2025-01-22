import { ToastDescription, ToastTitle, Toast as ToastUI, useToast } from '@/components/ui/toast';
import { InterfaceToastProps } from '@gluestack-ui/toast/lib/types';
import { FC, ReactNode, useEffect } from 'react';

interface ToastProps {
    title: string;
    description: string;
    duration?: number;
    placement?: 'top' | 'bottom';
    state: boolean;
}

export const Toast: FC<ToastProps> = ({ title, description, duration, placement, state }: ToastProps): ReactNode => {
    const toast = useToast();

    const params: InterfaceToastProps = {
        placement: placement || 'top',
        duration: duration || 4000,
        render: () => {
            return (
                <ToastUI action="error" variant="solid">
                    <ToastTitle>{title}</ToastTitle>
                    <ToastDescription>{description}</ToastDescription>
                </ToastUI>
            );
        },
    };

    useEffect(() => {
        if (state) {
            toast.show(params);
        }
    }, [state]);
};
