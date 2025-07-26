import React, { memo } from 'react';
import styles from './message.module.css';

type MessageProps = {
    text: string;
};

const MessageComponent: React.FC<MessageProps> = ({ text }) => {
    if (!text) return null;
    return <div className={styles.message}>{text}</div>;
};

export const Message = memo(MessageComponent);
