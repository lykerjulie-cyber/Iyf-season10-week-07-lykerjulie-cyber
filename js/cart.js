import { saveToStorage, getFromStorage } from './storage.js';

const CART_KEY = 'julietCart';

const state = {
    products: [
        { id: 1, name: 'Violet Notebook', price: 15, color: 'violet', emoji: '💜' },
        { id: 2, name: 'Green Pen Set', price: 8, color: 'green', emoji: '💚' },
        { id: 3, name: 'Emerald Planner', price: 25, color: 'emerald', emoji: '📗' },
        { id: 4, name: 'Lavender Mug', price: 12, color: 'violet', emoji: '☕' },
        { id: 5, name: 'Forest Journal', price: 18, color: 'green', emoji: '📓' },
        { id: 6, name: 'Juliet Signature Pen', price: 32, color: 'juliet', emoji: '✨' }
    ],
    cart: []
};

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const clearBtn = document.getElementById('clear-cart');

function loadCart() {
    state.cart = getFromStorage(CART_KEY, []);
    renderProducts();
    renderCart();
    updateCartCount();
}

function saveCart() {
    saveToStorage(CART_KEY, state.cart);
}

function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({
            productId,
            quantity: 1,
            addedBy: 'Juliet Adhiambo',
            addedAt: new Date().toISOString()
        });
    }

    saveCart();
    renderCart();
    updateCartCount();

    const product = state.products.find(p => p.id === productId);
    console.log(`%cAdded ${product.name} to Juliet's cart`, 'color: #10b981;');
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const item = state.cart.find(i => i.productId === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        renderCart();
    }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId!== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartCount() {
    cartCount.textContent = getCartCount();
}

function clearCart() {
    if (confirm('Clear Juliet\'s cart?')) {
        state.cart = [];
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function renderProducts() {
    productList.innerHTML = state.products.map(product => `
        <div class="product-card" style="border-color: var(--${product.color})">
            <div style="font-size: 2rem;">${product.emoji}</div>
            <h4>${product.name}</h4>
            <div class="product-price">$${product.price}</div>
            <button onclick="window.cartApp.addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

function renderCart() {
    if (state.cart.length === 0) {
        cartItems.innerHTML = '<p style="color: var(--primary);">Cart is empty. Add some violet & green!</p>';
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = state.cart.map(item => {
        const product = state.products.find(p => p.id === item.productId);
        return `
            <div class="cart-item">
                <span>${product.emoji} ${product.name}</span>
                <div>
                    <button onclick="window.cartApp.updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="window.cartApp.updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                    <span>$${product.price * item.quantity}</span>
                    <button onclick="window.cartApp.removeFromCart(${item.productId})">×</button>
                </div>
            </div>
        `;
    }).join('');

    cartTotal.textContent = getCartTotal();
}

clearBtn.addEventListener('click', clearCart);

window.cartApp = { addToCart, updateQuantity, removeFromCart };

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    console.log('%cShopping Cart loaded for Juliet', 'color: #10b981;');
    console.log('Theme: Violet & Green | Products:', state.products.length);
});
