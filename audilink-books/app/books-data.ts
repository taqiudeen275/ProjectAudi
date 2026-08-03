export type CoverTone =
  | "ember"
  | "tide"
  | "orchard"
  | "river"
  | "chrome"
  | "bells"
  | "salt"
  | "glass"
  | "moon"
  | "cinder"
  | "undercity";

export type Book = {
  id: string;
  title: string;
  creator: string;
  category: "Fantasy" | "Mystery" | "Sci-Fi" | "Literary" | "Romance";
  format: "Book" | "Serial";
  duration: string;
  price: number | "free";
  cover: CoverTone;
  eyebrow?: string;
  episode?: string;
  cast?: string;
  provenance?: string;
  description: string;
};

export type ContinueItem = Book & {
  progress: number;
  currentUnit: string;
  remaining: string;
};

export const featuredBook: Book = {
  id: "cartographers-sleep",
  title: "The Cartographer’s Sleep",
  creator: "Mira Vale",
  category: "Fantasy",
  format: "Book",
  duration: "13h 48m",
  price: 18,
  cover: "ember",
  eyebrow: "AudiLink premiere",
  cast: "Ninefold Ensemble",
  provenance: "AI-assisted full cast",
  description:
    "Every map Sera draws erases a place from memory. To find her vanished brother, she must chart the one country that only appears in dreams.",
};

export const continueListening: ContinueItem[] = [
  {
    id: "fire-between-tides",
    title: "A Fire Between Tides",
    creator: "Amara K. Saye",
    category: "Romance",
    format: "Book",
    duration: "9h 12m",
    price: 14,
    cover: "tide",
    progress: 68,
    currentUnit: "Chapter 17 · Low water",
    remaining: "2h 56m left",
    cast: "Lina Osei & Tom Arlen",
    provenance: "AI-assisted narration",
    description:
      "Two lighthouse keepers trade letters across an impossible sea and discover that the tide is carrying more than messages.",
  },
  {
    id: "memory-orchard",
    title: "The Memory Orchard",
    creator: "Eli Navarro",
    category: "Literary",
    format: "Book",
    duration: "7h 35m",
    price: 12,
    cover: "orchard",
    progress: 32,
    currentUnit: "Chapter 8 · The last pear",
    remaining: "5h 09m left",
    cast: "Samira Adu",
    provenance: "Synthetic voice disclosed",
    description:
      "A family returns to an orchard where every fruit holds a memory someone was desperate to forget.",
  },
];

export const trendingBooks: Book[] = [
  {
    id: "rivers-remember-us",
    title: "Rivers Remember Us",
    creator: "Noah Ankomah",
    category: "Fantasy",
    format: "Book",
    duration: "11h 06m",
    price: 16,
    cover: "river",
    eyebrow: "#1 this week",
    cast: "Four-voice cast",
    provenance: "AI-assisted full cast",
    description:
      "A ferryman hears the names of the forgotten in the current and follows them toward a drowned kingdom.",
  },
  {
    id: "dust-and-chromium",
    title: "Dust & Chromium",
    creator: "Nia Ward",
    category: "Sci-Fi",
    format: "Book",
    duration: "8h 44m",
    price: "free",
    cover: "chrome",
    eyebrow: "Free this week",
    cast: "Jules Marlow",
    provenance: "Human narration",
    description:
      "A mechanic on the final desert railway finds a machine dreaming beneath the tracks.",
  },
  {
    id: "quiet-bells",
    title: "The House of Quiet Bells",
    creator: "Tessa North",
    category: "Mystery",
    format: "Book",
    duration: "10h 21m",
    price: 15,
    cover: "bells",
    eyebrow: "Listeners’ pick",
    cast: "Mara Bell",
    provenance: "Synthetic voice disclosed",
    description:
      "An archivist catalogues thirteen silent bells—and hears one ring each night at midnight.",
  },
  {
    id: "salt-country",
    title: "Salt Country",
    creator: "Kojo Mensah",
    category: "Literary",
    format: "Book",
    duration: "6h 58m",
    price: 11,
    cover: "salt",
    eyebrow: "Editor’s choice",
    cast: "Esi Badu",
    provenance: "Human narration",
    description:
      "Three generations gather at a coastal home as the sea begins returning everything it once took.",
  },
  {
    id: "pilgrim-of-glass",
    title: "Pilgrim of Glass",
    creator: "Ren Ito",
    category: "Fantasy",
    format: "Serial",
    duration: "42m episode",
    price: 5,
    cover: "glass",
    eyebrow: "Rising serial",
    episode: "Season 1 · Episode 6",
    cast: "Seven-voice cast",
    provenance: "AI-assisted full cast",
    description:
      "A courier crosses a continent of glass carrying a letter that can end the oldest war.",
  },
];

export const newSerials: Book[] = [
  {
    id: "moonwake-station",
    title: "Moonwake Station",
    creator: "Ife Laurent",
    category: "Sci-Fi",
    format: "Serial",
    duration: "31m episode",
    price: "free",
    cover: "moon",
    eyebrow: "New serial",
    episode: "Episode 1 · The signal",
    cast: "Full cast",
    provenance: "AI-assisted full cast",
    description:
      "The night crew at a silent lunar station receives a distress call sent forty years from now.",
  },
  {
    id: "cinderfield-dispatch",
    title: "The Cinderfield Dispatch",
    creator: "Ada Mercer",
    category: "Mystery",
    format: "Serial",
    duration: "27m episode",
    price: 4,
    cover: "cinder",
    eyebrow: "New episode",
    episode: "Season 1 · Episode 7",
    cast: "Dual narration",
    provenance: "Synthetic voices disclosed",
    description:
      "A small-town reporter investigates obituaries that appear one week before their subjects disappear.",
  },
  {
    id: "songs-below-city",
    title: "Songs Below the City",
    creator: "Lumen House",
    category: "Fantasy",
    format: "Serial",
    duration: "36m episode",
    price: 4,
    cover: "undercity",
    eyebrow: "Season premiere",
    episode: "Season 2 · Episode 1",
    cast: "Nine-voice cast",
    provenance: "AI-assisted full cast",
    description:
      "Beneath every subway line is another city, and its choir has started singing the names of commuters.",
  },
];
