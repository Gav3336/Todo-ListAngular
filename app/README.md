# Todo Angular Project

A modern, full-stack Todo application built with Angular 19, featuring a clean UI with PrimeNG components and Tailwind CSS styling.

## 🎯 Project Overview

This project serves as a comprehensive learning exercise for creating a full-stack web application using the latest version of Angular (v19). It demonstrates modern Angular development practices, component architecture, responsive design principles, and state management patterns.

## ✨ Features

- ✅ **Todo Management**: Create, view, edit, and delete todo items
- 🏷️ **Categories**: Organize todos with a flexible category system
- 🎨 **Modern UI**: Clean, intuitive interface built with PrimeNG and Tailwind CSS
- 📱 **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- 🧭 **Navigation**: Multi-page application with Angular routing
- 🔧 **TypeScript**: Fully typed codebase for enhanced development experience
- 🐳 **Docker Support**: Containerized deployment ready
- ⚡ **Performance**: Optimized with Angular's latest performance features

## 🛠️ Tech Stack

### Frontend
- **Angular 19.2** - Latest version of the Angular framework
- **TypeScript 5.7** - Type-safe JavaScript with latest features
- **PrimeNG 19.1** - Rich UI component library
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **RxJS 7.8** - Reactive programming library

### Development Tools
- **Angular CLI 19.2** - Command line interface for Angular
- **Karma & Jasmine** - Testing framework for unit tests
- **PostCSS 8.5** - CSS processing tool
- **ESLint & Prettier** - Code linting and formatting

### Deployment
- **Docker** - Containerization platform
- **Node.js 18+** - Runtime environment

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Angular CLI** (optional, but recommended)
- **Git** for version control

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
   npm install -g @angular/cli@19
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

The application will automatically reload when you make changes to the source files.

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

### Docker Compose (Coming Soon)
```yaml
# docker-compose.yml
version: '3.8'
services:
  todo-app:
    build: .
    ports:
      - "4200:4200"
    environment:
      - NODE_ENV=production
```

## 📁 Project Structure

```
src/
├── app/
│   ├── home-page/              # Home page component
│   ├── todo-page/              # Main todo page component
│   ├── utils/
│   │   ├── Components/         # Reusable components
│   │   │   ├── add-todo/       # Add todo form component
│   │   │   ├── navbar/         # Navigation bar component
│   │   │   ├── todo-card/      # Individual todo item card
│   │   │   └── todo-list/      # Todo list container component
│   │   ├── Models/             # TypeScript interfaces and types
│   │   │   ├── TodoModel.ts    # Todo data model
│   │   │   ├── TodoCardModel.ts # Todo card display model
│   │   │   └── UserModel.ts    # User data model
│   │   └── Services/           # Angular services for business logic
│   │       ├── CategoryMenager/ # Category management service
│   │       ├── TodoManager/    # Todo CRUD operations service
│   │       └── UserManager/    # User management service
│   ├── app.component.*         # Root application component
│   ├── app.config.ts          # Application configuration
│   └── app.routes.ts          # Routing configuration
├── styles.css                 # Global application styles
├── index.html                 # Main HTML template
└── main.ts                    # Application bootstrap file
```

## 🎮 Usage

### Navigation
- **Home Page** (`/`): Welcome page with project information and getting started guide
- **Todo Page** (`/todo`): Main application interface for managing your todo items

### Todo Management
1. **Adding Todos**: 
   - Click the "Add Todo" button
   - Fill in the todo details (title, description, category, priority)
   - Submit to add to your list

2. **Managing Todos**: 
   - View all todos in an organized card layout
   - Edit todos by clicking the edit button
   - Mark todos as complete/incomplete
   - Delete todos when no longer needed

3. **Categories**: 
   - Organize todos by categories (Work, Personal, Shopping, etc.)
   - Filter todos by category
   - Create custom categories

4. **Priorities**: 
   - Set priority levels (High, Medium, Low)
   - Sort todos by priority
   - Visual indicators for priority levels

## 🔧 Development Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run watch` | Build in watch mode for development |
| `npm test` | Run unit tests with Karma |
| `npm run lint` | Run ESLint for code quality |
| `npm run format` | Format code with Prettier |

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📸 Screenshots

*Coming Soon - Screenshots of the application interface*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Angular style guide
- Write unit tests for new features
- Use conventional commit messages
- Ensure code passes linting checks

## 🐛 Troubleshooting

### Common Issues

**Port 4200 already in use:**
```bash
ng serve --port 4201
```

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Angular CLI not found:**
```bash
npm install -g @angular/cli@19
```

## 📝 License

This project is for educational purposes and learning Angular development. Feel free to use it as a reference for your own projects.

## 🎓 Learning Objectives

This project demonstrates:
- ✅ Modern Angular 19 features and best practices
- ✅ Component-based architecture with proper separation of concerns
- ✅ TypeScript integration with strong typing
- ✅ Responsive design with Tailwind CSS utility classes
- ✅ UI component libraries integration (PrimeNG)
- ✅ Angular routing and navigation patterns
- ✅ Service-based architecture for data management
- ✅ Docker containerization for deployment
- ✅ Modern development workflow and tooling

## 🚧 Known Issues & Roadmap

### Current Issues
- ⚠️ **Authentication System**: Missing login and signup functionality
- ⚠️ **Docker ARM64**: Docker build not functioning properly on ARM64 architecture (Apple Silicon)
- ⚠️ **Error Feedback**: Missing comprehensive error handling and user feedback

### Planned Features
- 🔐 **User Authentication**: Complete login/signup system with JWT
- 💾 **Backend Integration**: REST API with database persistence
- 🔄 **Real-time Updates**: WebSocket integration for live updates
- 📊 **Analytics Dashboard**: Todo completion statistics and insights
- 🌙 **Dark Mode**: Theme switching capability
- 📱 **PWA Support**: Progressive Web App features
- 🔍 **Search & Filter**: Advanced search and filtering options
- 📤 **Export/Import**: Todo data export and import functionality

---

**Built with ❤️ using Angular 19**

*Last updated: December 2024*
