/**
 * This file is part of APP NodeJS Code Challenging.
 *
 * (c) Yape. <e3corpion@gmail.com>.
 *
 * This source file is subject to a proprietary license that is bundled
 * with this source code in the file LICENSE.
 */
import { IsUUID, IsString } from 'class-validator';
export class UpdateTransactionDTO {
  @IsString()
  @IsUUID()
  readonly transactionExternalId: string;

  @IsString()
  readonly status: string;
}
