import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCustomerBody } from './dtos/create-customer-body';
import { CustomerRepository } from './repositories/customer-repository';

@Controller('api')
export class AppController {
  constructor(private customerRepository: CustomerRepository) {}

  @Post('customer')
  async createCustomer(@Body() body: CreateCustomerBody) {
    const { nome, cpf, plano, email, saldo, telefone } = body;
    await this.customerRepository.create({
      nome,
      cpf,
      plano,
      email,
      saldo,
      telefone,
    });
  }

  @Get('customer/all')
  async listAllCustomers() {
    const result = await this.customerRepository.listAll();
    return result;
  }

  @Get('customer/balance/:id')
  async getCustomerBalance(@Param() param) {
    const { id } = param;
    const result = await this.customerRepository.getBalance({ id });

    return result;
  }

  @Put('customer/add-credit/:id')
  async addCredit(@Param() param, @Body() body) {
    const { id } = param;
    const { credito } = body;
    const { saldo } = await this.customerRepository.getBalance({ id });

    const novoValor = saldo + credito;

    await this.customerRepository.updateBalance({ id, saldo: novoValor });
  }

  @Get('customer/:id')
  async getCustomer(@Param() param) {
    const { id } = param;
    const result = await this.customerRepository.getCustomer({ id });
    return result;
  }
}
