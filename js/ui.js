import { state, toggleTodo, deleteTodo } from './state.js';

const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');

export function render() {
    const filteredTodos = getFilteredTodos();
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} class="toggle">
            <span class="text">${todo.text}</span>
            <button class="delete">×</button>
        </li>
    `).join('');
    
    updateStats();
    updateFilterButtons();
}

function getFilteredTodos() {
    switch (state.filter) {
        case 'active':
            return state.todos.filter(t => !t.completed);
        case 'completed':
            return state.todos.filter(t => t.completed);
        default:
            return state.todos;
    }
}

function updateStats() {
    const activeCount = state.todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

function updateFilterButtons() {
    document.querySelectorAll('.filters button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === state.filter);
    });
}

// Event delegation for todo list
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    
    const id = li.dataset.id;
    
    if (e.target.classList.contains('toggle')) {
        toggleTodo(id);
    }
    
    if (e.target.classList.contains('delete')) {
        deleteTodo(id);
    }
});
