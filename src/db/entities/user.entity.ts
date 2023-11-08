import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';

import { CustomEntity } from '@db/entities/abstraction/customEntity';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterInsert()
  logInsert() {
    console.log('[Entities]: [User], Finish Inserting User', this);
  }
}
