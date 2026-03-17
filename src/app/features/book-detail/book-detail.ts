import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../books/book.service';
import { Book } from '../../models/book';
import { StatusLabelPipe } from '../../shared/shared/pipes/status-label.pipe';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusLabelPipe],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  id!: number;
  book?: Book;
  isEditing = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    status: new FormControl<'TO_READ' | 'READING' | 'READ'>('TO_READ', [Validators.required]),
    rating: new FormControl<number | null>(null),
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.bookService.getById(this.id);

    if (this.book) {
      this.form.patchValue({
        title: this.book.title,
        author: this.book.author,
        genre: this.book.genre,
        status: this.book.status,
        rating: this.book.rating,
      });
    }
  }

  saveBook() {
    if (!this.book) return;
    if (this.form.invalid) return;

    const { title, author, genre, status, rating } = this.form.getRawValue();

    this.bookService.update(this.id, {
      title: title ?? '',
      author: author ?? '',
      genre: genre ?? '',
      status: status ?? 'TO_READ',
      rating: rating ?? 0,
    });

    this.book = this.bookService.getById(this.id);
    this.isEditing = false;
    this.router.navigate(['/books']);
  }

  enableEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;

    if (this.book) {
      this.form.patchValue({
        title: this.book.title,
        author: this.book.author,
        genre: this.book.genre,
        status: this.book.status,
        rating: this.book.rating,
      });
    }
  }
}