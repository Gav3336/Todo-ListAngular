import { Component, inject, input } from '@angular/core';
import { todoCardInterface } from '../../Models/TodoCardModel';
import { DatePipe } from '@angular/common';
import { TodoManagerService } from '../../Services/TodoManager/todo-manager.service';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-todo-card',
  imports: [DatePipe],
  providers: [MessageService],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})

export class TodoCardComponent {
  data = input.required<todoCardInterface>();
  #todoManager = inject(TodoManagerService);

  messageService = inject(MessageService);

  toggleCompletion() {
    this.data().isCompleted = !this.data().isCompleted;

    this.#todoManager.completeTodo(this.data().id, this.data().isCompleted);
  }

  deleteTodo() {
    try {
      this.#todoManager.deleteTodo(this.data().id);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error as string, life: 300 });
    }
  }
}

