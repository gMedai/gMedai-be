import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { createHmac } from 'crypto';
import { CognitoService } from './cognito/cognito.service';
import { ConfirmCodeDto, LoginDto, SignupDto, resendCodeDto } from './dto';

@Injectable()
export class AuthService {
  private cognito = this.cognitoService.getCognito();

  constructor(private readonly cognitoService: CognitoService) {}

  async login(body: LoginDto) {
    const secretHash = createHmac(
      'SHA256',
      process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_SECRET ?? '',
    )
      .update(body.username + process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_ID)
      .digest('base64');

    const params: CognitoIdentityServiceProvider.Types.InitiateAuthRequest = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_ID ?? '',
      AuthParameters: {
        USERNAME: body.username,
        PASSWORD: body.password,
        SECRET_HASH: secretHash,
      },
    };
    try {
      const data = await this.cognito.initiateAuth(params).promise();
      if (data.AuthenticationResult?.AccessToken) {
        return { token: data.AuthenticationResult?.AccessToken ?? '' };
      } else {
        return { session: data?.Session ?? '' };
      }
    } catch (err) {
      throw new HttpException(
        `Error handling login: ${err}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async signup(body: SignupDto) {
    const secretHash = createHmac(
      'SHA256',
      process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_SECRET ?? '',
    )
      .update(body.username + process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_ID)
      .digest('base64');

    const params: CognitoIdentityServiceProvider.Types.SignUpRequest = {
      ClientId: process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_ID ?? '',
      SecretHash: secretHash,
      Username: body.username,
      Password: body.password,
      UserAttributes: [
        { Name: 'email', Value: body.email },
        { Name: 'name', Value: body.name },
        { Name: 'phone_number', Value: body.phoneNumber },
      ],
    };
    try {
      const data = await this.cognito.signUp(params).promise();
      return data;
    } catch (err) {
      throw new HttpException(
        `Error handling signup: ${err}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async confirmCode(body: ConfirmCodeDto) {
    const secretHash = createHmac(
      'SHA256',
      process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_SECRET ?? '',
    )
      .update(body.username + process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_ID)
      .digest('base64');
    const params: CognitoIdentityServiceProvider.Types.ConfirmSignUpRequest = {
      ClientId: process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_ID ?? '',
      SecretHash: secretHash,
      Username: body.username,
      ConfirmationCode: body.code,
    };
    console.log(body);
    try {
      const data = await this.cognito.confirmSignUp(params).promise();
      return data;
    } catch (err) {
      throw new HttpException(
        `Error handling confirm code: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async resendCode(body: resendCodeDto) {
    const secretHash = createHmac(
      'SHA256',
      process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_SECRET ?? '',
    )
      .update(body.username + process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_ID)
      .digest('base64');

    const params: CognitoIdentityServiceProvider.Types.ResendConfirmationCodeRequest =
      {
        ClientId: process.env.AWS_COGNITO_USER_POOL_CLIENT_APP_ID ?? '',
        SecretHash: secretHash,
        Username: body.username,
      };
    try {
      const data = await this.cognito.resendConfirmationCode(params).promise();
      return data;
    } catch (err) {
      throw new HttpException(
        `Error handling resend code: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
