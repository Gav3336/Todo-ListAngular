import { Hono } from "hono";
import { verifyJWT } from "../Handlers/jwtManager.ts";
import { createTodo, deleteTodo, getOverdueTodos, getTodosWithToken, getTodosWithoutToken, getTotalTodos, toggleCompletedTodo, updateTodo } from "../Handlers/mysql/TodoManager.ts";
import { Token } from "../Models/Token.ts";
import { getCookie } from "hono/cookie";
import { TodoValidator } from "../Validators/Todo_Validator.ts";

export const todo = new Hono();

// Get All Todos of a User
// NB: this method is not implemented yet since the app hasn't been finished yet,
// and because of so the frontend doesn't need a login system at the moment.
/**
 * This method is used to get all todos of a user with a token
 * @param userToken the token of the user
 * @returns the todos of the user
 */
todo.get("/", async (c) => {
  const userToken = getCookie(c, "Authorization");
  console.log(userToken);

  if (!userToken) return c.json({ message: "Token is required" }, 401);

  try {
    const decoded = await verifyJWT(userToken);
    console.log(decoded);
    const todos = await getTodosWithToken(decoded as Token);
    return c.json({ message: todos });
  } catch (err) {
    console.log(err);
    return c.json({ message: "Invalid token" }, 401);
  }
});

// Get all todos without token
/**
 * This method is used to get all todos without a token
 * @returns the todos
 */
todo.get("/all", async (c) => {
  try {
    const todos = await getTodosWithoutToken();
    return c.json({ message: todos });
  } catch (err) {
    console.log(err);
    return c.json({ message: (err as Error).message }, 500);
  }
});

todo.get("/total", async (c) => {
  try{
    const total = await getTotalTodos();
    return c.json({ message: total });
  } catch (err) {
    console.log(err);
    return c.json({ message: (err as Error).message }, 500);
  }
});

todo.get("/overdue", async (c) => {
  try{
    const overdue = await getOverdueTodos();
    return c.json({ message: overdue });
  } catch (err) {
    console.log(err);
    return c.json({ message: (err as Error).message }, 500);
  }
});

// Create a Todo (at the moment there isn't a way to login or register, so the userId is not used)
/**
 * This method is used to create a todo
 * @param todoData the data of the todo to create
 * @returns the todo created
 */
todo.post("/", async (c) => {
  // const userId = c.req.param("userId");
  const todoData = await c.req.json();

  console.log(todoData);

  // force the user_id to be 1 for the moment since there isn't a way to login or register
  todoData.user_id = 1;

  try{
    todoData.category_id = parseInt(todoData.category_id);
  } catch (err) {
    console.log(err);
    return c.json({ message: "Invalid category ID" }, 400);
  }

  const parsedTodo = TodoValidator.safeParse(todoData);

  if (!parsedTodo.success) {
    return c.json({ message: "Invalid todo data", errors: parsedTodo.error.errors }, 400);
  }

  try {
    const todo = await createTodo(parsedTodo.data);
    return c.json({ message: "Todo created", data: todo });
  } catch (err) {
    console.log(err);
    return c.json({ message: (err as Error).message }, 500);
  }

});

// Update a Todo
/**
 * This method is used to update a todo
 * @param todoId the id of the todo to update
 * @param todoData the data of the todo to update
 * @returns the todo updated
 */
todo.put("/:todoId", async (c) => {
  const todoId = parseInt(c.req.param("todoId"));
  const todoData = await c.req.json();

  if (isNaN(todoId)) {
    return c.json({ message: "Invalid todo ID" }, 400);
  }

  const parsedTodo = TodoValidator.safeParse(todoData);

  if (!parsedTodo.success) {
    return c.json({ message: "Invalid todo data", errors: parsedTodo.error.errors }, 400);
  }

  const todo = await updateTodo(todoId, parsedTodo.data);

  return c.json({ message: "Todo updated", data: todo });
});

todo.put("/:todoId/:isCompleted", async (c) => {
  const todoId = parseInt(c.req.param("todoId"));
  const isCompleted = c.req.param("isCompleted");

  if(isCompleted !== "true" && isCompleted !== "false") {
    return c.json({ message: "Invalid isCompleted value" }, 400);
  }
  
  if (isNaN(todoId)) {
    return c.json({ message: "Invalid todo ID" }, 400);
  }

  await toggleCompletedTodo(todoId, isCompleted);

  return c.json({ message: "Todo updated", data: "Todo updated" });
  
});


// Delete a Todo
/**
 * This method is used to delete a todo
 * @param todoId the id of the todo to delete
 * @returns the todo deleted
 */
todo.delete("/:todoId", async (c) => {
  console.log("delete todo");
  const todoId = parseInt(c.req.param("todoId"));

  if (isNaN(todoId)) {
    return c.json({ message: "Invalid todo ID" }, 400);
  }

  try {
    const todo = await deleteTodo(todoId);
    return c.json({ message: "Todo deleted", data: todo });
  } catch (err) {
    console.log(err);
    return c.json({ message: (err as Error).message }, 500);
  }
});