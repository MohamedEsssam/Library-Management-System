// ormconfig.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { resolve } from 'path';

import { dbEnv } from '@utils/environments';
import { entities } from '@db/entities';

const typeormEnv = dbEnv;
export const dbConfigs: DataSourceOptions = {
  type: 'postgres',
  host: typeormEnv.DB_HOSTNAME,
  port: parseInt(typeormEnv.DB_PORT),
  username: typeormEnv.DB_USER_NAME,
  password: typeormEnv.DB_PASSWORD,
  database: typeormEnv.DB_NAME,
  synchronize: false,
  migrationsRun: true,
  logging: true,
  entities,
  // migrations: [resolve(__dirname, '../db/migrations/*.ts')],
};

const dataSource = new DataSource(dbConfigs);
dataSource.initialize();

export default dataSource;
