import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomerBody } from './dtos/create-customer-body';
import { CustomerRepository } from './repositories/customer-repository';
import { SendSmsBody } from './dtos/send-sms-body';
import { SmsRepository } from './repositories/sms-repository';

@Controller('api')
export class AppController {
  constructor(
    private customerRepository: CustomerRepository,
    private smsRepository: SmsRepository,
  ) {}

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

  @Post('sms/send')
  async sendSms(@Body() body: SendSmsBody) {
    const { remetente, destinatario, whatsapp, texto } = body;

    await this.customerRepository
      .getCustomerByNumber({
        telefone: destinatario,
      })
      .catch(() => {
        throw new HttpException(
          'Destinatario não encontrado',
          HttpStatus.FORBIDDEN,
        );
      });

    const remetenteData = await this.customerRepository
      .getCustomerByNumber({
        telefone: remetente,
      })
      .catch(() => {
        throw new HttpException(
          'Remetente não encontrado',
          HttpStatus.FORBIDDEN,
        );
      });

    if (!remetenteData.plano && remetenteData.saldo < 0.25) {
      throw new HttpException('Saldo insuficiente', HttpStatus.FORBIDDEN);
    }

    const destinatarioData = await this.customerRepository
      .getCustomerByNumber({
        telefone: destinatario,
      })
      .catch(() => {
        throw new HttpException(
          'Destinatario não encontrado',
          HttpStatus.FORBIDDEN,
        );
      });

    //envia sms

    this.smsRepository
      .sendSms({
        idRemetente: remetenteData.id,
        idDestinatario: destinatarioData.id,
        texto,
        whatsapp,
      })
      .then(() => {
        this.customerRepository.updateBalance({
          id: remetenteData.id,
          saldo: remetenteData.saldo - 25,
        });
      });
    //abate do saldo
  }
}
