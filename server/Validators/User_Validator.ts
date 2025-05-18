import { z } from "zod";

export interface userDataInterface {
    username: string;
    password: string;
    salt?: string
}

export const loginDataSchema = z.object({
  username: z.string().email().optional(),
  password: z.string().min(8),
})

export type LoginDataInterface = z.infer<typeof loginDataSchema>;

export const signupDataSchema = z.object({
    username: z.string({message: "username must be a string"}).min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "Username must contain only letters, numbers and underscores"),
    password: z.string({message: "password must be a string"}).min(8).max(64).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
});