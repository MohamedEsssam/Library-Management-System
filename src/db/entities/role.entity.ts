import { AfterInsert, Column, Entity, Index, OneToMany } from 'typeorm';

import { CustomEntity } from '@db/entities/abstraction/customEntity';
import { Roles } from '@enums/roles.enum';
import { User } from '@db/entities/user.entity';

@Entity('role')
export class Role extends CustomEntity {
  @Index()
  @Column({ unique: true, type: 'enum', enum: Roles, default: Roles.BORROWER })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @AfterInsert()
  logInsert() {
    console.log('[Entities]: [Role], Finish Inserting Role', this);
  }
}
