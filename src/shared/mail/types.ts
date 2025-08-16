import { MailTemplate } from './enums';

export type ProductMail = {
  name: string;
  quantity: number;
  wish: string;
  price: number;
};

export type SendMailDto = {
  to: string;
  subject: string;
  htmlTemplate: MailTemplate;
};

export type SendProductMail = {
  products: ProductMail[];
  confirmUrl: string;
  orderNumber: number;
};

export type SendProductMailDto = {} & SendProductMail & SendMailDto;

export type SendEmailActivationToken = {
  token: string;
  email: string;
};

export type SendMfaCode = {
  code: string;
  email: string;
};

export type SendPasswordResetCode = {
  code: string;
  email: string;
};
