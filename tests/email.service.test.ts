import { EmailService } from "../src/email/email.service";
import { createTransport } from "nodemailer";

describe("EmailService", () => {
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

  it("should send an email", async () => {
    const to = "vinybergamo@gmail.com";
    const subject = "Testando o envio de email";
    const text = "Este email foi enviado pelo Node.JS com Nodemailer e Jest";
    const info = await emailService.send(to, subject, text);
    expect(info).toBeDefined();
  });
});
