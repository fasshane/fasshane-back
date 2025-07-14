import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Express } from 'express';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { env } from '../config';
import { getAwsUrl } from '../shared/utils';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly region: string;
  private readonly logger = new Logger(S3Service.name);

  constructor() {
    this.region = env.S3_REGION;
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    if (file.size > env.FILE_MAX_SIZE_MB * 1024 * 1024) {
      throw new BadRequestException('File size is too large');
    }
    const bucket = env.S3_BUCKET;
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    try {
      const response = await this.s3.send(new PutObjectCommand(input));
      if (response.$metadata.httpStatusCode === 200) {
        return getAwsUrl(key);
      }
    } catch (error) {
      this.logger.error('Error uploading file', error);
      throw error;
    }
    throw new BadRequestException('Cannot upload file');
  }

  async deleteFile(key: string): Promise<boolean> {
    const bucket = env.S3_BUCKET;
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      });
      const response = await this.s3.send(command);
      return [200, 204].includes(response.$metadata.httpStatusCode ?? 0);
    } catch (error) {
      this.logger.error('Error deleting file', error);
      throw new BadRequestException('Cannot delete file');
    }
  }
}
