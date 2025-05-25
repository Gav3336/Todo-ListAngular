# Todo List API

A RESTful API for managing todos built with Deno, Hono framework, and MySQL. This API provides comprehensive user authentication, todo management, and category organization features with a modern, scalable architecture.

## 🚀 Features

- **User Authentication**: Complete JWT-based authentication with signup/login endpoints
- **Todo Management**: Full CRUD operations for todos with advanced filtering
- **Category System**: Organize todos by customizable categories
- **Due Date Tracking**: Track overdue and upcoming todos with intelligent notifications
- **Data Validation**: Comprehensive input validation using Zod schemas
- **CORS Support**: Cross-origin resource sharing enabled for frontend integration
- **MySQL Integration**: Persistent data storage with optimized queries
- **Security**: HTTP-only cookies, password hashing with salt, and secure JWT handling

## 🛠️ Tech Stack

- **Runtime**: Deno (Latest)
- **Framework**: Hono (Fast, lightweight web framework)
- **Database**: MySQL 8.0+
- **Validation**: Zod (TypeScript-first schema validation)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Scrypt with salt
- **Testing**: Deno's built-in test runner

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Deno](https://deno.land/) (version 1.40.0 or later)
- MySQL Server (version 8.0 or later)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Todo-ListAngular/server
```

### 2. Database Setup

#### Create Database
```sql
CREATE DATABASE todoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todoDB;
```

#### Update Database Configuration
Update database credentials in `Handlers/mysql/MySQLDBConnectorHandler.ts`:

```typescript
host: "localhost",
user: "root",
password: "root",
database: "todoDB"
```

### 3. Create Database Tables

Execute the following SQL commands to set up the database schema:

```sql
-- Users table
CREATE TABLE UserTable (
    id       INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    salt     VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE CategoryTable (
    id   INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Todos table
CREATE TABLE TodoTable (
    id          INTEGER PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(40)     NOT NULL,
    description VARCHAR(255),
    category_id INT      NOT NULL,
    priority    INT      NOT NULL,
    dueDate     DATETIME NOT NULL,
    dueTime     CHAR(5)  NOT NULL,
    user_id     INT      NOT NULL,
    completed   BOOLEAN  DEFAULT FALSE,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES CategoryTable (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES UserTable (id) ON DELETE CASCADE
);

-- Insert default categories
INSERT INTO CategoryTable (name) VALUES 
    ('Personal'),
    ('Work'),
    ('Shopping'),
    ('Health');

-- Sample user (optional - for testing)
-- Note: Replace with actual hashed password and salt in production
INSERT INTO UserTable (username, password, salt) VALUES (
    'admin',
    '$2y$10$e0N5Z1z1a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w',
    'random_salt_value'
);
```

### 4. Install Dependencies and Run

```bash
# Install dependencies (handled automatically by Deno)
deno cache main.ts

# Run in development mode with auto-reload
deno task dev

# Or run directly
deno run --allow-all --watch main.ts
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

#### User Signup
```http
POST /users/signup
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "data": "jwt-token-here"
}
```

#### User Login
```http
POST /users/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "data": "jwt-token-here"
}
```

### Categories

#### Get All Categories
```http
GET /categories
```

**Response:**
```json
{
  "message": [
    {
      "id": 1,
      "name": "Work"
    },
    {
      "id": 2,
      "name": "Personal"
    }
  ]
}
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
Authorization: Bearer <jwt-token>
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
Authorization: Bearer <jwt-token>

{
  "title": "Complete project",
  "description": "Finish the todo API project",
  "category_id": 1,
  "priority": "high",
  "dueTime": "2024-12-31T23:59:59.000Z"
}
```

**Todo Field Specifications:**
- `title`: String (3-40 characters, required)
- `description`: String (max 120 characters, optional)
- `category_id`: Number (required, must exist in CategoryTable)
- `priority`: Enum ("low", "medium", "high", optional, defaults to "medium")
- `dueTime`: ISO 8601 datetime string (required)
- `completed`: Boolean (optional, defaults to false)

#### Update Todo
```http
PUT /todos/:todoId
Content-Type: application/json
Authorization: Bearer <jwt-token>

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
Authorization: Bearer <jwt-token>
```

## 🔒 Authentication

The API uses JWT tokens for secure authentication:

### Token Management
1. **Token Generation**: JWT tokens are generated upon successful login/signup
2. **Cookie Storage**: Tokens are automatically set as HTTP-only cookies named `Authorization`
3. **Header Authentication**: Include tokens in the `Authorization` header as `Bearer <token>`
4. **Expiration**: Tokens expire after 7 days (configurable)
5. **Security**: HTTP-only cookies prevent XSS attacks

### Usage Examples
```bash
# Using cookie authentication (automatic after login)
curl -X GET http://localhost:3000/todos \
  --cookie "Authorization=your-jwt-token"

# Using header authentication
curl -X GET http://localhost:3000/todos \
  -H "Authorization: Bearer your-jwt-token"
```

## 📝 Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "message": "Error description",
  "errors": {
    "field": ["Specific error messages"]
  }
}
```

### HTTP Status Codes
- `200 OK`: Successful GET, PUT requests
- `201 Created`: Successful POST requests
- `400 Bad Request`: Validation errors, malformed requests
- `401 Unauthorized`: Authentication required or failed
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side errors

## 🧪 Testing

### Run Tests
```bash
# Run all tests
deno test --allow-all

# Run tests with coverage
deno test --allow-all --coverage=coverage

# Run specific test file
deno test --allow-all main_test.ts
```

### Test Structure
```
tests/
├── unit/
│   ├── validators.test.ts
│   └── handlers.test.ts
└── integration/
    └── api.test.ts
```

## 🐳 Docker Support

### Build and Run with Docker
```bash
# Build the image
docker build -t todo-api .

# Run the container
docker run -p 3000:3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_USER=root \
  -e DB_PASSWORD=root \
  -e DB_NAME=todoDB \
  todo-api
```

### Docker Compose (Recommended)
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=mysql
      - DB_USER=root
      - DB_PASSWORD=root
      - DB_NAME=todoDB
    depends_on:
      - mysql
  
  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=todoDB
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## 📁 Project Structure

```
server/
├── Handlers/                 # Business logic and database operations
│   ├── mysql/
│   │   ├── CategoryManager.ts    # Category CRUD operations
│   │   ├── MySQLDBConnectorHandler.ts  # Database connection pool
│   │   ├── TodoManager.ts        # Todo CRUD operations
│   │   └── UserManager.ts        # User authentication logic
│   ├── ErrorHandlerMiddleware.ts # Global error handling
│   └── jwtManager.ts            # JWT token management
├── Models/                   # Data models and types
│   └── Token.ts             # Token interface definitions
├── Routes/                   # API route definitions
│   ├── categoryRoute.ts     # Category endpoints
│   ├── todoRoute.ts         # Todo endpoints
│   └── usersRoute.ts        # Authentication endpoints
├── Validators/               # Input validation schemas
│   ├── Todo_Validator.ts    # Todo validation rules
│   └── User_Validator.ts    # User validation rules
├── main.ts                  # Application entry point
├── main_test.ts            # Main test file
├── deno.json               # Deno configuration
├── deno.lock               # Dependency lock file
├── Dockerfile              # Docker configuration
└── README.md               # Project documentation
```

## 🔧 Configuration

### Environment Variables

For production deployment, use environment variables:

```typescript
// In MySQLDBConnectorHandler.ts
const config = {
  host: Deno.env.get("DB_HOST") || "localhost",
  user: Deno.env.get("DB_USER") || "root",
  password: Deno.env.get("DB_PASSWORD") || "root",
  database: Deno.env.get("DB_NAME") || "todoDB",
  port: parseInt(Deno.env.get("DB_PORT") || "3306")
};
```

### JWT Configuration

Update JWT settings in `Handlers/jwtManager.ts`:

```typescript
const jwtConfig = {
  secret: Deno.env.get("JWT_SECRET") || "your-super-secret-key",
  expiresIn: Deno.env.get("JWT_EXPIRES_IN") || "7d",
  algorithm: "HS256"
};
```

### Server Configuration

```typescript
// In main.ts
const serverConfig = {
  port: parseInt(Deno.env.get("PORT") || "3000"),
  hostname: Deno.env.get("HOSTNAME") || "localhost"
};
```

## 🚧 Current Limitations & Roadmap

### Known Limitations
- User profile management endpoints not yet implemented
- No password reset functionality
- No email verification system
- No todo sharing or collaboration features
- No file attachments for todos
- No real-time notifications

### Planned Features
- [ ] User profile management (update profile, change password)
- [ ] Email verification and password reset
- [ ] Todo sharing and collaboration
- [ ] File attachments
- [ ] Real-time notifications via WebSockets
- [ ] Todo templates and recurring tasks
- [ ] Advanced filtering and search
- [ ] API rate limiting
- [ ] Comprehensive logging system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Add tests for new features
- Update documentation for API changes
- Use conventional commit messages

## 📄 License

This project is developed as part of an Angular learning project and is intended for educational purposes.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Review the API documentation above
3. Ensure your database is properly configured
4. Verify all prerequisites are installed

For additional help, please create an issue with:
- Your operating system
- Deno version (`deno --version`)
- MySQL version
- Error messages (if any)
- Steps to reproduce the issue
