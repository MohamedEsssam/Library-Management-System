import { Service } from 'typedi';
import { Repository } from 'typeorm';

import dataSource from '@configs/ormconfig';
import { User } from '@db/entities/user.entity';
import { Roles } from '@enums/roles.enum';

@Service()
export class UserRepository {
  private readonly repo: Repository<User>;
  constructor() {
    this.repo = dataSource.getRepository(User);
  }
  async createUser(user: Partial<User>) {
    const userToBeCreate = this.repo.create(user);

    return this.repo.save(userToBeCreate);
  }

  async getUserById(userId: string) {
    return this.repo.findOneBy({ id: userId });
  }

  async getUserByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async getBorrowers() {
    return this.repo.findOneBy({ role: { name: Roles.BORROWER } });
  }

  async updateUser(userId: string, updatedUser: Partial<User>) {
    return this.repo.update(userId, updatedUser);
  }

  async deleteUser(userId: string) {
    return this.repo.delete(userId);
  }
}
