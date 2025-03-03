import { CustomCategoryCashback, CustomCategoryCashbackFormData } from '@customTypes/cashback';
import { CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS } from '@keys/queryKeys';
import { customCategoriesCashbackManager } from '@managers/customCategoriesCashbackManager';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAsyncOperation } from '@utils/handleAsyncOperation';

export const useCustomCategoriesCashback = () => {
    const queryClient = useQueryClient();

    const mutations = {
        delete: useMutation({
            mutationFn: customCategoriesCashbackManager.deleteCustomCategoryCashback,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS.CUSTOM_CATEGORIES] });
            },
        }),
        add: useMutation({
            mutationFn: customCategoriesCashbackManager.addCustomCategoryCashback,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS.CUSTOM_CATEGORIES] });
            },
        }),
        update: useMutation({
            mutationFn: customCategoriesCashbackManager.updateCustomCategoryCashback,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS.CUSTOM_CATEGORIES] });
            },
        }),
    };

    const isPending = {
        delete: mutations.delete.isPending,
        add: mutations.add.isPending,
        update: mutations.update.isPending,
    };

    const categories = useQuery({
        queryKey: [CUSTOM_CATEGORIES_CASHBACK_QUERY_KEYS.CUSTOM_CATEGORIES],
        queryFn: () => customCategoriesCashbackManager.getCustomCategoriesCashback(),
    });

    const addCategory = (formData: CustomCategoryCashbackFormData) =>
        handleAsyncOperation(mutations.add.mutateAsync(formData));

    const deleteCategory = (id: string) => handleAsyncOperation(mutations.delete.mutateAsync(id));

    const updateCategory = async (data: CustomCategoryCashback) => {
        return await handleAsyncOperation(mutations.update.mutateAsync(data));
    };

    return {
        isPending,
        categories,
        deleteCategory,
        addCategory,
        updateCategory,
    };
};
