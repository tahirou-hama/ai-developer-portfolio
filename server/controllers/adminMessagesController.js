
import pool from '../config/db.js';

export async function getAdminMessages(req, res) {
    try {
        const [messages] = await pool.query(`
            SELECT
                id,
                name,
                email,
                subject,
                message,
                created_at,
                is_read
            FROM contact_messages
            ORDER BY created_at DESC
            LIMIT 100
        `);

        const [countRows] = await pool.query(`
            SELECT
                COUNT(*) AS totalMessages,
                COALESCE(SUM(is_read = 0), 0) AS unreadMessages
            FROM contact_messages
        `);

        return res.status(200).json({
            success: true,
            stats: {
                totalMessages: Number(countRows[0].totalMessages),
                unreadMessages: Number(countRows[0].unreadMessages)
            },
            messages
        });
    } catch (error) {
        console.error('Failed to retrieve admin messages:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to retrieve contact messages.'
        });
    }
}

export async function updateAdminMessageReadStatus(req, res) {
    const { id } = req.params;
    const { isRead } = req.body;

    // Validate the message ID.
    if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
            success: false,
            message: 'A valid message ID is required.'
        });
    }

    // Accept only an actual Boolean value.
    if (typeof isRead !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: 'isRead must be either true or false.'
        });
    }

    try {
        const [existingMessages] = await pool.query(
            'SELECT id FROM contact_messages WHERE id = ?',
            [id]
        );

        if (existingMessages.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found.'
            });
        }

        await pool.query(
            'UPDATE contact_messages SET is_read = ? WHERE id = ?',
            [isRead ? 1 : 0, id]
        );

        return res.status(200).json({
            success: true,
            message: `Contact message marked as ${isRead ? 'read' : 'unread'}.`,
            id,
            is_read: isRead ? 1 : 0
        });
    } catch (error) {
        console.error('Failed to update message read status:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to update the message status.'
        });
    }
}
