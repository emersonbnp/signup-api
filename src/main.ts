import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Sign Up API')
      .setDescription('API to create users')
      .setVersion('1.0')
      .addTag('sign up api')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(8080);

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}
bootstrap();
