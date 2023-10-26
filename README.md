# 🎓👥 UniPeople: A React-Based People Management System

## 📑 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [📚 Overview](#-overview)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Key Files](#-key-files)
- [🐛 Original Issues](#-original-issues)
- [✅ Tasks & Features Implemented](#-tasks--features-implemented)
- [📈 Development Workflow](#-development-workflow)
- [📜 Changelog](#-changelog)

---

## 🚀 Getting Started

```bash
git clone https://github.com/AdrianGeorgeM/UniPeople-React.git
cd UniPeople-React
npm install
npm start
```

🌐 Navigate to [http://localhost:3000/](http://localhost:3000/).

This project uses [Create-React-App](https://create-react-app.dev/) for a quick and easy setup.

---

## 📚 Overview

Manage, search, and filter student and employee data in a fictional university setting. Built using React, this app provides a seamless user experience.

---

## 🛠 Tech Stack

- [React](https://reactjs.org/) - UI Components
- [MUI (Material UI)](https://mui.com/) - Styling
- [MUI Data Grid](https://mui.com/x/react-data-grid/) - Data Grid

---

## 📂 Key Files

- `src/App/index.tsx` - Main application logic
- `src/api.ts` - Mock API for data manipulation

---

## 🐛 Original Issues

- 🎭 Overuse of `useState`
- 🗃 Mixing UI, Data, Filter States
- 🐞 Filter Form Bugs
- 📧 Missing Email Column
- 🔄 Inadequate Sorting
- 🔗 No URL Query String Updates

---

## ✅ Tasks & Features Implemented

### 🎭 State Management Refactor
- **Problem**: Overuse of `useState` leading to confusing state management.
- **Solution**: Used `useReducer` and context to clearly separate UI state, data state, and filter state.
- **Tech Used**: React `useReducer`, Context API

### 🐞 Bug Fixes
- **Problem**: Employee Type not resetting when Role changed to "Student."
- **Solution**: Added conditional logic to reset the Employee Type to "ANY" when Role is set to "Student."
- **Tech Used**: React conditional rendering

### 📧 Additional Columns
- **Problem**: No email column in the data grid.
- **Solution**: Extended data grid to include an email column.
- **Tech Used**: MUI Data Grid

### 🔄 Server-Side Sorting
- **Problem**: Sorting only on the client-side, not utilizing the API's capabilities.
- **Solution**: Implemented server-side sorting.
- **Tech Used**: API calls, MUI Data Grid

### 🔗 Browser Query String Management
- **Problem**: No dynamic URL updates based on applied filters.
- **Solution**: Added code to update the browser's query string based on the filter state.
- **Tech Used**: JavaScript's `URLSearchParams`, React Router

### 🌟 Bonus: Server-Side Persistence
- **Problem**: Grid edits were not persistent.
- **Solution**: Used server-side persistence to maintain grid cell edits.
- **Tech Used**: LocalStorage, MUI Data Grid

---

## 📈 Development Workflow

- Task 1: `task1-split-state`
- Task 2: `task2-fix-filter-bug`
- Task 3: `task3-add-email-column`
- Task 4: `task4-server-side-sorting`
- Task 5: `task5-query-string`
- Feature: `feature/task5-react-dom-alternative`
- Bonus: `bonus-task-server-side-persistence`

---

## 📜 Changelog

Refer to [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes.

