import { Service } from 'typedi';
import { Repository } from 'typeorm';

import dataSource from '@configs/ormconfig';
import { User } from '@db/entities/user.entity';

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
