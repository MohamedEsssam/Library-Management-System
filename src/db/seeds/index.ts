import { runRolesSeed } from '@db/seeds/role.seed';

export const runSeeds = async () => {
  await runRolesSeed();
};
