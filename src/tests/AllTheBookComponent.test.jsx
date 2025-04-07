import { render, screen } from "@testing-library/react";
import AllTheBookComponent from "../Components/AllTheBookComponent";
import { CartProvider } from "../context/CartContext";
import { MemoryRouter } from "react-router-dom";
import books from "../Data/fantasy.json";
import { vi } from "vitest";

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

    // Cerca i componenti tramite data-testid impostato su SingleBookComponent
    const cards = screen.getAllByTestId("single-book");

    expect(cards.length).toBe(12);
  });
});