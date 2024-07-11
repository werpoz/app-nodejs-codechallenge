import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDTO } from '../dtos/create-transaction.dto';
import { GetTransactionDTO } from '../dtos/get-transaction.dto';
import { GetTransactionQuery } from 'src/application/querys/get-transaction.query';
import { CreateTransactionCommand } from 'src/application/commands/create-transaction.command';
import { UpdateTransactionCommand } from 'src/application/commands/update-transaction.command';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    type: CreateTransactionDTO,
  })
  @Post()
  async createTransaction(@Body() body: CreateTransactionDTO) {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferType,
      value,
    } = body;

    const command = new CreateTransactionCommand(
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferType,
      value,
    );

    return await this.commandBus.execute(command);
  }

  @MessagePattern('transaction.verified')
  async updateTransactionStatus(@Payload() message: any) {
    Logger.log(message, TransactionController.name);
    const { transactionExternalId, status } = message;

    const command = new UpdateTransactionCommand(transactionExternalId, status);

    return await this.commandBus.execute(command);
  }

  @Get(':transactionExternalId')
  async getTransactionById(@Param() params: GetTransactionDTO) {
    const { transactionExternalId } = params;
    return await this.queryBus.execute(
      new GetTransactionQuery(transactionExternalId),
    );
  }
}
