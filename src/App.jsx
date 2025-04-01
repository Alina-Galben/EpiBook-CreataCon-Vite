import { ThemeProvider } from "./context/ThemeContext";
import { useState } from 'react';
import AppWithTheme from './AppWithTheme';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <ThemeProvider>
      <AppWithTheme
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </ThemeProvider>
  );
}

export default App;
