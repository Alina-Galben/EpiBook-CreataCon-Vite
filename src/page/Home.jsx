import WelcomeComponent from "../Components/WelcomeComponent";
import BookOffersCarousel from "../Components/BookOffersCarousel";
import BooksLayout from "../Components/BooksLayout";

export default function Home({ searchTerm, selectedGenre, selectedAsin, setSelectedAsin }) {
  return (
    <>
      <WelcomeComponent />
      <BookOffersCarousel />
      <BooksLayout
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
        selectedAsin={selectedAsin}
        setSelectedAsin={setSelectedAsin}
      />
    </>
  );
}
