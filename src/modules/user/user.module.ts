import User from '@database/entities/User';
import { CognitoService } from '@modules/auth/cognito/cognito.service';
import { RoleService } from '@modules/role/role.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import Role from '@database/entities/Role';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
  controllers: [UserController],
  providers: [UserService, CognitoService, RoleService],
})
export class UserModule {}
