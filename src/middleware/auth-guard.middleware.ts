import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { jwtEnv } from '@utils/environments';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req['headers']['authorization'].split(' ')[1];
  if (!token) return res.status(401).send('Access denied, No token provided.');

  const user = verifyToken(token);
  if (!user) return res.status(401).send('Access denied, Invalid token.');

  req['user'] = user;

  next();
};

const verifyToken = (token: string): any | null => {
  const SECRET_KEY = jwtEnv['JWT_KEY'];
  try {
    return verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
