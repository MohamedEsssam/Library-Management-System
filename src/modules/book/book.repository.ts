import { Service } from 'typedi';
import { Repository } from 'typeorm';

import dataSource from '@configs/ormconfig';
import { Book } from '@db/entities/book.entity';
import { Filters } from '@modules/book/types/filters';

@Service()
export class BookRepository {
  private readonly repo: Repository<Book>;
  constructor() {
    this.repo = dataSource.getRepository(Book);
  }

  async createBook(user: Partial<Book>) {
    const bookToBeCreate = this.repo.create(user);

    return this.repo.save(bookToBeCreate);
  }

  async getBooks(filters?: Filters) {
    return this.repo.find({ where: filters ?? {} });
  }

  async getBookById(bookId: string) {
    return this.repo.findOneBy({ id: bookId });
  }

  async updateBook(bookId: string, updatedBook: Partial<Book>) {
    return this.repo.update(bookId, updatedBook);
  }

  async deleteBook(bookId: string) {
    return this.repo.delete(bookId);
  }
}
