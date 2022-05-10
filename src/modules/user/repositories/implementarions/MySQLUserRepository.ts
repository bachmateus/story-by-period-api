import { Inject } from "@nestjs/common";
import { InsertResult, Repository } from "typeorm";
import User from "../../model/user.entity";
import IUserRepository from "../IUserRepository";

export default class MySQLUserRepository implements IUserRepository {
  constructor(
    @Inject('MYSQL_USER_REPOSITORY')
    private userRepository: Repository<User>
  ){}

  async create(user: User): Promise<number> {
    const response = await this.userRepository.insert(user);
    return response.raw.insertId;
  }
  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({id})
    console.log(user);
    return user;
  }
  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({email});
    return user;
  }
  async getByPhone(phone: string): Promise<User> {
    const user = await this.userRepository.findOneBy({phone});
    return user;
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}