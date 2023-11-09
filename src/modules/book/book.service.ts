import { Service } from 'typedi';

import { Book } from '@db/entities/book.entity';
import { BookRepository } from '@modules/book/book.repository';
import { Filters } from '@modules/book/types/filters';

@Service()
export class BookService {
  constructor(private bookRepo: BookRepository) {}

  async createBook(book: Partial<Book>) {
    return this.bookRepo.createBook(book);
  }

  async getBooks(filters?: Filters) {
    console.log(filters);

    return this.bookRepo.getBooks(filters);
  }

  async getBookById(bookId: string) {
    return this.bookRepo.getBookById(bookId);
  }

  async updateBook(bookId: string, updatedBook: Partial<Book>) {
    const book = await this.getBookById(bookId);
    if (!book) throw new Error(`book with bookId: ${bookId} not found`);

    return this.bookRepo.updateBook(bookId, updatedBook);
  }

  async deleteBook(bookId: string) {
    const book = await this.getBookById(bookId);
    if (!book) throw new Error(`book with bookId: ${bookId} not found`);

    return this.bookRepo.deleteBook(bookId);
  }
}
