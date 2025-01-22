import { STORAGE_NAMES } from '@/storage/names';
import type { BankCard } from '@/types/bankCard';
import type { BankCardFormData } from '@/types/bankCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const getBankCards = async (): Promise<BankCard[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_NAMES.BANK_CARDS);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Ошибка при получении банковских карт:', e);
        return [];
    }
};

export const deleteBankCard = async (id: string): Promise<void> => {
    const bankCards = await getBankCards();
    const newBankCards = bankCards.filter((card) => card.id !== id);
    return await AsyncStorage.setItem(STORAGE_NAMES.BANK_CARDS, JSON.stringify(newBankCards));
};

export const getBankCardById = async (id: string): Promise<BankCard | undefined> => {
    const bankCards = await getBankCards();
    return bankCards.find((card) => card.id === id);
};

export const addBankCard = async (data: BankCardFormData): Promise<void> => {
    const randomId = uuid.v4();

    const newCard: BankCard = {
        id: randomId,
        name: data.name,
        description: data.description,
    };

    const bankCards = await getBankCards();
    const jsonValue = JSON.stringify([...bankCards, newCard]);
    return await AsyncStorage.setItem(STORAGE_NAMES.BANK_CARDS, jsonValue);
};

export const updateBankCard = async (id: string, data: BankCardFormData): Promise<void> => {
    try {
        const bankCards = await getBankCards();

        if (!bankCards) {
            return;
        }

        const indexCard = bankCards.findIndex((card: BankCard) => card.id === id);

        if (indexCard === -1) {
            return;
        }

        bankCards[indexCard] = { ...bankCards[indexCard], ...data };

        const jsonValue = JSON.stringify(bankCards);
        return await AsyncStorage.setItem(STORAGE_NAMES.BANK_CARDS, jsonValue);
    } catch (e) {
        console.error('Ошибка при обновлении банковской карты:', e);
    }
};
