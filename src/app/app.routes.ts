// import { Routes } from '@angular/router';
// import { DashboardComponent } from './features/dashboard/dashboard';
// import { BookListComponent } from './features/book-list/book-list';
// import { BookForm } from './features/book-form/book-form';
// import { BookDetailComponent } from './features/book-detail/book-detail';

// export const routes: Routes = [
//   { path: '', component: DashboardComponent },
//   { path: 'books/:id', loadComponent: () => import('./features/book-detail/book-detail') .then(m => m.BookDetailComponent)},
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'livros', component: BookListComponent },
//   { path: 'adicionar', component: BookForm },
//   { path: 'livros/:id', component: BookDetailComponent },
//   { path: '**', redirectTo: '' },
// ];

import { RenderMode, ServerRoute } from '@angular/ssr';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { BookListComponent } from './features/book-list/book-list';
import { BookForm } from './features/book-form/book-form';
import { BookDetailComponent } from './features/book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'livros', component: BookListComponent },
  { path: 'adicionar', component: BookForm },
  { path: 'livro/:id', component: BookDetailComponent }
];

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'login', renderMode: RenderMode.Server },
  { path: 'dashboard', renderMode: RenderMode.Server },
  { path: 'livros', renderMode: RenderMode.Server },
  { path: 'adicionar', renderMode: RenderMode.Server },
  { path: 'livro/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];