import { useState } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import MyNavComponent from "./Components/MyNavComponent";
import WelcomeComponent from "./Components/WelcomeComponent";
import BooksLayout from "./Components/BooksLayout";
import MyFooterComponent from "./Components/MyFooterComponent";
import BookOffersCarousel from "./Components/BookOffersCarousel";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedAsin, setSelectedAsin] = useState(null);

  return (
    <ThemeProvider>
      <div className="min-vh-100 d-flex flex-column">
        <MyNavComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onGenreSelect={setSelectedGenre}
        />

        <WelcomeComponent />
        <BookOffersCarousel /> 

        <BooksLayout
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
          selectedAsin={selectedAsin}
          setSelectedAsin={setSelectedAsin}
        />

        <MyFooterComponent />
      </div>
    </ThemeProvider>
  );
}
