import { Service } from 'typedi';
import { Repository } from 'typeorm';

import dataSource from '@configs/ormconfig';
import { Role } from '@db/entities/role.entity';
import { Roles } from '@enums/roles.enum';

@Service()
export class RoleRepository {
  private readonly roleRepo: Repository<Role>;
  constructor() {
    this.roleRepo = dataSource.getRepository(Role);
  }
  async getRoleByName(role: Roles) {
    return this.roleRepo.findOneBy({ name: role });
  }
}
