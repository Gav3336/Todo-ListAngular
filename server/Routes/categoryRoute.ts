import { Hono } from "hono";

const category = new Hono();

// Get All Categories of a User
category.get("/categories/:userId", (c) => {
    const userId = c.req.param("userId");
    return c.json({ message: `Get all categories for user with ID: ${userId}` });
    }
);

// Get a Category
category.get("/categories/:userId/:categoryId", (c) => {
    const userId = c.req.param("userId");
    const categoryId = c.req.param("categoryId");
    return c.json({ message: `Get category with ID: ${categoryId} for user with ID: ${userId}` });
    }
);

// Create a Category
category.post("/categories/:userId", (c) => {
    const userId = c.req.param("userId");
    const categoryData = c.req.json();
    return c.json({ message: "Category created", data: categoryData, userId });
    }
);