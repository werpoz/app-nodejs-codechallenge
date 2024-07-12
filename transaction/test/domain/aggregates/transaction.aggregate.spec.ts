/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';
import { ITransaction } from 'src/domain/interface/transaction.interface';
import { v4 as uuidv4 } from 'uuid';

describe('Transaction', () => {
  let transactionData: ITransaction;
  let transaction: Transaction;

  beforeEach(() => {
    transactionData = {
      transactionExternalId: uuidv4(),
      accountExternalIdDebit: uuidv4(),
      accountExternalIdCredit: uuidv4(),
      transferType: 1,
      value: 1000,
      status: 'pending',
    };

    transaction = new Transaction(transactionData);
  });

  it('should create a transaction instance', () => {
    expect(transaction).toBeDefined();
    expect(transaction.getTransactionExternalId()).toBe(
      transactionData.transactionExternalId,
    );
    expect(transaction.getAccountExternalIdDebit()).toBe(
      transactionData.accountExternalIdDebit,
    );
    expect(transaction.getAccountExternalIdCredit()).toBe(
      transactionData.accountExternalIdCredit,
    );
    expect(transaction.getTransferType()).toBe(transactionData.transferType);
    expect(transaction.getStatus()).toBe(transactionData.status);
    expect(transaction.getValue()).toBe(transactionData.value);
  });

  it('should update the status', () => {
    const newStatus = 'rejected';
    transaction.setStatus(newStatus);
    expect(transaction.getStatus()).toBe(newStatus);
  });

  it('should update the transaction fields', () => {
    const updatedFields: Partial<ITransaction> = {
      accountExternalIdCredit: uuidv4(),
      value: 2000,
    };
    transaction.update(updatedFields);
    expect(transaction.getAccountExternalIdCredit()).toBe(
      updatedFields.accountExternalIdCredit,
    );
    expect(transaction.getValue()).toBe(updatedFields.value);
  });

  it('should update the updatedAt date when status changes', () => {
    const initialUpdatedAt = transaction.getCreatedAt();
    transaction.update({ status: 'rejected' });
    expect(transaction.getUpdateAt()).not.toBe(initialUpdatedAt);
  });
});
