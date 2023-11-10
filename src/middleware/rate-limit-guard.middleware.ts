import rateLimit from 'express-rate-limit';

export const rateLimitGuard = (limit: number, windowMs: number) => {
  return rateLimit({
    windowMs,
    max: limit,
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
  });
};
