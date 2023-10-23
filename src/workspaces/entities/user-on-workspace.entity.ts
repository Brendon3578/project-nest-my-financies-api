import { ApiProperty } from '@nestjs/swagger';
import { UsersOnWorkspaces } from '@prisma/client';

export class UserOnWorkspaceEntity implements UsersOnWorkspaces {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  workspace_id: string;

  @ApiProperty()
  joined_in: Date;
}
