"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_service_1 = require("../src/email/email.service");
const nodemailer_1 = require("nodemailer");
describe("EmailService", () => {
    const emailService = new email_service_1.EmailService((0, nodemailer_1.createTransport)({
        host: process.env.EMAIL_HOST_SMTP,
        port: Number(process.env.EMAIL_PORT_SMTP) || 465,
        from: process.env.EMAIL_FROM,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    }));
    it("should send an email", () => __awaiter(void 0, void 0, void 0, function* () {
        const to = "vinybergamo@gmail.com";
        const subject = "Testando o envio de email";
        const text = "Este email foi enviado pelo Node.JS com Nodemailer e Jest";
        const info = yield emailService.send(to, subject, text);
        expect(info).toBeDefined();
    }));
});
