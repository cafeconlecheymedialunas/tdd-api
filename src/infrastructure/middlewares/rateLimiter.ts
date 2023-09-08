import rateLimiter from 'express-rate-limit';

export const limiter = rateLimiter({
  max: 5,
  windowMs: 10000, // 10 seconds
  message: "You can't make any more requests at the moment. Try again later",
});
