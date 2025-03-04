import { customCategoriesCashbackManager } from '@managers/customCategoriesCashbackManager';
import { CashbackCategories } from '@storage/cashbackCategories';

export const cashbackCategoriesService = {
    getSystemCategories() {
        return CashbackCategories;
    },

    async getCustomCategories() {
        return await customCategoriesCashbackManager.getCustomCategoriesCashback();
    },

    async getCategoriesMap() {
        const systemCategories = this.getSystemCategories();
        const customCategories = await this.getCustomCategories();

        return new Map([...systemCategories, ...customCategories].map((category) => [category.code, category]));
    },

    async getCategoriesGrouped() {
        const systemCategories = this.getSystemCategories();
        const customCategories = await this.getCustomCategories();

        return {
            system: systemCategories,
            custom: customCategories,
        };
    },
};
