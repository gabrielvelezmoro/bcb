export abstract class CustomerRepository {
  abstract create({
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
  }): Promise<void>;

  abstract listAll(): Promise<IListAllResponse[]>;

  abstract getBalance(
    request: IGetBalanceRequest,
  ): Promise<IGetBalanceResponse>;

  abstract updateBalance(request: IUpdateBalanceRequest): Promise<void>;
}

export interface IListAllResponse {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  saldo: number;
  plano: boolean;
}
export interface IGetBalanceRequest {
  id: string;
}
export interface IGetBalanceResponse {
  saldo: number;
}

export interface IUpdateBalanceRequest {
  saldo: number;
  id: string;
}
