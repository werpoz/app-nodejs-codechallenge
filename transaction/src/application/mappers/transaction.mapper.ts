/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'src/infrastructure/database/entities/transaction.entity';
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';

@Injectable()
export class TransactionMapper {
  static toEntity(domain: Transaction): TransactionEntity {
    const entity = new TransactionEntity();
    entity.transactionExternalId = domain.getTransactionExternalId();
    entity.accountExternalIdDebit = domain.getAccountExternalIdDebit();
    entity.accountExternalIdCredit = domain.getAccountExternalIdCredit();
    entity.tranferType = domain.getTransferType();
    entity.status = domain.getStatus();
    entity.value = domain.getValue();
    entity.createdAt = domain.getCreatedAt();
    entity.updatedAt = domain['updatedAt'];
    return entity;
  }

  static toDomain(entity: TransactionEntity): Transaction {
    return new Transaction({
      transactionExternalId: entity.transactionExternalId,
      accountExternalIdDebit: entity.accountExternalIdDebit,
      accountExternalIdCredit: entity.accountExternalIdCredit,
      transferType: entity.tranferType,
      status: entity.status,
      value: entity.value,
    });
  }
}
