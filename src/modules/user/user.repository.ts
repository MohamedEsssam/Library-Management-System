import { Service } from 'typedi';
import { Repository } from 'typeorm';

import dataSource from '@configs/ormconfig';
import { User } from '@db/entities/user.entity';
import { Roles } from '@enums/roles.enum';

@Service()
export class UserRepository {
  private readonly userRepo: Repository<User>;
  constructor() {
    this.userRepo = dataSource.getRepository(User);
  }
  async createUser(user: Partial<User>) {
    const userToBeCreate = this.userRepo.create(user);

    return this.userRepo.save(userToBeCreate);
  }

  async getUserById(userId: string) {
    return this.userRepo.findOneBy({ id: userId });
  }

  async getUserByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async getBorrowers() {
    return this.userRepo.findOneBy({ role: { name: Roles.BORROWER } });
  }

  async updateUser(userId: string, updatedUser: Partial<User>) {
    return this.userRepo.update(userId, updatedUser);
  }

  async deleteUser(userId: string) {
    return this.userRepo.delete(userId);
  }
}
