import { PrismaService } from 'src/database/prisma.service';
import {
  CustomerRepository,
  IGetBalanceRequest,
  IListAllResponse,
  IUpdateBalanceRequest,
  IGetBalanceResponse,
} from '../customer-repository';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    nome,
    cpf,
    telefone,
    email,
    saldo,
    plano,
  }: {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    saldo: number;
    plano: boolean;
  }): Promise<void> {
    await this.prisma.customer.create({
      data: { id: randomUUID(), nome, email, telefone, cpf, saldo, plano },
    });
  }

  async listAll(): Promise<IListAllResponse[]> {
    const customers = await this.prisma.customer.findMany();

    return customers;
  }

  async getBalance(request: IGetBalanceRequest): Promise<IGetBalanceResponse> {
    const result = await this.prisma.customer.findFirstOrThrow({
      where: { id: request.id },
      select: {
        saldo: true,
      },
    });
    return result;
  }

  async updateBalance(request: IUpdateBalanceRequest): Promise<void> {
    console.log(request);
    await this.prisma.customer.update({
      data: { saldo: request.saldo },
      where: { id: request.id },
    });
  }
}
