import { Entity, Column, ManyToOne, AfterInsert } from 'typeorm';

import { Book } from '@db/entities/book.entity';
import { User } from '@db/entities/user.entity';
import { CustomEntity } from './abstraction/customEntity';

@Entity()
export class Borrowing extends CustomEntity {
  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => User)
  borrower: User;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  returned: boolean;

  @AfterInsert()
  logInsert() {
    console.log('[Entities]: [Borrowing], Finish Inserting Borrowing', this);
  }
}
