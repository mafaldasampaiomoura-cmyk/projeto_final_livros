import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient, AuthResponse, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private supabase: SupabaseClient | null = this.isBrowser
    ? createClient(environment.supabaseUrl, environment.supabaseAnonKey)
    : null;

  async signIn(email: string, password: string): Promise<AuthResponse> {
    if (!this.supabase) {
      throw new Error('Supabase disponível apenas no browser.');
    }

    return await this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    if (!this.supabase) {
      throw new Error('Supabase disponível apenas no browser.');
    }

    return await this.supabase.auth.signUp({
      email,
      password
    });
  }

  async signOut(): Promise<void> {
    if (!this.supabase) return;
    await this.supabase.auth.signOut();
  }

  async getUser(): Promise<User | null> {
    if (!this.supabase) return null;

    const { data, error } = await this.supabase.auth.getUser();

    if (error) return null;
    return data.user;
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.getUser();
    return !!user;
  }
}