import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../books/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-detail.html',
})
export class BookDetailComponent implements OnInit {

  id!: number;
  book?: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.book = this.bookService.getById(this.id);

  }

  saveBook() {

    if (!this.book) return;

    const { title, author, genre, status, rating } = this.book;

    this.bookService.update(this.id, {
      title,
      author,
      genre,
      status,
      rating
    });

    this.router.navigate(['/books']);

  }

}