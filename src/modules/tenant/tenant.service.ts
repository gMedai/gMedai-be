import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Tenant from '@database/entities/Tenant';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
  ) {}

  create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const tenant = this.tenantRepo.create(createTenantDto);
    return this.tenantRepo.save(tenant);
  }

  findAll() {
    return this.tenantRepo.find();
  }

  findOne(id: string) {
    return this.tenantRepo.findOne({ where: { id } });
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return this.tenantRepo.update(id, updateTenantDto);
  }
}
