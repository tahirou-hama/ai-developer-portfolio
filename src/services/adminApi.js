
const API_BASE_URL = 'http://localhost:5000/api/admin';

export async function adminLogin(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to log in.');
    }

    return data;
}

export async function verifyAdminSession(token) {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Your session is invalid.');
    }

    return data;
}


export async function getAdminMessages(token) {
    const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(
            data.message || 'Unable to retrieve contact messages.'
        );
        error.status = response.status;
        throw error;
    }

    return data;
}


export async function updateAdminMessageReadStatus(token, messageId, isRead) {
    const response = await fetch(
        `${API_BASE_URL}/messages/${messageId}/read-status`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ isRead })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(
            data.message || 'Unable to update message status.'
        );
        error.status = response.status;
        throw error;
    }

    return data;
}
