export interface MailModuleOptions {
    apiKey: string;
    fromEmail: string;
    templateId: string;
}

export interface EmailVar {
    key: string;
    value: string;
}