export const handleAsyncOperation = async <T>(operation: Promise<T>): Promise<T | void> => {
    try {
        return await operation;
    } catch (e) {
        console.log(e);
    }
};
