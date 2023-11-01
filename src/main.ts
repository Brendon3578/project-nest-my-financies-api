import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpStatus,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PrismaExceptionFilter } from './common/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { InvalidRelationExceptionFilter } from './common/exceptions/invalid-relation-exception/invalid-relation-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  //console.log(join(__dirname, '..', 'public'));

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // retornar de forma global o erro 422, (erro do cliente)
      stopAtFirstError: true, // quando retornar as mensagens, retornar apenas o primeiro erro ocorrido
    }),
  );

  // impedir que o password apareça no DTO do user
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new PrismaExceptionFilter(httpAdapter),
    new InvalidRelationExceptionFilter(),
  );

  // swagger (open api) config
  const config = new DocumentBuilder()
    .setTitle('Financies API')
    .setDescription(
      'RESTful API made with Nest JS and Prisma ORM for individual or groups financial control',
    )
    .setVersion('0.2.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/docs', app, document, {
    customSiteTitle: 'Financies API - Swagger UI',
    customfavIcon: '../public/favicon.ico',
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3000);
  //console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
