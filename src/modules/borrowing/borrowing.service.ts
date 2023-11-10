// src/services/BorrowingService.ts
import { Service } from 'typedi';
import { BorrowingRepository } from './borrowing.repository';
import { BookService } from '@modules/book/book.service';
import { UserService } from '@modules/user/user.service';
import { NotFoundError } from 'routing-controllers';

@Service()
export class BorrowingService {
  constructor(
    private readonly borrowingRepo: BorrowingRepository,
    private readonly bookService: BookService,
    private readonly borrowerService: UserService,
  ) {}

  async borrowBook(borrowerId: string, bookId: string, dueDate: Date) {
    const book = await this.bookService.getBookById(bookId);
    if (!book || book.availableQuantity <= 0)
      throw new NotFoundError(
        `book with bookId: ${bookId} not found or not available at this time`,
      ); // book not found or not available

    const borrower = await this.borrowerService.getUserById(borrowerId);
    if (!borrower)
      throw new NotFoundError(
        `Borrower with borrowerId: ${borrowerId} not found`,
      );

    // Update book quantity and save the borrowing record
    book.availableQuantity--;
    const updateBookAvailability = this.bookService.updateBook(bookId, book);

    const borrowing = { book, borrower, dueDate, returned: false };
    const saveBorrowing = this.borrowingRepo.borrowBook(borrowing);

    const promiseResult = await Promise.all([
      saveBorrowing,
      updateBookAvailability,
    ]);

    return promiseResult;
  }

  async returnBook(borrowingId: string, bookId: string, borrowerId: string) {
    console.log(bookId, borrowerId);

    const book = await this.bookService.getBookById(bookId);
    if (!book) throw new NotFoundError(`Book with bookId: ${bookId} not found`);

    const borrower = await this.borrowerService.getUserById(borrowerId);
    if (!borrower)
      throw new NotFoundError(
        `Borrower with borrowerId: ${borrowerId} not found`,
      );

    const borrowing = await this.borrowingRepo.getBorrowedBookByBorrowingId(
      borrowingId,
    );
    if (!borrowing || borrowing.returned) {
      throw new NotFoundError(
        `borrowing with borrowingId: ${borrowingId} not found`,
      ); // Borrowing record not found or book already returned
    }

    // Update book quantity and set borrowing record as returned
    borrowing.book.availableQuantity++;
    borrowing.returned = true;

    const updateBookAvailability = this.bookService.updateBook(
      borrowing['book']['id'],
      borrowing['book'],
    );
    const updateBookBorrowing = this.borrowingRepo.updateBorrowing(
      borrowingId,
      borrowing,
    );

    const promiseResult = await Promise.all([
      updateBookAvailability,
      updateBookBorrowing,
    ]);

    console.log(promiseResult);

    return borrowing;
  }

  async getOverdueBooks() {
    return this.borrowingRepo.getOverdueBooks();
  }

  async getBorrowingsByBorrower(borrowerId: string) {
    return this.borrowingRepo.getBorrowingsByBorrower(borrowerId);
  }

  async getBorrowings() {
    return this.borrowingRepo.getBorrowings();
  }
}
