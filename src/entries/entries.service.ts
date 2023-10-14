import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  async create(createEntryDto: CreateEntryDto) {
    const categoryExists =
      (await this.prisma.category.count({
        where: { id: createEntryDto.category_id },
      })) != 0;

    if (!categoryExists) {
      throw new InvalidRelationError('Category not found');
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
      include: {
        category: true,
      },
    });
  }

  // findByMonthAndYear(month: number, year: number) {
  //   return this.prisma.entry.findMany({
  //     where: {
  //       date: new Date()
  //     }
  //   })
  // }

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
}
