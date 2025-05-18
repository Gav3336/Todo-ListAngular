import mysql from "npm:mysql2@^2.3.3/promise";

export let connection: mysql.Connection;

export async function createConnection() {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "todoDB",
    });
    console.log("Database connection established successfully");
    return true;
  } catch (error) {
    console.error("Error connecting to database:", error);
    return false;
  }
}

export async function ConnectionTest() {
  try {
    if (!connection) {
      const connected = await createConnection();
      if (!connected) {
        throw new Error("Failed to create database connection");
      }
    }
    // Test the connection with a simple query
    await connection.query('SELECT 1');
    console.log("Connection test successful");
    return connection;
  } catch (error) {
    throw new Error(`Connection test failed: ${(error as Error).message}`);
  }
}