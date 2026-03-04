import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../books/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class DashboardComponent implements OnInit {
  books: Book[] = [];

  totalBooks = 0;
  readBooks = 0; 
  readPercentage = 0;
  topGenre = '-';
  lastBook?: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books = this.bookService.getAll();
    this.calculateKpis();
  }

  private calculateKpis(): void {
    this.totalBooks = this.books.length;

    this.readBooks = this.books.filter(b => b.status === 'READ').length;

    this.readPercentage = this.totalBooks === 0
      ? 0
      : Math.round((this.readBooks / this.totalBooks) * 100);

    this.topGenre = this.getTopGenre(this.books);

    this.lastBook = this.totalBooks > 0 ? this.books[this.totalBooks - 1] : undefined;
  }

  private getTopGenre(books: Book[]): string {
    if (books.length === 0) return '-';

    const counter: Record<string, number> = {};

    for (const b of books) {
      const g = (b.genre || '').trim();
      if (!g) continue;
      counter[g] = (counter[g] || 0) + 1;
    }

    let top = '-';
    let max = 0;

    for (const genre in counter) {
      if (counter[genre] > max) {
        max = counter[genre];
        top = genre;
      }
    }

    return top;
  }
}