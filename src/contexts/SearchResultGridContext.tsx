import { createContext, useState } from "react";

type SearchResultGridProps = {
  children: React.ReactNode;
};
const emptyResultGrid = [
  [
    { key: 1, value: "", match: "no", mark: "no" },
    { key: 2, value: "", match: "no", mark: "no" },
    { key: 3, value: "", match: "no", mark: "no" },
    { key: 4, value: "", match: "no", mark: "no" },
    { key: 5, value: "", match: "no", mark: "no" },
    { key: 6, value: "", match: "no", mark: "no" },
    { key: 7, value: "", match: "no", mark: "no" },
    { key: 8, value: "", match: "no", mark: "no" },
    { key: 9, value: "", match: "no", mark: "no" },
  ],
  [
    { key: 10, value: "", match: "no", mark: "no" },
    { key: 11, value: "", match: "no", mark: "no" },
    { key: 12, value: "", match: "no", mark: "no" },
    { key: 13, value: "", match: "no", mark: "no" },
    { key: 14, value: "", match: "no", mark: "no" },
    { key: 15, value: "", match: "no", mark: "no" },
    { key: 16, value: "", match: "no", mark: "no" },
    { key: 17, value: "", match: "no", mark: "no" },
    { key: 18, value: "", match: "no", mark: "no" },
  ],
  [
    { key: 19, value: "", match: "no", mark: "no" },
    { key: 20, value: "", match: "no", mark: "no" },
    { key: 21, value: "", match: "no", mark: "no" },
    { key: 22, value: "", match: "no", mark: "no" },
    { key: 23, value: "", match: "no", mark: "no" },
    { key: 24, value: "", match: "no", mark: "no" },
    { key: 25, value: "", match: "no", mark: "no" },
    { key: 26, value: "", match: "no", mark: "no" },
    { key: 27, value: "", match: "no", mark: "no" },
  ],
  [
    { key: 28, value: "", match: "no", mark: "no" },
    { key: 29, value: "", match: "no", mark: "no" },
    { key: 30, value: "", match: "no", mark: "no" },
    { key: 31, value: "", match: "no", mark: "no" },
    { key: 32, value: "", match: "no", mark: "no" },
    { key: 33, value: "", match: "no", mark: "no" },
    { key: 34, value: "", match: "no", mark: "no" },
    { key: 35, value: "", match: "no", mark: "no" },
    { key: 36, value: "", match: "no", mark: "no" },
  ],
  [
    { key: 37, value: "", match: "no", mark: "no" },
    { key: 38, value: "", match: "no", mark: "no" },
    { key: 39, value: "", match: "no", mark: "no" },
    { key: 40, value: "", match: "no", mark: "no" },
    { key: 41, value: "", match: "no", mark: "no" },
    { key: 42, value: "", match: "no", mark: "no" },
    { key: 43, value: "", match: "no", mark: "no" },
    { key: 44, value: "", match: "no", mark: "no" },
    { key: 45, value: "", match: "no", mark: "no" },
  ],
  [
    { key: 46, value: "", match: "no", mark: "no" },
    { key: 47, value: "", match: "no", mark: "no" },
    { key: 48, value: "", match: "no", mark: "no" },
    { key: 49, value: "", match: "no", mark: "no" },
    { key: 50, value: "", match: "no", mark: "no" },
    { key: 51, value: "", match: "no", mark: "no" },
    { key: 52, value: "", match: "no", mark: "no" },
    { key: 53, value: "", match: "no", mark: "no" },
    { key: 54, value: "", match: "no", mark: "no" },
  ],
  [
    { key: 55, value: "", match: "no", mark: "no" },
    { key: 56, value: "", match: "no", mark: "no" },
    { key: 57, value: "", match: "no", mark: "no" },
    { key: 58, value: "", match: "no", mark: "no" },
    { key: 59, value: "", match: "no", mark: "no" },
    { key: 60, value: "", match: "no", mark: "no" },
    { key: 61, value: "", match: "no", mark: "no" },
    { key: 62, value: "", match: "no", mark: "no" },
    { key: 63, value: "", match: "no", mark: "no" },
  ],
  [
    { key: 64, value: "", match: "no", mark: "no" },
    { key: 65, value: "", match: "no", mark: "no" },
    { key: 66, value: "", match: "no", mark: "no" },
    { key: 67, value: "", match: "no", mark: "no" },
    { key: 68, value: "", match: "no", mark: "no" },
    { key: 69, value: "", match: "no", mark: "no" },
    { key: 70, value: "", match: "no", mark: "no" },
    { key: 71, value: "", match: "no", mark: "no" },
    { key: 72, value: "", match: "no", mark: "no" },
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
