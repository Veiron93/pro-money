// Менеджер - содержит бизнес-логику
import { BankCard, BankCardFormData } from '@customTypes/bankCard';
import { bankCardRepository } from '@repositories/bankCardRepository';
import uuid from 'react-native-uuid';

export const bankCardManager = {
    async deleteBankCard(id: string): Promise<void> {
        const items = await bankCardRepository.getAll();
        const filteredItems = items.filter((item) => item.id !== id);
        await bankCardRepository.save(filteredItems);
    },

    async addBankCard(formData: BankCardFormData): Promise<void> {
        const items = await bankCardRepository.getAll();
        const newItem: BankCard = {
            id: uuid.v4().toString(),
            ...formData,
        };
        await bankCardRepository.save([...items, newItem]);
    },

    async updateBankCard(data: BankCard): Promise<void> {
        const items = await bankCardRepository.getAll();
        const updatedItems = items.map((item) => (item.id === data.id ? data : item));
        await bankCardRepository.save(updatedItems);
    },

    async getBankCardById(id: string): Promise<BankCard | undefined> {
        const items = await bankCardRepository.getAll();

        if (!items) {
            return;
        }

        return items.find((item) => item.id === id);
    },

    async enrichBankCardWithUpdates(id: string, formData: BankCardFormData): Promise<BankCard | undefined> {
        const items = await bankCardRepository.getAll();
        const item = items.find((item) => item.id === id);

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
