import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  findAll(userId: string) {
    return this.transactionRepo.find({ where: { userId } });
  }

  create(userId: string, dto: any) {
    const transaction = this.transactionRepo.create({ ...dto, userId });
    return this.transactionRepo.save(transaction);
  }

  async remove(id: string, userId: string) {
    const tx = await this.transactionRepo.findOneBy({ id, userId });
    if (!tx) throw new Error('Not found or unauthorized');
    return this.transactionRepo.remove(tx);
  }
}
