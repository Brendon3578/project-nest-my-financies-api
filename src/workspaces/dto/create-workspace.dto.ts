import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(127)
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  description: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  admin_id: string;
}
