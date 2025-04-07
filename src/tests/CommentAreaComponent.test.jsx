import { render, screen } from '@testing-library/react';
import CommentAreaComponent from '../Components/CommentAreaComponent';
import { vi } from 'vitest';

vi.mock('./AddCommentComponent', () => ({
  default: () => <div data-testid="add-comment-component" />,
}));

vi.mock('./CommentsListComponent', () => ({
  default: () => <div data-testid="comments-list-component" />,
}));

describe('CommentAreaComponent', () => {
  test('mostra un messaggio informativo se nessun libro è selezionato', () => {
    render(<CommentAreaComponent asin={null} />);
    expect(screen.getByText(/Hai già scelto il tuo prossimo libro\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Cliccane uno per leggere i commenti!/i)).toBeInTheDocument();
  });

  test('mostra lo spinner durante il caricamento dei commenti', () => {
    render(<CommentAreaComponent asin="some-asin" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('mostra il componente AddCommentComponent e CommentsListComponent dopo il caricamento', async () => {
    render(<CommentAreaComponent asin="some-asin" />);
    expect(await screen.findByTestId('add-comment-component')).toBeInTheDocument();
    expect(await screen.findByTestId('comments-list-component')).toBeInTheDocument();
  });
});