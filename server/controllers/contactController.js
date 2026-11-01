
import pool from '../config/db.js';
import { sendContactNotification } from '../services/emailService.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(req, res) {
    const { name, email, subject, message } = req.body ?? {};
    const fields = { name, email, subject, message };

    // Validate required fields.
    for (const [field, value] of Object.entries(fields)) {
        if (typeof value !== 'string' || !value.trim()) {
            return res.status(400).json({
                success: false,
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
            });
        }
    }

    // Remove unnecessary whitespace.
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    // Validate email format.
    if (!EMAIL_REGEX.test(cleanEmail)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    // Enforce database and application limits.
    if (
        cleanName.length > 100 ||
        cleanEmail.length > 254 ||
        cleanSubject.length > 150 ||
        cleanMessage.length > 5000
    ) {
        return res.status(400).json({
            success: false,
            message: 'One or more fields exceed the allowed length.'
        });
    }

    // Save the message to MySQL first.
    let insertResult;

    try {
        const [result] = await pool.execute(
            `INSERT INTO contact_messages
                (name, email, subject, message)
             VALUES (?, ?, ?, ?)`,
            [cleanName, cleanEmail, cleanSubject, cleanMessage]
        );

        insertResult = result;
    } catch (error) {
        console.error('Contact message database error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'We could not save your message. Please try again later.'
        });
    }

    // Send the email notification after the database insert.
    try {
        await sendContactNotification({
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage
        });

        return res.status(201).json({
            success: true,
            message: 'Your message was saved and your email notification was sent.',
            id: insertResult.insertId,
            notificationSent: true
        });
    } catch (error) {
        console.error('Contact notification error:', error.message);

        // The message remains saved even if email delivery fails.
        return res.status(201).json({
            success: true,
            message: 'Your message was saved, but the email notification could not be sent.',
            id: insertResult.insertId,
            notificationSent: false
        });
    }
}
