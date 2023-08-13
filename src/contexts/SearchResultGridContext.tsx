import { createContext, useState } from "react";

type SearchResultGridProps = {
  children: React.ReactNode;
};
const emptyResultGrid = [
  [
    { key: 1, value: "", match: "no", secondMatch: "no" },
    { key: 2, value: "", match: "no", secondMatch: "no" },
    { key: 3, value: "", match: "no", secondMatch: "no" },
    { key: 4, value: "", match: "no", secondMatch: "no" },
    { key: 5, value: "", match: "no", secondMatch: "no" },
    { key: 6, value: "", match: "no", secondMatch: "no" },
    { key: 7, value: "", match: "no", secondMatch: "no" },
    { key: 8, value: "", match: "no", secondMatch: "no" },
    { key: 9, value: "", match: "no", secondMatch: "no" },
  ],
  [
    { key: 10, value: "", match: "no", secondMatch: "no" },
    { key: 11, value: "", match: "no", secondMatch: "no" },
    { key: 12, value: "", match: "no", secondMatch: "no" },
    { key: 13, value: "", match: "no", secondMatch: "no" },
    { key: 14, value: "", match: "no", secondMatch: "no" },
    { key: 15, value: "", match: "no", secondMatch: "no" },
    { key: 16, value: "", match: "no", secondMatch: "no" },
    { key: 17, value: "", match: "no", secondMatch: "no" },
    { key: 18, value: "", match: "no", secondMatch: "no" },
  ],
  [
    { key: 19, value: "", match: "no", secondMatch: "no" },
    { key: 20, value: "", match: "no", secondMatch: "no" },
    { key: 21, value: "", match: "no", secondMatch: "no" },
    { key: 22, value: "", match: "no", secondMatch: "no" },
    { key: 23, value: "", match: "no", secondMatch: "no" },
    { key: 24, value: "", match: "no", secondMatch: "no" },
    { key: 25, value: "", match: "no", secondMatch: "no" },
    { key: 26, value: "", match: "no", secondMatch: "no" },
    { key: 27, value: "", match: "no", secondMatch: "no" },
  ],
  [
    { key: 28, value: "", match: "no", secondMatch: "no" },
    { key: 29, value: "", match: "no", secondMatch: "no" },
    { key: 30, value: "", match: "no", secondMatch: "no" },
    { key: 31, value: "", match: "no", secondMatch: "no" },
    { key: 32, value: "", match: "no", secondMatch: "no" },
    { key: 33, value: "", match: "no", secondMatch: "no" },
    { key: 34, value: "", match: "no", secondMatch: "no" },
    { key: 35, value: "", match: "no", secondMatch: "no" },
    { key: 36, value: "", match: "no", secondMatch: "no" },
  ],
  [
    { key: 37, value: "", match: "no", secondMatch: "no" },
    { key: 38, value: "", match: "no", secondMatch: "no" },
    { key: 39, value: "", match: "no", secondMatch: "no" },
    { key: 40, value: "", match: "no", secondMatch: "no" },
    { key: 41, value: "", match: "no", secondMatch: "no" },
    { key: 42, value: "", match: "no", secondMatch: "no" },
    { key: 43, value: "", match: "no", secondMatch: "no" },
    { key: 44, value: "", match: "no", secondMatch: "no" },
    { key: 45, value: "", match: "no", secondMatch: "no" },
  ],
  [
    { key: 46, value: "", match: "no", secondMatch: "no" },
    { key: 47, value: "", match: "no", secondMatch: "no" },
    { key: 48, value: "", match: "no", secondMatch: "no" },
    { key: 49, value: "", match: "no", secondMatch: "no" },
    { key: 50, value: "", match: "no", secondMatch: "no" },
    { key: 51, value: "", match: "no", secondMatch: "no" },
    { key: 52, value: "", match: "no", secondMatch: "no" },
    { key: 53, value: "", match: "no", secondMatch: "no" },
    { key: 54, value: "", match: "no", secondMatch: "no" },
  ],
  [
    { key: 55, value: "", match: "no", secondMatch: "no" },
    { key: 56, value: "", match: "no", secondMatch: "no" },
    { key: 57, value: "", match: "no", secondMatch: "no" },
    { key: 58, value: "", match: "no", secondMatch: "no" },
    { key: 59, value: "", match: "no", secondMatch: "no" },
    { key: 60, value: "", match: "no", secondMatch: "no" },
    { key: 61, value: "", match: "no", secondMatch: "no" },
    { key: 62, value: "", match: "no", secondMatch: "no" },
    { key: 63, value: "", match: "no", secondMatch: "no" },
  ],
  [
    { key: 64, value: "", match: "no", secondMatch: "no" },
    { key: 65, value: "", match: "no", secondMatch: "no" },
    { key: 66, value: "", match: "no", secondMatch: "no" },
    { key: 67, value: "", match: "no", secondMatch: "no" },
    { key: 68, value: "", match: "no", secondMatch: "no" },
    { key: 69, value: "", match: "no", secondMatch: "no" },
    { key: 70, value: "", match: "no", secondMatch: "no" },
    { key: 71, value: "", match: "no", secondMatch: "no" },
    { key: 72, value: "", match: "no", secondMatch: "no" },
  ],
];

export const SearchResultGridContext = createContext({
  searchResultsGrid_3a: emptyResultGrid,
  searchResultsGrid_3b: emptyResultGrid,
  searchResultsGrid_3c: emptyResultGrid,
  setSearchResultGridHandler: (
    resultGrid: {
      key: number;
      value: string;
      match: string;
      secondMatch: string;
    }[][],
    routeNumber: string
  ) => {},
});

export default function SearchResultsGridContextProvider({
  children,
}: SearchResultGridProps) {
  const [searchResultsGrid_3a, setSearchResultsGrid_3a] =
    useState(emptyResultGrid);
  const [searchResultsGrid_3b, setSearchResultsGrid_3b] =
    useState(emptyResultGrid);
  const [searchResultsGrid_3c, setSearchResultsGrid_3c] =
    useState(emptyResultGrid);

  const setSearchResultGridHandler = (
    resultGrid: {
      key: number;
      value: string;
      match: string;
      secondMatch: string;
    }[][],
    routeNumber: string
  ) => {
    switch (routeNumber) {
      case "route_3a":
        setSearchResultsGrid_3a(resultGrid);
        break;
      case "route_3b":
        setSearchResultsGrid_3b(resultGrid);
        break;
      case "route_3c":
        setSearchResultsGrid_3c(resultGrid);
        break;
    }
  };

  return (
    <SearchResultGridContext.Provider
      value={{
        searchResultsGrid_3a: searchResultsGrid_3a,
        searchResultsGrid_3b: searchResultsGrid_3b,
        searchResultsGrid_3c: searchResultsGrid_3c,
        setSearchResultGridHandler: setSearchResultGridHandler,
      }}
    >
      {children}
    </SearchResultGridContext.Provider>
  );
}
