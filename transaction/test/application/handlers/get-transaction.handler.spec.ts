/**
 * This file is part of APP NodeJS Code Chanllenge.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { GetTransactionByIdDTO } from 'src/application/dtos/get-transaction.dto';
import { GetTransactionQueryHandler } from 'src/application/handlers/get-transaction.handler';
import { GetTransactionQuery } from 'src/application/querys/get-transaction.query';
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { v4 as uuidv4 } from 'uuid';

describe('GetTransactionQueryHandler', () => {
  let handler: GetTransactionQueryHandler;
  let repository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTransactionQueryHandler,
        {
          provide: 'TransactionRepository',
          useValue: {
            getTransactionById: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<GetTransactionQueryHandler>(
      GetTransactionQueryHandler,
    );
    repository = module.get<TransactionRepository>('TransactionRepository');
  });

  it('should return transaction details for given transactionExternalId', async () => {
    const mockTransactionExternalId = uuidv4();
    const query = new GetTransactionQuery(mockTransactionExternalId);
    const data = {
      transactionExternalId: mockTransactionExternalId,
      accountExternalIdDebit: uuidv4(),
      accountExternalIdCredit: uuidv4(),
      transferType: 1,
      value: 100,
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const transaction = new Transaction(data);

    jest.spyOn(repository, 'getTransactionById').mockResolvedValue(transaction);

    const result = await handler.execute(query);

    expect(repository.getTransactionById).toHaveBeenCalledWith(
      mockTransactionExternalId,
    );
    expect(result).toEqual(GetTransactionByIdDTO.reponse(transaction));
  });
});
