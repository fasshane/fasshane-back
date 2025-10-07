import { Prisma } from '@prisma/client';

export type FeedbackWithContact = Prisma.FeedbackGetPayload<{
  include: { contact: true };
}>;
