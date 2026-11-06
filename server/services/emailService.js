import 'dotenv/config';
import nodemailer from 'nodemailer';

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_APP_PASSWORD,
    CONTACT_NOTIFICATION_EMAIL
} = process.env;

// Validate required SMTP configuration.
if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_APP_PASSWORD ||
    !CONTACT_NOTIFICATION_EMAIL
) {
    throw new Error(
        'Missing Gmail SMTP configuration. Check your environment variables.'
    );
}

// Create a reusable Gmail SMTP transporter.
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
        user: SMTP_USER,
        pass: SMTP_APP_PASSWORD.replace(/\s/g, '')
    }
});

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

    const result = await transporter.sendMail({
        from: `"Portfolio Contact Form" <${SMTP_USER}>`,
        to: CONTACT_NOTIFICATION_EMAIL,
        replyTo: `"${safeName}" <${safeEmail}>`,
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
    });

    return result;
}
