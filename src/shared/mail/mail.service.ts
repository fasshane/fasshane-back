import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from '../../config';
import {
  SendEmailActivationToken,
  SendMfaCode,
  SendPasswordResetCode,
  SendProductMailDto,
} from './types';
import {
  getHtmlEmailActivation,
  getHtmlMfaCode,
  getHtmlPasswordResetCode,
  getHtmlSendOrderConfirmation,
} from './html-templates';

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

  async sendEmailActivationToken({ token, email }: SendEmailActivationToken) {
    await this.transporter.sendMail({
      from: `"Fasshane" <${env.EMAIL_USER}>`,
      to: email,
      subject: 'Підтвердження електронної пошти',
      html: getHtmlEmailActivation(
        `${env.FRONTEND_URL}/auth/verify-email?token=${token}`,
      ),
    });
  }

  async sendMfaCode({ code, email }: SendMfaCode) {
    await this.transporter.sendMail({
      from: `"Fasshane" <${env.EMAIL_USER}>`,
      to: email,
      subject: 'Ваш код підтвердження',
      html: getHtmlMfaCode(code),
    });
  }

  async sendPasswordResetCode({ code, email }: SendPasswordResetCode) {
    await this.transporter.sendMail({
      from: `"Fasshane" <${env.EMAIL_USER}>`,
      to: email,
      subject: 'Код для відновлення пароля',
      html: getHtmlPasswordResetCode(code),
    });
  }
}
