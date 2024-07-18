import { IconBrandGithub } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="footer footer-center flex justify-between bg-base-100 text-base-content text-opacity-30 p-4">
      <aside className="grid-flow-col items-center font-bold">
        <p>TinkuyWare</p>
      </aside>
      <nav>
        <a
          href="https://github.com/TinkuyWare/carpool-app-frontend"
          className="link flex gap-2"
        >
          <p>Danos una estrella en GitHub</p>
          <IconBrandGithub size={24} />
        </a>
      </nav>
    </footer>
  );
}
