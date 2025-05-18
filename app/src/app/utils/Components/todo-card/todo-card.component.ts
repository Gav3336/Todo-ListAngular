import { Component, signal, input } from '@angular/core';
import { todoCardInterface } from '../../Models/TodoCardModel';

@Component({
  standalone: true,
  selector: 'app-todo-card',
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})

export class TodoCardComponent {
  
  data = input.required<todoCardInterface>();

  toggleCompletion() {
    this.data().isCompleted = !this.data().isCompleted;
  }
}

