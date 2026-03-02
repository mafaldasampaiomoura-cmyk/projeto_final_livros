import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard'; // ajusta caminho/nome

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
];