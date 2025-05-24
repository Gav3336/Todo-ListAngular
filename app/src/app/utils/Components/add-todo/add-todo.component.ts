import { Component, computed, inject } from '@angular/core';
import { CategoryManagerService } from '../../Services/CategoryMenager/category-manager.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  #categoryManager = inject(CategoryManagerService);

  categories = computed(() => this.#categoryManager.categoriesComputed());

  addTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    category_id: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    dueTime: new FormControl('', [Validators.required]),
  });

  addTodo() {
    const dueTime = new Date(`${this.addTodoForm.value.dueDate} ${this.addTodoForm.value.dueTime}`);
    console.log(dueTime);
    console.log(this.addTodoForm.value);
  }
}
