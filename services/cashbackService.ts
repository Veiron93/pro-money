import { STORAGE_NAMES } from '@/storage/names';
import type { CashbackItemStorage } from '@/types/cashback';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCashback = async (): Promise<CashbackItemStorage[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_NAMES.CASHBACK);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Ошибка при получении кэшбэка:', e);
        return [];
    }
};
