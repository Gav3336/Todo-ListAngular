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

  totalTodos = signal<number>(0);
  totalTodosComputed = computed(() => this.totalTodos());

  #http = inject(HttpClient);
  #link = 'http://localhost:3000/todos';


  constructor() {
    this.TodoViaRestApi();
    this.getTodosTotal();
  }

  TodoViaRestApi() {
    this.#http.get<any>(`${this.#link}/all`).subscribe({
      next: (todos: any) => {
        this.todos.set(todos.message);
      },
      error: (error: any) => {
        console.error('Error fetching todos:', error);
      }
    });
  }

  getTodosTotal(){
    this.#http.get<any>(`${this.#link}/total`).subscribe({
      next: (todos: any) => {
        this.totalTodos.set(todos.message[0].total);
        console.log(this.totalTodos());
      },
      error: (error: any) => {
        console.error('Error fetching todos:', error);
      }
    });
  }

  addTodo(todo: TodoModel) {
    this.#http.post<any>(`${this.#link}`, todo).subscribe({
      next: (todo: any) => {
        this.todos.set([...this.todos(), todo.message]);
      },
      error: (error: any) => {
        console.error('Error adding todo:', error);
      }
    });
  }
}
