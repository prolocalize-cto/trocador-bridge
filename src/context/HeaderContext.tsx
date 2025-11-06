import { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  hideHeaderOnMobile: boolean;
  setHideHeaderOnMobile: (hide: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [hideHeaderOnMobile, setHideHeaderOnMobile] = useState(false);

  return (
    <HeaderContext.Provider value={{ hideHeaderOnMobile, setHideHeaderOnMobile }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeaderContext must be used within a HeaderProvider");
  }
  return context;
};

