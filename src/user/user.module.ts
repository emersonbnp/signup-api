import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { IUserRepository } from './repository/user.repository.interface';
import { User, UserSchema } from './schema/user.document';
import { UserService } from './service/user.service';
import { IUserService } from './service/user.service.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
