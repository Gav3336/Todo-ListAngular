import * as userValidation from "../../Validators/User_Validator.ts";
import { Buffer } from "node:buffer";
import { createJWT, verifyJWT } from "./jwtManager.ts";

import { getPool, createConnectionPool } from "./MySQLDBConnectorHandler.ts";

const {
    scrypt,
    randomBytes,
} = await import('node:crypto');

// Convert callback-based scrypt to Promise
// deno-lint-ignore no-explicit-any
function scryptPromise(password: string, salt: string, keylen: number, options: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        scrypt(password, salt, keylen, options, (err, derivedKey) => {
            if (err) reject(err);
            else resolve(derivedKey);
        });
    });
}

export async function signup(userData: userValidation.userDataInterface): Promise<string | void> {
    // Generate a random salt
    const salt = randomBytes(16).toString('hex');

    try {
        // Ensure we have a valid connection pool
        await createConnectionPool();

        // Use the Promise-based version
        const derivedKey = await scryptPromise(userData.password, salt, 64, { N: 1024 });

        // Get the database pool
        const pool = getPool();

        const query = "INSERT INTO UserTable (username, password, salt) VALUES (?, ?, ?)";

        await pool.query(query, [
            userData.username,
            derivedKey.toString('hex'),
            salt
        ]);

        return await createJWT(userData);
    } catch (err) {
        console.log("Error in signup process (userManager.ts): ", err);
        if ((err as Error).message.includes("Invalid password"))
            throw new Error("Password not valid");
        throw new Error((err as Error).message);
    }
}

export async function login(loginData: userValidation.LoginDataInterface): Promise<string | void> {

    // check db connection
    try {
        await createConnectionPool();

    } catch (err) {
        console.log("Error connecting to the database (userManager.ts): ", err)
        throw new Error("Error connecting to the database")
    }

    // check if the user exists
    try {
        await createConnectionPool();
        const pool = getPool();
        const query = "SELECT * FROM UserTable WHERE username = ?";
        const [rows] = await pool.query(query, [loginData.username]);
        // deno-lint-ignore no-explicit-any
        const users = rows as Array<any>;

        if (users.length === 0) {
            throw new Error("User not found");
        }

        const user = users[0] as userValidation.userDataInterface;

        if (!user || !user.salt || !user.password) {
            throw new Error("User not found");
        }

        const salt = user.salt;
        const hash = user.password;

        // Use the Promise-based version
        const derivedKey = await scryptPromise(loginData.password, salt, 64, { N: 1024 });

        if (derivedKey.toString('hex') !== hash) {
            throw new Error("Invalid password");
        }

        return await createJWT(loginData);
    } catch (err) {
        console.log("Error checking if user exists (userManager.ts): ", err)
        if (err instanceof Error)
            throw new Error("Error checking if user exists: " + err.message)
    }
}

export async function tokenChecker(token: string): Promise<boolean> {
    try {
        await verifyJWT(token)
    } catch (err) {
        if (err instanceof Error) {
            console.log(err)
            console.log("Error verifying JWT (userManager.ts): ", err)
            throw new Error(err.message)
        }
        return false
    }
    return true
}