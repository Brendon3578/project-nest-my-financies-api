import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { UserOnWorkspaceEntity } from './user-on-workspace.entity';

export class WorkspaceUsersEntity implements User {
  constructor(partial: Partial<UserOnWorkspaceEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  image_url: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  joined_in: Date;

  @Exclude()
  password: string;
}
