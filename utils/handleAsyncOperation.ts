/**
 * @description Обработка асинхронной операции
 * @param operation - Асинхронная операция
 * @returns Результат операции или undefined в случае ошибки
 */
export const handleAsyncOperation = async <T>(operation: Promise<T>): Promise<T | void> => {
    try {
        return await operation;
    } catch (e) {
        console.log(e);
    }
};
