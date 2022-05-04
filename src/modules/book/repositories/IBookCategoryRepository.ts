import BookCategory from "../model/bookCategory.entity";

export default interface ICategoryRepository {
  create(bookCategory:BookCategory): Promise<number>
  update(bookCategory:BookCategory): Promise<boolean>
  delete(categoryId:number)
  getById(id:number): Promise<BookCategory>
  listAll(): Promise<BookCategory[]>
}