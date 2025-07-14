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
