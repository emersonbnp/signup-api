import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserRepository } from './user/repository/user.repository';
import { SecurityModule } from './security/jwt.module';

@Module({
  imports: [
    UserRepository,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_HOST}`,
    ),UserModule, SecurityModule
  ],
})
export class AppModule {}