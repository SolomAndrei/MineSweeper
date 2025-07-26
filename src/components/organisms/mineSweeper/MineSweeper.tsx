import Board from '../../molecules/board/Board';
import { LoadingOverlay } from '../../atoms/loadingOverlay/LoadingOverlay';
import styles from './mineSweeper.module.css';
import Title from '../../atoms/title/Title';
import Footer from '../../molecules/footer/Footer';
import { Message } from '../../atoms/message/Message';
import { useBoard } from '../../../utils/useBoard';

export default function MineSweeper() {
    const { loading, board, coins, gameOver, message, revealCell, cashOut, restart } = useBoard();

    return (
        <>
            <LoadingOverlay loading={loading} delay={500} />
            <div className={styles.container}>
                <Title coins={coins} text="MineSweeper Crash" />
                <Board board={board} gameOver={gameOver} onCellClick={revealCell} />
                <Footer gameOver={gameOver} coins={coins} onCashOut={cashOut} onRestart={restart} />
                <Message text={message} />
            </div>
        </>
    );
}
