import { Inject, Injectable } from "@nestjs/common";
import { exit } from "process";
import { CONFIG_OPTIONS } from "src/common/common.constants";
import { EmailVar, MailModuleOptions } from "./mail.interfaces";


@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options : MailModuleOptions
    ){}

    async sendEmail(subject:string, content:string, emailVars: EmailVar[]) {
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(this.options.apiKey)

        const name  = emailVars[0].value;
        const to    = emailVars[1].value;
        const code  = emailVars[2].value;

        const msg = {
            to:             to,
            from:           this.options.fromEmail,
            templateId:     this.options.templateId,
            dynamic_template_data: {
                name: name,
                code: code
            }
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    }

    sendVerificationEmail(name: string, email: string, code: string) {
        this.sendEmail('Verify Your Email', 'verify-email',[
            { key: 'name', value: name },
            { key: 'email', value: email },
            { key: 'code', value: code },
        ]);
    }
}