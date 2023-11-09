import {
  AfterInsert,
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToOne,
} from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

import { CustomEntity } from '@db/entities/abstraction/customEntity';
import { Role } from '@db/entities/role.entity';

@Entity('user')
export class User extends CustomEntity {
  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true, nullable: false })
  role: Partial<Role>;

  @BeforeInsert()
  setPassword() {
    this.password = hashSync(this.password, genSaltSync(10));
  }

  @AfterInsert()
  logInsert() {
    console.log('[Entities]: [User], Finish Inserting User', this);
  }
}
