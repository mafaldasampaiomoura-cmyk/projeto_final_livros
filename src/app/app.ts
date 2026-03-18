// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from './shared/shared/header/header';
// import { environment } from '../environments/environment';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, HeaderComponent],
//   templateUrl: './app.html',
// })
// export class App implements OnInit {

//   async ngOnInit(): Promise<void> {
//     await this.loadBooks();
//   }

//   async loadBooks(): Promise<void> {
//     try {
//       const response = await fetch(`${environment.apiUrl}/books`);

//       if (!response.ok) {
//         throw new Error(`Erro HTTP: ${response.status}`);
//       }

//       const books = await response.json();
//       console.log('Livros da API:', books);
//     } catch (error) {
//       console.error('Erro ao buscar livros:', error);
//     }
//   }
// }

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/shared/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
})
export class App {
  router = inject(Router);

  isLoginPage(): boolean {
    return this.router.url === '/' || this.router.url === '/login';
  }
}

let erro = "erro"; 

