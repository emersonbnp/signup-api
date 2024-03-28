import {
  Logger,
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Put,
  Get,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../schema/user.document';
import { IUserService } from '../service/user.service.interface';
import { AuthGuard } from '@nestjs/passport';
import { error } from 'console';
import { JwtGuard } from './../../security/jwt.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) { }
  @Post()
  async save(@Res() response: any, @Body() user: User): Promise<User> {
    try {
      const newUser = await this.userService.save(user);

      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (e: any) {
      if (e instanceof BadRequestException) {
        return response.status(HttpStatus.BAD_REQUEST).json({ error: 'Email já cadastrado.' });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }

  @Put()
  async update(@Res() response: any, @Body() user: User): Promise<User> {
    try {
      const updatedUser = await this.userService.update(user);

      return response.status(HttpStatus.OK).json(updatedUser);
    } catch (e: any) {
      if (e instanceof BadRequestException) {
        return response.status(HttpStatus.BAD_REQUEST).json({ error: error });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }

  @UseGuards(JwtGuard)
  @Get(':userUuid')
  async findUserById(@Param('userUuid') userUuid: string, @Res() response: any): Promise<User> {
    try {
      const user = await this.userService.findUserById(userUuid)
      return response.status(HttpStatus.OK).json(user);
    } catch (e: any) {
      this.logger.log('error', e)
      return response.status(HttpStatus.NOT_FOUND).json({ error: 'Usuário não encontrado.' });
    }
  }
}

