import { Request, Response, NextFunction } from 'express';

export const roleGuard = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req['user'];

    const hasRequiredRole = user && roles.includes(user['role']);
    if (!hasRequiredRole)
      return res.status(403).send('Access denied, Not Authorized To Do This.');

    next();
  };
};
