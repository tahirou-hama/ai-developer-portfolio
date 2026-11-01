
import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many contact form submissions. Please try again in 15 minutes.'
    }
});

export const aiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many AI requests. Please try again in 15 minutes.'
    }
});
