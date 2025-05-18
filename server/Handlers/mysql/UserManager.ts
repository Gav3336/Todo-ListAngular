import * as userValidation from "../../Validators/User_Validator.ts";
import { Buffer } from "node:buffer";
import { createJWT, verifyJWT } from "./jwtManager.ts";
import { connection } from "./MySQLDBConnectorHandler.ts";

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
        // Use the Promise-based version
        const derivedKey = await scryptPromise(userData.password, salt, 64, { N: 1024 });

        // Store salt + hash in the database
        connection.connect();

        const query = "INSERT INTO UserTable (username, password, salt) VALUES (?, ?, ?)";

        try {
            await connection.query(query, [
                userData.username,
                derivedKey.toString('hex'),
                salt
            ])

            return await createJWT(userData);
        } catch (err) {
            console.log("Error inserting user into database (userManager.ts): ", err);
            throw new Error("Error inserting user into database");
        }
    } catch (err) {
        console.log("Error in signup process (userManager.ts): ", err);
        if ((err as Error).message.includes("Invalid password"))
            throw new Error("Password not valid");
        if (err instanceof Error)
            throw new Error(err.message);
    } finally {
        await connection.end()
    }
}

export async function login(loginData: userValidation.LoginDataInterface): Promise<string | void> {

    // check db connection
    try {
        await connection.connect()

    } catch (err) {
        console.log("Error connecting to the database (userManager.ts): ", err)
        throw new Error("Error connecting to the database")
    } finally {
        await connection.end()
    }

    // check if the user exists
    try {
        await connection.connect()
        const query = "SELECT * FROM users WHERE username = $1";
        const result = await connection.query(query, [loginData.username]);
        const rows = result as Array<any>;
        
        if (rows.length === 0) {
            throw new Error("User not found");
        }

        const user = rows[0] as userValidation.userDataInterface;

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
    finally {
        await connection.end()
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