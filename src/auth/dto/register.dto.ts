
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsIn,
  Min,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  Username: string;

  @IsEmail()
  @MaxLength(100)
  Email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  Password: string;

  @IsOptional()
  @IsIn(['Admin', 'Employee'])
  Role?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  EmployeeID?: number;
}
