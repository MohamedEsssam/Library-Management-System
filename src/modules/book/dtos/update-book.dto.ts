import { IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  author?: string;

  @IsOptional()
  isbn?: string;

  @IsOptional()
  shelfLocation?: string;

  @IsOptional()
  availableQuantity?: number;
}
