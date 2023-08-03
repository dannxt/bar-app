import { createContext } from "react";
import { useWindowDimensions } from "react-native";

export const DimensionsContext = createContext({
  deviceHeight: 0,
  deviceWidth: 0,
});

type DimensionsContextProps = {
  children: React.ReactNode;
};

export default function DimensionsContextProvider({
  children,
}: DimensionsContextProps) {
  return (
    <DimensionsContext.Provider
      value={{
        deviceHeight: useWindowDimensions().height,
        deviceWidth: useWindowDimensions().width,
      }}
    >
      {children}
    </DimensionsContext.Provider>
  );
}
