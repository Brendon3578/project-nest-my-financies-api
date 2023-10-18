import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// modulo global e é instanciado no nível do app
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
