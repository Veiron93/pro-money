// Менеджер - содержит бизнес-логику
import type { Debt, DebtFormData } from '@customTypes/debts';
import { debtRepository } from '@repositories/debtRepository';
import uuid from 'react-native-uuid';

export const debtManager = {
    async completeDebt(id: string): Promise<void> {
        const debts = await debtRepository.getAll();
        const updatedDebts = debts.map((debt) => (debt.id === id ? { ...debt, isCompleted: true } : debt));
        await debtRepository.save(updatedDebts);
    },

    async restoreDebt(id: string): Promise<void> {
        const debts = await debtRepository.getAll();
        const updatedDebts = debts.map((debt) => (debt.id === id ? { ...debt, isCompleted: false } : debt));
        await debtRepository.save(updatedDebts);
    },

    async deleteDebt(id: string): Promise<void> {
        const debts = await debtRepository.getAll();
        const filteredDebts = debts.filter((debt) => debt.id !== id);
        await debtRepository.save(filteredDebts);
    },

    async addDebt(formData: DebtFormData): Promise<void> {
        const debts = await debtRepository.getAll();
        const newDebt: Debt = {
            id: uuid.v4().toString(),
            isCompleted: false,
            ...formData,
        };
        await debtRepository.save([...debts, newDebt]);
    },

    async updateDebt(data: Debt): Promise<void> {
        const debts = await debtRepository.getAll();
        const updatedDebts = debts.map((debt) => (debt.id === data.id ? data : debt));
        await debtRepository.save(updatedDebts);
    },
};
