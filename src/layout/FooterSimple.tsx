import { IconBrandGithub } from "@tabler/icons-react";
import { APP_VERSION } from "../config";

export default function FooterSimple() {
  return (
    <footer className="footer footer-center flex justify-between bg-base-100 text-base-content text-opacity-30 p-4 fixed bottom-0">
      <aside className="grid-flow-col items-center font-bold">
        <p>CarpoolApp v{APP_VERSION}</p>
      </aside>
      <nav>
        <a
          href="https://github.com/fabzio/carpool-app"
          className="link flex gap-2"
        >
          <p>Danos una estrella en GitHub</p>
          <IconBrandGithub size={24} />
        </a>
      </nav>
    </footer>
  );
}
