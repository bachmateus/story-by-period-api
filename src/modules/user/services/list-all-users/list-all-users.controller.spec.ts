import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import User from '../../model/user.entity';
import LocalUserRepository from '../../repositories/implementarions/LocalUserRepository';
import { ListAllUsersController } from './list-all-users.controller';
import ListAllUsersService from './list-all-users.service';

describe('ListAllUsersController', () => {
  let controller: ListAllUsersController;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListAllUsersController],
      providers: [
        User,
        ListAllUsersService,
        { provide: "USER_REPOSITORY", useClass: LocalUserRepository}
      ]
    }).compile();

    controller = module.get<ListAllUsersController>(ListAllUsersController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list all users', async () => {
    let responseObj = {};

    const response: Partial<Response> = {
      status: jest.fn().mockImplementation(() => response),
      json: jest.fn().mockImplementation( result => {
        responseObj = result
        return result
      })
    }

    const request = {}

    const resp = await controller.handle(
      request as Request, response as Response
    );

    expect(resp).toBeTruthy();
    // console.log(resp);
  })

  // it('should allow only admin to list all users', () => {
  //   return false

  // })
})