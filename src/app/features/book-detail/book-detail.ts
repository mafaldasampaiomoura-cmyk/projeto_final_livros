import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../books/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})

export class BookDetailComponent implements OnInit {
  book?: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.book = undefined;
      return;
    }

    this.book = this.bookService.getById(id);
  }

  deleteBook(): void {
    if (!this.book) return;

    this.bookService.delete(this.book.id);
    this.router.navigate(['/livros']);
  }

  goBack(): void {
    this.router.navigate(['/livros']);
  }
}