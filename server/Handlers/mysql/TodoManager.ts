import { Token } from "../../Models/Token.ts";
import { getPool, createConnectionPool } from "./MySQLDBConnectorHandler.ts";

export async function getTodos(token: Token) {
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