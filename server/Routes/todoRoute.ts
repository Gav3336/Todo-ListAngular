import { Hono } from "hono";

const todo = new Hono();

// Get All Todos of a User
todo.get("/todos/:userId", (c) => {
  const userId = c.req.param("userId");
  return c.json({ message: `Get all todos for user with ID: ${userId}` });
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