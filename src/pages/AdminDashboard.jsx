
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    verifyAdminSession,
    getAdminMessages,
    updateAdminMessageReadStatus
} from '../services/adminApi.js';
import './Admin.css';

function AdminDashboard() {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [stats, setStats] = useState({
        totalMessages: 0,
        unreadMessages: 0
    });
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
const [messageFilter, setMessageFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [updatingIds, setUpdatingIds] = useState([]);
    const [error, setError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const filteredMessages = messages.filter((message) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch = [
        message.name,
        message.email,
        message.subject,
        message.message
    ].some((value) =>
        String(value || '').toLowerCase().includes(search)
    );

    const isRead = Number(message.is_read) === 1;

    const matchesFilter =
        messageFilter === 'all' ||
        (messageFilter === 'read' && isRead) ||
        (messageFilter === 'unread' && !isRead);

    return matchesSearch && matchesFilter;
});

    useEffect(() => {
        let isActive = true;

        async function loadDashboard() {
            const token = sessionStorage.getItem('adminToken');

            if (!token) {
                navigate('/admin/login', { replace: true });
                return;
            }

            try {
                const sessionData = await verifyAdminSession(token);

                if (!isActive) return;
                setAdmin(sessionData.admin);

                const messagesData = await getAdminMessages(token);

                if (!isActive) return;

                setStats(messagesData.stats);
                setMessages(messagesData.messages || []);
            } catch (err) {
                if (!isActive) return;

                if (err.status === 401 || err.status === 403) {
                    sessionStorage.removeItem('adminToken');
                    navigate('/admin/login', { replace: true });
                } else {
                    setError(
                        err.message || 'Unable to load the dashboard.'
                    );
                }
            } finally {
                if (isActive) setLoading(false);
            }
        }

        loadDashboard();

        return () => {
            isActive = false;
        };
    }, [navigate]);

    async function handleReadStatusChange(message) {
        const token = sessionStorage.getItem('adminToken');
        if (!token || updatingIds.includes(message.id)) return;

        const newIsRead = Number(message.is_read) !== 1;

        setStatusError('');
        setUpdatingIds((ids) => [...ids, message.id]);

        try {
            await updateAdminMessageReadStatus(
                token,
                message.id,
                newIsRead
            );

            // Update the local message only after the server confirms.
            setMessages((currentMessages) =>
                currentMessages.map((item) =>
                    item.id === message.id
                        ? { ...item, is_read: newIsRead ? 1 : 0 }
                        : item
                )
            );

            setStats((currentStats) => ({
                ...currentStats,
                unreadMessages: Math.max(
                    0,
                    currentStats.unreadMessages + (newIsRead ? -1 : 1)
                )
            }));
        } catch (err) {
            if (err.status === 401 || err.status === 403) {
                sessionStorage.removeItem('adminToken');
                navigate('/admin/login', { replace: true });
                return;
            }

            setStatusError(
                err.message || 'Unable to update message status.'
            );
        } finally {
            setUpdatingIds((ids) =>
                ids.filter((id) => id !== message.id)
            );
        }
    }

    async function handleRefreshMessages() {
    const token = sessionStorage.getItem('adminToken');

    if (!token || refreshing) return;

    setRefreshing(true);
    setError('');

    try {
        const data = await getAdminMessages(token);

        setMessages(data.messages || []);
        setStats(data.stats);
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            sessionStorage.removeItem('adminToken');
            navigate('/admin/login', { replace: true });
            return;
        }

        setError(err.message || 'Unable to refresh contact messages.');
    } finally {
        setRefreshing(false);
    }
}

    function handleLogout() {
        sessionStorage.removeItem('adminToken');
        navigate('/admin/login', { replace: true });
    }

    if (loading) {
        return (
            <main className="admin-auth-page">
                <p>Loading administrator dashboard...</p>
            </main>
        );
    }

    if (!admin) {
        return (
            <main className="admin-auth-page">
                <p>{error || 'Unable to load administrator dashboard.'}</p>
            </main>
        );
    }

    return (
        <main className="admin-dashboard">
            <header className="admin-dashboard-header">
                <div>
                    <p className="admin-eyebrow">
                        PORTFOLIO ADMINISTRATION
                    </p>
                    <h1>Admin Dashboard</h1>
                    <p>Welcome, {admin.email}</p>
                </div>

                <button
                    type="button"
                    className="admin-primary-button"
                    onClick={handleLogout}
                >
                    Sign out
                </button>
            </header>

            <section className="admin-dashboard-content">
                <h2>Overview</h2>
                <p>
                    Manage and review messages submitted through
                    your portfolio contact form.
                </p>

                <div className="admin-dashboard-card">
                    <h3>Total Contact Messages</h3>
                    <p>{stats.totalMessages}</p>
                </div>

                <div className="admin-dashboard-card">
                    <h3>Unread Messages</h3>
                    <p>{stats.unreadMessages}</p>
                </div>

                <section aria-labelledby="messages-heading">
                    <h2 id="messages-heading">Contact Messages</h2>
                    <button
    type="button"
    className="admin-primary-button"
    onClick={handleRefreshMessages}
    disabled={refreshing}
>
    {refreshing ? 'Refreshing...' : 'Refresh messages'}
</button>

                 <div className="message-controls">
    <div className="search-group">
        <label htmlFor="message-search">
            Search messages
        </label>

        <input
            id="message-search"
            type="search"
            className="message-search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search name, email, subject, or message..."
        />
    </div>

    <div className="filter-group">
        <label htmlFor="message-filter">
            Filter by status
        </label>

        <select
            id="message-filter"
            className="message-filter"
            value={messageFilter}
            onChange={(event) => setMessageFilter(event.target.value)}
        >
            <option value="all">All messages</option>
            <option value="unread">Unread messages</option>
            <option value="read">Read messages</option>
        </select>
    </div>
</div>

<p>
    Showing {filteredMessages.length} of {messages.length} messages
</p>

                    {error && <p role="alert">{error}</p>}
                    {statusError && <p role="alert">{statusError}</p>}

                    {!error && messages.length === 0 && (
    <p>No contact messages have been received yet.</p>
)}

{!error && messages.length > 0 && filteredMessages.length === 0 && (
    <p>No messages match your search or selected filter.</p>
)}

                    {filteredMessages.map((message) => {
                        const isRead = Number(message.is_read) === 1;
                        const isUpdating = updatingIds.includes(message.id);

                        return (
                            <article
                                className="admin-dashboard-card"
                                key={message.id}
                            >
                                <p>
                                    <strong>Status:</strong>{' '}
                                    {isRead ? 'Read' : 'Unread'}
                                </p>

                                <h3>{message.subject || 'No subject'}</h3>

                                <p>
                                    <strong>From:</strong> {message.name}
                                </p>

                                <p>
                                    <strong>Email:</strong>{' '}
                                    <a href={`mailto:${message.email}`}>
                                        {message.email}
                                    </a>
                                </p>

                                <p>
                                    <strong>Received:</strong>{' '}
                                    {message.created_at
                                        ? new Date(
                                            message.created_at
                                        ).toLocaleString()
                                        : 'Date unavailable'}
                                </p>

                                <p><strong>Message:</strong></p>
                                <p>{message.message}</p>

                                <button
                                    type="button"
                                    className="admin-primary-button"
                                    disabled={isUpdating}
                                    onClick={() =>
                                        handleReadStatusChange(message)
                                    }
                                >
                                    {isUpdating
                                        ? 'Updating...'
                                        : isRead
                                            ? 'Mark as unread'
                                            : 'Mark as read'}
                                </button>
                            </article>
                        );
                    })}
                </section>
            </section>
        </main>
    );
}

export default AdminDashboard;
