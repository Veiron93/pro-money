// Репозиторий - отвечает только за CRUD операции с данными
import type { BankCard } from '@customTypes/bankCard';
import { STORAGE_KEYS } from '@keys/storageKeys';
import { localStorageService } from '@services/storage/localStorageService';

export const bankCardRepository = {
    async getAll(): Promise<BankCard[]> {
        return (await localStorageService.get<BankCard[]>(STORAGE_KEYS.BANK_CARDS)) || [];
    },

    async save(items: BankCard[]): Promise<void> {
        await localStorageService.set(STORAGE_KEYS.BANK_CARDS, items);
    },

    async getById(id: string): Promise<BankCard | null> {
        const items = await this.getAll();
        return items.find((item) => item.id === id) || null;
    },
};
