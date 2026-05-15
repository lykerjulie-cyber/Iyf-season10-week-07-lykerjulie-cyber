import { saveToStorage, getFromStorage } from './storage.js';

const STORAGE_KEY = 'todos';
const FILTER_KEY = 'todoFilter';

const state = {
    todos: [],
    filter: 'all'
};

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const countSpan = document.getElementById('count');
const addBtn = document.getElementById('add-todo');
const filterBtns = document.querySelectorAll('.filters button');

function loadState() {
    state.todos = getFromStorage(STORAGE_KEY, []);
    state.filter = getFromStorage(FILTER_KEY, 'all');
    updateFilterUI();
}

function saveTodos() {
    saveToStorage(STORAGE_KEY, state.todos);
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        createdBy: 'Juliet Adhiambo'
    };

    state.todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

function toggleTodo(id) {
    const todo = state.todos.find(t => t.id === id);
    if (todo) {
        todo.completed =!todo.completed;
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    state.todos = state.todos.filter(t => t.id!== id);
    saveTodos();
    renderTodos();
}

function setFilter(filter) {
    state.filter = filter;
    saveToStorage(FILTER_KEY, filter);
    updateFilterUI();
    renderTodos();
}

function updateFilterUI() {
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === state.filter);
    });
}

function renderTodos() {
    const filtered = state.todos.filter(todo => {
        if (state.filter === 'active') return!todo.completed;
        if (state.filter === 'completed') return todo.completed;
        return true;
    });

    todoList.innerHTML = filtered.map(todo => `
        <li class="todo ${todo.completed? 'done' : ''}">
            <input type="checkbox" ${todo.completed? 'checked' : ''}
                   onchange="window.todoApp.toggleTodo(${todo.id})">
            <span>${todo.text}</span>
            <small>by ${todo.createdBy}</small>
            <button onclick="window.todoApp.deleteTodo(${todo.id})">Delete</button>
        </li>
    `).join('');

    countSpan.textContent = state.todos.length;
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

window.todoApp = { toggleTodo, deleteTodo };

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderTodos();
    console.log('%cTo-Do List loaded for Juliet', 'color: #7c3aed;');
});
