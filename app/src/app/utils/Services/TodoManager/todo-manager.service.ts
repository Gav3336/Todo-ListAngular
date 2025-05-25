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

  #overdueTodos = signal<todoCardInterface[]>([]);
  overdueTodosComputed = computed(() => this.#overdueTodos());

  #http = inject(HttpClient);
  #link = 'http://localhost:3000/todos';


  constructor() {
    this.TodoViaRestApi();
    this.getTodosTotal();
    this.getTodosOverdue();
  }

  TodoViaRestApi() {
    this.#http.get<any>(`${this.#link}/all`).subscribe({
      next: (todos: any) => {
        this.todos.set(todos.message);
        this.filteredTodos.set(todos.message);
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
        this.#overdueTodos.set(todos.message);
      }
    });
  }

  addTodo(todo: TodoModel) {
    this.#http.post<any>(`${this.#link}`, todo).subscribe({
      next: (todo: any) => {
        this.todos.set([...this.todos(), todo.message]);
        this.filteredTodos.set([...this.filteredTodos(), todo.message]);
      },
      error: (error: any) => {
        console.error('Error adding todo:', error);
      }
    });
  }

  deleteTodo(id: number) {
    console.log("id", id);
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


  // TODO: make category_id accessible in the todoCardInterface
  filterTodos(categoryId: number, priority: string) {
    // console.log(this.todos().category_id);
    this.filteredTodos.set(
      this.todos().filter(todo => {
        const matches = (categoryId === 0 || todo.category_id === categoryId) &&
          (priority === '' || todo.priority.toUpperCase() === priority.toUpperCase());
        console.log('Todo:', todo, 'Matches:', matches);
        return matches;
      })
    );
  }
}
