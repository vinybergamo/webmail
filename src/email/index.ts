import { AddressObject, simpleParser, HeaderLines, Headers } from "mailparser";
import * as fs from "fs";

export class Email {
  constructor(
    public from: string | undefined,
    public to: AddressObject | Array<AddressObject> | undefined,
    public subject: string | undefined,
    public text: string | undefined,
    public html: string | false,
    public attachments: Array<any> | undefined,
    public headerLines: HeaderLines | undefined,
    public headers: Headers | undefined,
    public bcc: AddressObject | Array<AddressObject> | undefined,
    public cc: AddressObject | Array<AddressObject> | undefined,
    public inReplyTo: string | undefined,
    public messageId: string | undefined,
    public priority: "normal" | "high" | "low" | undefined,
    public references: Array<string> | string | undefined,
    public replyTo: AddressObject | Array<AddressObject> | undefined,
    public textAsHtml: string | undefined,
    public date: Date | undefined,
    public links?: Array<String> | undefined
  ) {}

  static async parse(data: Buffer): Promise<Email> {
    const parsed = await simpleParser(data);
    const {
      from,
      to,
      subject,
      text,
      date,
      attachments,
      headerLines,
      headers,
      html,
      bcc,
      cc,
      inReplyTo,
      messageId,
      priority,
      references,
      replyTo,
      textAsHtml,
    } = parsed;

    const email = await new Email(
      from?.text,
      to,
      subject,
      text,
      html,
      attachments,
      headerLines,
      headers,
      bcc,
      cc,
      inReplyTo,
      messageId,
      priority,
      references,
      replyTo,
      textAsHtml,
      date
    );

    const links = await this.downloadAttachments(email);

    return {
      ...email,
      links,
    };
  }

  static async downloadAttachments(
    email: Email
  ): Promise<Array<String> | undefined> {
    const links: Array<String> = [];

    if (email.attachments) {
      for (const attachment of email.attachments) {
        const filename = attachment.filename;

        if (!filename) return links;

        if (attachment.content) {
          const messageId = email.messageId?.replace(/[<>]/g, "").split("@")[0];

          const data = Buffer.from(attachment.content, "base64");

          fs.mkdirSync(`public/attachments/${messageId}`, { recursive: true });

          fs.writeFileSync(`public/${messageId}/${filename}`, data);
          const link = `http://localhost:3000/attachments/${messageId}/${filename}`;

          const linkExists = links.find((l) => l === link);

          if (!linkExists) links.push(link);

          return links;
        }
      }
    }
  }
}
