import express from 'express';
import { randomUUID } from 'crypto';
import { generateBoard } from '../utils/generateBoard.js';

const router = express.Router();
const games = new Map();

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

router.get('/new-game', async (req, res) => {
    const boardSize = 3;
    const board = generateBoard(boardSize);
    const amountPerWin = 10;
    const gameId = randomUUID();
    games.set(gameId, { board, amountPerWin });
    await delay(100);
    res.json({ gameId, amountPerWin });
});

router.post('/check-cell', async (req, res) => {
    const { gameId, x, y } = req.body;
    if (!games.has(gameId)) {
        return res.status(404).json({ error: 'Game not found' });
    }
    const { board } = games.get(gameId);
    if (x < 0 || y < 0 || x >= board.length || y >= board[0].length) {
        return res.status(400).json({ error: 'Invalid cell coordinates' });
    }
    const cell = board[x][y];
    await delay(100);
    res.json({
        isWinning: cell.isWinning,
    });
});

export default router;
