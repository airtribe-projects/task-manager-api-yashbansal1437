# Task Manager API

## Overview

This is a simple **Task Manager API** built with **Node.js** and **Express**. It allows users to manage a list of tasks, supporting CRUD operations (Create, Read, Update, Delete). Tasks have the following attributes:

- `id` (number) – unique identifier
- `title` (string) – task title
- `description` (string) – task description
- `completed` (boolean) – completion status
- `priority` (string) – task priority, can be `'low'`, `'medium'`, or `'high'`

The tasks are stored in a local `task.json` file.

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**

    ```bash
    npm install express
    ```

3. **Run the server**

    ```bash
    node server.js
    ```

4. **Optional:** Use **nodemon** for automatic restarts during development

    ```bash
    npm install -g nodemon
    nodemon server.js
    ```

---

## API Endpoints

1. **Get all tasks**
   - **Endpoint:** `GET /tasks`
   - **Description:** Retrieve all tasks
   - **Query Parameters:**
     - `completed` (optional) - filters tasks by completion status (`true` or `false`)
   - **Example:**

   ```bash
   curl http://localhost:3000/tasks
   curl http://localhost:3000/tasks?completed=true
   ```

2. **Get a task by ID**
   - **Endpoint:** `GET /tasks/:id`
   - **Description:** Retrieve a single task by its ID
   - **Example:**

   ```bash
   curl http://localhost:3000/tasks/1
   ```

3. **Get tasks by priority**
   - **Endpoint:** `GET /tasks/priority/:level`
   - **Description:** Retrieve tasks filtered by priority (`low`, `medium`, or `high`).
   - **Example:**

   ```bash
   curl http://localhost:3000/tasks/priority/high
   ```

4. **Create a task**
   - **Endpoint:** `POST /tasks`
   - **Description:** Create a new task
   - **Example:**

   ```bash
   curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"New","description":"desc","priority":"medium"}'
   ```
