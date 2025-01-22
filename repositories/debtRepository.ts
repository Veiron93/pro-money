// Репозиторий - отвечает только за CRUD операции с данными
import type { Debt } from '@customTypes/debts';
import { localStorageService } from '@services/storage/localStorageService';
import { STORAGE_NAMES } from '@storage/names';

export const debtRepository = {
    async getAll(): Promise<Debt[]> {
        return (await localStorageService.get<Debt[]>(STORAGE_NAMES.DEBTS)) || [];
    },

    async save(debts: Debt[]): Promise<void> {
        await localStorageService.set(STORAGE_NAMES.DEBTS, debts);
    },

    async getById(id: string): Promise<Debt | null> {
        const debts = await this.getAll();
        return debts.find((debt) => debt.id === id) || null;
    },
};
