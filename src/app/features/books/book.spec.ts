import { Book } from '../../models/book';

describe('Book model', () => {
  it('should allow a Book object shape', () => {
    const book: Book = {
      id: 1,
      title: 'Teste',
      author: 'Autor',
      genre: 'Género',
      status: 'TO_READ',
      rating: 0
    };

    expect(book.title).toBe('Teste');
  });
});