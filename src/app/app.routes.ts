import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes = [
    { path: '*', component: AppComponent },
    { path: 'todo', component: AppComponent },
];