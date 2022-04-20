import { Test, TestingModule } from '@nestjs/testing';

import User from '../../model/user.entity';
import LocalUserRepository from '../../repositories/implementarions/LocalUserRepository';
import { CreateUserController } from './create-user.controller';
import { CreateUserService } from './_old_create-user.service';

describe('CreateUserController', () => {
  let controller: CreateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        User,
        CreateUserService,
        { provide: "IUserRepository", useClass: LocalUserRepository}
      ]
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async() => {
    const userCreated = await controller.handle({
      name: 'Test', email: 'test@test.com'
    });

    expect(userCreated).toHaveProperty('id');
  });

  it('should not create a new user if the name is missing', async () => {
    try {
      await controller.handle({
        name: '', email: 'teste@email.com'
      });

      throw new Error("User was registered");

    } catch (error) {
      expect(error.message).not.toEqual('User was registered') 
    }
  });

  it('should not create a new user if the email is missing', async () => {
    try {
      await controller.handle({
        name: 'teste name', email: ''
      });

      throw new Error("User was registered");

    } catch (error) {
      expect(error.message).not.toEqual('User was registered') 
    }
  })

  it('should not create new user with the same email', async () => {
    try {
      await controller.handle({
        name: 'teste name', email: 'test@email.com'
      });

      throw new Error("User was registered");

    } catch (error) {
      expect(error.message).not.toEqual('User was registered') 
    }
  });
});
