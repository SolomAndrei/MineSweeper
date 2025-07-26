import React, { useEffect, useState, memo } from 'react';
import styles from './card.module.css';

type CardProps = {
    isWinning: boolean | null;
    revealed: boolean;
    onClick: () => void;
};

function CardComponent({ isWinning, revealed, onClick }: CardProps) {
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (revealed && !isWinning) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 400);
            return () => clearTimeout(timer);
        }
    }, [revealed, isWinning]);

    return (
        <div
            data-testid="card"
            role="button"
            tabIndex={0}
            className={`${styles.card} ${revealed ? styles.flipped : ''}`}
            onClick={onClick}
        >
            <div
                data-testid="inner"
                className={`${styles.inner} ${shake ? styles.shake : ''}`}
                style={{ '--bg-color': isWinning ? '#4caf50' : '#f44336' } as React.CSSProperties}
            >
                <div className={`${styles.face} ${styles.front}`}></div>
                <div
                    className={`${styles.face} ${styles.back} ${
                        isWinning ? styles.win : styles.lose
                    }`}
                >
                    {(() => {
                        if (isWinning === true) return '✓';
                        if (isWinning === false) return '💣';
                        return '';
                    })()}
                </div>
            </div>
        </div>
    );
}

const Card = memo(CardComponent);
export default Card;
