import { STORAGE_NAMES } from '@/storage/names';
import type { Debt, DebtFormData } from '@/types/debts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

// Удаление
export const deleteDebt = async (id: string): Promise<void> => {
    try {
        const debts = await getDebts();

        if (!debts || !debts.length) {
            return;
        }

        const debtToDelete = debts.find((debt) => debt.id === id);

        if (!debtToDelete) {
            console.warn('Долг для удаления не найден');
            return;
        }

        const filteredDebts = debts.filter((debt) => debt.id !== id);
        await saveDebtsToStorage(filteredDebts);
    } catch (e) {
        console.error('Ошибка удаления долга:', e);
        throw e;
    }
};

export const getDebtById = async (id: string): Promise<Debt | null> => {
    const debts = await getDebts();
    return debts.find((debt) => debt.id === id) || null;
};

export const getDebts = async (): Promise<Debt[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_NAMES.DEBTS);
        return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Ошибка при получении долгов:', e);
        return [];
    }
};

export const saveDebtsToStorage = async (debts: Debt[]): Promise<void> => {
    try {
        return await AsyncStorage.setItem(STORAGE_NAMES.DEBTS, JSON.stringify(debts));
    } catch (e) {
        console.error('Ошибка сохранения долгов:', e);
    }
};

export const saveDebtsToLocalStorage = async (debts: Debt[]): Promise<void> => {
    try {
        return await AsyncStorage.setItem(STORAGE_NAMES.DEBTS, JSON.stringify(debts));
    } catch (e) {
        console.error('Ошибка сохранения долгов:', e);
    }
};

export const completeDebt = async (id: string): Promise<void> => {
    try {
        const debts = await getDebts();

        if (!debts || !debts.length) {
            console.warn('Нет долгов для завершения');
            return;
        }

        const debtToComplete = debts.find((debt) => debt.id === id);

        if (!debtToComplete) {
            console.warn('Долг для завершения не найден');
            return;
        }

        debtToComplete.isCompleted = true;
        await saveDebtsToStorage(debts);
    } catch (e) {
        console.error('Ошибка завершения долга:', e);
    }
};

export const restoreDebt = async (id: string): Promise<void> => {
    try {
        const debts = await getDebts();

        if (!debts || !debts.length) {
            console.warn('Нет долгов для восстановления');
            return;
        }

        const debtToRestore = debts.find((debt) => debt.id === id);

        if (!debtToRestore) {
            console.warn('Долг для восстановления не найден');
            return;
        }

        debtToRestore.isCompleted = false;
        await saveDebtsToStorage(debts);
    } catch (e) {
        console.error('Ошибка восстановления долга:', e);
        throw e;
    }
};

export const addDebt = async (formData: DebtFormData): Promise<void> => {
    try {
        const id = uuid.v4();

        const debt: Debt = {
            id,
            isCompleted: false,
            ...formData,
        };

        const debts = await getDebts();

        saveDebtsToLocalStorage([...debts, debt]);
    } catch (e) {
        console.error('Ошибка при добавлении долга:', e);
    }
};

export const updateDebt = async (data: Debt): Promise<void> => {
    const debts = await getDebts();
    const debtToUpdate = debts.find((debt) => debt.id === data.id);

    if (!debtToUpdate) {
        console.warn('Долг для обновления не найден');
        return;
    }
};
