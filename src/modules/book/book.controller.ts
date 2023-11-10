import { Service } from 'typedi';
import {
  JsonController,
  Body,
  Get,
  Post,
  Delete,
  Put,
  Param,
  QueryParam,
  UseBefore,
} from 'routing-controllers';

import { Roles } from '@enums/roles.enum';
import { authGuard } from '@middleware/auth-guard.middleware';
import { roleGuard } from '@middleware/role-guard.middleware';
import { BookService } from '@modules/book/book.service';
import { CreateBookDto } from '@modules/book/dtos/create-book.dto';
import { UpdateBookDto } from '@modules/book/dtos/update-book.dto';
import { rateLimitGuard } from '@middleware/rate-limit-guard.middleware';

@Service()
@JsonController('/books')
export class UserController {
  constructor(private bookService: BookService) {}

  @Post('')
  @UseBefore(authGuard, roleGuard([Roles.ADMIN]))
  async createBook(@Body() bookDto: CreateBookDto) {
    return this.bookService.createBook(bookDto);
  }

  @Get('')
  @UseBefore(rateLimitGuard(10, 60000)) // Allow 10 requests per minute
  async getBooks(
    @QueryParam('title') title?: string,
    @QueryParam('author') author?: string,
    @QueryParam('isbn') isbn?: string,
  ) {
    const filters = { title, author, isbn };
    return this.bookService.getBooks(filters);
  }

  @Get('/:bookId')
  @UseBefore(rateLimitGuard(10, 60000))
  async getBookById(@Param('bookId') bookId: string) {
    return this.bookService.getBookById(bookId);
  }

  @Put('/:bookId')
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() updatedBookDto: UpdateBookDto,
  ) {
    return this.bookService.updateBook(bookId, updatedBookDto);
  }

  @Delete('/:bookId')
  async deleteBook(@Param('bookId') bookId: string) {
    return this.bookService.deleteBook(bookId);
  }
}
