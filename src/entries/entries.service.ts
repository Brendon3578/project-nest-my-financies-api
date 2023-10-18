import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { InvalidRelationError } from '../common/errors/invalid-relation.error';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  async create(createEntryDto: CreateEntryDto) {
    const categoryExists =
      (await this.prisma.category.count({
        where: { id: createEntryDto.category_id },
      })) != 0;

    const workspaceExists =
      (await this.prisma.workspace.count({
        where: { id: createEntryDto.workspace_id },
      })) != 0;

    if (!categoryExists) {
      throw new InvalidRelationError('Category not found');
    } else if (!workspaceExists) {
      throw new InvalidRelationError('Workspace not found');
    }

    return this.prisma.entry.create({
      data: createEntryDto,
    });
  }

  findAll() {
    return this.prisma.entry.findMany();
  }

  findAllPaid(paid: boolean) {
    return this.prisma.entry.findMany({
      where: {
        paid,
      },
    });
  }

  findOneById(id: number) {
    return this.prisma.entry.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return this.prisma.entry.update({
      data: updateEntryDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.entry.delete({
      where: { id },
    });
  }

  // author relationship
  findAllByAuthorId(author_id: string) {
    return this.prisma.entry.findMany({
      where: {
        author_id: author_id,
      },
    });
  }
}
