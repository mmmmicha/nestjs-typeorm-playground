import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  // const port = process.env.NODE_SERVER_PORT;
  const port = configService.get<string>('server.port');
  await app.listen(port);
  console.log(`Application listening on port ${port}`);
}
bootstrap();
