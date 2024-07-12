/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTransactionCommand } from '../commands/update-transaction.command';
import { UpdateTransactionDTO } from '../dtos/update-transaction.dto';
import { Inject } from '@nestjs/common';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';

@CommandHandler(UpdateTransactionCommand)
export class UpdateTransactionHandler
  implements ICommandHandler<UpdateTransactionCommand, UpdateTransactionDTO>
{
  constructor(
    @Inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}
  async execute(
    command: UpdateTransactionCommand,
  ): Promise<UpdateTransactionDTO> {
    const { transactionExternalId, status } = command;

    const transaction = await this.transactionRepository.getTransactionById(
      transactionExternalId,
    );
    transaction.setStatus(status);
    await this.transactionRepository.saveTransaction(transaction);
    return {
      message: 'Transaction updated successfully',
    };
  }
}
