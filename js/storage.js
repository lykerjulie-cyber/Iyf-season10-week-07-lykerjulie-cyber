const STORAGE_PREFIX = 'iyf_todos_';

export function save(key, data) {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

export function load(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(STORAGE_PREFIX + key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Failed to parse localStorage:', e);
        return defaultValue;
    }
}

export function remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
}
