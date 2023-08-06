import { createContext, useState } from "react";

type SearchResultGridProps = {
  children: React.ReactNode;
};
const dummyResultGrid = [
  [
    { key: 1, value: "B", match: "yes" },
    { key: 2, value: "B", match: "yes" },
    { key: 3, value: "B", match: "yes" },
    { key: 4, value: "B", match: "yes" },
    { key: 5, value: "B", match: "yes" },
    { key: 6, value: "B", match: "yes" },
    { key: 7, value: "B", match: "yes" },
    { key: 8, value: "B", match: "yes" },
    { key: 9, value: "P", match: "yes" },
  ],
  [
    { key: 10, value: "P", match: "no" },
    { key: 11, value: "B", match: "no" },
    { key: 12, value: "P", match: "no" },
    { key: 13, value: "B", match: "no" },
    { key: 14, value: "P", match: "no" },
    { key: 15, value: "P", match: "no" },
    { key: 16, value: "B", match: "no" },
    { key: 17, value: "", match: "no" },
    { key: 18, value: "", match: "no" },
  ],
  [
    { key: 19, value: "", match: "no" },
    { key: 20, value: "", match: "no" },
    { key: 21, value: "", match: "no" },
    { key: 22, value: "", match: "no" },
    { key: 23, value: "", match: "no" },
    { key: 24, value: "", match: "no" },
    { key: 25, value: "", match: "no" },
    { key: 26, value: "", match: "no" },
    { key: 27, value: "", match: "no" },
  ],
  [
    { key: 28, value: "", match: "no" },
    { key: 29, value: "", match: "no" },
    { key: 30, value: "", match: "no" },
    { key: 31, value: "", match: "no" },
    { key: 32, value: "", match: "no" },
    { key: 33, value: "", match: "no" },
    { key: 34, value: "", match: "no" },
    { key: 35, value: "", match: "no" },
    { key: 36, value: "", match: "no" },
  ],
  [
    { key: 37, value: "", match: "no" },
    { key: 38, value: "", match: "no" },
    { key: 39, value: "", match: "no" },
    { key: 40, value: "", match: "no" },
    { key: 41, value: "", match: "no" },
    { key: 42, value: "", match: "no" },
    { key: 43, value: "", match: "no" },
    { key: 44, value: "", match: "no" },
    { key: 45, value: "", match: "no" },
  ],
  [
    { key: 46, value: "", match: "no" },
    { key: 47, value: "", match: "no" },
    { key: 48, value: "", match: "no" },
    { key: 49, value: "", match: "no" },
    { key: 50, value: "", match: "no" },
    { key: 51, value: "", match: "no" },
    { key: 52, value: "", match: "no" },
    { key: 53, value: "", match: "no" },
    { key: 54, value: "", match: "no" },
  ],
  [
    { key: 55, value: "", match: "no" },
    { key: 56, value: "", match: "no" },
    { key: 57, value: "", match: "no" },
    { key: 58, value: "", match: "no" },
    { key: 59, value: "", match: "no" },
    { key: 60, value: "", match: "no" },
    { key: 61, value: "", match: "no" },
    { key: 62, value: "", match: "no" },
    { key: 63, value: "", match: "no" },
  ],
  [
    { key: 64, value: "B", match: "yes" },
    { key: 65, value: "B", match: "yes" },
    { key: 66, value: "B", match: "yes" },
    { key: 67, value: "B", match: "yes" },
    { key: 68, value: "B", match: "yes" },
    { key: 69, value: "B", match: "yes" },
    { key: 70, value: "B", match: "yes" },
    { key: 71, value: "B", match: "yes" },
    { key: 72, value: "B", match: "yes" },
  ],
];
const emptyResultGrid = [
  [
    { key: 1, value: "", match: "no" },
    { key: 2, value: "", match: "no" },
    { key: 3, value: "", match: "no" },
    { key: 4, value: "", match: "no" },
    { key: 5, value: "", match: "no" },
    { key: 6, value: "", match: "no" },
    { key: 7, value: "", match: "no" },
    { key: 8, value: "", match: "no" },
    { key: 9, value: "", match: "no" },
  ],
  [
    { key: 10, value: "", match: "no" },
    { key: 11, value: "", match: "no" },
    { key: 12, value: "", match: "no" },
    { key: 13, value: "", match: "no" },
    { key: 14, value: "", match: "no" },
    { key: 15, value: "", match: "no" },
    { key: 16, value: "", match: "no" },
    { key: 17, value: "", match: "no" },
    { key: 18, value: "", match: "no" },
  ],
  [
    { key: 19, value: "", match: "no" },
    { key: 20, value: "", match: "no" },
    { key: 21, value: "", match: "no" },
    { key: 22, value: "", match: "no" },
    { key: 23, value: "", match: "no" },
    { key: 24, value: "", match: "no" },
    { key: 25, value: "", match: "no" },
    { key: 26, value: "", match: "no" },
    { key: 27, value: "", match: "no" },
  ],
  [
    { key: 28, value: "", match: "no" },
    { key: 29, value: "", match: "no" },
    { key: 30, value: "", match: "no" },
    { key: 31, value: "", match: "no" },
    { key: 32, value: "", match: "no" },
    { key: 33, value: "", match: "no" },
    { key: 34, value: "", match: "no" },
    { key: 35, value: "", match: "no" },
    { key: 36, value: "", match: "no" },
  ],
  [
    { key: 37, value: "", match: "no" },
    { key: 38, value: "", match: "no" },
    { key: 39, value: "", match: "no" },
    { key: 40, value: "", match: "no" },
    { key: 41, value: "", match: "no" },
    { key: 42, value: "", match: "no" },
    { key: 43, value: "", match: "no" },
    { key: 44, value: "", match: "no" },
    { key: 45, value: "", match: "no" },
  ],
  [
    { key: 46, value: "", match: "no" },
    { key: 47, value: "", match: "no" },
    { key: 48, value: "", match: "no" },
    { key: 49, value: "", match: "no" },
    { key: 50, value: "", match: "no" },
    { key: 51, value: "", match: "no" },
    { key: 52, value: "", match: "no" },
    { key: 53, value: "", match: "no" },
    { key: 54, value: "", match: "no" },
  ],
  [
    { key: 55, value: "", match: "no" },
    { key: 56, value: "", match: "no" },
    { key: 57, value: "", match: "no" },
    { key: 58, value: "", match: "no" },
    { key: 59, value: "", match: "no" },
    { key: 60, value: "", match: "no" },
    { key: 61, value: "", match: "no" },
    { key: 62, value: "", match: "no" },
    { key: 63, value: "", match: "no" },
  ],
  [
    { key: 64, value: "", match: "no" },
    { key: 65, value: "", match: "no" },
    { key: 66, value: "", match: "no" },
    { key: 67, value: "", match: "no" },
    { key: 68, value: "", match: "no" },
    { key: 69, value: "", match: "no" },
    { key: 70, value: "", match: "no" },
    { key: 71, value: "", match: "no" },
    { key: 72, value: "", match: "no" },
  ],
];

