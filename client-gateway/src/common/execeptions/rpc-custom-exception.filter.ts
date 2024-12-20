import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RPCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const cx = host.switchToHttp();
    const response = cx.getResponse();

    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      return response.status(rpcError.status).json(rpcError);
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error creado',
    });
  }
}
