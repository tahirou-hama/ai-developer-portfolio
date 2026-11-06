
import express from 'express';
import cors from 'cors';

import contactRoutes from './routes/contactRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import adminMessagesRoutes from './routes/adminMessagesRoutes.js';

import {
    contactRateLimiter
} from './middleware/publicRateLimiter.js';

const app = express();

const configuredOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(origin => origin.trim()).filter(Boolean)
    : [];

const allowedOrigins = [
    ...new Set([
        ...configuredOrigins,
        ...(process.env.NODE_ENV !== 'production'
            ? ['http://localhost:5173']
            : [])
    ])
];

app.use(
    cors({
        origin: allowedOrigins
    })
);

app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Portfolio API is running.'
    });
});

app.use('/api/contact', contactRateLimiter, contactRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/messages', adminMessagesRoutes);

export default app;
