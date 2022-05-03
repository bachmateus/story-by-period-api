import User from "../model/user.entity";

export default interface IUserRepository {
  create(user:User): Promise<number>
  update(user:User): Promise<User>
  getById(id:number): Promise<User>
  getByEmail(email:string): Promise<User>
  getByPhone(email:string): Promise<User>
  delete(id:string): Promise<boolean>
}