import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { HeaderProvider, useHeaderContext } from "../context/HeaderContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const { hideHeaderOnMobile } = useHeaderContext();

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />
      {/* Add padding-top to account for fixed header */}
      <main className={`flex-1 flex items-center ${hideHeaderOnMobile ? "pt-0 md:pt-[100px]" : "pt-[100px]"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <HeaderProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </HeaderProvider>
  );
};

export default MainLayout;
