import { AddressObject, simpleParser } from "mailparser";

export class Email {
  constructor(
    public from: string | undefined,
    public to: AddressObject | Array<AddressObject> | undefined,
    public subject: string | undefined,
    public text: string | undefined,
    public date: Date | undefined
  ) {}

  static async parse(data: Buffer): Promise<Email> {
    const parsed = await simpleParser(data);
    const { from, to, subject, text, date } = parsed;

    return new Email(from?.text, to, subject, text, date);
  }
}
