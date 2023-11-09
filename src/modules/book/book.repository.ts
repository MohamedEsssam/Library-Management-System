import { Service } from 'typedi';
import { Repository } from 'typeorm';

import dataSource from '@configs/ormconfig';
import { Book } from '@db/entities/book.entity';
import { Filters } from '@modules/book/types/filters';

@Service()
export class BookRepository {
  private readonly bookRepo: Repository<Book>;
  constructor() {
    this.bookRepo = dataSource.getRepository(Book);
  }

  async createBook(user: Partial<Book>) {
    const bookToBeCreate = this.bookRepo.create(user);

    return this.bookRepo.save(bookToBeCreate);
  }

  async getBooks(filters?: Filters) {
    return this.bookRepo.find({ where: filters ?? {} });
  }

  async getBookById(bookId: string) {
    return this.bookRepo.findOneBy({ id: bookId });
  }

  async updateBook(bookId: string, updatedBook: Partial<Book>) {
    return this.bookRepo.update(bookId, updatedBook);
  }

  async deleteBook(bookId: string) {
    return this.bookRepo.delete(bookId);
  }
}
