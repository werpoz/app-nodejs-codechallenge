import { ICommand } from '@nestjs/cqrs';

export class CreateTransactionCommand implements ICommand {
  constructor(
    public readonly accountExternalIdDebit: string,
    public readonly accountExternalIdCredit: string,
    public readonly transferType: number,
    public readonly value: number,
  ) {}
}
