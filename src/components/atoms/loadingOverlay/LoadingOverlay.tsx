import React, { useEffect, useState, memo } from 'react';
import { PacmanLoader } from 'react-spinners';
import styles from './LoadingOverlay.module.css';

type LoadingOverlayProps = {
    loading: boolean;
    delay?: number;
};

const LoadingOverlayComponent: React.FC<LoadingOverlayProps> = ({ loading, delay = 0 }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        if (loading) {
            timer = setTimeout(() => setShow(true), delay);
        } else {
            setShow(false);
            if (timer) clearTimeout(timer);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [loading]);

    if (!show) return null;

    return (
        <div className={styles.overlay}>
            <PacmanLoader size={80} color="#4fa94d" loading={true} aria-label="pacman-loading" />
        </div>
    );
};

export const LoadingOverlay = memo(LoadingOverlayComponent);
