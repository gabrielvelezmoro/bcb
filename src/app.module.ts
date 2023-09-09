import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { PrismaService } from './database/prisma.service';
import { CustomerRepository } from './repositories/customer-repository';
import { SmsRepository } from './repositories/sms-repository';
import { PrismaCustomerRepository } from './repositories/prisma/prismaCustomerRepository';
import { PrismaSmsRepository } from './repositories/prisma/prismaSmsRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    { provide: CustomerRepository, useClass: PrismaCustomerRepository },
    { provide: SmsRepository, useClass: PrismaSmsRepository },
  ],
})
export class AppModule {}
