import { Hono } from "hono";
import { verifyJWT } from "../Handlers/mysql/jwtManager.ts";
import { getTodos } from "../Handlers/mysql/TodoManager.ts";
import { Token } from "../Models/Token.ts";
import { getCookie } from "hono/cookie";

export const todo = new Hono();

// Get All Todos of a User
todo.get("/", async (c) => {
  const userToken = getCookie(c, "Authorization");
  console.log(userToken);

  if (!userToken) return c.json({ message: "Token is required" }, 401);

  try {
    const decoded = await verifyJWT(userToken);
    console.log(decoded);
    const todos = await getTodos(decoded as Token);
    return c.json({ message: todos });
  } catch (err) {
    console.log(err);
    return c.json({ message: "Invalid token" }, 401);
  }
});

// Get a Todo
todo.get("/todos/:userId/:todoId", (c) => {
  const userId = c.req.param("userId");
  const todoId = c.req.param("todoId");
  return c.json({ message: `Get todo with ID: ${todoId} for user with ID: ${userId}` });
}
);

// Create a Todo
todo.post("/todos/:userId", (c) => {
  const userId = c.req.param("userId");
  const todoData = c.req.json();
  return c.json({ message: "Todo created", data: todoData, userId });
});

// Update a Todo
todo.put("/todos/:userId/:todoId", (c) => {
  const userId = c.req.param("userId");
  const todoId = c.req.param("todoId");
  const todoData = c.req.json();
  return c.json({ message: "Todo updated", data: todoData, userId, todoId });
});

// Delete a Todo
todo.delete("/todos/:userId/:todoId", (c) => {
  const userId = c.req.param("userId");
  const todoId = c.req.param("todoId");
  return c.json({ message: `Todo with ID: ${todoId} deleted for user with ID: ${userId}` });
});