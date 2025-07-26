
export function generateBoard(boardSize = 3) {
    const board = [];
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = { isWinning: true };
        }
    }
    const minesCount = 1 + Math.floor(Math.random() * (boardSize * boardSize - 1));
    let placed = 0;
    while (placed < minesCount) {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        if (board[x][y].isWinning) {
            board[x][y].isWinning = false;
            placed++;
        }
    }
    return board;
}