export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString();
}
