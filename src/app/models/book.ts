export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  status: 'TO_READ' | 'READING' | 'READ';
  rating: number;
}