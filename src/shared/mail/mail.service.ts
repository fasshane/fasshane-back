import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from '../../config';
import { SendProductMailDto } from './types';
import { getHtmlSendOrderConfirmation } from './html-templates';

@Injectable()
export class MailService {
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMailToSupplier({
    to,
    subject,
    products,
    confirmUrl,
    orderNumber,
  }: SendProductMailDto) {
    const htmlTemplate = getHtmlSendOrderConfirmation({
      products,
      confirmUrl,
      orderNumber,
    });
    if (!htmlTemplate) {
      return false;
    }
    await this.transporter.sendMail({
      from: `"Fasshane" <${env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlTemplate,
    });
    return true;
  }
}
