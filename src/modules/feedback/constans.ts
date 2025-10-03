import { FeedbackStatus } from '@prisma/client';

export const FEEDBACK_STATUS_UA: Record<FeedbackStatus, string> = {
  UNTRIAGED: 'Не розглянуто',
  NEEDS_MORE_INFO: 'Потрібна інформація',
  IN_BACKLOG: 'У беклозі',
  IN_PROGRESS: 'У роботі',
  RESOLVED: 'Вирішено',
  WONT_FIX: 'Не виправлятиметься',
  DUPLICATE: 'Дублікат',
};

export const FEEDBACK_STATUS_HINT_UA: Record<FeedbackStatus, string> = {
  UNTRIAGED: 'Ще не класифіковано модератором/менеджером',
  NEEDS_MORE_INFO: 'Попросіть автора додати деталі або приклади',
  IN_BACKLOG: 'Поставлено в чергу на подальшу роботу',
  IN_PROGRESS: 'Над завданням вже працюють',
  RESOLVED: 'Проблему вирішено / ідею реалізовано',
  WONT_FIX: 'Свідоме рішення не робити змін',
  DUPLICATE: 'Поєднати з існуючим зверненням',
};
