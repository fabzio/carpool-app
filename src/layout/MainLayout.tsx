import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import FooterSimple from "./FooterSimple";

interface Props {
  simple?: boolean;
}

export default function MainLayout({ simple }: Props) {
  return (
    <div className="h-svh w-full flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {simple ? <FooterSimple /> : <Footer />}
    </div>
  );
}
