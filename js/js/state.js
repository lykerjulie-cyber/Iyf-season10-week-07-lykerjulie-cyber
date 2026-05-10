import { save, load } from './storage.js';

export const state = {
    todos: load('todos', []),
    filter: load('filter', 'all') // 'all' | 'active' | 'completed'
};

export function setState(updates) {
    Object.assign(state, updates);
    
    // Persist every time state changes
    save('todos', state.todos);
    save('filter', state.filter);
    
    // Notify UI to re-render
    document.dispatchEvent(new CustomEvent('stateChanged'));
}

// State actions
export function addTodo(text) {
    const newTodo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    setState({
        todos: [...state.todos, newTodo]
    });
}

export function toggleTodo(id) {
    setState({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    });
}

export function deleteTodo(id) {
    setState({
        todos: state.todos.filter(todo => todo.id !== id)
    });
}

export function setFilter(filter) {
    setState({ filter });
}

export function clearCompleted() {
    setState({
        todos: state.todos.filter(todo => !todo.completed)
    });
}
