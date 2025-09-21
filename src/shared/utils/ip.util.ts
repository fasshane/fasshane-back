import { Request } from 'express';

export function getClientIp(req: Request): string {
  const h = req.headers;
  return (
    (h['cf-connecting-ip'] as string) ||
    (h['x-real-ip'] as string) ||
    (h['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    ''
  );
}
