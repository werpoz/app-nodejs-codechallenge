/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { GetTransactionQuery } from '../querys/get-transaction.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionByIdDTO } from '../dtos/get-transaction.dto';

@QueryHandler(GetTransactionQuery)
export class GetTransactionQueryHandler
  implements IQueryHandler<GetTransactionQuery, GetTransactionByIdDTO>
{
  constructor(
    @Inject('TransactionRepository')
    private transactionRepository: TransactionRepository,
  ) {}
  async execute(query: GetTransactionQuery): Promise<GetTransactionByIdDTO> {
    const transaction = await this.transactionRepository.getTransactionById(
      query.transactionExternalId,
    );
    return GetTransactionByIdDTO.response(transaction);
  }
}
