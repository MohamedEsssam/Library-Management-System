import { Service } from 'typedi';
import { Repository } from 'typeorm';

import { User } from '@db/entities/user.entity';
import dataSource from '@configs/ormconfig';

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
}
