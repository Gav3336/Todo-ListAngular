import { Component, computed, inject, signal } from '@angular/core';
import { TodoListComponent } from "../utils/Components/todo-list/todo-list.component";
import { AddTodoComponent } from "../utils/Components/add-todo/add-todo.component";
import { TodoManagerService } from '../utils/Services/TodoManager/todo-manager.service';
import { CategoryManagerService } from '../utils/Services/CategoryMenager/category-manager.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../utils/Components/navbar/navbar.component";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [TodoListComponent, AddTodoComponent, ReactiveFormsModule, NavbarComponent],
  providers: [MessageService],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  #Todo_manager = inject(TodoManagerService);
  #Category_manager = inject(CategoryManagerService);
  messageService = inject(MessageService);
  categories = computed(() => this.#Category_manager.categories());

  AvailableTodos = computed(() => this.#Todo_manager.todosComputed());

  today = new Date();

  totalTodos = computed(() => this.#Todo_manager.totalTodosComputed());

  overdueTodos = computed(() => this.#Todo_manager.overdueTodosComputed());

  completedTodos = computed(() => this.#Todo_manager.completedTodosComputed());

  page = signal<number>(0);

  filterForm = new FormGroup({
    categoryId: new FormControl(0),
    priority: new FormControl('')
  });

  addPage() {
    this.page.set(this.page() + 1);
    this.#Todo_manager.TodoViaRestApi(this.page());
  }

  filterTodos() {
    try {
      this.#Todo_manager.filterTodos(this.filterForm.value.categoryId as number, this.filterForm.value.priority as string);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error as string, life: 300 });
    }
  }

  resetFilters() {
    this.filterForm.reset();
    this.#Todo_manager.filterTodos(0, '');
  }
}
