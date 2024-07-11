import { Transaction } from 'src/domain/aggregates/transaction.aggregate';

export class GetTransactionByIdDTO {
  static reponse(transaction: Transaction) {
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
