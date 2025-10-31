import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />
      {/* Add padding-top to account for fixed header */}
      <main className="flex-1 flex items-center pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
