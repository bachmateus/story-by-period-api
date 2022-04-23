import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';

import User from '../../model/user.entity';
import LocalUserRepository from '../../repositories/implementarions/LocalUserRepository';
import { CreateUserController } from './create-user.controller';
import CreateUserService from './create-user.service';

describe('CreateUserController', () => {
  let controller: CreateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        User,
        CreateUserService,
        { provide: "USER_REPOSITORY", useClass: LocalUserRepository}
      ]
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async() => {
    let responseObj = {};
    const response: Partial<Response> = {
      status: jest.fn().mockImplementation(() => response),
      json: jest.fn().mockImplementation( result => {
        responseObj = result
        return result
      })
    }
    const request = {
      body: {
          name: 'Test', email: 'test@test.com'
        }
    }

    const resp = await controller.handle(
      request as Request, response as Response
    );
    expect(resp).toHaveProperty('id');
  });
  it('should not create a new user if the name is missing', async () => {
    let responseObj = {error:""};
    let statusCode = 0;
    const response: Partial<Response> = {
      status: jest.fn().mockImplementation((status) => {
        statusCode = status
        return response
      }),
      json: jest.fn().mockImplementation( result => {
        responseObj = result
      })
    }
    const request = {
      body: {
          name: '', email: 'test@test.com'
        }
    }

    await controller.handle(
      request as Request, response as Response
    );

    expect(statusCode).toEqual(400);
    expect(responseObj.error).toEqual("Name must be informated")
  });

  it('should not create a new user if the email and phone is missing', async () => {
    let responseObj = {error:""};
    let statusCode = 0;
    const response: Partial<Response> = {
      status: jest.fn().mockImplementation((status) => {
        statusCode = status
        return response
      }),
      json: jest.fn().mockImplementation( result => {
        responseObj = result
      })
    }
    const request = {
      body: {
          name: 'test', email: '', phone: ''
        }
    }

    await controller.handle(
      request as Request, response as Response
    );

    expect(statusCode).toEqual(400);
    expect(responseObj.error).toEqual("E-mail or phone number must be informated")
  })

  it('should not create new user with the same email', async () => {
    let responseObj = {error:""};
    let statusCode = 0;
    
    const response: Partial<Response> = {
      status: jest.fn().mockImplementation((status) => {
        statusCode = status
        return response
      }),
      json: jest.fn().mockImplementation( result => {
        responseObj = result
      })
    }
    const request = {
      body: {
          name: 'test', email: 'test@email.com', phone: ''
        }
    }

    await controller.handle(
      request as Request, response as Response
    );
    
    await controller.handle(
      request as Request, response as Response
    );

    expect(statusCode).toEqual(400);
    expect(responseObj.error).toEqual("This E-mail is already being used")
  });

  it('should not create new user with the same phone', async () => {
    let responseObj = {error:''};
    let statusCode = 0;
    
    const response: Partial<Response> = {
      status: jest.fn().mockImplementation((status) => {
        statusCode = status
        return response
      }),
      json: jest.fn().mockImplementation( result => {
        responseObj = result
      })
    }
    const request = {
      body: {
          name: 'test', email: '', phone: '11999944445'
        }
    }

    await controller.handle(
      request as Request, response as Response
    );
    
    await controller.handle(
      request as Request, response as Response
    );

    expect(statusCode).toEqual(400);
    expect(responseObj.error).toEqual("This phone is already being used")
  });
});
