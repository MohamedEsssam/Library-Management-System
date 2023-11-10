import { Service } from 'typedi';
import { Between, LessThan, Repository } from 'typeorm';

import dataSource from '@configs/ormconfig';
import { Borrowing } from '@db/entities/borrowing.entity';

@Service()
export class BorrowingRepository {
  private readonly repo: Repository<Borrowing>;
  constructor() {
    this.repo = dataSource.getRepository(Borrowing);
  }

  async borrowBook(borrowing: Partial<Borrowing>) {
    const borrowingToBeCreated = this.repo.create(borrowing);

    return this.repo.save(borrowingToBeCreated);
  }

  async getBorrowedBookByBorrowingId(borrowingId: string) {
    return this.repo.findOne({
      relations: ['book'],
      where: { id: borrowingId },
    });
  }

  async getBorrowingsByBorrower(borrowerId: string): Promise<Borrowing[]> {
    return this.repo.find({
      relations: ['book', 'borrower'],
      where: { returned: false, borrower: { id: borrowerId } },
    });
  }

  async getBorrowings() {
    return this.repo.find({
      relations: ['book', 'borrower'],
      where: { returned: false },
    });
  }

  async getOverdueBooks(): Promise<Borrowing[]> {
    return this.repo.find({
      where: { dueDate: LessThan(new Date()), returned: false },
      relations: ['book', 'borrower'],
    });
  }

  async updateBorrowing(
    borrowingId: string,
    updatedBorrowing: Partial<Borrowing>,
  ) {
    return this.repo.update(borrowingId, updatedBorrowing);
  }

  async getBorrowingsInPeriod(
    startDate: Date,
    endDate: Date,
  ): Promise<Borrowing[]> {
    return this.repo.find({
      where: {
        created_at: Between(startDate, endDate),
      },
      relations: ['book', 'borrower'],
    });
  }

  async getOverdueBorrowingsInPeriod(
    startDate: Date,
    endDate: Date,
  ): Promise<Borrowing[]> {
    return this.repo.find({
      where: {
        dueDate: Between(startDate, endDate),
      },
      relations: ['book', 'borrower'],
    });
  }
}
