import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = "4e98d60c079d18c705213a8f9ef7c52b";
// const key = "sdfjhsdfjshdjfhs".padEnd(32, "0");

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = (text: string): string => {
  const [ivString, encrypted] = text.split(":");
  const iv = Buffer.from(ivString, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
