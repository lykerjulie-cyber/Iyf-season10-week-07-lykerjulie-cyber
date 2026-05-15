export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export const MIN_AGE = 32;
export const DISCOUNT_RATE = 0.1;
export const ONE_DAY_MS = 24 * 60 * 60 * 1000;
