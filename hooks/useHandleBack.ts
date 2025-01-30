import { Href, router } from 'expo-router';

export const useHandleBack = (fallbackPath: Href) => {
    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace(fallbackPath);
        }
    };

    return handleBack;
};
