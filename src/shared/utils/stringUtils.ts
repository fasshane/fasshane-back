import { env } from 'src/config';

export function getAwsUrl(key: string): string {
  return `https://${env.S3_BUCKET}.s3.${env.S3_REGION}.amazonaws.com/${key}`;
}
