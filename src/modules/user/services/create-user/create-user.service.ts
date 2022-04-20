import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import User from "../../model/user.entity";


@Injectable()
export default class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ){}

  async execute(): Promise<User> {
    try {
      const user: User = new User();
      user.email = "test@test.com" ;
      user.name = 'Tester';

      const response = await this.userRepository.insert(user);
      
      return user 
    } catch (e) {
      throw new Error("User could not be registered");
      
    }
  }
}