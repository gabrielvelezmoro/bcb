import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { PrismaService } from './database/prisma.service';
import { CustomerRepository } from './repositories/customer-repository';
import { PrismaCustomerRepository } from './repositories/prisma/prismaCustomerRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    { provide: CustomerRepository, useClass: PrismaCustomerRepository },
  ],
})
export class AppModule {}
