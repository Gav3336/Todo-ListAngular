import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoListComponent } from "../utils/Components/todo-list/todo-list.component";
import { AddTodoComponent } from "../utils/Components/add-todo/add-todo.component";
import { TodoManagerService } from '../utils/Services/TodoManager/todo-manager.service';
import { CategoryManagerService } from '../utils/Services/CategoryMenager/category-manager.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [RouterLink, TodoListComponent, AddTodoComponent, ReactiveFormsModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  #Todo_manager = inject(TodoManagerService);
  #Category_manager = inject(CategoryManagerService);

  categories = computed(() => this.#Category_manager.categories());

  AvailableTodos = computed(() => this.#Todo_manager.todosComputed());

  today = new Date();

  totalTodos = computed(() => this.#Todo_manager.totalTodosComputed());

  // TODO: manage the increasing overdueTodos limit response from the backend (the limit is 100 and with every overdue todo the showed todo will decrease)
  // Make so the database manages the overdue todos and the limit.
  overdueTodos = computed(() => this.#Todo_manager.todosComputed().filter(todo => new Date(todo.dueTime) < new Date()));

  filterForm = new FormGroup({
    categoryId: new FormControl(0),
    priority: new FormControl('')
  });

  filterTodos() {
    this.#Todo_manager.filterTodos(this.filterForm.value.categoryId as number, this.filterForm.value.priority as string);
  }

  resetFilters() {
    this.filterForm.reset();
    this.#Todo_manager.filterTodos(0, '');
  }
}
