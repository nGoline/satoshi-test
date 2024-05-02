import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const connection = app.get(getConnectionToken());
  await connection.runMigrations({ transaction: 'all' });

  const configSwagger = new DocumentBuilder()
    .setTitle('Satoshi - Test API')
    .setDescription('API documentation for the test')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Satoshi Test API',
  });

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
