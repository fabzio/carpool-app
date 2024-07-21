import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import FooterSimple from "./FooterSimple";
import { Suspense } from "react";
import { Loading } from "@components";

interface Props {
  simple?: boolean;
}

export default function MainLayout({ simple }: Props) {
  return (
    <div className="h-svh w-full flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      {simple ? <FooterSimple /> : <Footer />}
    </div>
  );
}
