import { 
  Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  JoinTable, 
  ManyToMany, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm"

import Author from './author.entity';
import BookBeginRule from "./bookBeginRule.entity"
import BookCategory from "../../bookCategory/model/bookCategory.entity";

@Entity()
export default class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  title: string
  
  @Column()
  description: string
  
  @Column()
  duration: number
  
  @Column()
  begin_at: number
  
  @Column()
  price: number
  
  @OneToOne(()=>BookBeginRule)
  begin_rule: BookBeginRule
  
  @OneToOne(()=>Author)
  author: Author

  @ManyToMany(()=>BookCategory)
  @JoinTable()
  categories?:BookCategory[]
  
  @Column()
  published_at?: Date
  
  @DeleteDateColumn()
  deleted_at: Date
  
  @CreateDateColumn()
  created_at: Date
      
  @UpdateDateColumn()
  updated_at: Date
}
