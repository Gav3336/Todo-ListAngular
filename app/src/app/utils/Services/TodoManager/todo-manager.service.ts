import { computed, inject, Injectable, signal } from '@angular/core';
import { todoCardInterface } from '../../Models/TodoCardModel';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../../Models/TodoModel';

@Injectable({
  providedIn: 'root'
})
export class TodoManagerService {
  todos = signal<todoCardInterface[]>([]);
  todosComputed = computed(() => this.todos());

  #totalTodos = signal<number>(0);
  totalTodosComputed = computed(() => this.#totalTodos());

  filteredTodos = signal<todoCardInterface[]>([]);
  filteredTodosComputed = computed(() => this.filteredTodos());

  #overdueTodos = signal<number>(0);
  overdueTodosComputed = computed(() => this.#overdueTodos());

  #completedTodos = signal<number>(0);
  completedTodosComputed = computed(() => this.#completedTodos());

  #http = inject(HttpClient);
  #link = 'http://localhost:3000/todos';


  constructor() {
    this.TodoViaRestApi();
  }

  TodoViaRestApi(page = 0) {
    this.#http.get<any>(`${this.#link}/all/${page}`).subscribe({
      next: (todos: any) => {
        this.todos.set([...this.todos(), ...todos.message]);
        this.filteredTodos.set([...this.filteredTodos(), ...todos.message]);
        this.getTodosTotal();
        this.getTodosOverdue();
        this.getTodosCompleted();
      },
      error: (error: any) => {
        console.error('Error fetching todos:', error);
      }
    });
  }

  getTodosTotal() {
    this.#http.get<any>(`${this.#link}/total`).subscribe({
      next: (todos: any) => {
        this.#totalTodos.set(todos.message[0].total);
      },
      error: (error: any) => {
        console.error('Error fetching todos:', error);
      }
    });
  }

  getTodosOverdue() {
    this.#http.get<any>(`${this.#link}/overdue`).subscribe({
      next: (todos: any) => {
        this.#overdueTodos.set(todos.message[0].total);
      },
      error: (error: any) => {
        console.error('Error fetching overdue todos:', error);
      }
    });
  }

  getTodosCompleted() {
    this.#http.get<any>(`${this.#link}/completed`).subscribe({
      next: (todos: any) => {
        this.#completedTodos.set(todos.message[0].total);
      },
      error: (error: any) => {
        console.error('Error fetching completed todos:', error);
      }
    });
  }

  addTodo(todo: TodoModel) {
    this.#http.post<any>(`${this.#link}`, todo).subscribe({
      next: (response: any) => {
        this.TodoViaRestApi();
        return "done";
      },
      error: (error: any) => {
        console.error('Error adding todo:', error);
      }
    });
  }

  deleteTodo(id: number) {
    this.#http.delete<any>(`${this.#link}/${id}`).subscribe({
      next: (todo: any) => {
        this.todos.set(this.todos().filter(todo => todo.id !== id));
        this.#totalTodos.set(this.#totalTodos() - 1);
        this.filteredTodos.set(this.filteredTodos().filter(todo => todo.id !== id));
      },
      error: (error: any) => {
        console.error('Error deleting todo:', error);
      }
    });
  }

  completeTodo(id: number, isCompleted: boolean) {
    this.#http.put<any>(`${this.#link}/${id}/${isCompleted}`, { completed: isCompleted }).subscribe({
      next: (todo: any) => {
        if (isCompleted) {
          this.#completedTodos.set(this.#completedTodos() + 1);
        } else {
          this.#completedTodos.set(this.#completedTodos() - 1);
        }

        return "done";
      },
      error: (error: any) => {
        console.error('Error completing todo:', error);
      }
    });
  }


  filterTodos(categoryId: number, priority: string) {
    if (categoryId == null && priority == null) {
      this.filteredTodos.set(this.todos());
      return;
    }

    this.filteredTodos.set(
      this.todos().filter(todo => {
        const matches = (categoryId == 0 || todo.category_id == categoryId) &&
          (priority === '' || todo.priority.toUpperCase() === priority.toUpperCase());
        return matches;
      })
    );
  }
}
