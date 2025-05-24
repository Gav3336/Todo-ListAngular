import { Component, computed, inject } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoManagerService } from '../../Services/TodoManager/todo-manager.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [TodoCardComponent, DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  #todoManager = inject(TodoManagerService);

  #todoList = computed(() => this.#todoManager.todosComputed());

  today = new Date();
  tomorrow = new Date(this.today.getTime() + 24 * 60 * 60 * 1000);
  afterTomorrow = new Date(this.tomorrow.getTime() + 24 * 60 * 60 * 1000);

  todayTasks = computed(() =>
    this.#todoList().filter(todo => {
      const todoDateStr = new Date(todo.dueTime).toISOString().split('T')[0];
      const todayDateStr = this.today.toISOString().split('T')[0];
      return todoDateStr === todayDateStr;
    })
  );

  tomorrowTasks = computed(() =>
    this.#todoList().filter(todo => {
      const todoDateStr = new Date(todo.dueTime).toISOString().split('T')[0];
      const tomorrowDateStr = this.tomorrow.toISOString().split('T')[0];
      return todoDateStr === tomorrowDateStr;
    })
  );

  afterTomorrowTasks = computed(() =>
    this.#todoList().filter(todo => {
      const todoDateStr = new Date(todo.dueTime).toISOString().split('T')[0];
      const tomorrowDateStr = this.tomorrow.toISOString().split('T')[0];
      return todoDateStr > tomorrowDateStr;
    })
  );

  constructor() {
    setTimeout(() => {
      console.log(this.todayTasks());
      console.log(this.tomorrowTasks());
      console.log(this.afterTomorrowTasks());
    }, 1000);
  }

}
