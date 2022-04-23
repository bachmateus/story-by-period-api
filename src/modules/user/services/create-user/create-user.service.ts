import { Inject, Injectable } from "@nestjs/common";
import User from "../../model/user.entity";
import IUserRepository from "../../repositories/IUserRepository";

interface IRequest {
  name: string
  email?: string
  phone?: string
  photo?: string
  isActivated?: boolean
}

@Injectable()
export default class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepository
  ){}

  async execute({ name, email, phone, photo, isActivated = false }:IRequest): Promise<User> {
    try {
      if (!name)
        throw new Error("Name must be informated");

      if ( !email && !phone )
        throw new Error("E-mail or phone number must be informated");
            
      const user: User = new User();
      
      Object.assign(user, {
        name, email, phone, photo, isActivated
      })

      // Check if user exists
      const userWithSameEmail = await this.userRepository.getByEmail(email);

      if (email && userWithSameEmail)
        throw new Error("This E-mail is already being used");

      const userWithSamePhone = await this.userRepository.getByPhone(phone);

      if (phone && userWithSamePhone)
        throw new Error("This phone is already being used");

      const insertedId = await this.userRepository.create(user);
      user.id = insertedId;

      return user;
    } catch (e) {
      throw e;
    }
  }
}