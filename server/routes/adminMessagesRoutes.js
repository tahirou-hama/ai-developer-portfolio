
import express from 'express';

import {
    getAdminMessages,
    updateAdminMessageReadStatus
} from '../controllers/adminMessagesController.js';

import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();

router.get('/', requireAdmin, getAdminMessages);

router.patch(
    '/:id/read-status',
    requireAdmin,
    updateAdminMessageReadStatus
);

export default router;
