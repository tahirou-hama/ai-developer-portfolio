import 'dotenv/config';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const {
    EMAIL_PROVIDER = 'smtp',
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_APP_PASSWORD,
    CONTACT_NOTIFICATION_EMAIL,
    RESEND_API_KEY,
    RESEND_FROM_EMAIL = 'onboarding@resend.dev'
} = process.env;

// Validate the notification recipient.
if (!CONTACT_NOTIFICATION_EMAIL) {
    throw new Error(
        'Missing CONTACT_NOTIFICATION_EMAIL configuration.'
    );
}

// Initialize the selected email provider.
let transporter;
let resend;

if (EMAIL_PROVIDER === 'smtp') {
    // Validate Gmail SMTP configuration for local development.
    if (
        !SMTP_HOST ||
        !SMTP_PORT ||
        !SMTP_USER ||
        !SMTP_APP_PASSWORD
    ) {
        throw new Error(
            'Missing Gmail SMTP configuration. Check your environment variables.'
        );
    }

    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_APP_PASSWORD.replace(/\s/g, '')
        }
    });
} else if (EMAIL_PROVIDER === 'resend') {
    // Validate Resend configuration for production.
    if (!RESEND_API_KEY) {
        throw new Error(
            'Missing RESEND_API_KEY configuration.'
        );
    }

    resend = new Resend(RESEND_API_KEY);
} else {
    throw new Error(
        'Invalid EMAIL_PROVIDER. Use smtp or resend.'
    );
}

// Send a notification when someone submits the portfolio contact form.
export async function sendContactNotification({
    name,
    email,
    subject,
    message
}) {
    const safeName = name.replace(/[\r\n]/g, ' ');
    const safeEmail = email.replace(/[\r\n]/g, '');
    const safeSubject = subject.replace(/[\r\n]/g, ' ');

    const emailContent = {
        subject: `New portfolio message: ${safeSubject}`,
        text: [
            'You received a new message through your portfolio.',
            '',
            `Name: ${safeName}`,
            `Email: ${safeEmail}`,
            `Subject: ${safeSubject}`,
            '',
            'Message:',
            message
        ].join('\n')
    };

    if (EMAIL_PROVIDER === 'resend') {
        const { data, error } = await resend.emails.send({
            from: `Portfolio Contact Form <${RESEND_FROM_EMAIL}>`,
            to: CONTACT_NOTIFICATION_EMAIL,
            replyTo: `${safeName} <${safeEmail}>`,
            ...emailContent
        });

        if (error) {
            throw new Error(`Resend email error: ${error.message}`);
        }

        return data;
    }

    return transporter.sendMail({
        from: `"Portfolio Contact Form" <${SMTP_USER}>`,
        to: CONTACT_NOTIFICATION_EMAIL,
        replyTo: `"${safeName}" <${safeEmail}>`,
        ...emailContent
    });
}