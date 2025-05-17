import { Hono } from 'npm:hono';

const app = new Hono();


Deno.serve({port: 8000}, app.fetch);