import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../books/book.service';
import { Book } from '../../models/book';
import { StatusLabelPipe } from '../../shared/shared/pipes/status-label.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatusLabelPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  editar = "editar.png";
  books: Book[] = [];
  LastBook: Book[] = [];

  totalBooks = 0;
  readBooks = 0;
  readPercentage = 0;
  topGenre = '-';
  lastBook?: Book;

private bookService = inject(BookService);
private router = inject(Router) 

constructor() {
  this.bookService = inject (BookService);
  this.router = inject (Router);
}

  ngOnInit(): void {
    this.getBooks();
  }

  editBook(id: number) {
    this.router.navigate(['/books', id]);
  }

  getBooks(): void {
    this.books = this.bookService.getAll();
    this.calculateKpis();
  }

  goToBooks(): void {
    this.router.navigate(['/livros']);
  }

  goToAdd(): void {
    this.router.navigate(['/adicionar']);
  }

  openBook(id: number){
    this.router.navigate(['/books', id]);
  }

  private calculateKpis(): void {
    this.totalBooks = this.books.length;

    this.readBooks = this.books.filter(b => b.status === 'READ').length;

    this.readPercentage =
    this.totalBooks === 0 ? 0 : Math.round((this.readBooks / this.totalBooks) * 100);

    this.LastBook = this.books.slice(-5).reverse();
  
   
  }

}