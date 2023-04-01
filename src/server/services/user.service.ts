import { Request, Response } from "express";
import { hashSync, genSaltSync } from "bcrypt";
import prisma from "../../utils/prismaClient";
import { decrypt, encrypt } from "../../utils/encryption";

export interface IUserService {
  register: (req: Request, res: Response) => Promise<Response>;
}

class UserService implements IUserService {
  async register(req: Request, res: Response) {
    const { name, email, password, smtp, imap } = req.body;

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    const smtpEncryptedPassword = encrypt(smtp.pass);
    const imapEncryptedPassword = encrypt(imap.pass);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        Imap: {
          create: {
            ...imap,
            pass: imapEncryptedPassword,
          },
        },
        Smtp: {
          create: {
            ...smtp,
            pass: smtpEncryptedPassword,
          },
        },
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        ...user,
        password: undefined,
      },
    });
  }
}

export default new UserService();
