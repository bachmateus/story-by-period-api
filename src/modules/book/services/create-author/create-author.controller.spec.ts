import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { Request, Response } from "express";
import LocalUserRepository from "../../../user/repositories/implementarions/LocalUserRepository";
import Author from "../../model/author.entity";
import LocalAuthorRepository from "../../repositories/implementations/LocalAuthorRepository";
import { CreateAuthorController } from "./create-author.controller";
import CreateAuthorService from "./create-author.service";
import User from "../../../user/model/user.entity";

let statusCode = 0;

const response: Partial<Response> = {
  status: jest.fn().mockImplementation((status) => {
    statusCode =  status
    return response;
  }),
  json: jest.fn().mockImplementation( result => result)
}

describe('CreateAuthorController', () => {
  let controller: CreateAuthorController;

  beforeEach( () => {
    statusCode = 0;
  })

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env/production.env'],
        })
      ],
      controllers: [CreateAuthorController],
      providers: [
        Author,
        CreateAuthorService,
        { provide: "AUTHOR_REPOSITORY", useClass: LocalAuthorRepository },
        { provide: "USER_REPOSITORY", useClass: LocalUserRepository }
      ]
    }).compile();
    
    controller = module.get<CreateAuthorController>(CreateAuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new author', async () => {
    const user: User = {
      id: 1,
      name: 'User Tester',
      isActivated: false,
    }

    const request = {
      body: {
          user,
          description: 'Register author test'
        }
    }

    const resp = await controller.handle(
      request as Request, response as Response
    );

    expect(statusCode).toBe(201)
    expect(resp).toHaveProperty('id');
  })

  it('should not create author if userId was not given', async () => {
    const request = {
      body: {
          description: 'Register author test'
        }
    }

    const resp = await controller.handle(
      request as Request, response as Response
    );

    expect(statusCode).toBe(400)
    expect(resp).toEqual({error: "userId ought to be set"})
  })

  it('should only create author if the userId corresponds to a registered user ', async () => {
    const user: User = {
      id: 5,
      name: 'User Tester',
      isActivated: false,
    }

    const request = {
      body: {
          user,
          description: 'Register author test'
        }
    }

    const resp = await controller.handle(
      request as Request, response as Response
    );

    expect(statusCode).toBe(400)
    expect(resp).toEqual({error: "userId does not belong to a registered user"})
  });

  it('should not create author with the userId which belongs to another author', async () => {
    const user: User = {
      id: 1,
      name: 'User Tester',
      isActivated: false,
    }

    const request = {
      body: {
          user,
          description: 'Register author test'
        }
    }

    await controller.handle(
      request as Request, response as Response
    );

    const resp = await controller.handle(
      request as Request, response as Response
    );
    
    expect(statusCode).toBe(400)
    expect(resp).toEqual({error: "This userId belongs to another author"})
  });

});