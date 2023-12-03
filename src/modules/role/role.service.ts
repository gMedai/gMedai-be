import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Role from '@database/entities/Role';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepo.create(createRoleDto);
    return this.roleRepo.save(role);
  }

  findAll(tenantId: string) {
    return this.roleRepo.find({ where: { tenantId } });
  }

  findOne(id: string) {
    return this.roleRepo.findOne({ where: { id } });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleRepo.update(id, updateRoleDto);
  }

  remove(id: string) {
    return this.roleRepo.delete(id);
  }
}
