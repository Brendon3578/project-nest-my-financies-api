import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      // "Unique constraint failed on the {constraint}"
      // lidar com constraint (regras) do sql lite, ex: erro de inclusão de campos únicos
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const detailedMessage = `O campo ${
          exception.meta['target'][0] ?? 'desconhecido'
        } já existe`;
        response.status(status).json({
          statusCode: status,
          message: [detailedMessage, message],
        });
        break;
      }

      case 'P2003': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: [
            'Não foi possível fazer a remoção, pois existe um objeto que depende deste item',
            message,
          ],
        });
      }

      // "An operation failed because it depends on one or more records that were required but not found. {cause}"
      // lidar com erros de Not Found
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: ['Não foi encontrado', message],
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
