import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { TransactionEntity } from './infrastructure/database/entities/transaction.entity';
import { CreateTransactionHandler } from './application/handlers/create-transaction.handler';
import { PostgresRepository } from './infrastructure/database/repositories/postgres.repository';
import { TransactionController } from './infrastructure/api/controllers/transaction.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UpdateTransactionHandler } from './application/handlers/update-transaction.handler';
import { GetTransactionQueryHandler } from './application/handlers/get-transaction.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [TransactionEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([TransactionEntity]),
    ClientsModule.register([
      {
        name: 'TRANSACTION_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'transaction',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'transaction-consumer',
          },
        },
      },
    ]),
    CqrsModule,
  ],
  controllers: [TransactionController],
  providers: [
    CreateTransactionHandler,
    UpdateTransactionHandler,
    GetTransactionQueryHandler,
    {
      provide: 'TransactionRepository',
      useClass: PostgresRepository,
    },
  ],
})
export class AppModule {}
