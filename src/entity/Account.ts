import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  first_name!: string;

  @Column({ length: 100 })
  last_name!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 16 })
  phone!: string;

  @Column({ length: 50 }) // Adjusted length for password storage
  password!: string;

  @Column({ type: 'date' })
  birthday!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  last_modified!: Date;
}
