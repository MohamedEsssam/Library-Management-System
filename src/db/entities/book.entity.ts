import { AfterInsert, Column, Entity, Index } from 'typeorm';

import { CustomEntity } from '@db/entities/abstraction/customEntity';

@Entity('book')
export class Book extends CustomEntity {
  @Index()
  @Column({ unique: true })
  title: string;

  @Index()
  @Column()
  author: string;

  @Index()
  @Column({ unique: true })
  isbn: string;

  @Column()
  availableQuantity: number;

  @Column()
  shelfLocation: string;

  @AfterInsert()
  logInsert() {
    console.log('[Entities]: [Book], Finish Inserting Book', this);
  }
}
