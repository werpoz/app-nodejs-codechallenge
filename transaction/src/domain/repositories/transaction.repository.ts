/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { Transaction } from '../aggregates/transaction.aggregate';

export interface TransactionRepository {
  saveTransaction(transaction: Transaction): Promise<Transaction>;
  getTransactionById(id: string): Promise<Transaction>;
}
