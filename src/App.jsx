import { useState } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import MyNavComponent from "./Components/MyNavComponent";
import MyFooterComponent from "./Components/MyFooterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./page/NotFound";
import BookDetails from "./page/BookDetails";
import Home from "./page/Home";
import Favorites from "./page/Favorites";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedAsin, setSelectedAsin] = useState(null);

  return (
    <ThemeProvider>
      <div className="min-vh-100 d-flex flex-column">
        <BrowserRouter>
          <MyNavComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onGenreSelect={setSelectedGenre}
          />

          <Routes>
            <Route path="/"
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
            <Route path="*" element={<NotFound />} />
          </Routes>

          <MyFooterComponent />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
