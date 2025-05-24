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
export async function getTodosWithoutToken() {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    const pool = getPool();
    const query = 'SELECT * FROM TodoTable join CategoryTable on TodoTable.category_id = CategoryTable.id where TodoTable.user_id = 1';
    try{
    const [rows] = await pool.query(query);
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

    try{
        const pool = getPool();
        const query = 'INSERT INTO TodoTable (title, description, category_id, priority, dueTime, user_id, completed) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await pool.query(query, [todo.title, todo.description, todo.category_id, todo.priority, todo.dueTime, todo.user_id, todo.completed]);
        return "Todo created successfully";
    } catch (err) {
        console.log(err);
        throw new Error("Error creating todo");
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

    try{
        const pool = getPool();
        const query = 'UPDATE TodoTable SET title = ?, description = ?, category_id = ?, priority = ?, dueTime = ?, completed = ?, updatedAt = NOW() WHERE id = ?';
        await pool.query(query, [todo.title, todo.description, todo.category_id, todo.priority, todo.dueTime, todo.completed, todoId]);
        return "Todo updated successfully";
    } catch (err) {
        console.log(err);
        throw new Error("Error updating todo");
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

    try{
        const pool = getPool();
        const query = 'DELETE FROM TodoTable WHERE id = ?';
        await pool.query(query, [todoId]);
        return "Todo deleted successfully";
    } catch (err) {
        console.log(err);
        throw new Error("Error deleting todo");
    }
}