import { createContext, useState } from "react";

export const InputLengthContext = createContext({
  inputLength: 0,
  setInputLengthHandler: (inputLength: number) => {},
});

type InputLengthContextProps = {
  children: React.ReactNode;
};

export default function InputLengthContextProvider({
  children,
}: InputLengthContextProps) {
  const [inputLength, setInputLength] = useState(0);

  const setInputLengthHandler = (inputLength: number) => {
    if (inputLength > 0 && inputLength !== inputLength) {
      setInputLength(inputLength);
    }
  };
  return (
    <InputLengthContext.Provider
      value={{
        inputLength: inputLength,
        setInputLengthHandler: setInputLengthHandler,
      }}
    >
      {children}
    </InputLengthContext.Provider>
  );
}
