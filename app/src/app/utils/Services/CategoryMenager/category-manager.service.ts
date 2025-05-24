import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService {
  categories = signal<{ id: number; category_name: string }[]>([]);
  categoriesComputed = computed(() => this.categories());

  #http = inject(HttpClient);
  #link = 'http://localhost:3000/categories';

  constructor() {
    this.getCategoriesViaRest();
  }

  getCategoriesViaRest() {
    this.#http.get<any>(`${this.#link}`).subscribe({
      next: (categories: any) => {
        this.categories.set(categories.message);
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}
