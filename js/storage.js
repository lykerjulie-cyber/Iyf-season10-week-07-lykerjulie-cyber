const STORAGE_PREFIX = 'juliet_';

export function saveToStorage(key, data) {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (e) {
        console.error('Storage failed:', e);
    }
}

export function getFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(STORAGE_PREFIX + key);
        return data? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Parse failed:', e);
        return defaultValue;
    }
}

export function removeFromStorage(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
}
