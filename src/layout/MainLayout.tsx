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
    <div className="min-h-svh w-full flex flex-col">
      <Header />
      <main className="flex-grow w-full py-16 grid items-stretch">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      {simple ? <FooterSimple /> : <Footer />}
    </div>
  );
}
