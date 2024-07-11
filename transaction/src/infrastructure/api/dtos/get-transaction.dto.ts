import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetTransactionDTO {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  transactionExternalId: string;
}
