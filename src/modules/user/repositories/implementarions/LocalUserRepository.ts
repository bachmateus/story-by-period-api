import { Injectable } from "@nestjs/common";
import User from "../../model/user.entity";
import IUserRepository from "../IUserRepository";

@Injectable()
export default class LocalUserRepository implements IUserRepository {
  private users: User[] = [
    { id:'random', name: 'tester', email: 'test@email.com'}
  ]
  create(user: User): Promise<User> {
    return new Promise((resolve)=>{
      resolve(user);
    });
  }
  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getByEmail(email: string): Promise<User> {
    const foundUser = this.users.filter( user => user.email === email); 
    const response =  (foundUser.length === 0) ? null: foundUser[0];
    
    return new Promise(resolve => resolve(response));
    // throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}