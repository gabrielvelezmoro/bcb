export abstract class SmsRepository {
  abstract sendSms(request: ISendSmsRequest): Promise<void>;
}

export interface ISendSmsRequest {
  idRemetente: string;
  idDestinatario: string;
  whatsapp: boolean;
  texto: string;
}
