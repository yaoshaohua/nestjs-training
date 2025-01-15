import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message: 'An error occurred',
    };

    if (exception instanceof HttpException) {
      const error = exception.getResponse() as any;
      errorResponse.message = Array.isArray(error.message)
        ? error.message
        : [error.message];
      errorResponse.error = error.error || 'Error';
    }

    response.status(status).json(errorResponse);
  }
}
