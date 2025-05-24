import jwt from 'npm:jsonwebtoken';

import { LoginDataInterface } from "../Validators/User_Validator.ts"

export async function createJWT(loginData: LoginDataInterface): Promise<string> {
    try {
        const token = await jwt.sign({
            username: loginData.username || "",
            password: loginData.password,
        }, 'secret', { expiresIn: '30d' });

        return await token;
    } catch (err) {
        console.log("Error creating JWT (jwtManager.ts): ", err);
        throw new Error("Error creating JWT");
    }
}

export async function verifyJWT(token: string): Promise<string | object> {
    try {
        token = token.replace(/Bearer\s/, "");
        // Verify the token
        const decoded = await jwt.verify(token, 'secret');
        return await decoded;
    } catch (err) {
        if(err instanceof jwt.TokenExpiredError) {
            console.log("JWT expired (jwtManager.ts): ", err);
            throw new Error("JWT expired");
        }
        if(err instanceof jwt.JsonWebTokenError) {
            console.log("Invalid JWT (jwtManager.ts): ", err);
            throw new Error("Invalid JWT");
        }
        if(err instanceof jwt.NotBeforeError) {
            console.log("JWT not active (jwtManager.ts): ", err);
            throw new Error("JWT not active");
        }
        console.log("Error verifying JWT (jwtManager.ts): ", err);
        throw new Error("Error verifying JWT");
    }
}