import styles from './Title.module.css';

type TitleProps = {
    coins: number;
    text: string;
};

export default function Title({ coins, text }: TitleProps) {
    return (
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>{text}</h1>
            <p className={styles.subtitle}>Coins: {coins}</p>
        </div>
    );
}
