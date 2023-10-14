import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './exceptions/prisma-client-exception/prisma-client-exception.filter';
import { InvalidRelationExceptionFilter } from './exceptions/invalid-relation-exception/invalid-relation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422, // retornar de forma global o erro 422, (erro do cliente)
      stopAtFirstError: true, // quando retornar as mensagens, retornar apenas o primeiro erro ocorrido
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);

  //
  app.useGlobalFilters(
    new PrismaExceptionFilter(httpAdapter),
    new InvalidRelationExceptionFilter(),
  );

  await app.listen(3000);
}
bootstrap();
