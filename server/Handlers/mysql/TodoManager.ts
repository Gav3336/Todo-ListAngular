import { Token } from "../../Models/Token.ts";
import { getPool, createConnectionPool } from "./MySQLDBConnectorHandler.ts";
import { TodoInterface } from "../../Validators/Todo_Validator.ts";

/**
 * This function is used to get all todos of a user with a token
 * @param token the token of the user
 * @returns the todos of the user
 */
export async function getTodosWithToken(token: Token) {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    const pool = getPool();
    const query = 'SELECT TodoTable.* FROM TodoTable JOIN UserTable ON TodoTable.user_id = UserTable.id WHERE username = ?';
    const [rows] = await pool.query(query, [token.username]);
    // deno-lint-ignore no-explicit-any
    const todos = rows as Array<any>;
    return todos;
}

/**
 * This function is used to get all todos without a token
 * @returns the todos
 */
export async function getTodosWithoutToken(page: number) {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    const pool = getPool();
    const query = `
    SELECT 
        TodoTable.id,
        TodoTable.title,
        TodoTable.description,
        TodoTable.category_id,
        TodoTable.priority,
        TodoTable.dueTime,
        TodoTable.user_id,
        TodoTable.isCompleted,
        CategoryTable.category_name as category_name
    FROM TodoTable
    JOIN CategoryTable ON CategoryTable.id = TodoTable.category_id
    WHERE TodoTable.user_id = 1 AND date(TodoTable.dueTime) >= CURDATE()
    ORDER BY TodoTable.dueTime
    LIMIT 20 OFFSET ?
    `;
    try {
        const [rows] = await pool.query(query, [page]);
        // deno-lint-ignore no-explicit-any
        const todos = rows as Array<any>;
        return todos;
    } catch (err) {
        console.log(err);
        throw new Error("Error fetching todos");
    }
}

/**
 * This function is used to create a todo
 * @param todo the todo to create
 * @returns the todo created
 */
export async function createTodo(todo: TodoInterface) {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = 'INSERT INTO TodoTable (title, description, category_id, priority, dueTime, user_id, isCompleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const result = await pool.query(query, [todo.title, todo.description, todo.category_id, todo.priority, todo.dueTime, todo.user_id, false]);
        return result;
    } catch (err) {
        console.log(err);
        throw new Error("Error creating todo");
    }
}

export async function getTotalTodos() {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = 'SELECT COUNT(*) as total FROM TodoTable WHERE date(dueTime) >= CURDATE()';
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.log(err);
        throw new Error("Error fetching total todos");
    }
}

export async function getOverdueTodos() {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = 'SELECT COUNT(*) as total FROM TodoTable WHERE date(dueTime) < CURDATE() and user_id = 1';
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.log(err);
        throw new Error("Error fetching overdue todos");
    }
}

/**
 * This function is used to update a todo
 * @param todoId the id of the todo to update
 * @param todo the todo to update
 * @returns the todo updated
 */
export async function updateTodo(todoId: number, todo: TodoInterface) {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = 'UPDATE TodoTable SET title = ?, description = ?, category_id = ?, priority = ?, dueTime = ?, isCompleted = ?, updatedAt = NOW() WHERE id = ?';
        await pool.query(query, [todo.title, todo.description, todo.category_id, todo.priority, todo.dueTime, todo.isCompleted, todoId]);
        return "Todo updated successfully";
    } catch (err) {
        console.log(err);
        throw new Error("Error updating todo");
    }
}

export async function toggleCompletedTodo(todoId: number, isCompleted: string) {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = 'UPDATE TodoTable SET isCompleted = ? WHERE id = ?';
        await pool.query(query, [isCompleted === "true" ? 1 : 0, todoId]);
        return "Todo updated successfully";
    } catch (err) {
        console.log(err);
        throw new Error("Error updating todo");
    }
}

export async function getCompletedTodos() {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = 'SELECT COUNT(*) as total FROM TodoTable WHERE isCompleted = 1 and user_id = 1';
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.log(err);
        throw new Error("Error fetching completed todos");
    }
}

/**
 * This function is used to delete a todo
 * @param todoId the id of the todo to delete
 * @returns the todo deleted
 */
export async function deleteTodo(todoId: number) {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = 'DELETE FROM TodoTable WHERE id = ?';
        await pool.query(query, [todoId]);
        return "Todo deleted successfully";
    } catch (err) {
        console.log(err);
        throw new Error("Error deleting todo");
    }
}