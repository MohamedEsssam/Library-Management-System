import 'module-alias/register';
import 'reflect-metadata';
import express from 'express';
import {
  createExpressServer,
  useContainer as rcUseContainer,
} from 'routing-controllers';
import { Container } from 'typedi';

import '@configs/ormconfig';
import { expressEnv } from '@utils/environments';
import { join } from 'path';

async function bootstrap() {
  rcUseContainer(Container);
  const port = expressEnv['PORT'];
  const app = createExpressServer({
    routePrefix: '/api',
    controllers: [join(__dirname + '/modules/**/*.controller.ts')],
  });
  app.listen(port ?? 3000, () => {
    console.log('Server is listening on port 3000');
  });
}

bootstrap();
