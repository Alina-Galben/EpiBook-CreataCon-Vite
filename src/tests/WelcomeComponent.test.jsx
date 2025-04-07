import { render, screen } from '@testing-library/react';
import WelcomeComponent from '../Components/WelcomeComponent';

test('Il componente Welcome viene montato correttamente', () => {
    render(<WelcomeComponent />);
    const welcomeElement = screen.getByText(/benvenuto in epi books/i);
    expect(welcomeElement).toBeInTheDocument();
  });