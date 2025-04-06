import { useState } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import MyNavComponent from "./Components/MyNavComponent";
import MyFooterComponent from "./Components/MyFooterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./page/NotFound";
import BookDetails from "./page/BookDetails";
import Home from "./page/Home";
import Favorites from "./page/Favorites";
import AccountPage from "./page/AccountPage";
import Login from "./page/Login";
import CartPage from "./page/CartPage";
import Register from "./page/Register";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedAsin, setSelectedAsin] = useState(null);

  return (
    <AuthProvider> {/* 👈 AVVOLGI TUTTO CON QUESTO */}
      <ThemeProvider>
        <CartProvider>
          <div className="min-vh-100 d-flex flex-column">
            <BrowserRouter>
              <MyNavComponent
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onGenreSelect={setSelectedGenre}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      searchTerm={searchTerm}
                      selectedGenre={selectedGenre}
                      selectedAsin={selectedAsin}
                      setSelectedAsin={setSelectedAsin}
                    />
                  }
                />
                <Route path="/book/:asin" element={<BookDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

              <MyFooterComponent />
            </BrowserRouter>
          </div>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}