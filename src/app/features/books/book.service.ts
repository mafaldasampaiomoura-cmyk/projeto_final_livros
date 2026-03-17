import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private storageKey = 'books';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  getAll(): Book[] {
    if (!this.isBrowser) return [];

    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      const seed: Book[] = [
        { id: 1, title: '1984', author: 'George Orwell', genre: 'Ficção', status: 'READ', rating: 5 },
        { id: 2, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', status: 'READING', rating: 4 },
        { id: 3, title: 'O Alquimista', author: 'Paulo Coelho', genre: 'Romance', status: 'TO_READ', rating: 0 },
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(seed));
      return seed;
    }

    return JSON.parse(data) as Book[];
  }

  getById(id: number): Book | undefined {
    const books = this.getAll();
    return books.find(book => book.id === id);
  }

  create(book: Omit<Book, 'id'>): void {
    const books = this.getAll();
    const newBook: Book = { id: Date.now(), ...book };
    books.push(newBook);
    this.saveBooks(books);
  }

  update(id: number, updatedBook: Omit<Book, 'id'>): void {
    const books = this.getAll();
    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
      books[index] = { ...updatedBook, id };
      this.saveBooks(books);
    }
  }

  delete(id: number): void {
    const books = this.getAll().filter(book => book.id !== id);
    this.saveBooks(books);
  }

  private saveBooks(books: Book[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }
}