import Tenant from '@database/entities/Tenant';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import Role from '@database/entities/Role';
import { RoleService } from '@modules/role/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [TenantController],
  providers: [TenantService, RoleService],
})
export class TenantModule {}
