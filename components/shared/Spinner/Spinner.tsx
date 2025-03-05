import { Spinner as SpinnerUI } from '@components/ui/spinner';

export const Spinner = ({ className }: { className?: string }) => {
    return <SpinnerUI size="large" color="#065f46" className={`mt-5 ${className}`} />;
};
