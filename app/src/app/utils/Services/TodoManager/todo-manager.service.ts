import { computed, inject, Injectable, signal } from '@angular/core';
import { todoCardInterface } from '../../Models/TodoCardModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoManagerService {
  todos = signal<todoCardInterface[]>([]);
  todosComputed = computed(() => this.todos());

  #http = inject(HttpClient);
  #link = 'http://localhost:3000/todos';


  constructor() {
    this.TodoViaRestApi();
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
}
