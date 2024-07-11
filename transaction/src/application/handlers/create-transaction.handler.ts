import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../commands/create-transaction.command';
import { CreateTransactionDTO } from '../dtos/create-transaction.dto';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Inject, Logger } from '@nestjs/common';
import { Transaction } from '../../domain/aggregates/transaction.aggregate';
import { ClientKafka } from '@nestjs/microservices';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand, CreateTransactionDTO>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    @Inject('TRANSACTION_MICROSERVICE')
    private readonly transactionEmitter: ClientKafka,
  ) {}

  async execute(
    command: CreateTransactionCommand,
  ): Promise<CreateTransactionDTO> {
    const {
      accountExternalIdCredit,
      accountExternalIdDebit,
      transferType,
      value,
    } = command;

    const transaction = new Transaction({
      accountExternalIdCredit,
      accountExternalIdDebit,
      transferType,
      value,
    });

    const transactionCreated =
      await this.transactionRepository.saveTransaction(transaction);

    this.transactionEmitter.emit(
      'transaction.created',
      JSON.stringify({
        transactionExternalId: transactionCreated.getTransactionExternalId(),
        value: transactionCreated.getValue(),
      }),
    );

    Logger.log('transaction.created', CreateTransactionHandler.name);

    return {
      transactionExternalId: transactionCreated.getTransactionExternalId(),
      message: 'Transaction created successfully',
    } as CreateTransactionDTO;
  }
}
