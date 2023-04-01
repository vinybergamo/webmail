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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailClient = void 0;
const imap_1 = __importDefault(require("imap"));
const _1 = require("./");
class EmailClient {
    constructor(config) {
        this.config = config;
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const imapClient = new imap_1.default(this.config);
            const emails = [];
            yield new Promise((resolve, reject) => {
                imapClient.once("ready", () => {
                    imapClient.openBox("INBOX", false, (error, box) => {
                        if (error)
                            reject(error);
                        imapClient.search(["ALL"], (error, results) => {
                            if (error)
                                reject(error);
                            const fetch = imapClient.fetch(results, {
                                bodies: "",
                                markSeen: true,
                            });
                            fetch.on("message", (msg) => {
                                msg.on("body", (stream) => __awaiter(this, void 0, void 0, function* () {
                                    const data = yield stream2Buffer(stream);
                                    const email = yield _1.Email.parse(data);
                                    emails.push(email);
                                }));
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
        });
    }
}
exports.EmailClient = EmailClient;
function stream2Buffer(stream) {
    return new Promise((resolve, reject) => {
        const buffers = [];
        stream.on("data", (chunk) => buffers.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(buffers)));
        stream.on("error", reject);
    });
}
