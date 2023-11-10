import { Service } from 'typedi';
import { Workbook } from 'exceljs';
import { dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { NotFoundError } from 'routing-controllers';

import { Borrowing } from '@db/entities/borrowing.entity';
import { BorrowingRepository } from '@modules/borrowing/borrowing.repository';
import { BookService } from '@modules/book/book.service';
import { UserService } from '@modules/user/user.service';
import { formatDate } from '@utils/date-formatter';

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

  async getBorrowingsInPeriod(startDate: Date, endDate: Date) {
    const borrowings = await this.borrowingRepo.getBorrowingsInPeriod(
      startDate,
      endDate,
    );

    const filePath = `./exports/borrowings/borrowings_${formatDate(
      startDate,
    )}_${formatDate(endDate)}.xlsx`;

    await this.exportToXlsx(borrowings, filePath);

    return borrowings;
  }

  async getOverdueBorrowingsInPeriod(startDate: Date, endDate: Date) {
    const borrowings = await this.borrowingRepo.getOverdueBorrowingsInPeriod(
      startDate,
      endDate,
    );

    const filePath = `./exports/overdue_borrowings/borrowings_${formatDate(
      startDate,
    )}_${formatDate(endDate)}.xlsx`;

    await this.exportToXlsx(borrowings, filePath);

    return borrowings;
  }

  private async exportToXlsx(
    borrowings: Borrowing[],
    filePath: string,
  ): Promise<void> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Borrowings');

    worksheet.columns = [
      { header: 'Borrowing ID', key: 'borrowingId', width: 60 },
      { header: 'Book ID', key: 'bookId', width: 60 },
      { header: 'Book Title', key: 'bookTitle', width: 20 },
      { header: 'Borrower ID', key: 'borrowerId', width: 60 },
      { header: 'Borrower Name', key: 'borrowerName', width: 20 },
      { header: 'Due Date', key: 'dueDate', width: 70 },
      { header: 'Returned', key: 'returned', width: 10 },
    ];

    borrowings.forEach((borrowing) => {
      worksheet.addRow({
        borrowingId: borrowing['id'],
        bookId: borrowing['book']['id'],
        bookTitle: borrowing['book']['title'],
        borrowerId: `${borrowing['borrower']['id']}`,
        borrowerName: `${borrowing['borrower']['firstName']} ${borrowing['borrower']['lastName']}`,
        dueDate: formatDate(borrowing['dueDate']),
        returned: borrowing['returned'] ? 'Yes' : 'No',
      });
    });

    // Update the path to include the directory
    const directory = dirname(filePath);
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }
    await workbook.xlsx.writeFile(filePath);
  }
}
