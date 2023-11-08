import 'module-alias/register';
import 'reflect-metadata';
import express from 'express';

import '@configs/ormconfig';
import { expressEnv } from '@utils/environments';

async function bootstrap() {
  const port = expressEnv['PORT'];
  const app = express();

  app.use(express.json());
  app.listen(port ?? 3000, () => {
    console.log('Server is listening on port 3000');
  });
}

bootstrap();
