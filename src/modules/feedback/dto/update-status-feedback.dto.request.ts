import { EnumDecorator, UuidDecorator } from '../../../common/decorator';
import { FeedbackStatus } from '@prisma/client';

export class UpdateFeedbackDto {
  @UuidDecorator()
  feedbackId: string;

  @EnumDecorator(FeedbackStatus)
  status: FeedbackStatus;
}
