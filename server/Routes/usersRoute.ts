import { Hono } from "hono";

const user = new Hono();

// Get The User
user.get("/users/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ message: `Get user with ID: ${id}` });
});

// Create a User
user.post("/users", (c) => {
    const userData = c.req.json();
    return c.json({ message: "User created", data: userData });
});