/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { Transaction } from 'src/domain/aggregates/transaction.aggregate';

export class GetTransactionByIdDTO {
  static response(transaction: Transaction) {
    return {
      transactionExternalId: transaction.getTransactionExternalId(),
      transactionType: {
        name: transaction.getTransferType(),
      },
      transactionStatus: {
        name: transaction.getStatus(),
      },
      value: transaction.getValue(),
      createdAt: transaction.getCreatedAt(),
    };
  }
}
