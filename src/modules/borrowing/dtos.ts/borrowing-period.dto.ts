import { IsString } from 'class-validator';

export class BorrowingPeriodDto {
  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}
