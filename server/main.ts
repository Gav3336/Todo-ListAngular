import { Hono } from 'npm:hono';
import { errorHandler } from "./Handlers/ErrorHandlerMiddleware.ts";
import { ConnectionTest } from "./Handlers/mysql/MySQLDBConnectorHandler.ts";

const app = new Hono();

app.use('*', errorHandler);

async function testConnection() {
  try {
    await ConnectionTest();
  } catch (error) {
    console.error(error);
    Deno.exit(1);
  }
}
testConnection();

Deno.serve({ port: 3000 }, app.fetch);