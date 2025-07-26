import Card from '../../atoms/card/Card';
import styles from './Board.module.css';

type Cell = {
    isWinning: boolean | null;
    revealed: boolean;
};

type BoardProps = {
    board: Cell[][];
    gameOver: boolean;
    onCellClick: (x: number, y: number) => void;
};

export default function Board({ board, gameOver, onCellClick }: BoardProps) {
    const size = board.length;

    return (
        <div
            className={styles.board}
            style={
                {
                    '--size': size,
                } as React.CSSProperties
            }
        >
            {board.map((row, x) =>
                row.map((cell, y) => (
                    <Card
                        key={`${x}-${y}`}
                        isWinning={cell.isWinning}
                        revealed={cell.revealed}
                        onClick={() => {
                            if (!gameOver && !cell.revealed) {
                                onCellClick(x, y);
                            }
                        }}
                    />
                ))
            )}
        </div>
    );
}
