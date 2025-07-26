import { render, screen } from '@testing-library/react';
import Title from './Title';

test('renders Title component with coins count', () => {
    render(<Title coins={42} />);
    expect(screen.getByText(/coins/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('42'))).toBeInTheDocument();
});
