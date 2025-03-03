// Менеджер - содержит бизнес-логику
import { CustomCategoryCashback, CustomCategoryCashbackFormData } from '@customTypes/cashback';
import { customCategoriesCashbackRepository } from '@repositories/customCategoriesCashbackRepository';
import uuid from 'react-native-uuid';

export const customCategoriesCashbackManager = {
    async deleteCustomCategoryCashback(id: string): Promise<void> {
        const items = await customCategoriesCashbackRepository.getAll();
        const filteredItems = items.filter((item) => item.code !== id);
        await customCategoriesCashbackRepository.save(filteredItems);
    },

    async getCustomCategoryCashback(code: string): Promise<CustomCategoryCashback | undefined> {
        const items = await customCategoriesCashbackRepository.getAll();
        return items.find((item) => item.code === code);
    },

    async getCustomCategoriesCashback(): Promise<CustomCategoryCashback[]> {
        return await customCategoriesCashbackRepository.getAll();
    },

    async addCustomCategoryCashback(formData: CustomCategoryCashbackFormData): Promise<void> {
        const items = await customCategoriesCashbackRepository.getAll();

        const newItem: CustomCategoryCashback = {
            code: uuid.v4().toString(),
            ...formData,
        };

        await customCategoriesCashbackRepository.save([...items, newItem]);
    },

    async updateCustomCategoryCashback(data: CustomCategoryCashback): Promise<void> {
        const items = await customCategoriesCashbackRepository.getAll();
        const updatedItems = items.map((item) => (item.code === data.code ? data : item));
        await customCategoriesCashbackRepository.save(updatedItems);
    },

    // async getBankCardById(id: string): Promise<BankCard | undefined> {
    //     const items = await bankCardRepository.getAll();

    //     if (!items) {
    //         return;
    //     }

    //     return items.find((item) => item.id === id);
    // },

    // async enrichBankCardWithUpdates(id: string, formData: BankCardFormData): Promise<BankCard | undefined> {
    //     const items = await bankCardRepository.getAll();
    //     const item = items.find((item) => item.id === id);

    //     if (!item) {
    //         console.log('Долг не найден');
    //         return;
    //     }

    //     return {
    //         ...item,
    //         ...formData,
    //     };
    // },

    // async updateCashbackCategoriesBankCard(id: string, cashbackCategories: CashbackCategoryData[]): Promise<void> {
    //     const items = await bankCardRepository.getAll();
    //     const updatedItems = items.map((item) => (item.id === id ? { ...item, cashbackCategories } : item));
    //     await bankCardRepository.save(updatedItems);
    // },
};
