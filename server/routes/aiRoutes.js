
import express from 'express';
import { askPortfolioAssistant } from '../controllers/aiController.js';

const router = express.Router();

router.post('/ask', askPortfolioAssistant);

export default router;
