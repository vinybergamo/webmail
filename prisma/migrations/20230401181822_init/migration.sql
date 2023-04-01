-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Smtp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "pass" TEXT NOT NULL,
    "ssl_tls" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Smtp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Imap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "pass" TEXT NOT NULL,
    "ssl_tls" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Imap_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Smtp_user_id_key" ON "Smtp"("user_id");
