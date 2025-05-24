import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TodoPageComponent } from './todo-page/todo-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'todo-page', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'todo-page', component: TodoPageComponent},
    {path: '**', redirectTo: 'todo-page', pathMatch: 'full'},
];
