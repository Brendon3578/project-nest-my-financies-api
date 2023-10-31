import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // cryptograph the user password
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return new UserEntity(
      await this.prisma.user.create({
        data: createUserDto,
      }),
    );
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOneById(id: string) {
    return new UserEntity(
      await this.prisma.user.findUnique({
        where: { id },
      }),
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return new UserEntity(
      await this.prisma.user.update({
        data: updateUserDto,
        where: { id },
      }),
    );
  }

  async remove(id: string) {
    return new UserEntity(
      await this.prisma.user.delete({
        where: { id },
      }),
    );
  }

  // workspaces relationship
  findAllUserWorkspaces(id: string) {
    return this.prisma.workspace.findMany({
      where: {
        UsersOnWorkspaces: {
          every: {
            user_id: id,
          },
        },
      },
    });
  }
}
