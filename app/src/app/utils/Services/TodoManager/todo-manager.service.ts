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
    this.#http.get<todoCardInterface[]>(this.#link).subscribe({
      next: (todos: todoCardInterface[]) => {
        this.todos.set(todos);
      },
      error: (error: any) => {
        console.error('Error fetching todos:', error);
      }
    });
  }
}
