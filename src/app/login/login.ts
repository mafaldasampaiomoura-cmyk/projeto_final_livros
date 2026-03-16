import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface LoginUser {
  id: number;
  email: string;
  password: string;
  name: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  async login(): Promise<void> {
    try {
      const response = await fetch(`${environment.apiUrl}/users`);
      const users: LoginUser[] = await response.json();

      const user = users.find(
        (u) => u.email === this.email && u.password === this.password
      );

      if (user) {
        console.log('Login com sucesso:', user);
        this.successMessage = `Bem-vinda, ${user.name}!`;
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/livros']);
        }, 500);
      } else {
        this.errorMessage = 'Email ou password inválidos.';
        this.successMessage = '';
      }
    } catch (error) {
      console.error('Erro ao ligar à API:', error);
      this.errorMessage = 'Erro ao ligar à API.';
      this.successMessage = '';
    }
  }
}