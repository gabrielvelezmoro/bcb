-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "saldo" INTEGER,
    "plano" BOOLEAN
);

CREATE TABLE "SMS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_remetente" INTEGER NOT NULL,
    "id_destinatario" INTEGER NOT NULL,
    "whatsapp" BOOLEAN NOT NULL,
    "texto" TEXT NOT NULL
);
