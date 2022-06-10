import { Inject, Injectable } from "@nestjs/common";
import User from "../../model/user.entity";
import IUserRepository from "../../repositories/IUserRepository";


@Injectable()
export default class ListAllUsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepository
  ){}

  async execute(): Promise<User[]> {
    return await this.userRepository.listAll();
  }
}