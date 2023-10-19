import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { InvalidRelationExceptionFilter } from './common/exceptions/invalid-relation-exception/invalid-relation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // retornar de forma global o erro 422, (erro do cliente)
      stopAtFirstError: true, // quando retornar as mensagens, retornar apenas o primeiro erro ocorrido
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new PrismaExceptionFilter(httpAdapter),
    new InvalidRelationExceptionFilter(),
  );

  await app.listen(3000);
}
bootstrap();
