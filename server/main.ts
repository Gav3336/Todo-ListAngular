import { Hono } from 'npm:hono';
import { ConnectionTest } from "./Handlers/mysql/MySQLDBConnectorHandler.ts";

import { user } from "./Routes/usersRoute.ts";
import { todo } from "./Routes/todoRoute.ts";
import { category } from "./Routes/categoryRoute.ts";

const app = new Hono();

// app.use('/*', errorHandler);

async function testConnection() {
  try {
    await ConnectionTest();
  } catch (error) {
    console.error(error);
    Deno.exit(1);
  }
}
testConnection();

app.route('/users', user);
app.route('/todos', todo);
app.route('/categories', category);

Deno.serve({ port: 3000 }, app.fetch);