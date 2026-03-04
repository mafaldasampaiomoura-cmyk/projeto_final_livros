import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard'; // ajusta caminho/nome

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent   },
];