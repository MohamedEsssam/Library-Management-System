import dataSource from '@configs/ormconfig';
import { Role } from '@db/entities/role.entity';
import { Roles } from '@enums/roles.enum';

export const runRolesSeed = async () => {
  const admin = dataSource.getRepository(Role).create({ name: Roles.ADMIN });
  const borrower = dataSource
    .getRepository(Role)
    .create({ name: Roles.BORROWER });

  return dataSource
    .getRepository(Role)
    .createQueryBuilder()
    .insert()
    .into(Role)
    .values([admin, borrower])
    .orIgnore(`("name") DO NOTHING`)
    .execute();
};
