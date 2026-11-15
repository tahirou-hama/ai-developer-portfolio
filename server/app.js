import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import contactRoutes from './routes/contactRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import adminMessagesRoutes from './routes/adminMessagesRoutes.js';

import {
    contactRateLimiter
} from './middleware/publicRateLimiter.js';

const app = express();

app.use(helmet());

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
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204
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

// Handle unknown API endpoints.
app.use('/api', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint not found.'
    });
});


// Centralized error handler.
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    if (error.type === 'entity.parse.failed') {
        console.error('Invalid JSON request body:', error.message);

        return res.status(400).json({
            success: false,
            message: 'Invalid JSON request body.'
        });
    }

    if (error.type === 'entity.too.large') {
        console.warn('Request body exceeded the 20 KB limit.');

        return res.status(413).json({
            success: false,
            message: 'Request body is too large.'
        });
    }

    console.error(
        'Unhandled application error:',
        error.stack || error.message
    );

    return res.status(500).json({
        success: false,
        message: 'An unexpected server error occurred.'
    });
});

export default app;
