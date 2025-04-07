import { render, screen, fireEvent } from "@testing-library/react";
import AllTheBookComponent from "../Components/AllTheBookComponent";
import { CartProvider } from "../context/CartContext";
import { MemoryRouter } from "react-router-dom";
import books from "../Data/fantasy.json";
import { vi } from "vitest";
import { useState } from "react";

// Mocka scrollTo per evitare errori in JSDOM
beforeAll(() => {
  window.scrollTo = vi.fn();
});

describe("AllTheBookComponent", () => {
  test("rende tante card quanti sono i libri nel JSON", () => {
    const selectedAsin = null;
    const onBookSelect = vi.fn();

    render(
      <MemoryRouter>
        <CartProvider>
          <AllTheBookComponent
            books={books}
            selectedAsin={selectedAsin}
            onBookSelect={onBookSelect}
          />
        </CartProvider>
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId(/^single-book-/); // Match asin dinamici
    expect(cards.length).toBe(12);
  });

  test("cambia il bordo quando un libro viene selezionato", () => {
    const selectedAsin = "0316438960";
    const onBookSelect = vi.fn();

    render(
      <MemoryRouter>
        <CartProvider>
          <AllTheBookComponent
            books={books}
            selectedAsin={selectedAsin}
            onBookSelect={onBookSelect}
          />
        </CartProvider>
      </MemoryRouter>
    );

    const selectedCard = screen.getByTestId(`single-book-${selectedAsin}`);
    expect(selectedCard).toHaveStyle("border: 4px solid yellow");
  });

  test("cliccando su un secondo libro, il bordo del primo torna normale", () => {
    function WrapperComponent() {
      const [selectedAsin, setSelectedAsin] = useState(null);
      return (
        <MemoryRouter>
          <CartProvider>
            <AllTheBookComponent
              books={books}
              selectedAsin={selectedAsin}
              onBookSelect={setSelectedAsin}
            />
          </CartProvider>
        </MemoryRouter>
      );
    }

    render(<WrapperComponent />);

    const firstAsin = books[0].asin;
    const secondAsin = books[1].asin;

    const firstCard = screen.getByTestId(`single-book-${firstAsin}`);
    const secondCard = screen.getByTestId(`single-book-${secondAsin}`);

    // Clic sul primo libro
    const firstCommentButton = screen.getAllByText("Commenti")[0];
    fireEvent.click(firstCommentButton);

    expect(firstCard).toHaveStyle("border: 4px solid yellow");
    expect(secondCard).toHaveStyle("border: 2px solid transparent");

    // Clic sul secondo libro
    const secondCommentButton = screen.getAllByText("Commenti")[1];
    fireEvent.click(secondCommentButton);

    expect(secondCard).toHaveStyle("border: 4px solid yellow");
    expect(firstCard).toHaveStyle("border: 2px solid transparent");
  });
});