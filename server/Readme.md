# Todo List API

A RESTful API for managing todos built with Deno, Hono framework, and MySQL. This API provides user authentication, todo management, and category organization features.

## 🚀 Features

- **User Authentication**: JWT-based authentication with signup/login
- **Todo Management**: Create, read, update, and delete todos
- **Category System**: Organize todos by categories
- **Due Date Tracking**: Track overdue and upcoming todos
- **Data Validation**: Comprehensive input validation using Zod
- **CORS Support**: Cross-origin resource sharing enabled
- **MySQL Integration**: Persistent data storage

## 🛠️ Tech Stack

- **Runtime**: Deno
- **Framework**: Hono
- **Database**: MySQL
- **Validation**: Zod
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Scrypt

## 📋 Prerequisites

- [Deno](https://deno.land/) (latest version)
- MySQL Server
- Node.js (for some npm packages)

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Todo-ListAngular/server
   ```

2. **Database Setup**
   - Create a MySQL database named `todoDB`
   - Update database credentials in `Handlers/mysql/MySQLDBConnectorHandler.ts`:

     ```typescript
     host: "localhost",
     user: "root",
     password: "root",
     database: "todoDB"
     ```

3. **Create Database Tables**

   ```sql
   -- Users table
   CREATE TABLE UserTable (
    id       integer primary key auto_increment,
    username varchar(20)  not null,
    password varchar(255) not null,
    salt     varchar(255) not null
   );

   -- Categories table
   CREATE TABLE CategoryTable (
    id   integer primary key auto_increment,
    name varchar(20) not null
   );

   -- Todos table
   CREATE TABLE TodoTable (
    id          integer primary key auto_increment,
    title       varchar(40)     not null,
    description varchar(255),
    category_id int      not null,
    priority    int      not null,
    dueDate     datetime not null,
    dueTime     char(5)  not null,
    user_id     int      not null,
    created_at  datetime default current_timestamp,
    updated_at  datetime default current_timestamp,

    add foreign key (category_id) references CategoryTable (id),
    add foreign key (user_id) references UserTable (id);
   );
   ```

4. **Run the application**

   ```bash
   deno task dev
   ```

   The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL

```
http://localhost:3000
```

### Authentication

#### Sign Up

```http
POST /users/signup
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

**Password Requirements:**

- Minimum 8 characters, maximum 64 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

#### Login

```http
POST /users/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

### Categories

#### Get All Categories

```http
GET /categories
```

#### Create Category

```http
POST /categories
Content-Type: application/json

{
  "name": "Work"
}
```

### Todos

#### Get All Todos (Public)

```http
GET /todos/all
```

#### Get User's Todos (Authenticated)

```http
GET /todos
Cookie: Authorization=<jwt-token>
```

#### Get Todo Statistics

```http
GET /todos/total
```

#### Get Overdue Todos Count

```http
GET /todos/overdue
```

#### Create Todo

```http
POST /todos
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo API project",
  "category_id": 1,
  "priority": "high",
  "dueTime": "2024-12-31T23:59:59.000Z"
}
```

**Todo Fields:**

- `title`: String (3-40 characters, required)
- `description`: String (max 120 characters, optional)
- `category_id`: Number (required)
- `priority`: Enum ("low", "medium", "high", optional)
- `dueTime`: ISO 8601 datetime string (required)
- `completed`: Boolean (default: false)

#### Update Todo

```http
PUT /todos/:todoId
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "category_id": 1,
  "priority": "medium",
  "dueTime": "2024-12-31T23:59:59.000Z",
  "completed": true
}
```

#### Delete Todo

```http
DELETE /todos/:todoId
```

## 🔒 Authentication

The API uses JWT tokens for authentication. After successful login/signup:

1. A JWT token is set as an HTTP-only cookie named `Authorization`
2. The token is also returned in the response body
3. The token expires after 30 days
4. Include the token in the `Authorization` header for protected routes:

   ```
   Authorization: Bearer <jwt-token>
   ```

## 📝 Response Format

### Success Response

```json
{
  "message": "Success message or data",
  "data": {} // Optional additional data
}
```

### Error Response

```json
{
  "message": "Error message",
  "errors": {} // Optional validation errors
}
```

## 🧪 Testing

Run tests with:

```bash
deno test --allow-all
```

## 🐳 Docker Support

Build and run with Docker:

```bash
docker build -t todo-api .
docker run -p 3000:3000 todo-api
```

## 📁 Project Structure

```
server/
├── Handlers/
│   ├── mysql/
│   │   ├── CategoryManager.ts
│   │   ├── MySQLDBConnectorHandler.ts
│   │   ├── TodoManager.ts
│   │   └── UserManager.ts
│   ├── ErrorHandlerMiddleware.ts
│   └── jwtManager.ts
├── Models/
│   └── Token.ts
├── Routes/
│   ├── categoryRoute.ts
│   ├── todoRoute.ts
│   └── usersRoute.ts
├── Validators/
│   ├── Todo_Validator.ts
│   └── User_Validator.ts
├── main.ts
├── deno.json
└── Dockerfile
```

## 🔧 Configuration

### Environment Variables

Currently, database configuration is hardcoded. For production, consider using environment variables:

```typescript
// In MySQLDBConnectorHandler.ts
host: Deno.env.get("DB_HOST") || "localhost",
user: Deno.env.get("DB_USER") || "root",
password: Deno.env.get("DB_PASSWORD") || "root",
database: Deno.env.get("DB_NAME") || "todoDB"
```

### JWT Secret

Update the JWT secret in `Handlers/jwtManager.ts` for production:

```typescript
const secret = Deno.env.get("JWT_SECRET") || "your-secret-key";
```

## 🚧 Current Limitations

- User authentication is partially implemented (frontend integration pending)
- Default user_id is hardcoded to 1 for todo operations
- No user profile management endpoints
- No todo sharing or collaboration features

## 📄 License

This project has the scope of be in pair with a Angular learning project
