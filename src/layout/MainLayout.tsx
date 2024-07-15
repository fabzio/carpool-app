import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <div className="h-svh w-full flex flex-col justify-around">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
