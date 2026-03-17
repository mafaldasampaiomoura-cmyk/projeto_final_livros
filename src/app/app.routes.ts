import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { BookListComponent } from './features/book-list/book-list';
import { BookForm } from './features/book-form/book-form';
import { BookDetailComponent } from './features/book-detail/book-detail';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'livros', component: BookListComponent, canActivate: [authGuard] },
  { path: 'adicionar', component: BookForm, canActivate: [authGuard] },
  { path: 'livro/:id', component: BookDetailComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];