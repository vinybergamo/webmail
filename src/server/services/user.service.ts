import { Request, Response } from "express";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "../../utils/prismaClient";
import { encrypt } from "../../utils/encryption";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface IUserService {
  register: (req: Request, res: Response) => Promise<Response>;
  login: (req: Request, res: Response) => Promise<Response>;
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

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({
        message: "Invalid password",
      });

    const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  }
}

export default new UserService();
