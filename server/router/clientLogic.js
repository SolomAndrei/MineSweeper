import express from 'express';
import { generateBoard } from '../utils/generateBoard.js';

const router = express.Router();

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

router.get('/', async (req, res) => {
    const boardSize = 3;
    const amountPerWin = 10;
    const board = generateBoard(boardSize);
    await delay(100);
    res.json({ board, amountPerWin });
});

export default router;
