/**
 * This file is part of APP NodeJS Code Chanllenge.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from 'src/application/commands/create-transaction.command';
import { UpdateTransactionCommand } from 'src/application/commands/update-transaction.command';
import { GetTransactionQuery } from 'src/application/querys/get-transaction.query';
import { TransactionController } from 'src/infrastructure/api/controllers/transaction.controller';
import { CreateTransactionDTO } from 'src/infrastructure/api/dtos/create-transaction.dto';
import { GetTransactionDTO } from 'src/infrastructure/api/dtos/get-transaction.dto';
import { v4 as uuidv4 } from 'uuid';

describe('TransactionController', () => {
  let controller: TransactionController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should create a transaction', async () => {
    const body: CreateTransactionDTO = {
      accountExternalIdDebit: uuidv4(),
      accountExternalIdCredit: uuidv4(),
      transferType: 1,
      value: 100,
    };

    const command = new CreateTransactionCommand(
      body.accountExternalIdDebit,
      body.accountExternalIdCredit,
      body.transferType,
      body.value,
    );

    const mockTransactionExternalId = uuidv4();

    const commandBusExecuteSpy = jest
      .spyOn(commandBus, 'execute')
      .mockResolvedValue({
        transactionExternalId: mockTransactionExternalId,
        message: 'Transaction created successfully',
      });

    const result = await controller.createTransaction(body);

    expect(commandBusExecuteSpy).toHaveBeenCalledWith(command);
    expect(result).toEqual({
      transactionExternalId: mockTransactionExternalId,
      message: 'Transaction created successfully',
    });
  });

  it('should update transaction status', async () => {
    const mockTransactionExternalId = uuidv4();

    const message = {
      transactionExternalId: mockTransactionExternalId,
      status: 'completed',
    };

    const command = new UpdateTransactionCommand(
      message.transactionExternalId,
      message.status,
    );

    const commandBusExecuteSpy = jest
      .spyOn(commandBus, 'execute')
      .mockResolvedValue({
        message: 'Transaction updated successfully',
      });

    const result = await controller.updateTransactionStatus(message);

    expect(commandBusExecuteSpy).toHaveBeenCalledWith(command);
    expect(result).toEqual({
      message: 'Transaction updated successfully',
    });
  });

  it('should get transaction by id', async () => {
    const mockTransactionExternalId = uuidv4();
    const params: GetTransactionDTO = {
      transactionExternalId: mockTransactionExternalId,
    };

    const query = new GetTransactionQuery(params.transactionExternalId);

    const queryBusExecuteSpy = jest
      .spyOn(queryBus, 'execute')
      .mockResolvedValue({
        transactionExternalId: mockTransactionExternalId,
        accountExternalIdDebit: 'debit123',
        accountExternalIdCredit: 'credit123',
        transferType: 1,
        value: 100,
        status: 'completed',
      });

    const result = await controller.getTransactionById(params);

    expect(queryBusExecuteSpy).toHaveBeenCalledWith(query);
    expect(result).toEqual({
      transactionExternalId: mockTransactionExternalId,
      accountExternalIdDebit: 'debit123',
      accountExternalIdCredit: 'credit123',
      transferType: 1,
      value: 100,
      status: 'completed',
    });
  });
});
