import Role from '@database/entities/Role';
import User from '@database/entities/User';
import { RoleService } from '@modules/role/role.service';
import { UserService } from '@modules/user/user.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AwsService } from './aws/aws.service';
import { CognitoStrategyService } from './cognito-strategy/cognito-strategy.service';
import { CognitoService } from './cognito/cognito.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'cognito' }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CognitoService,
    AwsService,
    CognitoStrategyService,
    UserService,
    RoleService,
  ],
})
export class AuthModule {}
