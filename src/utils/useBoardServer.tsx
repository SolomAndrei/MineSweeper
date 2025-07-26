import { useCallback, useEffect, useRef, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

type Cell = {
    isWinning: boolean | null;
    revealed: boolean;
};

type BoardType = Cell[][];
const boardSize = 3;
const defaultBoard: Cell[][] = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
        isWinning: null,
        revealed: false,
    }))
);

export const useBoardServer = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const gameId = useRef<string>('');
    const amountPerWin = useRef<number>(0);
    const [board, setBoard] = useState<BoardType>(defaultBoard);
    const [coins, setCoins] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const fetchBoard = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/api/server-board/new-game`);
            const data = await res.json();
            gameId.current = data.gameId;
            amountPerWin.current = data.amountPerWin;
            setCoins(0);
            setGameOver(false);
            setMessage('');
        } catch {
            setGameOver(true);
            setMessage('Network error! Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    const checkCell = useCallback(async (x: number, y: number) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/api/server-board/check-cell`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameId: gameId.current, x, y }),
            });
            const data = await res.json();
            return data;
        } catch {
            setMessage('Network error! Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoard();
    }, []);

    const revealCell = useCallback(
        async (x: number, y: number) => {
            const res = await checkCell(x, y);
            if (gameOver || board[x][y].revealed) return;
            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
            newBoard[x][y].isWinning = res.isWinning;
            newBoard[x][y].revealed = true;
            setBoard(newBoard);
            if (newBoard[x][y].isWinning) {
                setCoins((prev) => prev + amountPerWin.current);
                setMessage('You won! You can continue or cash out.');
            } else {
                setCoins(0);
                setGameOver(true);
                setMessage('You lost! Game over.');
            }
        },
        [gameOver, board, amountPerWin, checkCell]
    );

    const cashOut = useCallback(() => {
        if (gameOver) return;
        setGameOver(true);
        setMessage(`You cashed out: ${coins} coins.`);
    }, [gameOver, coins]);

    const restart = useCallback(() => {
        setMessage('');
        const newBoard = board.map((row) => row.map((cell) => ({ ...cell, revealed: false })));
        setBoard(newBoard);
        setTimeout(() => {
            fetchBoard();
        }, 300);
    }, [board]);

    return {
        loading,
        board,
        coins,
        gameOver,
        message,
        revealCell,
        cashOut,
        restart,
    };
};
