import { Service } from 'typedi';
import {
  JsonController,
  Post,
  Param,
  Body,
  Put,
  Get,
  Req,
  UseBefore,
} from 'routing-controllers';

import { Roles } from '@enums/roles.enum';
import { roleGuard } from '@middleware/role-guard.middleware';
import { authGuard } from '@middleware/auth-guard.middleware';
import { BorrowingService } from '@modules/borrowing/borrowing.service';
import { CreateBorrowingDto } from '@modules/borrowing/dtos.ts/create-borrowing.dto';
import { BorrowingPeriodDto } from '@modules/borrowing/dtos.ts/borrowing-period.dto';
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getLastMonth,
} from '@utils/date-formatter';
import { rateLimitGuard } from '@middleware/rate-limit-guard.middleware';

@Service()
@JsonController('/borrowings')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post('')
  @UseBefore(authGuard, roleGuard([Roles.BORROWER]))
  borrowBook(@Body() borrowingDto: CreateBorrowingDto, @Req() req: Request) {
    const borrower = req['user'];
    return this.borrowingService.borrowBook(
      borrower['id'],
      borrowingDto['bookId'],
      new Date(borrowingDto['dueDate']),
    );
  }

  @Put('/return/:borrowingId')
  @UseBefore(authGuard)
  returnBook(
    @Req() req: Request,
    @Param('borrowingId') borrowingId: string,
    @Body() returnBookDto: { bookId: string },
  ) {
    const borrower = req['user'];

    return this.borrowingService.returnBook(
      borrowingId,
      returnBookDto['bookId'],
      borrower['id'],
    );
  }

  @Get('/byBorrower')
  @UseBefore(authGuard, rateLimitGuard(10, 60000), roleGuard([Roles.BORROWER]))
  getBorrowingsByBorrower(@Req() req: Request) {
    const borrower = req['user'];

    console.log(borrower.id);

    return this.borrowingService.getBorrowingsByBorrower(borrower['id']);
  }

  @Get('')
  @UseBefore(authGuard, rateLimitGuard(10, 60000), roleGuard([Roles.ADMIN]))
  getBorrowings(@Req() req: Request) {
    return this.borrowingService.getBorrowings();
  }

  @Get('/overdue')
  @UseBefore(authGuard, rateLimitGuard(10, 60000), roleGuard([Roles.ADMIN]))
  getOverdueBooks() {
    return this.borrowingService.getOverdueBooks();
  }

  @Get('/period/:startDate/:endDate/export/xlsx')
  @UseBefore(authGuard, rateLimitGuard(10, 60000), roleGuard([Roles.ADMIN]))
  async getBorrowingsInPeriod(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    return this.borrowingService.getBorrowingsInPeriod(
      startDateObj,
      endDateObj,
    );
  }

  @Get('/period/lasttmonth/export/xlsx')
  @UseBefore(authGuard, rateLimitGuard(10, 60000), roleGuard([Roles.ADMIN]))
  async getBorrowingsLastMonth() {
    const startDate = getFirstDayOfMonth(getLastMonth(new Date()));
    const endDate = getLastDayOfMonth(getLastMonth(new Date()));

    console.log(startDate, endDate);

    return this.borrowingService.getBorrowingsInPeriod(startDate, endDate);
  }

  @Get('/overdue/lasttmonth/export/xlsx')
  @UseBefore(authGuard, rateLimitGuard(10, 60000), roleGuard([Roles.ADMIN]))
  async getBorrowingsOverdueLastMonth() {
    const startDate = getFirstDayOfMonth(getLastMonth(new Date()));
    const endDate = getLastDayOfMonth(getLastMonth(new Date()));

    return this.borrowingService.getOverdueBorrowingsInPeriod(
      startDate,
      endDate,
    );
  }
}
