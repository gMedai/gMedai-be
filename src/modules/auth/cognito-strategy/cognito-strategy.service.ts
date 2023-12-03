import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as express from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { CognitoService } from '../cognito/cognito.service';

@Injectable()
export class CognitoStrategyService extends PassportStrategy(
  Strategy,
  'cognito',
) {
  private cognito = this.cognitoService.getCognito();

  constructor(private readonly cognitoService: CognitoService) {
    super();
  }

  async authenticate(request: express.Request, options?: any) {
    const token = this.extractBearerToken(request);
    const params = {
      AccessToken: token,
    };

    try {
      const data = await this.cognito.getUser(params).promise();
      const getAttributeValue = (data: any, attributeName: string): string => {
        const attribute = data.UserAttributes.find(
          (attr: any) => attr.Name === attributeName,
        );
        return attribute?.Value ?? '';
      };
      console.log(data);
      this.success({
        username: data.Username,
        sub: getAttributeValue(data, 'sub'),
        name: getAttributeValue(data, 'name'),
        phoneNumber: getAttributeValue(data, 'phone_number'),
        email: getAttributeValue(data, 'email'),
      });
    } catch (err) {
      throw new HttpException(
        `Error authenticating: ${err}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  extractBearerToken(request: any): string | null {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return null; // No Authorization header found
    }

    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer.toLowerCase() !== 'bearer' || !token) {
      return null; // Invalid Authorization header format
    }
    return token;
  }
}
