
import { generatePortfolioAnswer } from '../services/aiService.js';

export async function askPortfolioAssistant(req, res) {
    const { question } = req.body ?? {};

    if (typeof question !== 'string' || !question.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a question.'
        });
    }

    const cleanQuestion = question.trim();

    if (cleanQuestion.length > 1000) {
        return res.status(400).json({
            success: false,
            message: 'Your question must not exceed 1000 characters.'
        });
    }

    try {
        const answer = await generatePortfolioAnswer(cleanQuestion);

        return res.status(200).json({
            success: true,
            answer
        });
    } catch (error) {
        console.error('Portfolio AI error:', {
    message: error.message,
    status: error.status,
    code: error.code,
    type: error.constructor?.name
});

        return res.status(502).json({
            success: false,
            message: 'The assistant is temporarily unavailable. Please try again later.'
        });
    }
}
