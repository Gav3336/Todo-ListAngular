import { getPool, createConnectionPool } from "./MySQLDBConnectorHandler.ts";

export async function getCategories() {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = "SELECT * FROM CategoryTable";
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.log(err);
        throw new Error("Error fetching categories");
    }
}

export async function createCategory(name: string) {
    try {
        await createConnectionPool();
    } catch (err) {
        console.log(err);
        throw new Error("Error connecting to the database");
    }

    try {
        const pool = getPool();
        const query = "INSERT INTO CategoryTable (name) VALUES (?)";
        const [rows] = await pool.query(query, [name]);
        return rows;
    } catch (err) {
        console.log(err);
        throw new Error("Error creating category");
    }
}