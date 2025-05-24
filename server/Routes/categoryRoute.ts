import { Hono } from "hono";

import { getCategories } from "../Handlers/mysql/categoryManager.ts";

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