// Репозиторий - отвечает только за CRUD операции с данными
import type { CashbackItem, CashbackItemData } from '@customTypes/cashback';
import { STORAGE_KEYS } from '@keys/storageKeys';
import { localStorageService } from '@services/storage/localStorageService';

export const cashbackRepository = {
    async getAll(): Promise<CashbackItemData[]> {
        return (await localStorageService.get<CashbackItemData[]>(STORAGE_KEYS.CASHBACK)) || [];
    },

    async save(items: CashbackItem[]): Promise<void> {
        await localStorageService.set(STORAGE_KEYS.CASHBACK, items);
    },

    // async getById(id: string): Promise<CashbackItem | null> {
    //     const items = await this.getAll();
    //     return items.find((item) => item.id === id) || null; // TODO: change id to something else
    // },
};
