
import 'dotenv/config';

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GMAIL_SENDER_EMAIL,
    CONTACT_NOTIFICATION_EMAIL
} = process.env;

if (
    !GOOGLE_CLIENT_ID ||
    !GOOGLE_CLIENT_SECRET ||
    !GOOGLE_REFRESH_TOKEN ||
    !GMAIL_SENDER_EMAIL ||
    !CONTACT_NOTIFICATION_EMAIL
) {
    throw new Error(
        'Missing Gmail API configuration. Check your environment variables.'
    );
}

// Obtain a short-lived Google access token using the refresh token.
async function getAccessToken() {
    const response = await fetch(
        'https://oauth2.googleapis.com/token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                refresh_token: GOOGLE_REFRESH_TOKEN,
                grant_type: 'refresh_token'
            })
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            `Google OAuth failed (${response.status}): ${
                result.error_description || result.error
            }`
        );
    }

    return result.access_token;
}

// Encode an email message in the format required by Gmail API.
function createRawEmail({ name, email, subject, message }) {
    const safeName = name.replace(/[\r\n]/g, ' ');
    const safeEmail = email.replace(/[\r\n]/g, '');
    const safeSubject = subject.replace(/[\r\n]/g, ' ');

    const emailContent = [
        `From: Portfolio Contact Form <${GMAIL_SENDER_EMAIL}>`,
        `To: ${CONTACT_NOTIFICATION_EMAIL}`,
        `Reply-To: "${safeName}" <${safeEmail}>`,
        `Subject: =?UTF-8?B?${Buffer.from(
            `New portfolio message: ${safeSubject}`
        ).toString('base64')}?=`,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        Buffer.from([
            'You received a new message through your portfolio.',
            '',
            `Name: ${safeName}`,
            `Email: ${safeEmail}`,
            `Subject: ${safeSubject}`,
            '',
            'Message:',
            message
        ].join('\n')).toString('base64')
    ].join('\r\n');

    return Buffer.from(emailContent).toString('base64url');
}

// Send a notification using Gmail API.
export async function sendContactNotification({
    name,
    email,
    subject,
    message
}) {
    const accessToken = await getAccessToken();

    const response = await fetch(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raw: createRawEmail({
                    name,
                    email,
                    subject,
                    message
                })
            })
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            `Gmail API failed (${response.status}): ${
                result.error?.message || JSON.stringify(result)
            }`
        );
    }

    return result;
}
