# Requirements: Vue.js To-Do App

## Overview

A single-list, plain-text-based to-do application built with Vue.js. Designed for simplicity, openness, and frictionless task management across contexts.

---

## Functional Requirements

### 1. Open Storage Format

- Tasks must be stored in a plain text file (e.g., `todo.txt`) compatible with the [Todo.txt format](http://todotxt.org/).
- The file must be backed by a free, easy-to-configure cloud sync tool. Dropbox is the reference implementation, but any equivalent service (e.g., OneDrive, Google Drive) is acceptable.
- No proprietary binary format or database lock-in.

### 2. Priority by List Order

- Task priority is determined solely by position in the list — the top item is the highest priority.
- No separate priority field, tag, or label is needed.
- Reordering is the mechanism for changing priority.
- For the initial version, reordering can be implemented with simple up/down controls — drag-and-drop and keyboard shortcuts are out of scope for now.
- Adding a task must be as simple as possible — a single text input with a submit action (e.g., Enter key or button). New tasks are appended to the bottom of the list (lowest priority) by default.

### 3. Single Unified List

- Only one task list exists. There are no projects, contexts, or sub-lists that require switching.
- All tasks — regardless of context, project, or domain — appear on the same list.
- Filtering or searching is allowed, but the canonical view is always the full single list.

### 4. Easy Archiving of Completed Tasks

- Completing a task removes it from the active list immediately.
- Completed tasks are preserved in an archive (e.g., `done.txt`) and remain accessible for review.
- The user can view the archive ("done" list) at any time within the app.

### 5. Accessible Anywhere

- The app must be accessible from any device with a web browser (desktop, tablet, mobile).
- Because the backing store is a plain text file on Dropbox, offline edits made via other tools must be reflected when the app reloads.

---

## Non-Functional Requirements

| Attribute       | Requirement                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| Technology      | Vue.js (this project)                                                              |
| Storage         | Plain text file (`todo.txt` / `done.txt`) via a free, easy-to-configure sync tool  |
| Portability     | No backend required; runs as a static web app                |
| Simplicity      | Minimal UI — fast to add, reorder, complete, and archive     |
| Compatibility   | Must work on modern browsers (Chrome, Firefox, Safari, Edge) |

---

## Out of Scope

- Multiple lists or project boards
- Priority tags/labels (priority = list position)
- Native mobile app (web app accessible on mobile is sufficient)
- User accounts or authentication (access controlled by Dropbox sharing)

---

## Development Plan

| # | Chunk | Status |
|---|-------|--------|
| 1 | Add task input + display list (in-memory) | ✅ Done |
| 2 | Complete a task (removes from active list) | ✅ Done |
| 3 | Up/down reordering | ✅ Done |
| 4 | Archive / done list view | ✅ Done |
| 5 | Persist to `localStorage` (survives page reload) | ✅ Done |
| 6 | Plain text file export / import | ✅ Done |
