/**
 * This file is part of APP NodeJS Code Chanllenge.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { ClientKafka } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionCommand } from 'src/application/commands/create-transaction.command';
import { CreateTransactionDTO } from 'src/application/dtos/create-transaction.dto';
import { CreateTransactionHandler } from 'src/application/handlers/create-transaction.handler';
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { v4 as uuidv4 } from 'uuid';

describe('CreateTransactionHandler', () => {
  let handler: CreateTransactionHandler;
  let repository: TransactionRepository;
  let kafkaClient: ClientKafka;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionHandler,
        {
          provide: 'TransactionRepository',
          useValue: {
            saveTransaction: jest.fn(),
          },
        },
        {
          provide: 'TRANSACTION_MICROSERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateTransactionHandler>(CreateTransactionHandler);
    repository = module.get<TransactionRepository>('TransactionRepository');
    kafkaClient = module.get<ClientKafka>('TRANSACTION_MICROSERVICE');
  });

  it('should save the transaction and emit a Kafka event', async () => {
    const command = new CreateTransactionCommand(uuidv4(), uuidv4(), 1, 100);

    const mockTransactionExternalId = uuidv4();

    const transaction = new Transaction({
      transactionExternalId: mockTransactionExternalId,
      accountExternalIdCredit: uuidv4(),
      accountExternalIdDebit: uuidv4(),
      transferType: 1,
      value: 100,
    });

    jest.spyOn(repository, 'saveTransaction').mockResolvedValue(transaction);

    const result: CreateTransactionDTO = await handler.execute(command);

    expect(repository.saveTransaction).toHaveBeenCalledWith(
      expect.any(Transaction),
    );
    expect(kafkaClient.emit).toHaveBeenCalledWith(
      'transaction.created',
      JSON.stringify({
        transactionExternalId: mockTransactionExternalId,
        value: 100,
      }),
    );

    expect(result).toEqual({
      transactionExternalId: mockTransactionExternalId,
      message: 'Transaction created successfully',
    });
  });
});
