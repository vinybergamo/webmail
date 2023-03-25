import { Transporter } from "nodemailer";

export class EmailService {
  constructor(private transport: Transporter) {}

  async send(to: string, subject: string, text: string): Promise<string> {
    const info = await this.transport.sendMail({
      from: this.transport.options.from,
      to,
      subject,
      text,
    });
    return info.messageId;
  }
}
