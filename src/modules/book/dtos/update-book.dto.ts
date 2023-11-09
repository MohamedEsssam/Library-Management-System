import { IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  title: string;
}
