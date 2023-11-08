import { Service } from 'typedi';
import { compareSync } from 'bcrypt';

import { User } from '@db/entities/user.entity';
import { UserRepository } from '@modules/user/user.repository';

@Service()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(user: Partial<User>) {
    return this.userRepo.createUser(user);
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
  }
}
