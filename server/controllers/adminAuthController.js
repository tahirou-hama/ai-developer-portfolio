
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body ?? {};

        if (
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.'
            });
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;
        const jwtSecret = process.env.JWT_SECRET;

        if (!adminEmail || !passwordHash || !jwtSecret) {
            console.error('Admin authentication environment is incomplete.');

            return res.status(500).json({
                success: false,
                message: 'Admin authentication is not configured.'
            });
        }

        const emailMatches =
            email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

        // Always perform a password-hash comparison, even for an
        // incorrect email, to reduce timing differences.
        const hashToCheck = emailMatches
            ? passwordHash
            : await bcrypt.hash(password, 12);

        const passwordMatches = await bcrypt.compare(password, hashToCheck);

        if (!emailMatches || !passwordMatches) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const token = jwt.sign(
            {
                role: 'admin',
                email: adminEmail
            },
            jwtSecret,
            {
                subject: 'portfolio-admin',
                expiresIn: '1h',
                issuer: 'ai-developer-portfolio',
                audience: 'portfolio-admin'
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            admin: {
                email: adminEmail
            }
        });
    } catch (error) {
        console.error('Admin login error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Unable to log in at this time.'
        });
    }
}


export function getCurrentAdmin(req, res) {
    return res.status(200).json({
        success: true,
        admin: {
            email: req.admin.email,
            role: req.admin.role
        }
    });
}
