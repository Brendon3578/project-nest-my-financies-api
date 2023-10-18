import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { InvalidRelationError } from '../common/errors/invalid-relation.error';

@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) {}

  private async verifyIfUserIdIsValid(user_id: string): Promise<boolean> {
    return (
      (await this.prisma.user.count({
        where: { id: user_id },
      })) != 0
    );
  }

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const isAdminIdValid = await this.verifyIfUserIdIsValid(
      createWorkspaceDto.admin_id,
    );

    if (!isAdminIdValid) throw new InvalidRelationError('User Admin not found');

    const workspace = await this.prisma.workspace.create({
      data: createWorkspaceDto,
    });

    // create relationship - criar o relacionamento e associar o primeiro user (que é o admin)
    // dentro do workspace que ele criou
    await this.prisma.usersOnWorkspaces.create({
      data: {
        user_id: createWorkspaceDto.admin_id,
        workspace_id: workspace.id,
      },
    });

    return workspace;
  }

  findAll() {
    return this.prisma.workspace.findMany();
  }

  findOneById(id: string) {
    return this.prisma.workspace.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    if (updateWorkspaceDto.admin_id) {
      const isAdminIdValid = await this.verifyIfUserIdIsValid(
        updateWorkspaceDto.admin_id,
      );

      if (!isAdminIdValid)
        throw new InvalidRelationError('User Admin not found');
    }

    return this.prisma.workspace.update({
      data: updateWorkspaceDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.workspace.delete({
      where: { id },
    });
  }

  // categories relationships
  findAllCategoriesInWorkspace(workspace_id: string) {
    return this.prisma.category.findMany({
      where: {
        Workspace: {
          id: workspace_id,
        },
      },
    });
  }

  // users relationships
  async createUserInWorkspace(workspace_id: string, user_id: string) {
    // TODO: verify if workspace and user is valid
    await this.prisma.usersOnWorkspaces.create({
      data: {
        workspace_id,
        user_id,
      },
    });
  }

  async removeUserFromWorkspace(workspace_id: string, user_id: string) {
    await this.prisma.usersOnWorkspaces.delete({
      where: {
        user_id_workspace_id: {
          user_id,
          workspace_id,
        },
      },
    });
  }

  findAllUsersInWorkspace(workspace_id: string) {
    return this.prisma.user.findMany({
      where: {
        UsersOnWorkspaces: {
          some: {
            workspace_id,
          },
        },
      },
      include: {
        UsersOnWorkspaces: {
          select: {
            // get the date when user join in a workspace
            joined_in: true,
          },
          where: {
            workspace_id,
          },
        },
      },
    });
  }
}
