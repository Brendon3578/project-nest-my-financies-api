import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEntryDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string | null;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  paid: boolean = false;

  @IsDateString({})
  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  @Min(0.01)
  @Max(999999.99)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @ApiProperty()
  value: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['receita', 'despesa'])
  @ApiProperty()
  type: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  category_id: number;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  workspace_id: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author_id: string;
}
