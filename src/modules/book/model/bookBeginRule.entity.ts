import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class BookBeginRule {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ length: 200 })
  name: string
  
  @Column()
  description: string
}