/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';
import { UpdateTransactionHandler } from 'src/application/handlers/update-transaction.handler';
import { UpdateTransactionCommand } from 'src/application/commands/update-transaction.command';
import { v4 as uuidv4 } from 'uuid';
import { Status } from 'src/shared/constant.shared';

describe('UpdateTransactionHandler', () => {
  let handler: UpdateTransactionHandler;
  let repository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionHandler,
        {
          provide: 'TransactionRepository',
          useValue: {
            getTransactionById: jest.fn(),
            saveTransaction: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<UpdateTransactionHandler>(UpdateTransactionHandler);
    repository = module.get<TransactionRepository>('TransactionRepository');
  });

  it('should update transaction status', async () => {
    const mockTransactionExternalId = uuidv4();
    const command = new UpdateTransactionCommand(
      mockTransactionExternalId,
      Status.PENDING,
    );
    const transaction = new Transaction({
      transactionExternalId: mockTransactionExternalId,
      accountExternalIdDebit: uuidv4(),
      accountExternalIdCredit: uuidv4(),
      transferType: 1,
      value: 100,
      status: Status.PENDING,
    });

    jest.spyOn(repository, 'getTransactionById').mockResolvedValue(transaction);
    const saveSpy = jest
      .spyOn(repository, 'saveTransaction')
      .mockResolvedValue(transaction);

    const result = await handler.execute(command);

    expect(repository.getTransactionById).toHaveBeenCalledWith(
      mockTransactionExternalId,
    );
    expect(transaction.getStatus()).toBe(Status.PENDING);
    expect(saveSpy).toHaveBeenCalledWith(transaction);
    expect(result).toEqual({
      message: 'Transaction updated successfully',
    });
  });
});
