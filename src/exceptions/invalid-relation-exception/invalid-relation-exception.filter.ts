import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { InvalidRelationError } from '../../errors/invalid-relation.error';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(InvalidRelationError)
export class InvalidRelationExceptionFilter extends BaseExceptionFilter {
  catch(exception: InvalidRelationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.UNPROCESSABLE_ENTITY; //422

    return response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
