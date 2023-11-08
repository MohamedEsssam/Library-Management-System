import 'reflect-metadata';
import express from 'express';

const app = express();
app.use(express.json());

async function bootstrap() {
  app.listen(3000, () => {
    console.log('Express server listening on port 3000');
  });
}

bootstrap();
