import { useCallback, useEffect, useState, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

type Cell = {
    isWinning: boolean;
    revealed: boolean;
};

type BoardType = Cell[][];
const boardSize = 3;
const defaultBoard: Cell[][] = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
        isWinning: true,
        revealed: false,
    }))
);

export const useBoard = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [board, setBoard] = useState<BoardType>(defaultBoard);
    const amountPerWin = useRef<number>(0);
    const [coins, setCoins] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const fetchBoard = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/api/board`);
            const data = await res.json();
            const newBoard: BoardType = data.board.map((row: { isWinning: boolean }[]) =>
                row.map((cell) => ({ ...cell, revealed: false }))
            );
            setBoard(newBoard);
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

    useEffect(() => {
        fetchBoard();
    }, []);

    const revealCell = useCallback(
        (x: number, y: number) => {
            if (gameOver || board[x][y].revealed) return;
            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
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
        [gameOver, board, amountPerWin]
    );

    const cashOut = useCallback(() => {
        if (gameOver) return;
        setGameOver(true);
        setMessage(`You cashed out: ${coins} coins.`);
    }, [gameOver, coins]);

    const restart = useCallback(() => {
        const newBoard: BoardType = board.map((row: { isWinning: boolean }[]) =>
            row.map((cell) => ({ ...cell, revealed: false }))
        );
        setMessage('');
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
