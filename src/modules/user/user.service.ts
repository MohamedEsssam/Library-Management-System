import { Service } from 'typedi';
import { compareSync } from 'bcrypt';

import { User } from '@db/entities/user.entity';
import { UserRepository } from '@modules/user/user.repository';
import { generateToken } from '@middleware/auth-guard.middleware';
import { Roles } from '@enums/roles.enum';
import { RoleService } from '@modules/role/role.service';

@Service()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private roleService: RoleService,
  ) {}

  async createUser(user: Partial<User>, userRole = Roles.BORROWER) {
    const existedUser = await this.userRepo.getUserByEmail(user['email']);
    if (existedUser)
      throw new Error(`user with email: ${user['email']} already exist`);

    const role = await this.roleService.getRoleByName(userRole);
    console.log(role);

    user['role'] = role;
    const createdUser = await this.userRepo.createUser(user);
    const token = generateToken({
      id: createdUser['id'],
      email: createdUser['email'],
      role: role['name'],
    });

    return token;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
  }
}
