import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'testeruser@email.com' })
  email: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '123' })
  password: string;
}
