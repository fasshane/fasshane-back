import { SendProductMail } from './types';
import { LOGO_URL } from 'src/common/constans';

export function getHtmlSendOrderConfirmation({
  products,
  confirmUrl,
  orderNumber,
}: SendProductMail): string | null {
  if (!products.length) {
    return null;
  }
  const total = products.reduce((sum, p) => sum + p.price, 0);

  const rows = products
    .map(
      (p) => `
      <tr>
        <td style="border:1px solid #e2e6ee;padding:10px 8px;font-size:16px;color:#222;">${p.name}</td>
        <td style="border:1px solid #e2e6ee;padding:10px 8px;font-size:16px;color:#222;text-align:center;">${p.quantity}</td>
        <td style="border:1px solid #e2e6ee;padding:10px 8px;font-size:16px;color:#222;">${p.wish}</td>
        <td style="border:1px solid #e2e6ee;padding:10px 8px;font-size:16px;color:#222;white-space:nowrap;text-align:right;">${p.price} ₴</td>
      </tr>
    `,
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Замовлення від магазину</title>
  </head>
  <body style="background:#f7f7f9;margin:0;font-family:Arial,sans-serif;color:#222;">
    <div style="background:#fff;margin:0 auto;border-radius:12px;max-width:500px;width:100%;box-shadow:0 6px 20px rgba(0,0,0,0.07);padding:5vw 4vw 6vw 4vw;text-align:center;color:#222;">
      <div style="margin-bottom:20px;">
        <img src="${LOGO_URL}" alt="Logo" style="display:block;margin:0 auto;max-width:180px;width:100%;height:auto;">
      </div>

      <div style="background:#f0f4fa;color:#284a9e;padding:10px 0;font-weight:bold;border-radius:7px;margin-bottom:20px;font-size:18px;">
        Замовлення №${orderNumber}
      </div>

      <div style="font-size:17px;margin-bottom:18px;color:#222;line-height:1.5;">
        <b>Шановний постачальнику!</b><br/>
        Просимо підтвердити отримання нового замовлення.<br>
        Деталі замовлення нижче:
      </div>

      <div style="overflow-x:auto;width:100%;margin-bottom:18px;">
        <table style="border-collapse:collapse;width:100%;min-width:440px;">
          <thead>
            <tr>
              <th style="border:1px solid #e2e6ee;padding:10px 8px;font-size:16px;background:#f7f7fb;color:#222;text-align:left;">Назва</th>
              <th style="border:1px solid #e2e6ee;padding:10px 8px;font-size:16px;background:#f7f7fb;color:#222;text-align:center;">Кількість</th>
              <th style="border:1px solid #e2e6ee;padding:10px 8px;font-size:16px;background:#f7f7fb;color:#222;text-align:left;">Побажання</th>
              <th style="border:1px solid #e2e6ee;padding:10px 8px;font-size:16px;background:#f7f7fb;color:#222;text-align:right;">Ціна</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <div style="font-size:18px;font-weight:bold;text-align:right;margin-bottom:26px;color:#222;">
        Загальна сума:&nbsp;${total} ₴
      </div>

      <a href="${confirmUrl}" target="_blank"
        style="background:#1a7cff;color:#fff !important;font-size:18px;padding:16px 0;border-radius:8px;text-decoration:none;display:block;width:100%;max-width:360px;margin:0 auto 16px auto;transition:background 0.2s;font-weight:bold;box-shadow:0 2px 8px rgba(26,124,255,0.08);letter-spacing:0.5px;">
        Підтвердити замовлення
      </a>

      <div style="margin-top:22px;color:#9a9a9a;font-size:13px;line-height:1.6;">
        Якщо у вас виникли питання телефонуйте менеджеру за номером <a href="tel:+380501234567" style="color:#9a9a9a;text-decoration:underline;">+380501234567</a>.<br>
        Fasshane © 2025
      </div>
    </div>
  </body>
</html>
`;
}

export function getHtmlEmailActivation(
  activationUrl: string,
  userName?: string,
): string {
  return `
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Підтвердження електронної пошти</title>
  </head>
  <body style="background:#f7f7f9;margin:0;font-family:Arial,sans-serif;color:#222;">
    <div style="background:#fff;margin:0 auto;border-radius:12px;max-width:500px;width:100%;box-shadow:0 6px 20px rgba(0,0,0,0.07);padding:5vw 4vw 6vw 4vw;text-align:center;color:#222;">
      
      <div style="margin-bottom:24px;">
        <img src="${LOGO_URL}" alt="Logo" style="display:block;margin:0 auto;max-width:160px;width:100%;height:auto;">
      </div>

      <div style="font-size:20px;font-weight:bold;margin-bottom:14px;color:#1a1a1a;">
        Підтвердження вашої електронної пошти
      </div>

      <div style="font-size:16px;line-height:1.6;margin-bottom:26px;color:#333;">
        ${userName ? `<b>${userName},</b><br>` : ''}
        Дякуємо за реєстрацію! Щоб активувати акаунт, натисніть кнопку нижче.
      </div>

      <a href="${activationUrl}" target="_blank"
        style="background:#1a7cff;color:#fff !important;font-size:18px;padding:14px 0;border-radius:8px;text-decoration:none;display:block;width:100%;max-width:300px;margin:0 auto 20px auto;transition:background 0.2s;font-weight:bold;box-shadow:0 2px 8px rgba(26,124,255,0.08);letter-spacing:0.5px;">
        Активувати акаунт
      </a>

      <div style="margin-top:20px;color:#9a9a9a;font-size:13px;line-height:1.6;">
        Якщо ви не створювали обліковий запис, просто проігноруйте цей лист.<br>
        Посилання дійсне протягом 10 хвилин.<br>
        Fasshane © 2025
      </div>
    </div>
  </body>
</html>
`;
}

export function getHtmlMfaCode(code: string): string {
  return `
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Код підтвердження</title>
  </head>
  <body style="background:#f7f7f9;margin:0;font-family:Arial,sans-serif;color:#222;">
    <div style="background:#fff;margin:0 auto;border-radius:12px;max-width:500px;width:100%;box-shadow:0 6px 20px rgba(0,0,0,0.07);padding:5vw 4vw 6vw 4vw;text-align:center;color:#222;">
      
      <div style="margin-bottom:24px;">
        <img src="${LOGO_URL}" alt="Logo" style="display:block;margin:0 auto;max-width:160px;width:100%;height:auto;">
      </div>

      <div style="font-size:20px;font-weight:bold;margin-bottom:14px;color:#1a1a1a;">
        Ваш код для входу
      </div>

      <div style="font-size:16px;line-height:1.6;margin-bottom:26px;color:#333;">
        Щоб завершити вхід, введіть код нижче. Код дійсний протягом 10 хвилин.
      </div>

      <div style="font-size:28px;font-weight:bold;background:#f0f4fa;padding:16px 0;border-radius:10px;letter-spacing:6px;margin-bottom:20px;color:#1a1a1a;">
        ${code}
      </div>

      <div style="font-size:14px;color:#777;margin-top:12px;">
        Якщо ви не намагалися увійти, просто проігноруйте цей лист.<br>
        Fasshane © 2025
      </div>
    </div>
  </body>
</html>
`;
}

export function getHtmlPasswordResetCode(code: string): string {
  return `
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Код для відновлення пароля</title>
  </head>
  <body style="background:#f7f7f9;margin:0;font-family:Arial,sans-serif;color:#222;">
    <div style="background:#fff;margin:0 auto;border-radius:12px;max-width:500px;width:100%;box-shadow:0 6px 20px rgba(0,0,0,0.07);padding:5vw 4vw 6vw 4vw;text-align:center;color:#222;">
      
      <div style="margin-bottom:24px;">
        <img src="${LOGO_URL}" alt="Logo" style="display:block;margin:0 auto;max-width:160px;width:100%;height:auto;">
      </div>

      <div style="font-size:20px;font-weight:bold;margin-bottom:14px;color:#1a1a1a;">
        Код для відновлення пароля
      </div>

      <div style="font-size:16px;line-height:1.6;margin-bottom:26px;color:#333;">
        Щоб скинути пароль, введіть код підтвердження нижче.<br />
        Код дійсний протягом 10 хвилин.
      </div>

      <div style="font-size:28px;font-weight:bold;background:#f0f4fa;padding:16px 0;border-radius:10px;letter-spacing:6px;margin-bottom:20px;color:#1a1a1a;">
        ${code}
      </div>

      <div style="font-size:14px;color:#777;margin-top:12px;">
        Якщо ви не запитували відновлення пароля, просто проігноруйте цей лист.<br>
        Fasshane © 2025
      </div>
    </div>
  </body>
</html>
`;
}
