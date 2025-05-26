# Todo List Angular Application

A modern, full-stack todo list application built with Angular 19, Deno (Hono framework), and MySQL. This project demonstrates a complete CRUD application with a beautiful UI using PrimeNG and Tailwind CSS.

## 🚀 Features

- ✅ **Complete Todo Management**: Create, read, update, and delete todos
- 🏷️ **Category Organization**: Organize todos by categories
- 👥 **User Management**: Multi-user support with user-specific todos
- 🎨 **Modern UI**: Beautiful interface built with PrimeNG and Tailwind CSS
- 🐳 **Dockerized**: Full Docker setup for easy deployment
- 🔄 **Real-time Updates**: Responsive frontend with Angular 19
- 🌐 **RESTful API**: Clean API built with Deno and Hono framework
- 🗄️ **MySQL Database**: Reliable data persistence

## 🛠️ Tech Stack

### Frontend
- **Angular 19** - Modern web framework
- **PrimeNG** - Rich UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming

### Backend
- **Deno** - Modern JavaScript/TypeScript runtime
- **Hono** - Fast web framework
- **Zod** - TypeScript-first schema validation
- **MySQL** - Relational database

### DevOps
- **Docker & Docker Compose** - Containerization
- **Hot Reload** - Development efficiency

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (version 2.0 or higher)
- [Git](https://git-scm.com/) (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Gav3336/Todo-ListAngular.git
cd Todo-ListAngular
```

### 2. Start the Application with Docker

The easiest way to run the entire application is using Docker Compose:

```bash
docker-compose up --build
```

⚠️ **If the frotend won't start in the docker, try using ng serve to start it**

```bash
cd app
npm install -g @angular/cli
npm install
ng serve
```

This command will:
- Build and start the Angular frontend on `http://localhost:4200`
- Build and start the Deno backend API on `http://localhost:3000`
- Start a MySQL database on `http://localhost:3306`

### 3. Access the Application

- **Frontend**: Open your browser and navigate to `http://localhost:4200`
- **API**: The backend API is available at `http://localhost:3000`
- **Database**: MySQL is accessible on `localhost:3306` (if needed for direct access)

## 🔧 Development Setup

If you want to run the application locally for development:

### Frontend Development

```bash
cd app
npm install
npm start
```

The Angular development server will start on `http://localhost:4200` with hot reload enabled.

### Backend Development

```bash
cd server
deno install
deno run dev
```

The Deno server will start on `http://localhost:3000` with auto-restart on file changes.

### Database Setup

You can use the Docker MySQL container even during development:

```bash
docker-compose up db
```

## 📁 Project Structure

```
Todo-ListAngular/
├── app/                    # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── home-page/  # Home page component
│   │   │   ├── todo-page/  # Todo management component
│   │   │   └── utils/      # Utility functions
│   │   └── ...
│   ├── package.json
│   └── Dockerfile
├── server/                 # Deno backend API
│   ├── Handlers/          # Database and business logic
│   ├── Models/            # Data models
│   ├── Routes/            # API routes (users, todos, categories)
│   ├── Validators/        # Input validation schemas
│   ├── main.ts           # Server entry point
│   └── Dockerfile
├── db_data/              # MySQL data persistence
├── Docker-compose.yaml   # Multi-container setup
└── README.md
```

## 🌐 API Endpoints

The backend provides the following API endpoints:

### Users
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Todos
- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get todo by ID
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create a new category
- `GET /categories/:id` - Get category by ID
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

## 🔒 Environment Variables

The application uses the following environment variables (configured in Docker Compose):

### Database
- `MYSQL_ROOT_PASSWORD=root`
- `MYSQL_DATABASE=todoDB`
- `MYSQL_USER=root`
- `MYSQL_PASSWORD=root`

## 🛠️ Available Scripts

### Frontend (Angular)
```bash
ng serve         # Start development server
```

### Backend (Deno)
```bash
deno task dev      # Start development server with auto-reload
deno run -A main.ts # Run the server
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs

# Start specific service
docker-compose up db
```

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 3306, and 4200 are not in use
2. **Docker issues**: Try `docker-compose down` and then `docker-compose up --build`
3. **Database connection**: Wait a few seconds for MySQL to fully initialize
4. **Frontend not loading**: Check if the Angular build completed successfully

### Logs

To view logs for specific services:
```bash
docker-compose logs app    # Frontend logs
docker-compose logs server # Backend logs
docker-compose logs db     # Database logs
```

**Happy coding!** 🎉