export const SearchResultGridContext = createContext({
  searchResultsGrid9: emptyResultGrid,
  searchResultsGrid3: emptyResultGrid,
  searchResultsGrid4: emptyResultGrid,
  setSearchResultGridHandler: (
    resultGrid: { key: number; value: string; match: string }[][],
    gridNum: number
  ) => {},
});

export default function SearchResultsGridContextProvider({
  children,
}: SearchResultGridProps) {
  const [searchResultsGrid9, setSearchResultsGrid9] = useState(emptyResultGrid);
  const [searchResultsGrid3, setSearchResultsGrid3] = useState(emptyResultGrid);
  const [searchResultsGrid4, setSearchResultsGrid4] = useState(emptyResultGrid);

  const setSearchResultGridHandler = (
    resultGrid: { key: number; value: string; match: string }[][],
    gridNum: number
  ) => {
    switch (gridNum) {
      case 9:
        setSearchResultsGrid9(resultGrid);
        break;
      case 3:
        setSearchResultsGrid3(resultGrid);
        break;
      case 4:
        setSearchResultsGrid4(resultGrid);
        break;
    }
  };

  return (
    <SearchResultGridContext.Provider
      value={{
        searchResultsGrid9: searchResultsGrid9,
        searchResultsGrid3: searchResultsGrid3,
        searchResultsGrid4: searchResultsGrid4,
        setSearchResultGridHandler: setSearchResultGridHandler,
      }}
    >
      {children}
    </SearchResultGridContext.Provider>
  );
}
