import { IsNotEmpty, Length } from 'class-validator';

export class SendSmsBody {
  @IsNotEmpty({ message: 'Remetente obrigatório.' })
  remetente: string;

  @IsNotEmpty({ message: 'Destinatário obrigatório.' })
  destinatario: string;

  @IsNotEmpty({ message: 'Texto obrigatório.' })
  @Length(1, 100, {
    message: 'TExto deve conter mais de 5 e menos de 100 caracteres',
  })
  texto: string;

  @IsNotEmpty({
    message: 'Sinalizar se o o número do destinatario é um whatsapp.',
  })
  whatsapp: boolean;
}
