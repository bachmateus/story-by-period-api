import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class BookCategory {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string
  
  @Column()
  description?: string

  @DeleteDateColumn()
  deleted_at: Date
  
  @CreateDateColumn()
  created_at: Date
      
  @UpdateDateColumn()
  updated_at: Date
}