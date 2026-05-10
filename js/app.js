import { addTodo, setFilter, clearCompleted } from './state.js';
import { render } from './ui.js';

// Init
document.addEventListener('DOMContentLoaded', render);
document.addEventListener('stateChanged', render);

// Add todo
document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (text) {
        addTodo(text);
        input.value = '';
    }
});

// Filter buttons
document.querySelector('.filters').addEventListener('click', (e) => {
    if (e.target.dataset.filter) {
        setFilter(e.target.dataset.filter);
    }
});

// Clear completed
document.getElementById('clear-completed').addEventListener('click', clearCompleted);
