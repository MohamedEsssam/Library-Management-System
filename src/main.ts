import 'module-alias/register';
import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { join } from 'path';

import dataSource from '@configs/ormconfig';
import { expressEnv } from '@utils/environments';
import { authGuard } from '@middleware/auth-guard.middleware';
import { roleGuard } from '@middleware/role-guard.middleware';
import { rateLimitGuard } from '@middleware/rate-limit-guard.middleware';
import { runSeeds } from '@db/seeds';

async function bootstrap() {
  useContainer(Container);
  await dataSource.initialize();
  await runSeeds();
  const port = expressEnv['PORT'];
  const app = createExpressServer({
    routePrefix: '/api',
    controllers: [join(__dirname + '/modules/**/*.controller.ts')],
    middlewares: [authGuard, rateLimitGuard, roleGuard],
  });
  app.listen(port, () => {
    console.log('Server is listening on port 3000');
  });
}

bootstrap();
