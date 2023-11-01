import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string | null;

  @IsString()
  @ApiProperty()
  organization_id: string;
}
