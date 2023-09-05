export abstract class CustomerRepository {
  abstract create({
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
  }): Promise<void>;

  abstract get(telefone: string): Promise<Object>;
}
