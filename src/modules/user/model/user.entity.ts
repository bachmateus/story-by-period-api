import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string
  
  @Column()
  email?: string
  
  @Column()
  phone?: string

  @Column()
  photo?: string

  @Column()
  isActivated: boolean

  @CreateDateColumn()
  created_at: Date;
      
  @UpdateDateColumn()
  updated_at: Date;
}