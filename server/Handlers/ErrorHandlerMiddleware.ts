import { Context, MiddlewareHandler, Next } from "hono";
import process from "node:process";

enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TEAPOT = 418,
  INTERNAL_SERVER_ERROR = 500
}

// Custom error types to handle different scenarios
export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}

// Standardized response structure
interface ErrorResponse {
  success: boolean;
  message: string;
  // deno-lint-ignore no-explicit-any
  errors?: any;
}

// Error handler middleware
export const errorHandler: MiddlewareHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error caught by middleware:", error);
    
    const response: ErrorResponse = {
      success: false,
      message: "Something went wrong"
    };
    
    let statusCode = StatusCode.INTERNAL_SERVER_ERROR;
    
    if (error instanceof AppError) {
      response.message = error.message;
      statusCode = error.statusCode;
    } else if (error instanceof Error) {
      response.message = error.message;
      
      // Optional: Add detailed errors in development environment
      if (process.env.NODE_ENV === "development") {
        response.errors = {
          stack: error.stack
        };
      }
    }
    
    // Log error for debugging
    console.error(`[${statusCode}] ${response.message}`);
    
    return c.json(response, statusCode as StatusCode);
  }
};