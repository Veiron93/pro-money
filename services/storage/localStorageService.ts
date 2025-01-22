import AsyncStorage from '@react-native-async-storage/async-storage';

export const localStorageService = {
    async get<T>(key: string): Promise<T | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Ошибка при получении данных из хранилища:', e);
            return null;
        }
    },

    async set(key: string, value: any): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Ошибка сохранения данных в хранилище:', e);
            throw e;
        }
    },

    async remove(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('Ошибка удаления данных из хранилища:', e);
            throw e;
        }
    },
};
