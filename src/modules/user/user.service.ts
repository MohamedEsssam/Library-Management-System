import { Service } from 'typedi';
import { compareSync } from 'bcrypt';

import { User } from '@db/entities/user.entity';
import { UserRepository } from '@modules/user/user.repository';
import { RoleService } from '@modules/role/role.service';
import { AuthService } from '@modules/auth/auth.service';
import { Roles } from '@enums/roles.enum';
import { CustomError } from '@utils/custom-error';
import { NotFoundError } from 'routing-controllers';

@Service()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private roleService: RoleService,
    private authService: AuthService,
  ) {}

  async createUser(user: Partial<User>, userRole = Roles.BORROWER) {
    const existedUser = await this.userRepo.getUserByEmail(user['email']);
    if (existedUser)
      throw new CustomError(
        `user with email: ${user['email']} already exist`,
        409,
        'Conflict',
      );

    const role = await this.roleService.getRoleByName(userRole);
    console.log(role);

    user['role'] = role;
    const createdUser = await this.userRepo.createUser(user);
    const token = this.authService.generateToken({
      id: createdUser['id'],
      email: createdUser['email'],
      role: role['name'],
    });

    return token;
  }

  async login(email: string, password: string) {
    const existedUser = await this.userRepo.getUserByEmail(email);
    if (
      !(existedUser && this.verifyPassword(password, existedUser['password']))
    )
      throw new NotFoundError(`user with email: ${email} not exist`);

    const token = this.authService.generateToken({
      id: existedUser['id'],
      email: existedUser['email'],
      role: existedUser['role']['name'],
    });
    return token;
  }

  async getUserById(userId: string) {
    return this.userRepo.getUserById(userId);
  }

  async getUserByEmail(email: string) {
    return this.userRepo.getUserByEmail(email);
  }

  async getBorrowers() {
    return this.userRepo.getBorrowers();
  }

  async updateUser(userId: string, updatedUser: Partial<User>) {
    return this.userRepo.updateUser(userId, updatedUser);
  }

  async deleteUser(userId: string) {
    return this.userRepo.deleteUser(userId);
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
  }
}
