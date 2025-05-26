import { Context, Hono } from "hono";
import { validator } from 'hono/validator'

import * as userManager from "../Handlers/mysql/userManager.ts"
import * as userValidation from '../Validators/User_Validator.ts'

export const user = new Hono();
import {
    setCookie
} from 'hono/cookie'

enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500,
}

const setAuthCookie = (c: Context, token: string) => {
    setCookie(c, 'Authorization', token, {
        httpOnly: true,
        secure: false, // set to true in production (https site)
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    c.header('Authorization', `Bearer ${token}`)
}

user.post('/signup', validator('form', async (_value, c) => {
    if (!c.req.json) {
        return c.json(
            {
                message: "Invalid request",
                errors: {
                    body: "Request body is not JSON",
                },
            }, StatusCode.BAD_REQUEST
        )
    }

    const bodyData = await c.req.json()
    const parsed = userValidation.signupDataSchema.safeParse(bodyData)
    if (!parsed.success) {
        console.log("Validation error: ", parsed.error.flatten().fieldErrors)
        return c.json(
            {
                message: "Validation error",
                errors: parsed.error.flatten().fieldErrors,
            },
            StatusCode.BAD_REQUEST
        )
    }
    return parsed.data
}), async (c) => {
    const body = c.req.valid('form')

    let token: string = ''

    try {
        token = await userManager.signup(body) || ''

        if (token === '')
            return c.json(
                {
                    message: "Error creating user",
                    errors: {
                        body: "Error creating user",
                    },
                }, StatusCode.INTERNAL_SERVER_ERROR
            )
    } catch (err) {
        console.log("Error during signup (usersRoute.ts): ", err)
        return c.json(
            {
                message: "Error during signup",
                errors: {
                    body: (err as Error).message,
                },
            }, StatusCode.INTERNAL_SERVER_ERROR
        )
    }

    setAuthCookie(c, token)

    return c.json(
        {
            message: "User created successfully",
            data: token,
        }, StatusCode.CREATED
    )
})


// TODO: Add a check to see if the user is already logged in
// TODO: Add a check to see if the user has put valid credentials
user.post('/login', validator('form', async (_value, c) => {
    if (!c.req.json) {
        return c.json(
            {
                message: "Invalid request",
                errors: {
                    body: "Request body is not JSON",
                },
            }, StatusCode.BAD_REQUEST
        )
    }

    const bodyData = await c.req.json()
    const parsed = userValidation.loginDataSchema.safeParse(bodyData)
    if (!parsed.success) {
        console.log("Validation error: ", parsed.error.flatten().fieldErrors)
        return c.json(
            {
                message: "Validation error",
                errors: parsed.error.flatten().fieldErrors,
            },
            StatusCode.BAD_REQUEST
        )
    }
    return parsed.data
}
), async (c) => {
    const body = c.req.valid('form')

    let token: string = ''

    try {
        token = await userManager.login(body) || ''

        if (token === '')
            return c.json(
                {
                    message: "Error logging in",
                    errors: {
                        body: "Error logging in",
                    },
                }, StatusCode.INTERNAL_SERVER_ERROR
            )
    } catch (err) {
        console.log("Error during login (usersRoute.ts): ", err)
        return c.json(
            {
                message: "Error during login",
                errors: {
                    body: (err as Error).message,
                },
            }, StatusCode.INTERNAL_SERVER_ERROR
        )
    }

    setAuthCookie(c, token)

    return c.json(
        {
            message: "User logged in successfully",
            data: token,
        }, StatusCode.OK
    )
})