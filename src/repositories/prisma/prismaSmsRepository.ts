import { PrismaService } from 'src/database/prisma.service';
import { SmsRepository, ISendSmsRequest } from '../sms-repository';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaSmsRepository implements SmsRepository {
  constructor(private prisma: PrismaService) {}

  async sendSms(request: ISendSmsRequest): Promise<void> {
    const { idDestinatario, idRemetente, texto, whatsapp } = request;
    await this.prisma.sms.create({
      data: {
        id: randomUUID(),
        id_destinatario: idDestinatario,
        id_remetente: idRemetente,
        texto,
        whatsapp,
      },
    });
  }
}
