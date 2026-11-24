
import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  Username: string;

  @IsString()
  @MinLength(1)
  Password: string;
}
