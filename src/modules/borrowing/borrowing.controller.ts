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

import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dtos.ts/create-borrowing.dto';
import { Service } from 'typedi';
import { Roles } from '@enums/roles.enum';
import { roleGuard } from '@middleware/role-guard.middleware';
import { authGuard } from '@middleware/auth-guard.middleware';

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
  @UseBefore(authGuard, roleGuard([Roles.BORROWER]))
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
  @UseBefore(authGuard, roleGuard([Roles.BORROWER]))
  getBorrowingsByBorrower(@Req() req: Request) {
    const borrower = req['user'];

    return this.borrowingService.getBorrowingsByBorrower(borrower['id']);
  }

  @UseBefore(authGuard, roleGuard([Roles.ADMIN]))
  @Get('')
  getBorrowings(@Req() req: Request) {
    return this.borrowingService.getBorrowings();
  }

  @Get('/overdue')
  @UseBefore(authGuard, roleGuard([Roles.ADMIN]))
  getOverdueBooks() {
    return this.borrowingService.getOverdueBooks();
  }
}
