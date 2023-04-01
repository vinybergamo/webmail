"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Email = void 0;
const mailparser_1 = require("mailparser");
const fs = __importStar(require("fs"));
class Email {
    constructor(from, to, subject, text, html, attachments, headerLines, headers, bcc, cc, inReplyTo, messageId, priority, references, replyTo, textAsHtml, date, links) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
        this.attachments = attachments;
        this.headerLines = headerLines;
        this.headers = headers;
        this.bcc = bcc;
        this.cc = cc;
        this.inReplyTo = inReplyTo;
        this.messageId = messageId;
        this.priority = priority;
        this.references = references;
        this.replyTo = replyTo;
        this.textAsHtml = textAsHtml;
        this.date = date;
        this.links = links;
    }
    static parse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsed = yield (0, mailparser_1.simpleParser)(data);
            const { from, to, subject, text, date, attachments, headerLines, headers, html, bcc, cc, inReplyTo, messageId, priority, references, replyTo, textAsHtml, } = parsed;
            const email = yield new Email(from === null || from === void 0 ? void 0 : from.text, to, subject, text, html, attachments, headerLines, headers, bcc, cc, inReplyTo, messageId, priority, references, replyTo, textAsHtml, date);
            const links = yield this.downloadAttachments(email);
            return Object.assign(Object.assign({}, email), { links });
        });
    }
    static downloadAttachments(email) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const links = [];
            if (email.attachments) {
                for (const attachment of email.attachments) {
                    const filename = attachment.filename;
                    if (!filename)
                        return links;
                    if (attachment.content) {
                        const messageId = (_a = email.messageId) === null || _a === void 0 ? void 0 : _a.replace(/[<>]/g, "").split("@")[0];
                        const data = Buffer.from(attachment.content, "base64");
                        fs.mkdirSync(`public/attachments/${messageId}`, { recursive: true });
                        fs.writeFileSync(`public/${messageId}/${filename}`, data);
                        const link = `http://localhost:3000/attachments/${messageId}/${filename}`;
                        const linkExists = links.find((l) => l === link);
                        if (!linkExists)
                            links.push(link);
                        return links;
                    }
                }
            }
        });
    }
}
exports.Email = Email;
