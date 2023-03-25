import { EmailClient } from "../src/email/email.client";
import imap from "imap";

describe("EmailClient", () => {
  const config: imap.Config = {
    user: process.env.EMAIL_USER as string,
    password: process.env.EMAIL_PASS as string,
    host: process.env.EMAIL_HOST_IMAP as string,
    port: Number(process.env.EMAIL_PORT_IMAP) || 993,
    tls: true,
  };

  it("should list all emails", async () => {
    const emailClient = new EmailClient(config);
    const emails = await emailClient.list();
    expect(emails).toBeInstanceOf(Array);
    expect(emails.length).toBeGreaterThan(0);
  });
});
