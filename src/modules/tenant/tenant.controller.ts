import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from '@modules/role/dto/create-role.dto';
import { RoleService } from '@modules/role/role.service';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly roleService: RoleService,
  ) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Post(':id/role')
  createRole(
    @Param('id') tenantId: string,
    @Body() createRoleDto: Omit<CreateRoleDto, 'tenantId'>,
  ) {
    return this.roleService.create({ ...createRoleDto, tenantId });
  }

  @Get(':id/role')
  findAllRoles(@Param('id') tenantId: string) {
    return this.roleService.findAll(tenantId);
  }
}
