import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
    it('renders with primary variant and text', () => {
        render(<Button>Click me</Button>);
        const btn = screen.getByRole('button', { name: /click me/i });
        expect(btn).toBeInTheDocument();
        expect(btn.className).toMatch(/primary/);
    });

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const btn = screen.getByRole('button', { name: /secondary/i });
        expect(btn.className).toMatch(/secondary/);
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        const btn = screen.getByRole('button', { name: /click/i });
        fireEvent.click(btn);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
