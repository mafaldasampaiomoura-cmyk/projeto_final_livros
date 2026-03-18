// import { Component, inject, ChangeDetectorRef } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  async ngOnInit(): Promise<void> {
    const user = await this.authService.getUser();

    if (user) {
      await this.router.navigate(['/livros']);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private translateSupabaseError(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('invalid login credentials')) {
      return 'Email ou palavra-passe inválidos.';
    }

    if (lowerMessage.includes('email not confirmed')) {
      return 'Tens de confirmar o email antes de iniciar sessão.';
    }

    if (lowerMessage.includes('password should be at least 6 characters')) {
      return 'A palavra-passe deve ter pelo menos 6 caracteres.';
    }

    if (lowerMessage.includes('user already registered')) {
      return 'Este email já está registado.';
    }

    if (lowerMessage.includes('unable to validate email address')) {
      return 'O email introduzido não é válido.';
    }

    if (lowerMessage.includes('signup is disabled')) {
      return 'O registo está desativado.';
    }

    return message || 'Ocorreu um erro. Tenta novamente.';
  }

  private validateFields(): boolean {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Preenche o email e a palavra-passe.';
      return false;
    }

    if (!this.isValidEmail(this.email.trim())) {
      this.errorMessage = 'Introduz um email válido.';
      return false;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'A palavra-passe deve ter pelo menos 6 caracteres.';
      return false;
    }

    return true;
  }

  async login(): Promise<void> {
    if (!this.validateFields()) {
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.detectChanges();

    try {
      const { data, error } = await this.authService.signIn(
        this.email.trim(),
        this.password
      );

      if (error) {
        this.errorMessage = this.translateSupabaseError(error.message);
        return;
      }

      if (!data.user) {
        this.errorMessage = 'Não foi possível iniciar sessão.';
        return;
      }

      this.successMessage = 'Sessão iniciada com sucesso.';
      await this.router.navigate(['/livros']);
    } catch (err) {
      console.error('Erro no login:', err);
      this.errorMessage = 'Erro ao iniciar sessão.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async register(): Promise<void> {
    if (!this.validateFields()) {
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.detectChanges();

    try {
      const { data, error } = await this.authService.signUp(
        this.email.trim(),
        this.password
      );

      if (error) {
        this.errorMessage = this.translateSupabaseError(error.message);
        return;
      }

      if (!data.user) {
        this.errorMessage = 'Não foi possível criar a conta.';
        return;
      }

      if (!data.session) {
        this.successMessage =
          'Conta criada. Confirma o email antes de iniciar sessão.';
        return;
      }

      this.successMessage = 'Conta criada com sucesso.';
      await this.router.navigate(['/livros']);
    } catch (err) {
      console.error('Erro no registo:', err);
      this.errorMessage = 'Erro ao criar conta.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}