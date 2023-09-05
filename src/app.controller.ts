import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCustomerBody } from './dtos/create-customer-body';
import { CustomerRepository } from './repositories/customer-repository';

@Controller('api')
export class AppController {
  constructor(private customerRepository: CustomerRepository) {}

  @Post('customer')
  async createCustomer(@Body() body: CreateCustomerBody) {
    const { nome, cpf, credito, email, saldo, telefone } = body;
    await this.customerRepository.create({
      nome,
      cpf,
      credito,
      email,
      saldo,
      telefone,
    });
  }

  @Get('customer')
  async getCustomer(@Query() params) {
    console.log(params);
    const result = await this.customerRepository.get(params.telefone);
    return result;
  }
}
