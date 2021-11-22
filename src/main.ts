import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true})
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
      .setTitle("Adu marketplace")
      .setDescription("Documentation for REST API")
      .setVersion("1.0.0")
      .addTag("ADU24")
      .build();
  const documentation = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/api/docs",app,documentation)
  await app.listen(3000);
}
bootstrap();
