import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  Get,
  Res,
  ImATeapotException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../schema/user.document';
import { IUserService } from '../service/user.service.interface';
import { error } from 'console';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}
  @Post()
  async save(@Res() response: any, @Body() user: User): Promise<User> {
    try {
      const newUser = await this.userService.save(user);
      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).json({error: 'Email já cadastrado.'});
      }
      if (e instanceof BadRequestException) {
        return response.status(HttpStatus.BAD_REQUEST).json();
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }
  
  }
  
  

