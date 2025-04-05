import fantasy from "./fantasy.json";
import history from "./history.json";
import horror from "./horror.json";
import romance from "./romance.json";
import scifi from "./scifi.json";

const allBooks = [...fantasy, ...history, ...horror, ...romance, ...scifi];

// Rimuove i libri con asin duplicati
const uniqueBooks = Array.from(new Map(allBooks.map(book => [book.asin, book])).values());

export default uniqueBooks;
