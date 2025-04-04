import { useState } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import MyNavComponent from "./Components/MyNavComponent";
import WelcomeComponent from "./Components/WelcomeComponent";
import GenreBooksComponent from "./Components/GenreBooksComponent";
import AllTheBookComponent from "./Components/AllTheBookComponent";
import MyFooterComponent from "./Components/MyFooterComponent";

function AppContent({ searchTerm, setSearchTerm, selectedGenre, setSelectedGenre }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <MyNavComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onGenreSelect={setSelectedGenre}
      />
      <WelcomeComponent />
      <GenreBooksComponent selectedGenre={selectedGenre} />
      <AllTheBookComponent
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
      />
      <MyFooterComponent />
    </div>
  );
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <ThemeProvider>
      <AppContent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </ThemeProvider>
  );
}