import { render, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import Card from './Card';
import styles from './card.module.css';

describe('Card', () => {
    it('renders with flipped class when revealed is true', () => {
        const { container } = render(<Card isWinning={true} revealed={true} onClick={() => {}} />);
        const card = container.querySelector(`.${styles.card}`);
        expect(card).toHaveClass(styles.flipped);
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        const { container } = render(
            <Card isWinning={true} revealed={false} onClick={handleClick} />
        );
        const card = container.querySelector(`.${styles.card}`);
        if (!card) throw new Error('Card element not found');
        fireEvent.click(card);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('adds shake class when revealed is true and isWinning is false', async () => {
        vi.useFakeTimers();
        const { container } = render(<Card isWinning={false} revealed={true} onClick={() => {}} />);
        const innerDiv = container.querySelector(`.${styles.inner}`);
        expect(innerDiv).toHaveClass(styles.shake);
        act(() => {
            vi.advanceTimersByTime(400);
        });
        expect(innerDiv?.className).not.toContain(styles.shake);
        vi.useRealTimers();
    });
});
