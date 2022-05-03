import { Inject, Injectable } from "@nestjs/common";
import IUserRepository from "../../repositories/IUserRepository";


@Injectable()
export default class ListAllUsers {
  constructor(
    @Inject()
    private userRepository: IUserRepository
  ){}

  execute() {
    
  }
}