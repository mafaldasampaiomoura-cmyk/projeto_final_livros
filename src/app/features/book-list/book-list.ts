import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusLabelPipe } from '../../shared/shared/pipes/status-label.pipe';
import { BookService } from '../books/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusLabelPipe],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookListComponent implements OnInit {
  editar: string = 'editar.png';
  statusFilter: '' | 'READ' | 'READING' | 'TO_READ' = '';

  books: Book[] = [];

  constructor(
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.books = this.bookService.getAll();
  }

  editBook(id: number) {
    this.router.navigate(['/books', id]);
  }

  deleteBook(id: number) {
    this.bookService.delete(id);
    this.books = this.bookService.getAll();

  }

  filteredBooks(): Book[] {
    let filtered = [...this.books];

    if (this.statusFilter) {
      filtered = filtered.filter(book => book.status === this.statusFilter);
    }
  return filtered;
  }

}