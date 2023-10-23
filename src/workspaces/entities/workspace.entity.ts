import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Workspace } from '@prisma/client';

export class WorkspaceEntity implements Workspace {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiProperty()
  admin_id: string;

  @ApiProperty()
  created_at: Date;
}
