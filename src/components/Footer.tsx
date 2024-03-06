import React from "react";
import { useTheme } from "next-themes";

export default function Footer() {
  const version = "0.0.1";
  const { theme, setTheme } = useTheme();

  return (
    <>
      <footer className="w-full flex items-center justify-between fixed bottom-2 px-2 text-default-400 text-[10px]">
        <p>
          Desenvolvido por{" "}
          <a
            href="https://www.instagram.com/sxwuell/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @sxwuell
          </a>
        </p>
        <span
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          versão {version}
        </span>
      </footer>
    </>
  );
}
