/**
 * This file is part of APP NodeJS Code Chanllenge.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { TransactionMapper } from 'src/application/mappers/transaction.mapper';
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionEntity } from 'src/infrastructure/database/entities/transaction.entity';

describe('TransactionMapper', () => {
  it('should map domain to entity', () => {
    const domain = new Transaction({
      transactionExternalId: '123',
      accountExternalIdDebit: 'debit123',
      accountExternalIdCredit: 'credit123',
      transferType: 1,
      status: 'pending',
      value: 100,
    });
    const entity = TransactionMapper.toEntity(domain);

    expect(entity).toBeInstanceOf(TransactionEntity);
    expect(entity.transactionExternalId).toBe('123');
    expect(entity.accountExternalIdDebit).toBe('debit123');
    expect(entity.accountExternalIdCredit).toBe('credit123');
    expect(entity.tranferType).toBe(1);
    expect(entity.status).toBe('pending');
    expect(entity.value).toBe(100);
    expect(entity.createdAt).toBe(domain.getCreatedAt());
    expect(entity.updatedAt).toBeDefined();
  });

  it('should map entity to domain', () => {
    const entity = new TransactionEntity();
    entity.transactionExternalId = '123';
    entity.accountExternalIdDebit = 'debit123';
    entity.accountExternalIdCredit = 'credit123';
    entity.tranferType = 1;
    entity.status = 'pending';
    entity.value = 100;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    const domain = TransactionMapper.toDomain(entity);

    expect(domain).toBeInstanceOf(Transaction);
    expect(domain.getTransactionExternalId()).toBe('123');
    expect(domain.getAccountExternalIdDebit()).toBe('debit123');
    expect(domain.getAccountExternalIdCredit()).toBe('credit123');
    expect(domain.getTransferType()).toBe(1);
    expect(domain.getStatus()).toBe('pending');
    expect(domain.getValue()).toBe(100);
    expect(domain.getCreatedAt()).toBeInstanceOf(Date);
  });
});
