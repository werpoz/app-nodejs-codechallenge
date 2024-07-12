/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionMapper } from 'src/application/mappers/transaction.mapper';

@Injectable()
export class PostgresRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async saveTransaction(transaction: Transaction): Promise<Transaction> {
    const entity = TransactionMapper.toEntity(transaction);
    const savedEntity = await this.transactionRepository.save(entity);
    return TransactionMapper.toDomain(savedEntity);
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const transactionEntity = await this.transactionRepository.findOne({
      where: {
        transactionExternalId: id,
      },
    });

    return TransactionMapper.toDomain(transactionEntity);
  }
}
