import { FeedbackContact, FeedbackStatus } from '@prisma/client';
import { FEEDBACK_STATUS_HINT_UA, FEEDBACK_STATUS_UA } from '../constans';
import { FeedbackWithContact } from 'src/common/types';

export class FeedbackResponseDto {
  id: string;
  ratingFood: number;
  ratingService: number;
  comment: string;
  status: FeedbackStatus;
  statusText: string;
  statusDescription: string;
  contact: {
    id: string;
    name: string;
    email: string;
    phoneE164: string;
  };
  createdAt: Date;
  updatedAt: Date;

  static fromDtoToResponseDto(dto: FeedbackWithContact): FeedbackResponseDto {
    const { id, name, email, phoneE164 } = dto.contact as FeedbackContact;
    return {
      id: dto.id,
      ratingFood: dto.ratingFood,
      ratingService: dto.ratingService,
      comment: dto.comment || 'Без коментаря',
      status: dto.status,
      statusText: FEEDBACK_STATUS_UA[dto.status],
      statusDescription: FEEDBACK_STATUS_HINT_UA[dto.status],
      contact: {
        id,
        name: name || 'Анонім',
        email: email || 'Email не вказано',
        phoneE164,
      },
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }

  static mappingFromDto(dtos: FeedbackWithContact[]): FeedbackResponseDto[] {
    return dtos.map((dto) => this.fromDtoToResponseDto(dto));
  }
}
