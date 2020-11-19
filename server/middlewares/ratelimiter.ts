// @ts-ignore
import * as rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
    max: 100,
    message: 'You have exceeded the 100 requests in 15 minutes limit!',
    headers: true,
});

export const mobCreateRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 10,
    message: 'You have exceeded the 10 requests in 24 hours limit!',
    headers: true,
});
