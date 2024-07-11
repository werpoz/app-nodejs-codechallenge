import { Transaction } from '../aggregates/transaction.aggregate';

export interface TransactionRepository {
  saveTransaction(transaction: Transaction): Promise<Transaction>;
  getTransactionById(id: string): Promise<Transaction>;
}
