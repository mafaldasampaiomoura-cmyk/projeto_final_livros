import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { BookListComponent } from './features/book-list/book-list';
import { BookForm } from './features/book-form/book-form';
import { BookDetailComponent } from './features/book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'books/:id', loadComponent: () => import('./features/book-detail/book-detail') .then(m => m.BookDetailComponent)},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'livros', component: BookListComponent },
  { path: 'adicionar', component: BookForm },
  { path: 'livros/:id', component: BookDetailComponent },
  { path: '**', redirectTo: '' },
];