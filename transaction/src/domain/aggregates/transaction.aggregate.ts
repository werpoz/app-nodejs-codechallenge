/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { AggregateRoot } from '@nestjs/cqrs/dist';
import { ITransaction } from '../interface/transaction.interface';
import { Status } from 'src/shared/constant.shared';

export class Transaction extends AggregateRoot {
  private readonly transactionExternalId: string;
  private readonly accountExternalIdDebit: string;
  private readonly accountExternalIdCredit: string;
  private readonly transferType: number;
  private status: string;
  private readonly value: number;

  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(transaction: ITransaction) {
    super();
    this.transactionExternalId = transaction.transactionExternalId;
    this.accountExternalIdDebit = transaction.accountExternalIdDebit;
    this.accountExternalIdCredit = transaction.accountExternalIdCredit;
    this.transferType = transaction.transferType;
    this.status = transaction.status || Status.PENDING;
    this.value = transaction.value;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getTransactionExternalId(): string {
    return this.transactionExternalId;
  }

  public getAccountExternalIdDebit(): string {
    return this.accountExternalIdDebit;
  }

  public getAccountExternalIdCredit(): string {
    return this.accountExternalIdCredit;
  }

  public getTransferType(): number {
    return this.transferType;
  }

  public getStatus(): string {
    return this.status;
  }

  public getValue(): number {
    return this.value;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdateAt(): Date {
    return this.updatedAt;
  }

  public setStatus(status: string) {
    this.status = status;
    this.updatedAt = new Date();
  }

  update(fields: Partial<ITransaction>) {
    Object.assign(this, fields);
    this.updatedAt = new Date();
  }
}
