# Todo Angular Project

A modern, full-stack Todo application built with Angular 19, featuring a clean UI with PrimeNG components and Tailwind CSS styling.

## 🎯 Project Overview

This project serves as a learning exercise for creating a full-stack web application using the latest version of Angular (v19). It demonstrates modern Angular development practices, component architecture, and responsive design principles.

## ✨ Features

- ✅ **Todo Management**: Create, view, and manage todo items
- 🏷️ **Categories**: Organize todos with category system
- 🎨 **Modern UI**: Clean interface built with PrimeNG and Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🧭 **Navigation**: Multi-page application with routing
- 🔧 **TypeScript**: Fully typed codebase for better development experience
- 🐳 **Docker Support**: Containerized deployment ready

## 🛠️ Tech Stack

### Frontend
- **Angular 19** - Latest version of the Angular framework
- **TypeScript 5.7** - Type-safe JavaScript
- **PrimeNG 19** - Rich UI component library
- **Tailwind CSS 4** - Utility-first CSS framework
- **RxJS 7** - Reactive programming library

### Development Tools
- **Angular CLI 19** - Command line interface for Angular
- **Karma & Jasmine** - Testing framework
- **PostCSS** - CSS processing tool

### Deployment
- **Docker** - Containerization platform
- **Node.js 24** - Runtime environment

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Angular CLI (optional, but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Todo-ListAngular/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Angular CLI globally (if not already installed)**
   ```bash
   npm install -g @angular/cli
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## 🐳 Docker Deployment

### Build and run with Docker

1. **Build the Docker image**
   ```bash
   docker build -t todo-angular-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 4200:4200 todo-angular-app
   ```

3. **Access the application**
   Open `http://localhost:4200` in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── home-page/              # Home page component
│   ├── todo-page/              # Main todo page component
│   ├── utils/
│   │   ├── Components/         # Reusable components
│   │   │   ├── add-todo/       # Add todo component
│   │   │   ├── navbar/         # Navigation component
│   │   │   ├── todo-card/      # Todo item card component
│   │   │   └── todo-list/      # Todo list component
│   │   ├── Models/             # TypeScript interfaces
│   │   │   ├── TodoModel.ts    # Todo data model
│   │   │   ├── TodoCardModel.ts # Todo card model
│   │   │   └── UserModel.ts    # User data model
│   │   └── Services/           # Angular services
│   │       ├── CategoryMenager/
│   │       ├── TodoManager/
│   │       └── UserManager/
│   ├── app.component.*         # Root component
│   ├── app.config.ts          # App configuration
│   └── app.routes.ts          # Routing configuration
├── styles.css                 # Global styles
├── index.html                 # Main HTML file
└── main.ts                    # Application bootstrap
```

## 🎮 Usage

### Navigation
- **Home Page**: Welcome page with project information
- **Todo Page**: Main application interface for managing todos

### Todo Management
1. **Adding Todos**: Use the add todo form to create new tasks
2. **Viewing Todos**: Browse your todo list with organized cards
3. **Categories**: Organize todos by categories
4. **Priorities**: Set priority levels for your tasks


## 🔧 Development Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests

## 📝 License

This project is for educational purposes and learning Angular development.

## 🎓 Learning Objectives

This project demonstrates:
- Modern Angular 19 features and best practices
- Component-based architecture
- TypeScript integration
- Responsive design with Tailwind CSS
- UI component libraries (PrimeNG)
- Angular routing and navigation
- Service-based architecture
- Docker containerization


## Known issues/feature missing:
- When adding a task via form an error of the code that prevent the convertion doesn't let the app to add it directly and forcing a refresh of the page
- If reset filters is clicked then applying the filters again will result in a clean of the task list
- Missing a login and signup system (fully functional)
