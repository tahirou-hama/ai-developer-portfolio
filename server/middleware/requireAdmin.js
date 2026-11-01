
import jwt from 'jsonwebtoken';

export function requireAdmin(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Authentication is required.'
        });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication is required.'
        });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error('JWT_SECRET is not configured.');

        return res.status(500).json({
            success: false,
            message: 'Authentication is not configured.'
        });
    }

    try {
        const payload = jwt.verify(token, jwtSecret, {
            issuer: 'ai-developer-portfolio',
            audience: 'portfolio-admin',
            subject: 'portfolio-admin'
        });

        if (payload.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Administrator access is required.'
            });
        }

        req.admin = {
            email: payload.email,
            role: payload.role
        };

        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: 'Your session is invalid or has expired. Please log in again.'
        });
    }
}
