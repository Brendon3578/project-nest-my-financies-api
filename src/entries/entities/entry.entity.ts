import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entry } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class EntryEntity implements Entry {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiProperty()
  paid: boolean;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  value: Decimal;

  @ApiProperty()
  type: string;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  organization_id: string;

  @ApiProperty()
  author_id: string;
}
