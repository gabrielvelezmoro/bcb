-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "cpf" TEXT NOT NULL UNIQUE,
    "saldo" INTEGER,
    "plano" BOOLEAN
);

CREATE TABLE "Sms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_remetente" TEXT NOT NULL,
    "id_destinatario" TEXT NOT NULL,
    "whatsapp" BOOLEAN NOT NULL,
    "texto" TEXT NOT NULL
);
