/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { TransactionMapper } from 'src/application/mappers/transaction.mapper';
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionEntity } from 'src/infrastructure/database/entities/transaction.entity';
import { Status } from 'src/shared/constant.shared';
import { v4 as uuidv4 } from 'uuid';

describe('TransactionMapper', () => {
  it('should map domain to entity', () => {
    const transactionExternalId = uuidv4();
    const accountExternalIdDebit = uuidv4();
    const accountExternalIdCredit = uuidv4();
    const domain = new Transaction({
      transactionExternalId,
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferType: 1,
      status: Status.PENDING,
      value: 100,
    });
    const entity = TransactionMapper.toEntity(domain);

    expect(entity).toBeInstanceOf(TransactionEntity);
    expect(entity.transactionExternalId).toBe(transactionExternalId);
    expect(entity.accountExternalIdDebit).toBe(accountExternalIdDebit);
    expect(entity.accountExternalIdCredit).toBe(accountExternalIdCredit);
    expect(entity.tranferType).toBe(1);
    expect(entity.status).toBe(Status.PENDING);
    expect(entity.value).toBe(100);
    expect(entity.createdAt).toBe(domain.getCreatedAt());
    expect(entity.updatedAt).toBeDefined();
  });

  it('should map entity to domain', () => {
    const transactionExternalId = uuidv4();
    const accountExternalIdDebit = uuidv4();
    const accountExternalIdCredit = uuidv4();
    const entity = new TransactionEntity();
    entity.transactionExternalId = transactionExternalId;
    entity.accountExternalIdDebit = accountExternalIdDebit;
    entity.accountExternalIdCredit = accountExternalIdCredit;
    entity.tranferType = 1;
    entity.status = Status.PENDING;
    entity.value = 100;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    const domain = TransactionMapper.toDomain(entity);

    expect(domain).toBeInstanceOf(Transaction);
    expect(domain.getTransactionExternalId()).toBe(transactionExternalId);
    expect(domain.getAccountExternalIdDebit()).toBe(accountExternalIdDebit);
    expect(domain.getAccountExternalIdCredit()).toBe(accountExternalIdCredit);
    expect(domain.getTransferType()).toBe(1);
    expect(domain.getStatus()).toBe(Status.PENDING);
    expect(domain.getValue()).toBe(100);
    expect(domain.getCreatedAt()).toBeInstanceOf(Date);
  });
});
