import { memo } from 'react';
import Button from '../../atoms/button/Button';
import styles from './Footer.module.css';

type FooterProps = {
    gameOver: boolean;
    coins: number;
    onCashOut: () => void;
    onRestart: () => void;
};

function FooterComponent({ gameOver, coins, onCashOut, onRestart }: FooterProps) {
    return (
        <div className={styles.footer}>
            {!gameOver && coins > 0 && (
                <Button variant="primary" onClick={onCashOut}>
                    Cash Out
                </Button>
            )}
            {gameOver && (
                <Button variant="secondary" onClick={onRestart}>
                    Restart
                </Button>
            )}
        </div>
    );
}

const Footer = memo(FooterComponent);
export default Footer;
