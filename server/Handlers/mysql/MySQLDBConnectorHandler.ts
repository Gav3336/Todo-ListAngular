import mysql from "npm:mysql2@^2.3.3/promise";

let pool: mysql.Pool | null = null;

export async function createConnectionPool() {
  try {
    if (pool) {
      // Check if pool is still valid
      try {
        await pool.query('SELECT 1');
        return true; // Pool still valid
      } catch (_err) {
        console.log("Previous connection pool no longer valid, creating new pool");
        // Connection pool not valid, will create a new one
        await pool.end();
        pool = null;
      }
    }

    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "root",
      database: "todoDB",
      waitForConnections: true,
      connectionLimit: 10, // Adjust based on your needs
      queueLimit: 0        // Unlimited queue
    });
    
    console.log("Database connection pool established successfully");
    return true;
  } catch (error) {
    console.error("Error creating connection pool:", error);
    return false;
  }
}

export async function ConnectionTest() {
  try {
    const connected = await createConnectionPool();
    if (!connected) {
      throw new Error("Failed to create database connection pool");
    }
    
    await pool!.query('SELECT 1');
    console.log("Connection test successful");
    return true;
  } catch (error) {
    console.error("Connection test failed:", error);
    throw error;
  }
}

// Use this to get a connection from the pool
export function getPool() {
  if (!pool) {
    throw new Error("Database connection pool not established");
  }
  return pool;
}

// Only call this when shutting down the server
export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("Database connection pool closed");
  }
}