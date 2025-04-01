import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import AllTheBookComponent from './Components/AllTheBookComponent';
import GenreBooksComponent from './Components/GenreBooksComponent';
import MyFooterComponent from './Components/MyFooterComponent';
import MyNavComponent from './Components/MyNavComponent';
import WelcomeComponent from './Components/WelcomeComponent';

export default function AppWithTheme({ searchTerm, setSearchTerm, selectedGenre, setSelectedGenre }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
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
