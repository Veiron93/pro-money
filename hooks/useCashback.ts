import { CASHBACK_QUERY_KEYS } from '@/constants/queryKeys';
import { cashbackCategoriesService } from '@/services/cashbackCategoriesService';
import { useQuery } from '@tanstack/react-query';

export const useCashback = () => {
    const categoriesGroupedQuery = useQuery({
        queryKey: [CASHBACK_QUERY_KEYS.CATEGORIES_GROUPED],
        queryFn: () => cashbackCategoriesService.getCategoriesGrouped(),
    });

    return {
        categoriesGroupedQuery,
    };
};
