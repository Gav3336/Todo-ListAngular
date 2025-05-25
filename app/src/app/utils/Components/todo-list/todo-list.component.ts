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
  #filteredTodos = computed(() => this.#todoManager.filteredTodosComputed());

  today = new Date();
  tomorrow = new Date(this.today.getTime() + 24 * 60 * 60 * 1000);
  afterTomorrow = new Date(this.tomorrow.getTime() + 24 * 60 * 60 * 1000);

  todayTasks = computed(() =>
    this.#filteredTodos().filter(todo => {
      const todoDate = new Date(todo.dueTime);
      if (isNaN(todoDate.getTime())) return false;
      const todoDateStr = todoDate.toISOString().split('T')[0];
      const todayDateStr = this.today.toISOString().split('T')[0];
      return todoDateStr === todayDateStr;
    })
  );

  tomorrowTasks = computed(() =>
    this.#filteredTodos().filter(todo => {
      const todoDate = new Date(todo.dueTime);
      if (isNaN(todoDate.getTime())) return false;
      const todoDateStr = todoDate.toISOString().split('T')[0];
      const tomorrowDateStr = this.tomorrow.toISOString().split('T')[0];
      return todoDateStr === tomorrowDateStr;
    })
  );

  afterTomorrowTasks = computed(() =>
    this.#filteredTodos().filter(todo => {
      const todoDate = new Date(todo.dueTime);
      if (isNaN(todoDate.getTime())) return false;
      const todoDateStr = todoDate.toISOString().split('T')[0];
      const tomorrowDateStr = this.tomorrow.toISOString().split('T')[0];
      return todoDateStr > tomorrowDateStr;
    })
  );
}
