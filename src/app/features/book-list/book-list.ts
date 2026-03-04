import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../books/book.service';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatusLabelPipe } from '../../shared/shared/pipes/status-label.pipe';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports : [CommonModule, FormsModule, StatusLabelPipe], 
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.books = this.bookService.getAll();
  }

  goToDetail(id: number): void {
    this.router.navigate(['/detalhe', id]);
  }

  deleteBook(id: number): void {
    this.bookService.delete(id);
    this.loadBooks();
  }

  searchText: string = '';
sortBy: 'title' | 'rating' = 'title';
statusFilter: '' | 'READ' | 'READING' | 'TO_READ' = '';

filteredBooks() {
  let result = [...this.books];

  // filtro por status
  if (this.statusFilter) {
    result = result.filter(b => b.status === this.statusFilter);
  }

  // pesquisa por título/autor
  const q = this.searchText.trim().toLowerCase();
  if (q) {
    result = result.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    );
  }

  // ordenação
  result.sort((a, b) => {
    if (this.sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return a.title.localeCompare(b.title);
  });

  return result;
  }

  
}

