import { Component, computed, inject } from '@angular/core';
import { TodoCardComponent } from '../utils/Components/todo-card/todo-card.component';
import { TodoManagerService } from '../utils/Services/TodoManager/todo-manager.service';

@Component({
  selector: 'app-todo-page',
  imports: [TodoCardComponent],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  #todoManager = inject(TodoManagerService);

  todoList = computed(() => this.#todoManager.todosComputed());


  test = {
    title: 'Test',
    description: 'Test',
    category: 'Test',
    dueDate: '2023-10-10',
    dueTime: '12:00',
    priority: 'High',

    isCompleted: false,
  }

}
