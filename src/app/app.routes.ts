import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { BookListComponent } from './features/book-list/book-list';
import { BookForm } from './features/book-form/book-form';
import { BookDetailComponent } from './features/book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'livros', component: BookListComponent },
  { path: 'adicionar', component: BookForm },

  { path: '**', redirectTo: '' },

  { path: 'livros/:id', component: BookDetailComponent },
];