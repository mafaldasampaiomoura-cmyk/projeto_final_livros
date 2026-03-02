export type BookStatus = 'TO_READ' | 'READING' | 'READ';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
}
