import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserRepository } from '../repository/user.repository'
import mongoose from 'mongoose';
import { User, UserSchema } from '../schema/user.document';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../repository/user.repository.interface';
import { IUserService } from '../service/user.service.interface';
import { HttpStatus } from '@nestjs/common';

let mongod: MongoMemoryServer;
require('dotenv').config();

const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      //mongod = await MongoMemoryServer.create();
      mongod = await MongoMemoryServer.create({ binary: { version: '6.0.1' } });
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

const closeInMongodConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        { provide: IUserService, useClass: UserService },
        { provide: IUserRepository, useClass: UserRepository },
        UserRepository, JwtService, UserService
      ],
      controllers: [UserController],
    }).compile();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    };
  });

  describe('verifyUser', () => {
    it('checks if a user has been created and return a status 201', async () => {
      const mockUser: User = {
        userUuid: null,
        type: 'user',
        person: {
          name: "teste",
          birthDate: "2001-12-15",
          address: {
            street: "Rua teste",
            city: "Cidade teste",
            state: "Estado teste",
            zipCode: "00000000"
          }
        },
        email: "test5@test.com",
        password: "123456",
        location: {
          type: "Point",
          coordinates: [
            1, 1
          ]
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(() => mockUser),
      };
    
      await userController.save(mockResponse as any, mockUser);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(mockResponse.json()).toHaveProperty('userUuid', mockUser.userUuid);
      expect(mockResponse.json()).toBe(mockUser);
    });
  });

  describe('verify', () => {
    it('this tests verify if the findById method returns a user', async () => {
      const mockUser: User = {
        userUuid: '1',
        type: 'user',
        person: {
          name: "teste",
          birthDate: "2001-12-15",
          address: {
            street: "Rua teste",
            city: "Cidade teste",
            state: "Estado teste",
            zipCode: "00000000"
          }
        },
        email: "test5@test.com",
        password: "123456",
        location: {
          type: "Point",
          coordinates: [
            1, 1
          ]
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

     const result = await userController.findUserById(mockUser.userUuid, mockResponse as any);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    });
  });
});