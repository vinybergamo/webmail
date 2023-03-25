import imap from "imap";
import { Email } from "./";

export class EmailClient {
  constructor(private config: imap.Config) {}

  async list(): Promise<Array<Email>> {
    const imapClient = new imap(this.config);
    const emails: Array<Email> = [];

    await new Promise<void>((resolve, reject) => {
      imapClient.once("ready", () => {
        imapClient.openBox("INBOX", false, (error, box) => {
          if (error) reject(error);

          imapClient.search(["ALL"], (error, results) => {
            if (error) reject(error);

            const fetch = imapClient.fetch(results, {
              bodies: "",
              markSeen: true,
            });
            fetch.on("message", (msg) => {
              msg.on("body", async (stream) => {
                const data = await stream2Buffer(stream);
                const email = await Email.parse(data);
                emails.push(email);
              });
            });
            fetch.once("error", reject);
            fetch.once("end", () => {
              imapClient.end();
              resolve();
            });
          });
        });
      });
      imapClient.once("error", reject);
      imapClient.once("end", () => console.log("Connection ended"));
      imapClient.connect();
    });

    return emails;
  }
}

function stream2Buffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const buffers: Array<Buffer> = [];
    stream.on("data", (chunk) => buffers.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(buffers)));
    stream.on("error", reject);
  });
}
