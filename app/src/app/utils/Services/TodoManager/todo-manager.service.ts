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

  }

  TodoViaRestApi() {
    this.#http.get<todoCardInterface[]>(this.#link).subscribe((todos) => {
      this.todos.set(todos);
    });
  }
}
