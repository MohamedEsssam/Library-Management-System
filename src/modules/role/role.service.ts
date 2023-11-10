import { Service } from 'typedi';

import { Roles } from '@enums/roles.enum';
import { RoleRepository } from '@modules/role/role.repository';

@Service()
export class RoleService {
  constructor(private roleRepo: RoleRepository) {}
  async getRoleByName(role: Roles) {
    return this.roleRepo.getRoleByName(role);
  }
}
