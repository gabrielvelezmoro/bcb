import { IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerBody {
  @IsNotEmpty({ message: 'Nome obrigatório.' })
  @Length(5, 100, {
    message: 'Deve conter mais de 5 e menos de 100 caracteres',
  })
  nome: string;

  @IsNotEmpty({ message: 'Email obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'Telefone obrigatório.' })
  telefone: string;

  @IsNotEmpty({ message: 'CPF obrigatório.' })
  cpf: string;

  credito: number;

  saldo: number;
}
