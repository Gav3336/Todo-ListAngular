import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoListComponent } from "../utils/Components/todo-list/todo-list.component";
import { AddTodoComponent } from "../utils/Components/add-todo/add-todo.component";

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [RouterLink, TodoListComponent, AddTodoComponent],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  today = new Date();
}
