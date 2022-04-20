import User from "../model/user.entity";

export default interface IUserRepository {
  create(user:User): Promise<User>
  update(user:User): Promise<User>
  getById(id:string): Promise<User>
  getByEmail(email:string): Promise<User>
  delete(id:string): Promise<boolean>
}