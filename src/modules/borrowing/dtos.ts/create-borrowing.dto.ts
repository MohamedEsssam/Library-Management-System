import { IsString } from 'class-validator';

export class CreateBorrowingDto {
  @IsString()
  bookId: string;

  @IsString()
  dueDate: string;
}
