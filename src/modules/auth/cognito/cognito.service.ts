import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class CognitoService {
  private cognito: aws.CognitoIdentityServiceProvider;

  constructor() {
    this.cognito = new aws.CognitoIdentityServiceProvider();
  }

  getCognito() {
    return this.cognito;
  }
}
