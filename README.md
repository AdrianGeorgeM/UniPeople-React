# UniPeople: A React-Based People Management System 🎓👥

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

To get started, you can clone this repository and install the necessary packages.

```bash
git clone https://github.com/AdrianGeorgeM/UniPeople-React.git
cd UniPeople-React
npm install
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/).

This project is bootstrapped with [Create-React-App](https://create-react-app.dev/), ensuring a quick and easy setup.

## 📚 Overview

Welcome to a people management system designed for a fictional university. This React-based single-page application enables you to perform tasks such as searching, filtering, and managing records of Students and Employees efficiently.

## 🛠 Tech Stack

- [React](https://reactjs.org/): For building the UI components
- [MUI (Material UI)](https://mui.com/): For styling the UI
- [MUI Data Grid](https://mui.com/x/react-data-grid/): For the data grid component

## 📂 Key Files

- `src/App/index.tsx`: Contains the main application logic.
- `src/api.ts`: Houses the mock API used for data manipulation.

## 🐛 Original Issues

This project aimed to address the following issues:

- Overuse of `useState`
- Mixing of UI, data, and filter states
- Several bugs, including one in the filter form
- Missing email column in the data grid
- Inadequate sorting functionality
- Absence of URL query string updates for filters

## ✅ Tasks & Features Implemented

- **State Management Refactor**: Optimized use of React's `useState`.
- **Bug Fixes**: Rectified issues, including the filter form bug.
- **Additional Columns**: Introduced an email column in the data grid.
- **Server-Side Sorting**: Enhanced sorting functionality.
- **Browser Query String Management**: Enabled dynamic URL updates based on filters.
- **🌟 Bonus**: Implemented server-side persistence for edited grid cells.

## 📈 Development Workflow

Development followed a structured branching strategy to ensure that each feature and bug fix was isolated.

Here are the branches that were created for each task and feature:

- Task 1: `task1-split-state`
- Task 2: `task2-fix-filter-bug`
- Task 3: `task3-add-email-column`
- Task 4: `task4-server-side-sorting`
- Task 5: `task5-query-string`
- Feature: `feature/task5-react-dom-alternative`
- Bonus Task: `bonus-task-server-side-persistence`

## 📖 Technical Note

If you need to clear stored data, you can do so by running:

```javascript
localStorage.removeItem("AutomatedCreativeTestAPI");
```

## 📜 Changelog

For a detailed list of changes, please refer to the [CHANGELOG.md](CHANGELOG.md).

