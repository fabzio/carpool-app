import Header from "./layout/Header";
import SingUp from "./views/sign-up";

export function Main() {
  return (
    <div className="w-full h-svh  flex flex-col">
      <Header />
      <SingUp />
    </div>
  );
}
