import { Injectable } from "@nestjs/common";
import User from "../../model/user.entity";
import IUserRepository from "../IUserRepository";

@Injectable()
export default class LocalUserRepository implements IUserRepository {
  
  private users: User[] = [
    {id:1, name: 'Tester', email: 'tester@test.com', isActivated: true }
  ];
  
  create(user: User): Promise<number> {
    this.users.push(user);

    return new Promise((resolve)=>{
      resolve(Math.random() * (1000000000 - 1) + 1);
    });
  }
  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return new Promise((resolve)=>{
      resolve(user);
    });
  }
  getByEmail(email: string): Promise<User> {
    const foundUser = this.users.filter( user => user.email === email); 
    const response =  (foundUser.length === 0) ? null: foundUser[0];
    
    return new Promise(resolve => resolve(response));
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  getByPhone(phone: string): Promise<User> {
    const foundUser = this.users.filter( user => user.phone === phone); 
    const response =  (foundUser.length === 0) ? null: foundUser[0];
    
    return new Promise(resolve => resolve(response));
  }
}