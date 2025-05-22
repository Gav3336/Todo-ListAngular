import { Component, computed, inject } from '@angular/core';
import { UserManagerService } from '../utils/Services/UserManager/user-manager.service';
import { userInterface } from '../utils/Models/UserModel';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  imports: [ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  #userManager = inject(UserManagerService);
  token = computed(() => this.#userManager.tokenComputed());

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  async login() {
    try {
      await this.#userManager.login(this.loginForm.value as userInterface);
      console.log(this.token());
      document.cookie = `Authorization=${this.token()}`;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  async signup() {
    try {
      await this.#userManager.signup(this.signupForm.value as userInterface);
      console.log(this.token());
      document.cookie = `Authorization=${this.token()}`;
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
}
