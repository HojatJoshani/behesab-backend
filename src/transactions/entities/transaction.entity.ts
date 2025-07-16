import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  type: 'income' | 'expense';

  @Column('decimal')
  amount: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  note: string;

  @Column()
  date: string;
}
