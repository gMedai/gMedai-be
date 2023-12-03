import User from '@database/entities/User';
import { CognitoService } from '@modules/auth/cognito/cognito.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '@modules/role/role.service';

@Injectable()
export class UserService {
  private cognito = this.cognitoService.getCognito();

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private roleService: RoleService,
    private readonly cognitoService: CognitoService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findAll() {
    const params: CognitoIdentityServiceProvider.Types.ListUsersRequest = {
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID ?? '',
    };
    const { Users } = await this.cognito.listUsers(params).promise();
    if (!Users) {
      return [];
    }
    const users = await Promise.all(
      Users.map(async (user) => {
        const { Attributes } = user;
        if (Attributes) {
          const transformedData = _.keyBy(Attributes, 'Name');
          const resolvedAttr = _.mapValues(transformedData, 'Value');
          const dbUser = await this.userRepo.findOne({
            where: { username: user.Username },
            relations: ['roles'],
          });
          return { ...resolvedAttr, ...dbUser };
        }
      }),
    );
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles'],
    });
    const params: CognitoIdentityServiceProvider.Types.AdminGetUserRequest = {
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID ?? '',
      Username: user.username,
    };
    const { UserAttributes } = await this.cognito
      .adminGetUser(params)
      .promise();
    const transformedData = _.keyBy(UserAttributes, 'Name');
    const resolvedAttr = _.mapValues(transformedData, 'Value');
    return { ...user, ...resolvedAttr };
  }

  async addRole(id: string, roleId: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (user === null) {
      throw new HttpException(`No user found`, HttpStatus.NOT_FOUND);
    }
    const role = await this.roleService.findOne(roleId);
    if (role === null) {
      throw new HttpException(`No role found`, HttpStatus.NOT_FOUND);
    }
    user.roles = user.roles ?? [];
    user.roles.push(role);
    await this.userRepo.save(user);
    return user;
  }

  async removeRole(id: string, roleId: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (user === null) {
      throw new HttpException(`No user found`, HttpStatus.NOT_FOUND);
    }
    const role = await this.roleService.findOne(roleId);
    if (role === null) {
      throw new HttpException(`No role found`, HttpStatus.NOT_FOUND);
    }
    user.roles = (user.roles ?? []).filter((r) => r.id !== role.id);
    await this.userRepo.save(user);
    return user;
  }
}
