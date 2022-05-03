import User from "../../user/model/user.entity";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from "typeorm";

@Entity()
export default class Author {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  description?: string

  @OneToOne(()=>User)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  created_at: Date;
      
  @UpdateDateColumn()
  updated_at: Date;
}