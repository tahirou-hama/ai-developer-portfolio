
import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD
    }
});

try {
    await transporter.verify();
    console.log('Gmail SMTP connection verified successfully.');
} catch (error) {
    console.error('Gmail SMTP verification failed:', error.message);
    process.exitCode = 1;
} finally {
    transporter.close();
}
