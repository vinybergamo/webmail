import { EmailClient } from "./email/email.client";
import { EmailService } from "./email/email.service";
import { createTransport } from "nodemailer";

async function main() {
  const emailClient = new EmailClient({
    user: process.env.EMAIL_USER as string,
    password: process.env.EMAIL_PASS as string,
    host: process.env.EMAIL_HOST_IMAP as string,
    port: Number(process.env.EMAIL_PORT_IMAP) || 993,
    tls: true,
  });

  const emails = await emailClient.list();
  console.log("Quantidade de emails: ", emails.length);
  console.log("Último email: ", emails[0]?.subject ?? "Nenhum email encotrado");

  const emailService = new EmailService(
    createTransport({
      host: process.env.EMAIL_HOST_SMTP as string,
      port: Number(process.env.EMAIL_PORT_SMTP) || 465,
      from: process.env.EMAIL_FROM as string,
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    })
  );

  const info = await emailService.send("", "Subject", "Text");

  console.log("Message sent: %s", info);
}

main().catch((error) => console.error(error));
