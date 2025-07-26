import { render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import { LoadingOverlay } from './LoadingOverlay';

describe('LoadingOverlay', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('hides spinner immediately when loading turns false', async () => {
        const { rerender } = render(<LoadingOverlay loading={true} delay={0} />);

        await act(async () => {
            vi.advanceTimersByTime(0);
        });

        expect(screen.getByLabelText(/pacman-loading/i)).toBeInTheDocument();

        await act(async () => {
            rerender(<LoadingOverlay loading={false} delay={0} />);
            vi.advanceTimersByTime(0);
        });

        expect(screen.queryByLabelText(/pacman-loading/i)).toBeNull();
    });
});
