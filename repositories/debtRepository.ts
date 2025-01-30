// Репозиторий - отвечает только за CRUD операции с данными
import { STORAGE_KEYS } from '@constants/storageKeys';
import type { Debt } from '@customTypes/debts';
import { localStorageService } from '@services/storage/localStorageService';

export const debtRepository = {
    async getAll(): Promise<Debt[]> {
        return (await localStorageService.get<Debt[]>(STORAGE_KEYS.DEBTS)) || [];
    },

    async save(debts: Debt[]): Promise<void> {
        await localStorageService.set(STORAGE_KEYS.DEBTS, debts);
    },

    async getById(id: string): Promise<Debt | null> {
        const debts = await this.getAll();
        return debts.find((debt) => debt.id === id) || null;
    },
};
