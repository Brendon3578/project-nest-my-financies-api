import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  password: string;
}
