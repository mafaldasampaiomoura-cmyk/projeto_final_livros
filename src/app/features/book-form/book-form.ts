import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../books/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {

  showFormError = false; 

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    status: new FormControl<'TO_READ' | 'READING' | 'READ'>('TO_READ', [Validators.required]),
    rating: new FormControl<number>(0),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
     this.showFormError = true;
      return;
    }

    this.showFormError = false; 

    const title = this.form.get('title')?.value ?? '';
    const author = this.form.get('author')?.value ?? '';
    const genre = this.form.get('genre')?.value ?? '';
    const status = (this.form.get('status')?.value ?? 'TO_READ') as Book['status'];

    const rating =
      status === 'READ'
        ? Number(this.form.get('rating')?.value ?? 0)
        : 0;

    const newBook: Omit<Book, 'id'> = { title, author, genre, status, rating };

    this.bookService.create(newBook);

    this.form.reset({ title: '', author: '', genre: '', status: 'TO_READ', rating: 0 });

    this.router.navigate(['/livros']);
  }
}