import { Component, OnInit } from '@angular/core';
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
  id!: number;
  book?: Book;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.bookService.getById(this.id);
    this.form.patchValue({
      title:this.book?.title, 
      author: this.book?.author,
      genre:this.book?.genre, 

    })
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}


  form = new FormGroup({
  title: new FormControl(this.book?.title, [Validators.required]),
  author: new FormControl('', [Validators.required]),
  genre: new FormControl('', [Validators.required]),
  status: new FormControl<'TO_READ' | 'READING' | 'READ'>('TO_READ', [Validators.required]),
  rating: new FormControl<number | null>(null),
  });

  
  saveBook() {

    if (!this.book) return;
    if(this.form.invalid) return;

    const { title, author, genre, status, rating } = this.form.getRawValue();

    this.bookService.update(this.id, {
      title: title ?? '',
      author: author ?? '', 
      genre: genre ?? '', 
      status: status ?? 'TO_READ',
      rating: rating ?? undefined,
    });

    this.router.navigate(['/books']);

  }

isEditing = false;
  
  enableEdit () { 
    this.isEditing = true; 
    };

  cancelEdit(){
    this.isEditing = false;
  }
}
  