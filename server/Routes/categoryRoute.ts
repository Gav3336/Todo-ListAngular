import { Hono } from "hono";

import { createCategory, getCategories } from "../Handlers/mysql/categoryManager.ts";

export const category = new Hono();

// Get All Categories
category.get("/", async (c) => {
    try {
        const categories = await getCategories();
        return c.json({ message: categories });
    } catch (err) {
        console.log(err);
        return c.json({ message: (err as Error).message }, 500);
    }
});

category.post("/", async (c) => {
    try {
        const categoryData = await c.req.json();

        const newCategory = await createCategory(categoryData.name);

        if (!newCategory) {
            return c.json({ message: "Category not created" }, 400);
        }

        return c.json({ message: "Category created", data: newCategory });
    } catch (err) {
        console.log(err);
        return c.json({ message: (err as Error).message }, 500);
    }
});