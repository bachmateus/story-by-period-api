import { Injectable } from "@nestjs/common";
import BookCategory from "../../model/bookCategory.entity";
import bookCategoryEntity from "../../model/bookCategory.entity";
import IBookCategoryRepository from "../IBookCategoryRepository";

@Injectable()
export default class LocalBookCategoryRepository implements IBookCategoryRepository {
  private bookCategories: BookCategory[] = [];

  create(bookCategory: bookCategoryEntity): Promise<number> {
    const bookId = Math.random() * (1000000000 - 1) + 1;
    bookCategory.id = bookId;
    bookCategory.created_at = new Date();
    bookCategory.updated_at = new Date();

    this.bookCategories.push(bookCategory);

    return new Promise((resolve)=>{
      resolve(bookId);
    });
  }

  update(bookCategory: bookCategoryEntity): Promise<boolean> {
    this.bookCategories = this.bookCategories.map( category => {
      if ( category.id === bookCategory.id) 
        return bookCategory;

      return category
    })

    return new Promise( resolve => resolve(true) );
  }
  delete(categoryId: number) {
    this.bookCategories = this.bookCategories.map( category => {
      if ( category.id === categoryId) 
        category.deleted_at = new Date()

      return category
    })

    return new Promise( resolve => resolve(true) );
  }
  getById(id: number): Promise<bookCategoryEntity> {
    const foundBookCategory = this.bookCategories.find(
      category => category.id === id
    );

    return new Promise( resolve => resolve(foundBookCategory) );
  }
  listAll(): Promise<bookCategoryEntity[]> {
    return new Promise((resolve) => {
      resolve(this.bookCategories);
    })
  }
}