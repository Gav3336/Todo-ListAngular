import { z } from 'npm:zod';

/**
 * this is the validator for the Todo object.
 * is should be used for validating the data before it is sent to the database.
 * it is also used to validate the data after it is retrieved from the database.
 * this should be used for validating a single Todo object
 */
export const TodoValidator = z.object({
    title: z.string().min(3).max(40),
    description: z.string().max(120).optional(),
    category_id: z.number(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().date(),
    dueTime: z.string().optional(),
    user_id: z.number(),
    completed: z.boolean(),
});

/**
 * This is the validator for the Todo object.
 * It is used to validate the data before it is sent to the database.
 * It is also used to validate the data after it is retrieved from the database.
 * It is used to ensure that the data is in the correct format and that it meets the requirements.
 * this should be used for validating arrays of Todo objects
 */
export const TodosValidator = z.array(TodoValidator);

/**
 * a type that is used to validate the Todo object.
 */
export type TodoInterface = z.infer<typeof TodoValidator>;