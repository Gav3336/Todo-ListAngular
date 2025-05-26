import { Component, computed, inject } from '@angular/core';
import { CategoryManagerService } from '../../Services/CategoryMenager/category-manager.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TodoManagerService } from '../../Services/TodoManager/todo-manager.service';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  #categoryManager = inject(CategoryManagerService);
  #todoManager = inject(TodoManagerService);
  categories = computed(() => this.#categoryManager.categoriesComputed());

  #formBuilder = inject(FormBuilder);

  addTodoForm = this.#formBuilder.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    category_id: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    dueTime: new FormControl('', [Validators.required]),
  });

  addTodo() {
    const dueTime = new Date(this.addTodoForm.value.dueDate + 'T' + this.addTodoForm.value.dueTime).toISOString();

    if (this.addTodoForm.invalid) {
      return;
    }

    this.#todoManager.addTodo({
      title: this.addTodoForm.value.title as string,
      description: this.addTodoForm.value.description as string,
      category_id: this.addTodoForm.value.category_id as unknown as number,
      priority: this.addTodoForm.value.priority as string,
      dueTime: dueTime
    });
  }
}
