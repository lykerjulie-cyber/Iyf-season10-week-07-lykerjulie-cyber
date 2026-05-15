import { saveToStorage, getFromStorage } from './storage.js';
import { debounce } from './utils.js';
import './todos.js';
import './cart.js';

const THEME_KEY = 'theme';

function setTheme(theme) {
    document.body.dataset.theme = theme;
    saveToStorage(THEME_KEY, theme);
    const btn = document.getElementById('theme-toggle');
    btn.textContent = theme === 'violet'? 'Switch to Green' : 'Switch to Violet';
}

function initTheme() {
    const saved = getFromStorage(THEME_KEY, 'violet');
    setTheme(saved);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = document.body.dataset.theme;
    setTheme(current === 'violet'? 'green' : 'violet');
});

// Form Auto-Save - Day 3 Challenge
const form = document.getElementById('juliet-form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    const saved = sessionStorage.getItem(`juliet_form_${input.name}`);
    if (saved) {
        input.value = saved;
        console.log(`%cRestored ${input.name} for Juliet`, 'color: #7c3aed;');
    }

    input.addEventListener('input', debounce(() => {
        sessionStorage.setItem(`juliet_form_${input.name}`, input.value);
        document.querySelector('.save-status').textContent = 'Saved ✓';
        setTimeout(() => {
            document.querySelector('.save-status').textContent = 'Auto-saves every 5s to sessionStorage';
        }, 2000);
    }, 500));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks, Juliet Adhiambo! Form submitted and sessionStorage cleared.');
    inputs.forEach(input => {
        sessionStorage.removeItem(`juliet_form_${input.name}`);
    });
    form.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    console.log('%c✨ Welcome, Juliet Adhiambo!', 'color: #7c3aed; font-size: 18px; font-weight: bold;');
    console.log('%cAge: 32 | Location: Nairobi, KE', 'color: #10b981; font-size: 14px;');
    console.log('%cTheme: Violet & Green | localStorage prefix: juliet_', 'color: #a78bfa;');
});
