import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoListComponent } from "../utils/Components/todo-list/todo-list.component";
import { AddTodoComponent } from "../utils/Components/add-todo/add-todo.component";
import { TodoManagerService } from '../utils/Services/TodoManager/todo-manager.service';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [RouterLink, TodoListComponent, AddTodoComponent],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  #Todo_manager = inject(TodoManagerService);
  today = new Date();

  totalTodos = computed(() => this.#Todo_manager.totalTodosComputed());
}
