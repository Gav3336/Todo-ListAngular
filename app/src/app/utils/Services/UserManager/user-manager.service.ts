import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { userInterface } from '../../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  #http = inject(HttpClient);
  #link = 'http://localhost:3000/users';

  #loggedIn = signal<boolean>(false);
  loggedInComputed = computed(() => this.#loggedIn());

  #token = signal<string>('');
  tokenComputed = computed(() => this.#token());

  constructor() {
    this.checkToken();
  }

  async signup(user: userInterface): Promise<any> {
    return new Promise((resolve, reject) => {
      this.#http.post<any>(`${this.#link}/signup`, user).subscribe({
        next: (res) => {
          this.#token.set(res.data);
          this.#loggedIn.set(true);
          resolve(res.data);
        },
        error: (error) => {
          console.error('Error signing up:', error.error.errors.body);
          this.#loggedIn.set(false);
          reject(error);
        }
      });
    });
  }

  login(user: userInterface) {
    return new Promise((resolve, reject) => {
      this.#http.post<any>(`${this.#link}/login`, user).subscribe({
        next: (res) => {
          this.#token.set(res.data);
          this.#loggedIn.set(true);
          resolve(res.data);
        },
        error: (error) => {
          console.error('Error logging in:', error.error.errors.body);
          this.#loggedIn.set(false);
          throw error;
        }
      });
    });
  }

  checkToken() {
    this.#http.get(`${this.#link}/check-token`).subscribe({
      next: (res) => {
        console.log(res);
        this.#loggedIn.set(true);
        return res;
      },
      error: (error) => {
        console.log('Error checking token:', error.error.errors.body);
        this.#loggedIn.set(false);
        throw error;
      }
    });
  }
}
