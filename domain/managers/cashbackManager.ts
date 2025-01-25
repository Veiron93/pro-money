// Менеджер - содержит бизнес-логику
import { CashbackItem } from '@customTypes/cashback';
import { cashbackRepository } from '@repositories/cashbackRepository';
import uuid from 'react-native-uuid';

export const cashbackManager = {
    async deleteCashback(id: string): Promise<void> {
        const items = await cashbackRepository.getAll();
        const filteredItems = items.filter((item) => item.id !== id); // TODO: change id to something else
        await cashbackRepository.save(filteredItems);
    },

    async addCashback(formData: CashbackFormData): Promise<void> {
        // TODO: change CashbackFormData to something else
        const items = await cashbackRepository.getAll();
        const newItem: CashbackItem = {
            id: uuid.v4().toString(),
            ...formData,
        };
        await cashbackRepository.save([...items, newItem]);
    },

    async updateCashback(data: CashbackItem): Promise<void> {
        const items = await cashbackRepository.getAll();
        const updatedItems = items.map((item) => (item.id === data.id ? data : item)); // TODO: change id to something else
        await cashbackRepository.save(updatedItems);
    },

    async getCashbackById(id: string): Promise<CashbackItem | undefined> {
        const items = await cashbackRepository.getAll();

        if (!items) {
            return;
        }

        return items.find((item) => item.id === id); // TODO: change id to something else
    },

    async enrichCashbackWithUpdates(id: string, formData: CashbackFormData): Promise<CashbackItem | undefined> {
        const items = await cashbackRepository.getAll();
        const item = items.find((item) => item.id === id); // TODO: change id to something else

        if (!item) {
            console.log('Долг не найден');
            return;
        }

        return {
            ...item,
            ...formData,
        };
    },
};
