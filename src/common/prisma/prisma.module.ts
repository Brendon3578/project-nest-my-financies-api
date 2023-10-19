import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Modulo Global instanciado e disponibilizado no nível da aplicação
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
