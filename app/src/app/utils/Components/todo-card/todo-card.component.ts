import { Component, inject, input } from '@angular/core';
import { todoCardInterface } from '../../Models/TodoCardModel';
import { DatePipe } from '@angular/common';
import { TodoManagerService } from '../../Services/TodoManager/todo-manager.service';

@Component({
  standalone: true,
  selector: 'app-todo-card',
  imports: [DatePipe],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})

export class TodoCardComponent {
  data = input.required<todoCardInterface>();
  #todoManager = inject(TodoManagerService);

  toggleCompletion() {
    this.data().isCompleted = !this.data().isCompleted;
  }

  deleteTodo() {
    console.log("deleteTodo", this.data().id);
    this.#todoManager.deleteTodo(this.data().id);
  }
}

