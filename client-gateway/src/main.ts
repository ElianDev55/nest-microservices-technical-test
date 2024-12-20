import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RPCustomExceptionFilter } from './common/execeptions/rpc-custom-exception.filter';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new RPCustomExceptionFilter());
  await app.listen(envs.port);
  logger.log(`Server running on http://localhost:${envs.port}:3000`);
}
bootstrap();
