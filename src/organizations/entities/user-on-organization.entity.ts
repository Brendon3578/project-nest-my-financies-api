import { ApiProperty } from '@nestjs/swagger';
import { UsersOnOrganizations } from '@prisma/client';

export class UserOnOrganizationEntity implements UsersOnOrganizations {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  organization_id: string;

  @ApiProperty()
  joined_in: Date;
}
