export interface ITransaction {
  transactionExternalId?: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transferType: number;
  status?: string;
  value: number;
}
