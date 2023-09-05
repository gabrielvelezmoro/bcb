import { PrismaService } from 'src/database/prisma.service';
import { CustomerRepository } from '../customer-repository';
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
    credito,
  }: {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    saldo: number;
    credito: number;
  }): Promise<void> {
    await this.prisma.customer.create({
      data: { id: randomUUID(), nome, email, telefone, cpf, credito, saldo },
    });
  }

  async get(telefone: string): Promise<Object> {
    const customer = await this.prisma.customer.findUnique({
      where: { telefone: telefone },
    });
    console.log(customer);
    return customer;
  }
}
