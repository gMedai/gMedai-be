import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor() {
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION ?? 'us-east-1',
    });
  }

  getSdk() {
    return aws;
  }
}
