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
const email_client_1 = require("../src/email/email.client");
describe("EmailClient", () => {
    const config = {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS,
        host: process.env.EMAIL_HOST_IMAP,
        port: Number(process.env.EMAIL_PORT_IMAP) || 993,
        tls: true,
    };
    it("should list all emails", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailClient = new email_client_1.EmailClient(config);
        const emails = yield emailClient.list();
        expect(emails).toBeInstanceOf(Array);
        expect(emails.length).toBeGreaterThan(0);
    }));
});
