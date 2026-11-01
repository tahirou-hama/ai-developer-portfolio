
import 'dotenv/config';
import nodemailer from 'nodemailer';

const {
    SMTP_USER,
    SMTP_APP_PASSWORD,
    CONTACT_NOTIFICATION_EMAIL
} = process.env;

if (!SMTP_USER || !SMTP_APP_PASSWORD || !CONTACT_NOTIFICATION_EMAIL) {
    throw new Error(
        'Missing Gmail SMTP configuration. Check your .env file.'
    );
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SMTP_USER,
        pass: SMTP_APP_PASSWORD
    }
});

export async function sendContactNotification({
    name,
    email,
    subject,
    message
}) {
    return transporter.sendMail({
        from: `"Portfolio Contact Form" <${SMTP_USER}>`,
        to: CONTACT_NOTIFICATION_EMAIL,
        replyTo: {
            name,
            address: email
        },
        subject: `New portfolio message: ${subject}`,
        text: [
            'You received a new message through your portfolio.',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            '',
            'Message:',
            message
        ].join('\n')
    });
}
