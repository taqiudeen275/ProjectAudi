import BooksExperience from "./books-experience";
import {
  continueListening,
  featuredBook,
  newSerials,
  trendingBooks,
} from "./books-data";

export default function Home() {
  return (
    <BooksExperience
      continueItems={continueListening}
      featured={featuredBook}
      serials={newSerials}
      trending={trendingBooks}
    />
  );
}
