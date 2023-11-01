import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { InvalidRelationError } from '../common/errors/invalid-relation.error';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  private async verifyIfUserIdIsValid(user_id: string): Promise<boolean> {
    return (
      (await this.prisma.user.count({
        where: { id: user_id },
      })) != 0
    );
  }

  async create(createOrganizationDto: CreateOrganizationDto) {
    const isAdminIdValid = await this.verifyIfUserIdIsValid(
      createOrganizationDto.admin_id,
    );

    if (!isAdminIdValid) throw new InvalidRelationError('User Admin not found');

    const organization = await this.prisma.organization.create({
      data: createOrganizationDto,
    });

    // create relationship - criar o relacionamento e associar o primeiro user (que é o admin)
    // dentro do organization que ele criou
    await this.prisma.usersOnOrganizations.create({
      data: {
        user_id: createOrganizationDto.admin_id,
        organization_id: organization.id,
      },
    });

    return organization;
  }

  findAll() {
    return this.prisma.organization.findMany();
  }

  findOneById(id: string) {
    return this.prisma.organization.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    if (updateOrganizationDto.admin_id) {
      const isAdminIdValid = await this.verifyIfUserIdIsValid(
        updateOrganizationDto.admin_id,
      );

      if (!isAdminIdValid)
        throw new InvalidRelationError('User Admin not found');
    }

    return this.prisma.organization.update({
      data: updateOrganizationDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.organization.delete({
      where: { id },
    });
  }

  // users on organizations relationships
  async createUserInOrganization(organization_id: string, user_id: string) {
    // TODO: verify if organization and user is valid
    await this.prisma.usersOnOrganizations.create({
      data: {
        organization_id,
        user_id,
      },
    });
  }

  async removeUserFromOrganization(organization_id: string, user_id: string) {
    await this.prisma.usersOnOrganizations.delete({
      where: {
        user_id_organization_id: {
          user_id,
          organization_id,
        },
      },
    });
  }

  async findAllUsersInOrganization(organization_id: string) {
    const users = await this.prisma.user.findMany({
      where: {
        UsersOnOrganizations: {
          some: {
            organization_id,
          },
        },
      },
      include: {
        UsersOnOrganizations: {
          select: {
            // get the date when user join in a organization
            joined_in: true,
          },
          where: {
            organization_id,
          },
        },
      },
    });

    const organizationUsers = users.map((organizationUsers) => {
      const filteredUser = {
        ...organizationUsers,
        joined_in: organizationUsers.UsersOnOrganizations[0].joined_in,
      };
      delete filteredUser.UsersOnOrganizations;
      return filteredUser;
    });

    return organizationUsers.map((user) => new UserEntity(user));
  }

  findAllCategoriesByOrganization(organization_id: string) {
    return this.prisma.category.findMany({
      where: {
        Organization: {
          id: organization_id,
        },
      },
    });
  }

  findAllEntriesByOrganization(organization_id: string) {
    return this.prisma.entry.findMany({
      where: {
        Organization: {
          id: organization_id,
        },
      },
    });
  }
}
