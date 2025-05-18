import { Hono } from 'npm:hono';
import { createConnectionPool, closePool } from "./Handlers/mysql/MySQLDBConnectorHandler.ts";

import { user } from "./Routes/usersRoute.ts";
import { todo } from "./Routes/todoRoute.ts";
import { category } from "./Routes/categoryRoute.ts";

const app = new Hono();

// app.use('/*', errorHandler);

async function initDatabase() {
  try {
    await createConnectionPool();
  } catch (error) {
    console.error(error);
    Deno.exit(1);
  }
}

// Initialize the connection pool
initDatabase();

// Setup graceful shutdown
Deno.addSignalListener("SIGINT", async () => {
  console.log("Shutting down server...");
  await closePool();
  Deno.exit(0);
});

app.route('/users', user);
app.route('/todos', todo);
app.route('/categories', category);

Deno.serve({ port: 3000 }, app.fetch);