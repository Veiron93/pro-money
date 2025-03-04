// Репозиторий - отвечает только за CRUD операции с данными
import { STORAGE_KEYS } from '@constants/storageKeys';
import { CustomCategoryCashback } from '@customTypes/cashback';
import { localStorageService } from '@services/localStorageService';

const STORAGE_KEY = STORAGE_KEYS.CUSTOM_CATEGORIES_CASHBACK;

export const customCategoriesCashbackRepository = {
    async getAll(): Promise<CustomCategoryCashback[]> {
        return (await localStorageService.get<CustomCategoryCashback[]>(STORAGE_KEY)) || [];
    },

    async save(customCategoriesCashback: CustomCategoryCashback[]): Promise<void> {
        await localStorageService.set(STORAGE_KEY, customCategoriesCashback);
    },

    async getById(code: string): Promise<CustomCategoryCashback | null> {
        const customCategoriesCashback = await this.getAll();
        return customCategoriesCashback.find((customCategoryCashback) => customCategoryCashback.code === code) || null;
    },
};
