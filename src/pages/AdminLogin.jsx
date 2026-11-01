
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/adminApi.js';
import './Admin.css';

export default function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await adminLogin(email.trim(), password);

            // Store only the issued token, never the password.
            sessionStorage.setItem('adminToken', data.token);

            setPassword('');
            navigate('/admin', { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="admin-auth-page">
            <section className="admin-auth-card">
                <Link to="/" className="admin-back-link">
                    ← Back to portfolio
                </Link>

                <div className="admin-brand-mark" aria-hidden="true">
                    TH
                </div>

                <p className="admin-eyebrow">PRIVATE AREA</p>
                <h1>Administrator login</h1>
                <p className="admin-auth-description">
                    Sign in to manage your portfolio messages and dashboard.
                </p>

                <form className="admin-auth-form" onSubmit={handleSubmit}>
                    <div className="admin-field">
                        <label htmlFor="admin-email">Email address</label>
                        <input
                            id="admin-email"
                            type="email"
                            autoComplete="username"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div className="admin-field">
                        <label htmlFor="admin-password">Password</label>
                        <input
                            id="admin-password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="admin-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="admin-primary-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing in…' : 'Sign in securely'}
                    </button>
                </form>

                <p className="admin-auth-footer">
                    Authorized administrator access only.
                </p>
            </section>
        </main>
    );
}
