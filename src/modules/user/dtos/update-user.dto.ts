import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @MaxLength(50)
  lastName?: string;
}
