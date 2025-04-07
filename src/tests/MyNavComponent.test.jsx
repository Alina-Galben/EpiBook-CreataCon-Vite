import { vi } from "vitest";

// Mock dei context e hook
vi.mock("../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: "light",
    toggleTheme: vi.fn(),
  }),
}));

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cart: [],
  }),
}));

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
  }),
}));

// Mock di useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyNavComponent from "../Components/MyNavComponent";

describe("MyNavComponent - Filtraggio Generi Letterari", () => {
  const generi = ["fantasy", "romance", "history", "horror", "scifi"];

  generi.forEach((genre) => {
    it(`filtra i libri per il genere "${genre}" e reindirizza alla home`, () => {
      const mockGenreSelect = vi.fn();

      render(
        <BrowserRouter>
          <MyNavComponent
            searchTerm=""
            setSearchTerm={() => {}}
            onGenreSelect={mockGenreSelect}
          />
        </BrowserRouter>
      );

      // Apri il dropdown
      fireEvent.click(screen.getByText("Generi Letterari"));

      // Clic sul genere selezionato
      fireEvent.click(
        screen.getByText(genre.charAt(0).toUpperCase() + genre.slice(1))
      );

      // Verifica chiamata e navigazione
      expect(mockGenreSelect).toHaveBeenCalledWith(genre);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
