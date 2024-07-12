/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsIn,
} from 'class-validator';
export class CreateTransactionDTO {
  @IsString()
  @IsUUID()
  @ApiProperty({ example: '240e3c1e-f1b6-4610-8ade-f4c151000abb' })
  readonly accountExternalIdDebit: string;

  @IsString()
  @IsUUID()
  @ApiProperty({ example: '821ce7f2-fcc4-42c1-944a-978c3d7af351' })
  readonly accountExternalIdCredit: string;

  @IsInt()
  @IsPositive()
  @IsIn([1, 2, 3])
  @ApiProperty({ example: 1 })
  readonly transferType: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 1000 })
  readonly value: number;
}
