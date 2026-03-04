import { Injectable } from '@angular/core';
import { Book } from '../../models/book';

@Injectable({ // aqui temos o CRUD essencial que preciso o trabalho. 
  providedIn: 'root'
})
export class BookService {

  private storageKey = 'books'; // criei uma gaveta/caixote onde vou guardar os meus livros. Neste caso, a gaveta é virtual. 

  constructor() {}

  getAll(): Book[] {const data = localStorage.getItem(this.storageKey);

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

  getById(id: number): Book | undefined { // função para procurar os livros por ID 
    const books = this.getAll();
    return books.find(book => book.id === id);
  }

  create(book: Book): void { // crio novos livros 
    const books = this.getAll(); // acabo por os guardar na lista dos livros 
    book.id = new Date().getTime(); // gera id único simples baseado na data em que se adiciona o livro 
    books.push(book);
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }

  update(id: number, updatedBook: Book): void {
    const books = this.getAll();
    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
      books[index] = { ...updatedBook, id };
      localStorage.setItem(this.storageKey, JSON.stringify(books)); // converto para string os valores 
    }
  }
  delete(id: number): void {
    const books = this.getAll().filter(book => book.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(books));// converto para string os valores 
  }
}