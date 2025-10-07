import { ConflictException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { getClientIp, makePeriodKey, sha256 } from 'src/shared/utils';
import { CreateFeedbackDto, FeedbackResponseDto } from './dto';
import { PrismaService } from 'nestjs-prisma';
import { UpdateFeedbackDto } from './dto/update-status-feedback.dto.request';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFeedbackDto, req: Request) {
    const periodKey = makePeriodKey('week');

    const ip = getClientIp(req);
    const ipHash = sha256(ip);
    const ua = String(req.headers['user-agent'] || '');
    const uaHash = sha256(ua);

    try {
      return await this.prisma.feedback.create({
        data: {
          ratingFood: dto.ratingFood,
          ratingService: dto.ratingService,
          comment: dto.comment,
          periodKey,
          visitorId: dto.visitorId ?? null,
          deviceHash: dto.deviceHash ?? null,
          ipHash,
          uaHash,
          contact: {
            connectOrCreate: {
              where: dto.contact.phoneE164
                ? { phoneE164: dto.contact.phoneE164 }
                : dto.contact.email
                  ? { email: dto.contact.email }
                  : { id: '___no___' },
              create: {
                name: dto.contact.name,
                email: dto.contact.email,
                phoneE164: dto.contact.phoneE164,
                phoneRegion: dto.contact.phoneRegion,
              },
            },
          },
        },
      });
    } catch (e: any) {
      if (e?.code === 'P2002')
        throw new ConflictException('Ви вже залишали відгук у цей період.');
      throw e;
    }
  }

  async getAll(): Promise<FeedbackResponseDto[]> {
    const feedbacks = await this.prisma.feedback.findMany({
      include: { contact: true },
    });
    return FeedbackResponseDto.mappingFromDto(feedbacks);
  }

  async updateStatus(dto: UpdateFeedbackDto) {
    const feedback = await this.prisma.feedback.update({
      where: { id: dto.feedbackId },
      data: { status: dto.status },
      include: { contact: true },
    });

    return FeedbackResponseDto.fromDtoToResponseDto(feedback);
  }
}
