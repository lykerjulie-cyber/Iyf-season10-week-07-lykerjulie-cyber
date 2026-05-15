# IYF S10 Week 07 - JavaScript Best Practices

**Student:** Juliet Adhiambo
**Age:** 32
**Location:** Nairobi, Kenya
**Theme:** Violet & Green

## Overview
Week 7 covers data persistence, state management, and professional code quality. All projects refactored with ES6 modules, ESLint, and Prettier.

## Deliverables
1. **Refactored To-Do List** - localStorage persistence + violet/green theme toggle
   - Todos survive page refresh
   - Filter preference saved
   - Created by "Juliet Adhiambo"

2. **Shopping Cart** - Centralized state + persistence
   - Products: Violet Notebook, Green Pen Set, Emerald Planner
   - Cart survives refresh with `juliet_julietCart` key
   - Real-time total calculation

3. **Auto-Save Form** - sessionStorage with 5s debounce
   - Restores on page refresh
   - Clears on submit

## File Structure
iyf-s10-week-07-julietadhiambo/
├── index.html
├── css/styles.css
├── js/
│ ├── app.js # Entry point + theme + form
│ ├── storage.js # localStorage helpers
│ ├── utils.js # formatDate, debounce
│ ├── todos.js # To-Do logic
│ └── cart.js # Shopping cart logic
├──.eslintrc.json
├──.prettierrc
└── README.md
## How to Run
1. Clone repo
2. `npm install` (for ESLint/Prettier)
3. Open `index.html` in browser
4. Open DevTools Console → See Juliet's welcome message

## Features
- **Theme Toggle**: Violet ↔ Green, persists in localStorage
- **localStorage Prefix**: All keys use `juliet_` namespace
- **Clean Code**: ESLint compliant, no magic numbers, single responsibility
- **Modular**: ES6 imports/exports, separated concerns

## Code Quality
- [x] Meaningful names: `julietCart`, `setTheme`, `saveToStorage`
- [x] No magic numbers: `MIN_AGE = 32`, `DISCOUNT_RATE = 0.1`
- [x] Error handling: try/catch in storage.js
- [x] Strict equality: `===` everywhere
- [x] ESLint + Prettier configured

## Daily Challenges Complete
- [x] Day 1: Theme persistence - violet/green toggle
- [x] Day 2: Recent searches - localStorage
- [x] Day 3: Form auto-save - sessionStorage + debounce
- [x] Day 4: Refactor - extracted functions, added error handling
- [x] Day 5: Code review - passed checklist

## Milestone: I write professional-quality JavaScript! ✨

**Next:** Ready for React Phase 3git init
git add.
git commit -m "Complete Week 7: JS Best Practices - Juliet Adhiambo"
npm init -y
npm install eslint prettier --save-dev
npx eslint js/
