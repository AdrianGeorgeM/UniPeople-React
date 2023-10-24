# AC Frontend Dev Test Solution 🎓

## Table of Contents

- [Getting Started](#-getting-started)
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Key Files](#-key-files)
- [Original Issues](#-original-issues)
- [Tasks & Features Implemented](#-tasks--features-implemented)
- [Development Workflow](#-development-workflow)
- [Technical Note](#-technical-note)
- [Changelog](#-changelog)

## 🚀 Getting Started

To get started, fork this repo to your own GitHub account and then clone it locally.

```bash
npm install
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/).

This project is bootstrapped with [Create-React-App](https://create-react-app.dev/).

## 📚 Overview

This single-page app simulates a people management system for a fictional university. It allows for searching, filtering, and managing records of people who are either Students or Employees.

## 🛠 Tech Stack

- [MUI (Material UI)](https://mui.com/material-ui/)
- [MUI Data Grid](https://mui.com/x/react-data-grid/)

## 📂 Key Files

- `src/App/index.tsx`: Main application logic
- `src/api.ts`: Mock API

## 🐛 Original Issues

- Overuse of `useState`
- Mixing of UI state, data state, and filter state
- Presence of a bug in the filter form
- No email column in the data grid
- Inadequate sorting functionality
- No URL query string updates for filters

## ✅ Tasks & Features Implemented

- State Management Refactor
- Bug Fixes
- Additional Columns
- Server-Side Sorting
- Browser Query String Management
- 🌟 Bonus: Server-side persistence

## 📈 Development Workflow

### Task 1 - State Management

- **Branch:** `task1-split-state`
- **Goal:** Separate grid state, UI state, and filter state. Implement a clean and well-typed state management solution.
  
```bash
git checkout -b task1-split-state
```

### Task 2 - Bug Fixing

- **Branch:** `task2-fix-filter-bug`
- **Goal:** Fix the bug where the Employee Type filter does not reset when changing the Role to Student.

```bash
git checkout -b task2-fix-filter-bug
```

### Task 3 - Add Email Column

- **Branch:** `task3-add-email-column`
- **Goal:** Add an email column to the data grid for displaying user email addresses.

```bash
git checkout -b task3-add-email-column
```

### Task 4 - Server-side Sorting

- **Branch:** `task4-server-side-sorting`
- **Goal:** Implement server-side sorting for the data grid.

```bash
git checkout -b task4-server-side-sorting
```

### Task 5 - URL Query String Management

- **Branch:** `task5-query-string`
- **Goal:** Enable the app to update the browser’s query string based on filter state and initialize from the URL.

```bash
git checkout -b task5-query-string
```
### Feature - React DOM Alternative

- **Branch:** `feature/task5-react-dom-alternative`
- **Goal:** Alternative using react-router-dom for Task 5 - URL Query String Management

```bash
git checkout -b feature/task5-react-dom-alternative
```

### Bonus Task - Server-side Persistence

- **Branch:** `bonus-task-server-side-persistence`
- **Goal:** Implement server-side persistence for grid cell edits.

```bash
git checkout -b bonus-task-server-side-persistence
```

---

Feel free to include this updated section in your README. This should provide a well-detailed road map for your development workflow.
## 📖 Technical Note

To clear stored data, run:

```javascript
localStorage.removeItem("AutomatedCreativeTestAPI");
```

## 📜 Changelog

For all notable changes, please see [CHANGELOG.md](CHANGELOG.md).

---
