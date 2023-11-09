import { jwtEnv } from '@utils/environments';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = jwtEnv['JWT_KEY'];
const EXPIRATION_TIME = jwtEnv['EXPIRATION_TIME'];

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req['headers']['authorization'].split(' ')[1];
  if (!token) return res.status(401).send('Access denied, No token provided.');

  const user = verifyToken(token);
  if (!user) return res.status(401).send('Access denied, Invalid token.');

  req['user'] = user;

  next();
};

const verifyToken = (token: string): any | null => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
